// src/lib/signatureChecker.js
// Client-first signature checker using Web Crypto where available.
// Exports: checkSignature(token, key) -> { status, alg, verified, reason }
//
// Behavior summary:
// - If token has alg: "none" -> status "Unsigned (alg: none)"
// - If signature missing -> "Signature missing"
// - For HS256 and RS256, attempts verification using SubtleCrypto
// - If SubtleCrypto unavailable or key format unsupported, returns "Verification unavailable" with reason
// - Never performs network requests and never sends keys anywhere

import parseJWT from '$lib/jwtParser.js';

function b64UrlToUint8Array(b64u) {
	// convert Base64Url to standard base64 then to Uint8Array
	const b64 = b64u.replace(/-/g, '+').replace(/_/g, '/');
	const pad = b64.length % 4;
	const padded = pad === 2 ? b64 + '==' : pad === 3 ? b64 + '=' : pad === 0 ? b64 : b64 + '===';
	const binary =
		typeof atob === 'function' ? atob(padded) : Buffer.from(padded, 'base64').toString('binary');
	const len = binary.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
	return bytes;
}

function pemToArrayBuffer(pem) {
	// Accept PEM with -----BEGIN PUBLIC KEY----- / -----END PUBLIC KEY-----
	const b64 = pem
		.replace(/-----BEGIN [^-]+-----/, '')
		.replace(/-----END [^-]+-----/, '')
		.replace(/\s+/g, '');
	if (typeof atob === 'function') {
		const binary = atob(b64);
		const len = binary.length;
		const bytes = new Uint8Array(len);
		for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
		return bytes.buffer;
	} else {
		return Buffer.from(b64, 'base64').buffer;
	}
}

async function importHmacKey(secret) {
	const enc = new TextEncoder();
	const keyData = enc.encode(secret);
	return crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, [
		'verify'
	]);
}

async function importRsaPublicKeyPem(pem) {
	const spki = pemToArrayBuffer(pem);
	return crypto.subtle.importKey(
		'spki',
		spki,
		{ name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
		false,
		['verify']
	);
}

async function verifyHs256(unsignedData, signatureBytes, secret) {
	try {
		const key = await importHmacKey(secret);
		const ok = await crypto.subtle.verify('HMAC', key, signatureBytes, unsignedData);
		return ok;
	} catch (e) {
		throw new Error(`HS256 verification error: ${e.message}`);
	}
}

async function verifyRs256(unsignedData, signatureBytes, publicPem) {
	try {
		const key = await importRsaPublicKeyPem(publicPem);
		const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, signatureBytes, unsignedData);
		return ok;
	} catch (e) {
		throw new Error(`RS256 verification error: ${e.message}`);
	}
}

/**
 * checkSignature(token, key?)
 * token: JWT string
 * key: optional string (HS secret or PEM public key)
 *
 * returns: {
 *   status: string,
 *   alg: string | null,
 *   verified: boolean | null,
 *   reason: string | null
 * }
 */
export async function checkSignature(token, key) {
	const res = { status: 'Unknown', alg: null, verified: null, reason: null };

	if (!token || typeof token !== 'string') {
		res.status = 'No token provided';
		return res;
	}

	const parsed = parseJWT(token);
	if (parsed.errors && parsed.errors.length) {
		res.status = 'Invalid token';
		res.reason = parsed.errors.join('; ');
		return res;
	}

	const header = parsed.header || {};
	const alg = header.alg || null;
	res.alg = alg;

	// quick structural checks
	if (!alg) {
		res.status = 'Algorithm unspecified';
		return res;
	}

	if (alg === 'none') {
		res.status = 'Unsigned (alg: none)';
		res.verified = false;
		return res;
	}

	if (!parsed.signature) {
		res.status = 'Signature missing';
		res.verified = false;
		return res;
	}

	// Ensure Web Crypto available
	const subtle = typeof crypto !== 'undefined' && crypto.subtle ? crypto.subtle : null;
	if (!subtle) {
		res.status = 'Verification unavailable';
		res.reason = 'Web Crypto SubtleCrypto not available in this environment';
		return res;
	}

	// Prepare unsigned data (header.payload as ASCII/UTF-8 bytes)
	const parts = token.trim().split('.');
	const unsignedStr = `${parts[0]}.${parts[1]}`;
	const encoder = new TextEncoder();
	const unsignedData = encoder.encode(unsignedStr);

	// signature bytes (base64url->bytes)
	let signatureBytes;
	try {
		signatureBytes = b64UrlToUint8Array(parts[2]);
	} catch (e) {
		res.status = 'Invalid signature encoding';
		res.reason = e.message;
		return res;
	}

	try {
		if (alg === 'HS256') {
			if (!key) {
				res.status = 'Verification unavailable';
				res.reason = 'HS256 requires a shared secret key';
				return res;
			}
			const ok = await verifyHs256(unsignedData, signatureBytes, key);
			res.verified = ok;
			res.status = ok ? 'Signature valid' : 'Signature invalid';
			return res;
		} else if (alg === 'RS256') {
			if (!key) {
				res.status = 'Verification unavailable';
				res.reason = 'RS256 requires a PEM public key';
				return res;
			}
			const ok = await verifyRs256(unsignedData, signatureBytes, key);
			res.verified = ok;
			res.status = ok ? 'Signature valid' : 'Signature invalid';
			return res;
		} else {
			res.status = 'Verification unavailable';
			res.reason = `Unsupported algorithm: ${alg}`;
			return res;
		}
	} catch (e) {
		res.status = 'Verification error';
		res.reason = e.message;
		res.verified = false;
		return res;
	}
}

export default checkSignature;
