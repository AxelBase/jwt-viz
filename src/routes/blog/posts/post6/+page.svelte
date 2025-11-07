<!-- blog/posts/post6/+page.svelte -->

<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Verifying Signatures Without a Backend | JWT Viz Blog</title>
	<meta
		name="description"
		content="Use Web Crypto API to verify RS256 and HS256 signatures directly in the browser—no server required."
	/>
	<meta property="og:title" content="Verifying Signatures Without a Backend | JWT Viz Blog" />
	<meta
		property="og:description"
		content="Use Web Crypto API to verify RS256 and HS256 signatures directly in the browser—no server required."
	/>
	<meta property="og:url" content="{base}/blog/posts/post6" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>Verifying Signatures Without a Backend</p>
	</div>

	<article class="prose">
		<h1>Verifying Signatures Without a Backend</h1>
		<p class="post-meta">Published: November 07, 2025</p>

		<p>
			Traditionally, JWT signature verification requires a backend. But what if you’re offline, in a
			restricted network, or just want to validate a token locally? JWT Viz brings cryptographic
			verification to the browser using the Web Crypto API.
		</p>

		<h2>Supported Algorithms</h2>
		<ul>
			<li><strong>HS256</strong>: HMAC with SHA-256 (symmetric secret)</li>
			<li><strong>RS256</strong>: RSA with SHA-256 (asymmetric public key)</li>
		</ul>

		<h2>How It Works</h2>
		<p>When you paste a public key or secret:</p>
		<ol>
			<li>Header and payload are re-encoded</li>
			<li>Signature is decoded from Base64Url</li>
			<li><code>crypto.subtle.verify()</code> checks integrity</li>
			<li>Result: “Verified”, “Invalid”, or error</li>
		</ol>

		<h2>Use Cases</h2>
		<ul>
			<li><strong>Log Analysis</strong>: Verify tokens from logs match expected keys</li>
			<li><strong>Penetration Testing</strong>: Test if weak secrets are in use</li>
			<li><strong>Education</strong>: Teach signature concepts hands-on</li>
		</ul>

		<h2>Limitations</h2>
		<p>
			Client-side verification is for inspection only. Production systems must verify on the server.
			Never trust client-validated tokens for access control.
		</p>

		<h2>Security Notes</h2>
		<ul>
			<li>Keys are never stored or sent</li>
			<li>Works in memory only</li>
			<li>Supports PEM SPKI format for RS256</li>
		</ul>

		<h2>FAQ</h2>
		<details>
			<summary>Can I verify ES256 or EdDSA?</summary>
			<p>Not yet—Web Crypto support is limited. RS256/HS256 cover 95% of use cases.</p>
		</details>
		<details>
			<summary>Is this safe for production secrets?</summary>
			<p>Yes for inspection. Avoid pasting highly sensitive keys in shared environments.</p>
		</details>
		<details>
			<summary>Why not use jwt.io?</summary>
			<p>JWT Viz is offline, private, and offers tree visualization + export.</p>
		</details>

		<p class="italic-note">Verify signatures anywhere. No backend. No excuses.</p>
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
	.prose ul,
	.prose ol {
		list-style-type: '→ ';
		padding-left: 1.5rem;
		color: var(--text-primary);
	}
	.prose ul li::marker,
	.prose ol li::marker {
		color: var(--accent-primary);
	}
	.prose ul li,
	.prose ol li {
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
