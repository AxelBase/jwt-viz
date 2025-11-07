<script>
	import ClaimNode from './ClaimNode.svelte';
	import { buildTree, searchTree } from '$lib/treeBuilder';

	export let data = {};
	export let title = '';
	let tree = [];
	let search = '';
	let matches = [];

	$: tree = buildTree(data);
	$: matches = search ? searchTree(tree, search) : [];
</script>

<div class="tree-view card">
	<div class="tree-view-header">
		<h6>{title}</h6>
		<input
			type="search"
			placeholder="Search..."
			class="form-control form-control-sm tree-view-search"
			bind:value={search}
		/>
	</div>

	<div class="tree-view-content">
		{#if tree.length === 0}
			<p class="text-secondary">No data to display.</p>
		{:else}
			<ul class="tree-node-list">
				{#each tree as node}
					<ClaimNode {node} {matches} path={[]} />
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.tree-view {
		font-family: monospace;
		font-size: 0.95rem;
		overflow-x: auto;
		background-color: var(--bg-primary); /* Use primary bg for contrast */
		border: 1px solid var(--border-color);
		border-radius: 0.75rem;
		margin-top: 1rem;
		padding: 0; /* Remove padding from card */
	}

	.tree-view-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1.25rem; /* Add padding here */
		border-bottom: 1px solid var(--border-color);
	}

	.tree-view-header h6 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.tree-view-search {
		font-size: 0.9rem;
		width: auto;
		min-width: 180px;
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		border: 1px solid var(--border-color);
		border-radius: 0.375rem;
	}
	.tree-view-search:focus {
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 0.2rem var(--focus-ring);
		outline: none;
	}

	.tree-view-content {
		padding: 1.25rem; /* Add padding for the content area */
	}

	.tree-node-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.text-secondary {
		color: var(--text-secondary);
		font-style: italic;
	}
</style>
