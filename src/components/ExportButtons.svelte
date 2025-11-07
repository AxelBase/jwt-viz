<script>
	import { copyText, exportJSON, exportPNG } from '$lib/exporters';

	export let header = {};
	export let payload = {};
	export let treeElement; // DOM element ref for PNG export

	function handleCopy(type) {
		if (type === 'header') copyText(JSON.stringify(header, null, 2));
		else if (type === 'payload') copyText(JSON.stringify(payload, null, 2));
		else if (type === 'all') copyText(JSON.stringify({ header, payload }, null, 2));
	}

	function handleExport(type) {
		if (type === 'json') exportJSON({ header, payload });
		else if (type === 'png' && treeElement) exportPNG(treeElement);
	}
</script>

<div class="export-buttons">
	<button class="btn-export" on:click={() => handleCopy('header')}> Copy Header </button>
	<button class="btn-export" on:click={() => handleCopy('payload')}> Copy Payload </button>
	<button class="btn-export" on:click={() => handleCopy('all')}> Copy All </button>
	<button class="btn-export btn-export-primary" on:click={() => handleExport('json')}>
		Export JSON
	</button>
	<button class="btn-export btn-export-primary" on:click={() => handleExport('png')}>
		Export PNG
	</button>
</div>

<style>
	.export-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border-color);
	}
	.btn-export {
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.btn-export:hover {
		border-color: var(--accent-primary);
		color: var(--accent-primary);
		transform: translateY(-2px);
		box-shadow: 0 4px 8px var(--shadow-color);
	}
	.btn-export:active {
		transform: translateY(0);
	}
	.btn-export-primary {
		background-color: var(--accent-primary-subtle);
		border-color: transparent;
		color: var(--accent-primary-hover);
	}
	.btn-export-primary:hover {
		background-color: var(--accent-primary);
		border-color: var(--accent-primary);
		color: var(--text-on-accent);
	}
</style>
