<script>
	import { onMount } from 'svelte';
	import hljsCore from 'highlight.js/lib/core';
	import json from 'highlight.js/lib/languages/json';

	export let header = {};
	export let payload = {};

	let highlightedHeader = '';
	let highlightedPayload = '';

	let hljs; // will hold client-side hljs instance

	function safeHighlight(obj) {
		const jsonString = JSON.stringify(obj, null, 2);
		try {
			return hljs ? hljs.highlight(jsonString, { language: 'json' }).value : escapeHtml(jsonString);
		} catch (e) {
			return escapeHtml(jsonString);
		}
	}

	function escapeHtml(str) {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	onMount(() => {
		hljs = hljsCore;
		hljs.registerLanguage('json', json);
		// initial highlight
		highlightedHeader = safeHighlight(header);
		highlightedPayload = safeHighlight(payload);
	});

	// update highlights when props change (client-only)
	$: if (typeof window !== 'undefined' && hljs) {
		highlightedHeader = safeHighlight(header);
		highlightedPayload = safeHighlight(payload);
	}
</script>

<div class="code-view">
	<h6>Header</h6>
	<pre><code class="hljs">{@html highlightedHeader}</code></pre>

	<h6 class="mt-3">Payload</h6>
	<pre><code class="hljs">{@html highlightedPayload}</code></pre>
</div>

<style>
	.code-view {
		background-color: var(--bg-code);
		color: #f3f4f6;
		border-radius: 0.75rem;
		padding: 1.25rem;
		overflow-x: auto;
		border: 1px solid var(--border-color);
	}
	.code-view h6 {
		color: var(--text-secondary);
		font-weight: 500;
		margin-top: 0;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 0.8rem;
	}
	.code-view .mt-3 {
		margin-top: 1.5rem;
	}
	.code-view pre {
		margin: 0;
		font-size: 0.9rem;
		white-space: pre-wrap;
		word-break: break-all;
	}
	.code-view :global(.hljs) {
		background: none;
		padding: 0;
	}
</style>
