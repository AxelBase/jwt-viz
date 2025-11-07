// src/lib/jwtParser.js
// Minimal, dependency-free JWT splitter and Base64Url JSON decoder.
// Works in browser and SSR (Node) environments and returns structured errors.

function base64UrlToBase64(input) {
	// RFC 4648 §5
	if (typeof input !== 'string') throw new Error('Invalid input type for base64 decoding');
	let output = input.replace(/-/g, '+').replace(/_/g, '/');
	const pad = output.length % 4;
	if (pad === 2) output += '==';
	else if (pad === 3) output += '=';
	else if (pad !== 0) throw new Error('Invalid Base64Url string length');
	return output;
}

function decodeBase64ToUtf8(b64) {
	if (typeof atob === 'function') {
		// browser
		try {
			// atob returns binary string; decodeURIComponent(escape(...)) converts to proper UTF-8
			// escape is deprecated but used here defensively; Buffer fallback used in SSR
			return decodeURIComponent(escape(atob(b64)));
		} catch (e) {
			// fallback to try simple atob without decoding
			return atob(b64);
		}
	} else if (typeof Buffer !== 'undefined') {
		// Node / SSR
		return Buffer.from(b64, 'base64').toString('utf8');
	} else {
		throw new Error('No Base64 decoder available in this environment');
	}
}

function parseJsonSafe(str, context) {
	try {
		return JSON.parse(str);
	} catch (e) {
		const err = new Error(`Failed to parse JSON for ${context}: ${e.message}`);
		err.context = context;
		throw err;
	}
}

/**
 * Parse a JWT string into header, payload and signature with detailed errors.
 * Returns object: { header, payload, signature, errors }
 */
export function parseJWT(token) {
	const result = { header: null, payload: null, signature: null, errors: [] };

	if (!token || typeof token !== 'string') {
		result.errors.push('Input must be a non-empty string');
		return result;
	}

	const trimmed = token.trim();
	const parts = trimmed.split('.');
	if (parts.length < 2 || parts.length > 3) {
		result.errors.push('JWT must have 2 or 3 parts separated by dots (header.payload[.signature])');
		return result;
	}

	const [rawHeader = '', rawPayload = '', rawSignature = ''] = parts;
	// decode header
	try {
		const headerB64 = base64UrlToBase64(rawHeader);
		const headerJson = decodeBase64ToUtf8(headerB64);
		result.header = parseJsonSafe(headerJson, 'header');
	} catch (e) {
		result.errors.push(`Header decode error: ${e.message}`);
	}

	// decode payload
	try {
		const payloadB64 = base64UrlToBase64(rawPayload);
		const payloadJson = decodeBase64ToUtf8(payloadB64);
		result.payload = parseJsonSafe(payloadJson, 'payload');
	} catch (e) {
		result.errors.push(`Payload decode error: ${e.message}`);
	}

	result.signature = rawSignature || null;
	return result;
}

export default parseJWT;
