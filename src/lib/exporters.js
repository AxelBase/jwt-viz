// src/lib/exporters.js
import html2canvas from 'html2canvas';

/**
 * Copy text to clipboard.
 * @param {string} text
 */
export async function copyText(text) {
	try {
		await navigator.clipboard.writeText(text);
	} catch {
		alert('Copy failed.');
	}
}

/**
 * Export JSON object to file.
 * @param {object} data
 * @param {string} filename
 */
export function exportJSON(data, filename = 'jwt-decoded.json') {
	const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}

/**
 * Export DOM element to PNG.
 * @param {HTMLElement} element
 * @param {string} filename
 */
export async function exportPNG(element, filename = 'jwt-tree.png') {
	const canvas = await html2canvas(element);
	const link = document.createElement('a');
	link.href = canvas.toDataURL('image/png');
	link.download = filename;
	link.click();
}
