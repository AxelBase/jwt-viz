<script>
	export let token = '';

	$: parts = token ? token.split('.') : [];
</script>

<div class="code-view">
	{#if parts.length >= 2}
		<h6>Header</h6>
		<pre class="code-header">{parts[0]}</pre>

		<h6 class="mt-3">Payload</h6>
		<pre class="code-payload">{parts[1]}</pre>

		{#if parts.length === 3}
			<h6 class="mt-3">Signature</h6>
			<pre class="code-signature">{parts[2]}</pre>
		{/if}
	{:else}
		<p class="code-muted">Invalid JWT format.</p>
	{/if}
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
	.code-header {
		color: #38bdf8;
	}
	.code-payload {
		color: #fb923c;
	}
	.code-signature {
		color: #f472b6;
	}
	.code-muted {
		color: var(--text-secondary);
		font-style: italic;
	}
</style>
