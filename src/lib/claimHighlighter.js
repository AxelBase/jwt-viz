// src/lib/claimHighlighter.js

const CLAIM_COLORS = {
	iss: 'text-info',
	sub: 'text-primary',
	aud: 'text-warning',
	exp: 'text-danger',
	nbf: 'text-danger',
	iat: 'text-success',
	jti: 'text-secondary',
	alg: 'text-success',
	typ: 'text-secondary',
	kid: 'text-warning'
};

/**
 * Get color + validity for a claim
 * @param {string} key
 * @param {any} value
 * @returns {{className: string, tooltip?: string}}
 */
export function highlightClaim(key, value) {
	const now = Math.floor(Date.now() / 1000);
	let tooltip = '';
	let className = CLAIM_COLORS[key] || '';

	if (['exp', 'nbf', 'iat'].includes(key) && typeof value === 'number') {
		const date = new Date(value * 1000).toLocaleString();
		if (key === 'exp' && value < now) {
			className = 'text-danger fw-bold';
			tooltip = `Expired: ${date}`;
		} else if (key === 'nbf' && value > now) {
			className = 'text-warning fw-bold';
			tooltip = `Not active until: ${date}`;
		} else {
			tooltip = `${key.toUpperCase()} → ${date}`;
		}
	}

	return { className, tooltip };
}
