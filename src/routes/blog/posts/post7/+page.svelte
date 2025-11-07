<!-- blog/posts/post7/+page.svelte -->

<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Exporting & Sharing JWT Insights | JWT Viz Blog</title>
	<meta
		name="description"
		content="Copy decoded claims, export JSON, or generate PNG screenshots for reports and collaboration."
	/>
	<meta property="og:title" content="Exporting & Sharing JWT Insights | JWT Viz Blog" />
	<meta
		property="og:description"
		content="Copy decoded claims, export JSON, or generate PNG screenshots for reports and collaboration."
	/>
	<meta property="og:url" content="{base}/blog/posts/post7" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>Exporting & Sharing JWT Insights</p>
	</div>

	<article class="prose">
		<h1>Exporting & Sharing JWT Insights</h1>
		<p class="post-meta">Published: November 07, 2025</p>

		<p>
			Debugging JWTs is only half the battle. Communicating findings to teams, documenting issues,
			or including tokens in reports requires reliable export tools. JWT Viz provides multiple
			formats for every workflow.
		</p>

		<h2>1. Copy to Clipboard</h2>
		<p>One-click copy for:</p>
		<ul>
			<li>Header JSON</li>
			<li>Payload JSON</li>
			<li>Full decoded object</li>
			<li>Selected claim value</li>
		</ul>
		<p>Paste directly into tickets, Slack, or emails.</p>

		<h2>2. Export as JSON</h2>
		<p>
			Download <code>jwt-decoded.json</code> with pretty-printed, validated structure. Ideal for:
		</p>
		<ul>
			<li>Version control diffs</li>
			<li>Audit trails</li>
			<li>Integration with analysis scripts</li>
		</ul>

		<h2>3. PNG Screenshot</h2>
		<p>
			Using <code>html2canvas</code>, capture the entire UI—including tree expansion state and
			search highlights. Perfect for:
		</p>
		<ul>
			<li>Incident reports</li>
			<li>Security reviews</li>
			<li>Training materials</li>
		</ul>

		<h2>Collaboration Workflows</h2>
		<p>Pair exports with context:</p>
		<ul>
			<li>Attach PNG to Jira ticket</li>
			<li>Include JSON in PR description</li>
			<li>Share copied claim in standup</li>
		</ul>

		<h2>Privacy-First Export</h2>
		<p>
			All exports are generated client-side. Original token is never included in PNG or JSON unless
			you choose to.
		</p>

		<h2>FAQ</h2>
		<details>
			<summary>Can I export only the payload?</summary>
			<p>Yes—use “Copy Payload” or filter in JSON export.</p>
		</details>
		<details>
			<summary>Is the PNG high-resolution?</summary>
			<p>Yes—rendered at 2x scale for crisp prints.</p>
		</details>
		<details>
			<summary>Can I automate exports?</summary>
			<p>Save as bookmarklet or run in headless browser.</p>
		</details>

		<p class="italic-note">From insight to impact—export with confidence.</p>
	</article>
</div>

<style>
	.post-layout {
		max-width: 800px;
		padding-top: 2rem;
		padding-bottom: 4rem;
	}
	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}
	.breadcrumbs a {
		color: var(--accent-secondary);
	}
	.breadcrumbs a:hover {
		text-decoration: underline;
	}
	.breadcrumbs p {
		margin: 0;
	}
	.prose {
		line-height: 1.8;
	}
	.prose .post-meta {
		color: var(--text-secondary);
		font-size: 0.9rem;
		margin-bottom: 2rem;
		border-bottom: 1px solid var(--border-color);
		padding-bottom: 1rem;
	}
	.prose h1,
	.prose h2 {
		color: var(--accent-secondary);
	}
	.prose h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}
	.prose h2 {
		margin-top: 2.5rem;
		border-bottom: 1px solid var(--secondary-bg);
		padding-bottom: 0.5rem;
	}
	.prose p {
		color: var(--text-primary);
	}
	.prose ul {
		list-style-type: '→ ';
		padding-left: 1.5rem;
		color: var(--text-primary);
	}
	.prose ul li::marker {
		color: var(--accent-primary);
	}
	.prose ul li {
		padding-left: 0.5rem;
		margin-bottom: 0.5rem;
	}
	.prose details {
		background: var(--secondary-bg);
		border: 1px solid var(--border-color);
		border-radius: 6px;
		padding: 1rem;
		margin-bottom: 1rem;
	}
	.prose details[open] {
		background-color: var(--card-bg);
	}
	.prose summary {
		cursor: pointer;
		font-weight: 600;
		color: var(--accent-secondary);
		list-style: none;
	}
	.prose summary::-webkit-details-marker {
		display: none;
	}
	.prose summary::before {
		content: '+';
		margin-right: 0.75rem;
		color: var(--accent-primary);
		font-weight: bold;
		display: inline-block;
		transition: transform 0.2s ease;
	}
	.prose details[open] summary::before {
		transform: rotate(45deg);
	}
	.prose details p {
		margin-top: 1rem;
		padding-left: 1.5rem;
		border-left: 2px solid var(--accent-primary);
		color: var(--text-secondary);
	}
	.prose .italic-note {
		font-style: italic;
		color: var(--text-secondary);
		text-align: center;
		margin-top: 3rem;
	}
</style>
