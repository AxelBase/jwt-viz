<!-- blog/posts/post1/+page.svelte -->

<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>JWT Basics: Understanding the Anatomy | JWT Viz Blog</title>
	<meta
		name="description"
		content="Learn the three core parts of a JSON Web Token—header, payload, and signature—and how they work together to secure data."
	/>
	<meta property="og:title" content="JWT Basics: Understanding the Anatomy | JWT Viz Blog" />
	<meta
		property="og:description"
		content="Learn the three core parts of a JSON Web Token—header, payload, and signature—and how they work together to secure data."
	/>
	<meta property="og:url" content="{base}/blog/posts/post1" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>JWT Basics: Understanding the Anatomy</p>
	</div>

	<article class="prose">
		<h1>JWT Basics: Understanding the Anatomy</h1>
		<p class="post-meta">Published: November 07, 2025</p>

		<p>
			A JSON Web Token (JWT) is a compact, self-contained way to transmit information between
			parties as a JSON object. It’s widely used in modern web applications for authentication and
			information exchange. Despite its simplicity, understanding its structure is key to using it
			securely and effectively.
		</p>

		<h2>The Three Parts of a JWT</h2>
		<p>
			Every JWT consists of three Base64Url-encoded segments separated by dots: <code
				>header.payload.signature</code
			>.
		</p>

		<h3>1. Header</h3>
		<p>
			The header typically contains metadata about the token, such as the signing algorithm (<code
				>alg</code
			>) and token type (<code>typ</code>). For example:
		</p>
		<pre><code
				>{`{
  "alg": "HS256",
  "typ": "JWT"
}`}</code
			></pre>

		<h3>2. Payload</h3>
		<p>
			The payload holds the actual claims—statements about the user and additional data. There are
			three types of claims:
		</p>
		<ul>
			<li>
				<strong>Registered</strong>: Standard claims like <code>iss</code> (issuer),
				<code>sub</code>
				(subject), <code>exp</code> (expiration), and <code>iat</code> (issued at).
			</li>
			<li>
				<strong>Public</strong>: Custom claims defined by the application (e.g., <code>role</code>,
				<code>permissions</code>).
			</li>
			<li><strong>Private</strong>: Agreed-upon claims between parties (use cautiously).</li>
		</ul>

		<h3>3. Signature</h3>
		<p>
			The signature ensures integrity. It’s created by encoding the header and payload, then signing
			with a secret or private key. The server verifies it using the corresponding public key or
			secret.
		</p>

		<h2>Why This Structure Matters</h2>
		<p>
			Because JWTs are stateless, the server doesn’t store session data—everything needed to verify
			authenticity is inside the token. This enables scalability but also demands caution: never put
			sensitive data in the payload, as it’s only encoded, not encrypted.
		</p>

		<h2>FAQ</h2>
		<details>
			<summary>What happens if the signature is missing?</summary>
			<p>
				If <code>alg: none</code> is used, the token is unsigned and should only be accepted in trusted
				environments. Most systems reject it by default.
			</p>
		</details>
		<details>
			<summary>Can I trust the payload data?</summary>
			<p>
				Only if the signature is verified. Anyone can decode and read the payload, but only a valid
				signature proves authenticity.
			</p>
		</details>
		<details>
			<summary>How long should a JWT live?</summary>
			<p>
				Use short expiration (<code>exp</code>) times (e.g., 15–60 minutes) and implement refresh
				tokens for long sessions.
			</p>
		</details>

		<p class="italic-note">
			Mastering JWT structure is the first step to building secure, scalable authentication systems.
		</p>
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
	.prose h2,
	.prose h3 {
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
	.prose pre {
		background: var(--secondary-bg);
		padding: 1rem;
		border-radius: 6px;
		overflow-x: auto;
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
