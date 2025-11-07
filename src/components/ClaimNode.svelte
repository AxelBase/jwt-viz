<script>
	import ClaimNode from './ClaimNode.svelte';
	import { highlightClaim } from '$lib/claimHighlighter';

	export let node;
	export let matches = [];
	export let path = [];

	let expanded = false;
	const fullPath = [...path, node.key].join('.');

	const { className, tooltip } = highlightClaim(node.key, node.value) || {
		className: '',
		tooltip: ''
	};

	const isMatch = matches.some((m) => m.join('.') === fullPath);

	function toggle() {
		expanded = !expanded;
	}
</script>

<li class="tree-node">
	{#if node.children && node.children.length > 0}
		<button
			type="button"
			class="tree-node-toggle"
			class:expanded
			aria-expanded={expanded}
			aria-controls={fullPath}
			on:click={toggle}
		>
			<svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
				<path
					fill-rule="evenodd"
					d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
				/>
			</svg>
			<span class="visually-hidden">{expanded ? 'Collapse' : 'Expand'}</span>
		</button>
	{/if}

	<div class="tree-node-content">
		<span class={className} class:tree-node-highlight={isMatch} title={tooltip}>
			<strong class="tree-node-key">{node.key}</strong>:
			{#if node.value !== null && node.value !== undefined && typeof node.value !== 'object'}
				<span class="tree-node-value">{String(node.value)}</span>
			{/if}
		</span>
	</div>

	{#if expanded && node.children && node.children.length > 0}
		<ul id={fullPath} class="tree-node-children">
			{#each node.children as child}
				<ClaimNode node={child} {matches} path={[...path, node.key]} />
			{/each}
		</ul>
	{/if}
</li>

<style>
	.tree-node {
		line-height: 1.6;
		margin-left: 1.25rem;
		position: relative;
		padding: 2px 0;
	}

	.tree-node-toggle {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		color: var(--text-secondary);
		font: inherit;
		position: absolute;
		left: -1.5rem; /* Adjusted for better alignment */
		top: 0.35rem; /* Adjusted for better alignment */
		width: 1rem;
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.15s ease;
	}

	.tree-node-toggle.expanded {
		transform: rotate(90deg);
	}

	.tree-node-toggle:focus {
		outline: 2px solid var(--focus-ring);
		border-radius: 2px;
	}

	.tree-node-content {
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
		transition: background-color 0.2s ease;
		display: inline-block;
	}

	.tree-node-content:hover {
		background-color: var(--border-color);
	}

	.tree-node-key {
		color: var(--text-primary);
		font-weight: 600;
	}

	.tree-node-value {
		color: var(--text-secondary);
		margin-left: 0.35rem;
	}

	.tree-node-children {
		list-style: none;
		padding-left: 0;
		margin-top: 0.25rem;
		border-left: 2px solid var(--border-color);
	}

	.tree-node-highlight {
		background-color: var(--accent-primary-subtle);
		border-radius: 4px;
	}

	/* Claim highlights (assuming these are in app.css, but good to have here) */
	:global(.claim-std) {
		font-weight: 600;
		color: var(--accent-secondary);
	}
	:global(.claim-time-valid) {
		color: #198754;
	}
	:global(.claim-time-expired) {
		color: #dc3545;
		font-weight: 600;
	}

	.visually-hidden {
		position: absolute !important;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
		white-space: nowrap;
	}
</style>
