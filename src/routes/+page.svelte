<script lang="ts">
	import { base } from '$app/paths';
	import JwtInput from '../components/JwtInput.svelte';
	import TreeView from '../components/TreeView.svelte';
	import TabsView from '../components/TabsView.svelte';
	import ExportButtons from '../components/ExportButtons.svelte';
	import SignatureStatus from '../components/SignatureStatus.svelte';
	import { parseJWT } from '$lib/jwtParser';

	let token = '';
	let decoded = { header: {}, payload: {}, signature: null, errors: [] };
	let activeTab = 'tree';
	let treeContainer;

	function handleInput(e: CustomEvent<string>) {
		token = e.detail;
		decoded = parseJWT(token);
	}

	// --- Structured Data: WebApplication (Rich Results) ---
	const siteJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'JWT Viz',
		description: 'Privacy-first, client-side JWT visualizer and debugger.',
		url: 'https://axelbase.github.io/jwt-viz/',
		applicationCategory: 'DeveloperApplication',
		operatingSystem: 'Web Browser',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		},
		creator: {
			'@type': 'Organization',
			name: 'AxelBase',
			url: 'https://axelbase.github.io'
		},
		screenshot: 'https://axelbase.github.io/jwt-viz/screenshot.png',
		featureList: [
			'Client-side JWT decoding',
			'Interactive tree view',
			'HS256/RS256 signature verification',
			'PWA installable',
			'Zero data transmission'
		]
	};
</script>

<svelte:head>
	<title>JWT Viz — JSON Web Token Visualizer</title>
	<meta
		name="description"
		content="Inspect and verify JWTs locally — privacy-first JWT visualization and signature checking."
	/>
	<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="JWT Viz · Inspect and verify JWTs locally" />
	<meta
		property="og:description"
		content="Privacy-first JWT viewer: decode header/payload, view tree, check signatures client-side."
	/>
	<link rel="icon" href="{base}/AxelLab-Logo.ico" sizes="any" />
	<link rel="manifest" href="{base}/manifest.json" />

	<!-- Valid JSON-LD injected safely -->
	<script type="application/ld+json">
    {JSON.stringify(siteJsonLd)}
	</script>
</svelte:head>

