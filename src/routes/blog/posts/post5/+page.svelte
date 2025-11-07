<!-- blog/posts/post5/+page.svelte -->

<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Offline JWT Debugging with PWA | JWT Viz Blog</title>
	<meta
		name="description"
		content="Debug JWTs anywhere—no internet, no installation. Learn how JWT Viz works as a Progressive Web App."
	/>
	<meta property="og:title" content="Offline JWT Debugging with PWA | JWT Viz Blog" />
	<meta
		property="og:description"
		content="Debug JWTs anywhere—no internet, no installation. Learn how JWT Viz works as a Progressive Web App."
	/>
	<meta property="og:url" content="{base}/blog/posts/post5" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>Offline JWT Debugging with PWA</p>
	</div>

	<article class="prose">
		<h1>Offline JWT Debugging with PWA</h1>
		<p class="post-meta">Published: November 07, 2025</p>

		<p>
			In secure environments, internet access is restricted. Production logs, air-gapped systems,
			and travel scenarios demand tools that work offline. JWT Viz delivers exactly that—full JWT
			inspection without network dependency.
		</p>

		<h2>How PWA Enables Offline Use</h2>
		<p>
			Progressive Web Apps (PWA) combine web accessibility with app-like reliability. JWT Viz uses:
		</p>
		<ul>
			<li><strong>Service Worker</strong>: Caches all assets on first visit</li>
			<li><strong>Web Manifest</strong>: Enables “Add to Home Screen”</li>
			<li><strong>Client-Side Logic</strong>: No backend, no API calls</li>
		</ul>

		<h2>One-Click Installation</h2>
		<p>
			On desktop or mobile, click “Install” in the browser. JWT Viz appears as a native app—no App
			Store, no sideloading.
		</p>

		<h2>Use Cases for Offline Debugging</h2>
		<ul>
			<li>
				<strong>Secure Facilities</strong>: Paste tokens from logs; analyze without exposing data
			</li>
			<li><strong>Travel & Conferences</strong>: Demo JWT flows without Wi-Fi</li>
			<li>
				<strong>Incident Response</strong>: Export screenshots for reports on locked-down machines
			</li>
		</ul>

		<h2>Privacy by Design</h2>
		<p>Since everything runs in the browser:</p>
		<ul>
			<li>No telemetry</li>
			<li>No cookies</li>
			<li>No token storage</li>
			<li>Works behind firewalls and proxies</li>
		</ul>

		<h2>Single-File Distribution</h2>
		<p>
			Build output is one <code>index.html</code> + JS bundle. Email it, share via USB, or host internally.
		</p>

		<h2>FAQ</h2>
		<details>
			<summary>Do I need to rebuild for updates?</summary>
			<p>No—service worker auto-updates on next visit when online.</p>
		</details>
		<details>
			<summary>Can I use it on iOS?</summary>
			<p>Yes—add to Home Screen via Safari Share menu.</p>
		</details>
		<details>
			<summary>Is it safe for sensitive tokens?</summary>
			<p>Absolutely. Nothing leaves your device.</p>
		</details>

		<p class="italic-note">JWT debugging should never require an internet connection.</p>
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
