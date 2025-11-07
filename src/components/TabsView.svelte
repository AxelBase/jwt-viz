<script>
	import { createEventDispatcher } from 'svelte';
	import RawJsonTab from './RawJsonTab.svelte';
	import EncodedViewTab from './EncodedViewTab.svelte'; // <-- IMPORTED

	export let header = {};
	export let payload = {};
	export let encoded = '';
	export let activeTab = 'tree';

	const dispatch = createEventDispatcher();

	function setTab(tab) {
		activeTab = tab;
		try {
			history.replaceState(null, '', `#${tab}`);
		} catch (e) {
			// ignore in restricted environments
		}
		dispatch('tabchange', { detail: { tab } });
	}

	// initialize from hash on mount (client-only)
	if (typeof window !== 'undefined') {
		const hash = (location.hash || '').replace('#', '');
		if (hash === 'tree' || hash === 'raw' || hash === 'encoded') {
			activeTab = hash;
		}
	}
</script>

<nav>
	<ul class="nav-tabs" role="tablist">
		<li class="nav-item" role="presentation">
			<button
				role="tab"
				type="button"
				class="nav-link"
				class:active={activeTab === 'tree'}
				aria-selected={activeTab === 'tree'}
				on:click={() => setTab('tree')}
			>
				Tree
			</button>
		</li>

		<li class="nav-item" role="presentation">
			<button
				role="tab"
				type="button"
				class="nav-link"
				class:active={activeTab === 'raw'}
				aria-selected={activeTab === 'raw'}
				on:click={() => setTab('raw')}
			>
				Raw JSON
			</button>
		</li>

		<li class="nav-item" role="presentation">
			<button
				role="tab"
				type="button"
				class="nav-link"
				class:active={activeTab === 'encoded'}
				aria-selected={activeTab === 'encoded'}
				on:click={() => setTab('encoded')}
			>
				Encoded
			</button>
		</li>
	</ul>
</nav>

<div class="tab-content">
	{#if activeTab === 'tree'}
		<slot name="tree" />
	{:else if activeTab === 'raw'}
		<RawJsonTab {header} {payload} />
	{:else if activeTab === 'encoded'}
		<EncodedViewTab token={encoded} />
	{/if}
</div>

<style>
	.nav-tabs {
		display: flex;
		border-bottom: 2px solid var(--border-color);
		margin-bottom: 1.5rem;
		padding: 0;
		list-style: none;
	}
	.nav-item {
		margin-bottom: -2px; /* Pulls button border over the nav border */
	}
	.nav-link {
		border: none;
		border-bottom: 2px solid transparent;
		background: none;
		color: var(--text-secondary);
		font-weight: 500;
		font-size: 1rem;
		padding: 0.75rem 1.25rem;
		cursor: pointer;
		transition:
			color 0.2s ease,
			border-color 0.2s ease;
	}
	.nav-link:hover {
		color: var(--text-primary);
		border-bottom-color: var(--border-color);
	}
	.nav-link.active {
		color: var(--accent-primary);
		border-bottom-color: var(--accent-primary);
		font-weight: 600;
	}
	.nav-link:focus {
		outline: 2px solid var(--focus-ring);
		border-radius: 4px;
	}
	.tab-content {
		/* Add some padding if you like, or let the content handle it */
	}
</style>
