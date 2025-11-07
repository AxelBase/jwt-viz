<!-- src/routes/terms/+page.svelte -->

<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Terms and Conditions | JWT Viz</title>
	<meta
		name="description"
		content="Review the terms governing use of JWT Viz—a free, open-source, client-side JWT inspection tool."
	/>
	<meta property="og:title" content="Terms and Conditions | JWT Viz" />
	<meta
		property="og:description"
		content="Review the terms governing use of JWT Viz—a free, open-source, client-side JWT inspection tool."
	/>
	<meta property="og:url" content="{base}/terms" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
	<div class="breadcrumbs">
		<a href="{base}/">Home</a>
		<span>/</span>
		<p>Terms and Conditions</p>
	</div>

	<article class="prose">
		<h1>Terms and Conditions</h1>
		<p class="post-meta">Last Updated: November 07, 2025</p>

		<h2>1. Acceptance of Terms</h2>
		<p>
			By accessing or using <strong>JWT Viz</strong> ("the Tool"), you agree to these Terms and Conditions.
			If you do not agree, do not use the Tool. We reserve the right to modify these terms at any time,
			effective upon posting.
		</p>

		<h2>2. Nature of the Tool</h2>
		<p>
			JWT Viz is a **free, open-source, client-side web application** for visualizing and inspecting
			JSON Web Tokens. It is provided **"as is"** for educational, debugging, and development
			purposes. It is **not** a production authentication system.
		</p>

		<h2>3. License</h2>
		<p>The Tool is released under the <strong>MIT License</strong>. You may:</p>
		<ul>
			<li>Use it freely for personal or commercial projects</li>
			<li>Modify, fork, or redistribute the source code</li>
			<li>Host it on your own servers or embed it in documentation</li>
		</ul>
		<p>You must retain the original copyright notice in all copies or derivatives.</p>

		<h2>4. Acceptable Use</h2>
		<p>You agree to use JWT Viz responsibly:</p>
		<ul>
			<li><strong>Do not</strong> use it to bypass security controls in production systems</li>
			<li>
				<strong>Do not</strong> input tokens containing sensitive data on shared or public devices
			</li>
			<li><strong>Do not</strong> misuse signature verification to forge tokens</li>
		</ul>

		<h2>5. No Warranty</h2>
		<p>The Tool is provided **without warranty of any kind**. We do not guarantee:</p>
		<ul>
			<li>Accuracy of parsing or visualization</li>
			<li>Correctness of signature verification results</li>
			<li>Availability or uptime (especially in offline mode)</li>
		</ul>
		<p>Use at your own risk. Test thoroughly before relying on outputs.</p>

		<h2>6. Limitation of Liability</h2>
		<p>In no event shall the developers be liable for any damages arising from:</p>
		<ul>
			<li>Use or inability to use the Tool</li>
			<li>Data loss or corruption</li>
			<li>Security breaches due to client-side execution</li>
		</ul>

		<h2>7. Third-Party Content</h2>
		<p>
			The Tool may include links to external resources (e.g., RFCs, GitHub). We are not responsible
			for their content or availability.
		</p>

		<h2>8. Governing Law</h2>
		<p>
			These terms are governed by the laws of the jurisdiction where the lead developer resides,
			without regard to conflict of law principles.
		</p>

		<h2>9. Contact & Reporting</h2>
		<p>
			Report issues, suggestions, or violations via our <a
				href="https://github.com/your-repo/jwt-viz/issues"
				target="_blank"
				rel="noopener">GitHub Issues</a
			>.
		</p>

		<p class="italic-note"><strong>Use responsibly. Debug securely. Share freely.</strong></p>
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
	.prose .italic-note {
		font-style: italic;
		color: var(--text-secondary);
		text-align: center;
		margin-top: 3rem;
	}
</style>