<div>
	<h4 class="mb-3 text-center">JWT Viz — JSON Web Token Visualizer</h4>

	<JwtInput on:input={handleInput} />

	{#if decoded.header && Object.keys(decoded.header).length > 0}
		<TabsView header={decoded.header} payload={decoded.payload} encoded={token} bind:activeTab>
			<div slot="tree">
				<div bind:this={treeContainer}>
					<TreeView title="Header" data={decoded.header} />
					<TreeView title="Payload" data={decoded.payload} />
				</div>
				<ExportButtons header={decoded.header} payload={decoded.payload} {treeContainer} />
			</div>
		</TabsView>

		<SignatureStatus {token} />
	{:else if decoded.errors.length > 0}
		<div class="alert alert-danger mt-3">
			{#each decoded.errors as err}
				<div>{err}</div>
			{/each}
		</div>
	{/if}
</div>

<div class="container mt-5">
	<section id="about" class="page-section mb-5">
		<h2>About JWT Viz</h2>
		<p>
			<strong>JWT Viz</strong> is a
			<strong>privacy-first, client-side JSON Web Token visualizer</strong>
			built for developers, security engineers, and DevOps teams who need to inspect, debug, and validate
			JWTs without compromising sensitive data. Unlike online JWT tools that send tokens to remote servers,
			JWT Viz runs <strong>100% in your browser</strong>, ensuring
			<strong>zero data transmission</strong>, <strong>no logging</strong>, and
			<strong>complete isolation</strong> of your tokens.
		</p>
		<br />
		<p>
			Designed with modern web standards and performance in mind, JWT Viz leverages <strong
				>SvelteKit</strong
			>
			and the <strong>Web Crypto API</strong> to deliver a fast, responsive, and offline-capable
			experience. Whether you're analyzing authentication flows, auditing third-party tokens, or
			teaching JWT concepts, this tool transforms complex, nested claims into an
			<strong>interactive, searchable tree structure</strong>—making debugging intuitive and
			efficient.
		</p>
		<br />
		<p>
			The core philosophy behind JWT Viz is <strong>transparency and control</strong>. Every
			operation—from Base64 decoding to signature verification—happens locally using
			standards-compliant JavaScript. You can paste tokens from logs, upload them via drag-and-drop,
			or even install the app as a <strong>Progressive Web App (PWA)</strong> for instant access on desktop
			or mobile, even without an internet connection.
		</p>
		<br />
		<p>Key features include:</p>
		<ul>
			<li>
				<strong>Dual-panel tree view</strong> of header and payload with expand/collapse and search
			</li>
			<li><strong>Real-time syntax-highlighted JSON</strong> and encoded segment display</li>
			<li>
				<strong>Client-side signature verification</strong> for HS256 and RS256 using public keys or
				secrets
			</li>
			<li>
				<strong>Export options</strong>: Copy JSON, download decoded object, or capture PNG
				screenshots
			</li>
			<li>
				<strong>Standard claim highlighting</strong> (e.g., <code>exp</code>, <code>iss</code>) with
				expiration warnings
			</li>
		</ul>
		<p>
			Built as a <strong>static site</strong>, JWT Viz generates a single <code>index.html</code> with
			bundled assets—making it ideal for internal tools, documentation, or secure environments. Host
			it on any static file server, share via USB, or embed in Confluence. No backend, no database, no
			risk.
		</p>
		<p>
			JWT Viz is <strong>open source</strong> under the MIT License and actively maintained on
			GitHub. Contributions are welcome—from bug reports to new visualization ideas. Our goal is to
			make JWT inspection <strong>accessible, secure, and educational</strong> for everyone in the web
			security ecosystem.
		</p>
		<p class="italic-note">
			<em>Because understanding a token shouldn’t require trusting a third party.</em>
		</p>
	</section>

	<section id="how-to-use" class="page-section mb-5">
		<h2>How to Use JWT Viz</h2>
		<p>
			Getting started with JWT Viz is simple and requires <strong>no installation</strong>. Follow
			these steps to inspect and verify any JWT in seconds:
		</p>

		<h4>1. Input Your Token</h4>
		<p>
			<strong>Paste</strong> a JWT into the large text area at the top, or
			<strong>drag and drop</strong>
			a <code>.txt</code> or <code>.jwt</code> file directly onto the input box. The tool instantly parses
			the token and displays any errors (e.g., malformed format, invalid Base64).
		</p>

		<h4>2. Explore the Tree View</h4>
		<p>
			Once decoded, the <strong>header</strong> and <strong>payload</strong> appear side-by-side in
			interactive tree panels. Click any node to expand or collapse nested objects. Use the
			<strong>search bar</strong>
			to filter claims by key or value—perfect for finding <code>role</code>, <code>scope</code>, or
			custom fields in large tokens.
		</p>
		<p>
			Standard claims like <code>iss</code>, <code>sub</code>, <code>exp</code>, and
			<code>iat</code>
			are <strong>highlighted in bold blue</strong>. Expiration (<code>exp</code>) and not-before (<code
				>nbf</code
			>) timestamps are <strong>color-coded</strong>: green if valid, red if expired.
		</p>

		<h4>3. Switch Between Tabs</h4>
		<p>Use the tab navigation to switch views:</p>
		<ul>
			<li><strong>Tree</strong>: Interactive claim hierarchy (default)</li>
			<li><strong>Raw JSON</strong>: Syntax-highlighted, formatted header and payload</li>
			<li><strong>Encoded</strong>: Base64Url segments with copyable text</li>
		</ul>

		<h4>4. Verify the Signature (Optional)</h4>
		<p>
			Scroll to the <strong>Signature Status</strong> card. Paste a <strong>secret</strong> (for
			HS256) or <strong>public key in PEM/SPKI format</strong> (for RS256). The tool uses the Web
			Crypto API to verify the signature <strong>in-browser</strong>. Results show:
		</p>
		<ul>
			<li><span class="badge bg-success">Verified</span> — Signature matches</li>
			<li><span class="badge bg-danger">Invalid</span> — Tampered or wrong key</li>
			<li><span class="badge bg-warning">Unsigned</span> — <code>alg: none</code></li>
		</ul>

		<h4>5. Export Your Findings</h4>
		<p>Use the export buttons to:</p>
		<ul>
			<li><strong>Copy</strong> header, payload, or full decoded JSON</li>
			<li><strong>Download</strong> <code>jwt-decoded.json</code></li>
			<li><strong>Capture</strong> a high-resolution PNG of the current view</li>
		</ul>

		<h4>6. Go Offline (PWA)</h4>
		<p>
			Click the <strong>install icon</strong> in your browser’s address bar to add JWT Viz to your home
			screen. It works fully offline—ideal for secure environments or travel.
		</p>
		<p class="italic-note">
			<em>Pro tip: Use “Expand All” in tree view to audit every claim at once.</em>
		</p>
	</section>

	<section id="faq" class="page-section">
		<h2>Frequently Asked Questions</h2>
		<div class="faq-accordion">
			<details>
				<summary>Is my JWT data sent to a server?</summary>
				<div class="faq-content">
					<p>
						<strong>No.</strong> JWT Viz is <strong>100% client-side</strong>. All parsing,
						decoding, visualization, and signature verification happen in your browser using
						JavaScript and Web Crypto. No data is transmitted, logged, or stored. You can verify
						this by checking network requests or running it offline.
					</p>
				</div>
			</details>

			<details>
				<summary>Can I use JWT Viz in air-gapped environments?</summary>
				<div class="faq-content">
					<p>
						Yes. After the first load, the PWA caches all assets. You can copy the <code
							>build/</code
						>
						folder to a USB drive and run <code>index.html</code> on any modern browser—no internet required.
					</p>
				</div>
			</details>

			<details>
				<summary>What does “Signature Verified” really mean?</summary>
				<div class="faq-content">
					<p>
						It means the cryptographic signature matches the header and payload using the provided
						key. However, it does <strong>not</strong> prove <strong>who</strong> issued the
						token—only that it hasn’t been tampered with since signing. Always validate
						<code>iss</code>
						and <code>aud</code> claims in production.
					</p>
				</div>
			</details>

			<details>
				<summary>Which algorithms are supported for verification?</summary>
				<div class="faq-content">
					<p>
						<strong>HS256</strong> (HMAC-SHA256) and <strong>RS256</strong> (RSA-SHA256). These cover
						~95% of real-world use cases. ES256 and others are not yet supported due to Web Crypto limitations.
					</p>
				</div>
			</details>

			<details>
				<summary>Why can’t I paste a private key?</summary>
				<div class="faq-content">
					<p>
						For security, only <strong>public keys</strong> (RS256) or
						<strong>shared secrets</strong>
						(HS256) should be used in the browser. Private keys should <strong>never</strong> leave secure
						environments. JWT Viz enforces this pattern.
					</p>
				</div>
			</details>

			<details>
				<summary>Is JWT Viz safe for production tokens?</summary>
				<div class="faq-content">
					<p>
						Yes for <strong>inspection and debugging</strong>. Never use client-side verification
						for access control in production—always validate on the server. Use JWT Viz to audit
						logs, test implementations, or educate teams.
					</p>
				</div>
			</details>

			<details>
				<summary>Can I embed JWT Viz in my documentation?</summary>
				<div class="faq-content">
					<p>
						Absolutely. Host the static build on your internal wiki, Confluence, or Notion. It’s
						lightweight (&lt;250KB) and requires no backend.
					</p>
				</div>
			</details>

			<details>
				<summary>How do I report a bug or suggest a feature?</summary>
				<div class="faq-content">
					<p>
						Open an issue on our <a
							href="https://github.com/axelbase/jwt-viz"
							target="_blank"
							rel="noopener">GitHub repository</a
						>. Pull requests are welcome!
					</p>
				</div>
			</details>
		</div>
		<p class="italic-note"><em>Still have questions? The source code is your documentation.</em></p>
	</section>
</div>
