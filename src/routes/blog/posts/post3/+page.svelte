<!-- blog/posts/post3/+page.svelte -->

<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Common JWT Security Pitfalls | JWT Viz Blog</title>
	<meta
		name="description"
		content="Avoid critical JWT vulnerabilities like alg:none attacks, weak secrets, and improper validation."
	/>
	<meta property="og:title" content="Common JWT Security Pitfalls | JWT Viz Blog" />
	<meta
		property="og:description"
		content="Avoid critical JWT vulnerabilities like alg:none attacks, weak secrets, and improper validation."
	/>
	<meta property="og:url" content="{base}/blog/posts/post3" />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/blog">Blog</a>
		<span>/</span>
		<p>Common JWT Security Pitfalls</p>
	</div>

	<article class="prose">
		<h1>Common JWT Security Pitfalls</h1>
		<p class="post-meta">Published: November 07, 2025</p>

		<p>
			While JWTs are powerful, misconfigurations can lead to severe breaches. Understanding common
			vulnerabilities is essential for secure implementation.
		</p>

		<h2>1. The alg:none Attack</h2>
		<p>
			Some libraries accept <code>"alg": "none"</code> by default. An attacker can remove the
			signature and set <code>alg: none</code> to bypass verification.
		</p>
		<p><strong>Fix</strong>: Explicitly disable <code>none</code> algorithm in your JWT library.</p>

		<h2>2. Weak or Exposed Secrets</h2>
		<p>Using short, guessable, or hardcoded secrets for HS256 makes brute-force attacks trivial.</p>
		<ul>
			<li>Use cryptographically strong secrets (≥256 bits)</li>
			<li>Rotate keys regularly</li>
			<li>Never commit secrets to version control</li>
		</ul>

		<h2>3. Accepting Tokens Without Verification</h2>
		<p>
			Decoding a JWT doesn’t mean it’s valid. Always verify the signature before trusting claims.
		</p>

		<h2>4. Overloading the Payload</h2>
		<p>Large JWTs increase header size and can be used in DoS attacks. Keep payloads minimal.</p>

		<h2>5. Missing Audience & Issuer Checks</h2>
		<p>
			Without validating <code>aud</code> and <code>iss</code>, an attacker could reuse a token
			across applications.
		</p>

		<h2>6. Improper Error Handling</h2>
		<p>
			Leaking validation errors can help attackers craft valid tokens. Return generic error
			messages.
		</p>

		<h2>7. Storing JWTs in localStorage</h2>
		<p>
			XSS attacks can steal tokens from browser storage. Prefer HttpOnly, Secure cookies when
			possible.
		</p>

		<h2>Best Practices Summary</h2>
		<ul>
			<li>Always verify signature</li>
			<li>Enforce strong algorithms (RS256 preferred over HS256)</li>
			<li>Set and check <code>exp</code>, <code>iat</code>, <code>nbf</code></li>
			<li>Use allowlists for <code>aud</code> and <code>iss</code></li>
			<li>Implement token revocation when needed</li>
		</ul>

		<h2>FAQ</h2>
		<details>
			<summary>Should I use HS256 or RS256?</summary>
			<p>
				RS256 (asymmetric) is preferred in microservices. HS256 is acceptable if the secret is
				strongly protected.
			</p>
		</details>
		<details>
			<summary>Can I blacklist JWTs?</summary>
			<p>Yes, but use short expiration to reduce need. Store JTI in Redis with TTL.</p>
		</details>
		<details>
			<summary>What about refresh tokens?</summary>
			<p>Store refresh tokens securely server-side; issue short-lived access tokens.</p>
		</details>

		<p class="italic-note">
			Security is in the implementation. A JWT is only as strong as your validation logic.
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
