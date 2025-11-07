// src/lib/treeBuilder.js

/**
 * Recursively build a tree structure from an object.
 * @param {object} data - Parsed JSON (header/payload)
 * @param {string} parentKey - Optional parent key
 * @returns {array} - Array of nodes { key, value, children }
 */
export function buildTree(data, parentKey = '') {
	if (typeof data !== 'object' || data === null)
		return [{ key: parentKey, value: data, children: [] }];

	return Object.entries(data).map(([key, value]) => ({
		key,
		value: typeof value === 'object' && value !== null ? null : value,
		children: typeof value === 'object' && value !== null ? buildTree(value, key) : []
	}));
}

/**
 * Search nodes recursively for matching text.
 * @param {array} nodes
 * @param {string} query
 * @returns {array} - Matched node paths
 */
export function searchTree(nodes, query) {
	const results = [];
	const lower = query.toLowerCase();

	function walk(node, path = []) {
		const match =
			node.key.toLowerCase().includes(lower) ||
			(node.value && String(node.value).toLowerCase().includes(lower));

		if (match) results.push([...path, node.key]);
		if (node.children) node.children.forEach((child) => walk(child, [...path, node.key]));
	}

	nodes.forEach((node) => walk(node));
	return results;
}
