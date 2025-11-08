<script lang="ts">
	import { base } from '$app/paths';
	import { fly, fade } from 'svelte/transition';
	import '../app.css';

	// --- Buy Me a Coffee Dropdown ---
	const paypalUsername = 'AxelLab427';
	const donationAmounts = [1, 3, 5, 10];
	let isDropdownOpen = false;

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function closeDropdown() {
		isDropdownOpen = false;
	}

	function clickOutside(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (node && !node.contains(event.target as Node)) {
				node.dispatchEvent(new CustomEvent('click_outside'));
			}
		};
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}

	// --- Structured Data (JSON-LD) ---
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
		screenshot: `https://axelbase.github.io${base}/screenshot.png`,
		featureList: [
			'Client-side JWT decoding',
			'Interactive tree view',
			'HS256/RS256 signature verification',
			'PWA installable',
			'Zero data transmission'
		]
	};

	// --- Footer ---
	const currentYear = new Date().getFullYear();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>JWT Viz — JSON Web Token Visualizer</title>
	<meta
		name="description"
		content="Inspect and verify JWTs locally — privacy-first, client-side JWT visualization and signature checking."
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

	<!-- Inject JSON-LD safely using {@html} + escaped string -->
	{@html `<script type="application/ld+json">${JSON.stringify(siteJsonLd, null, 2)}<\/script>`}
</svelte:head>

<header class="navbar">
	<div class="navbar-container">
		<div class="navbar-left">
			<a href="{base}/" class="navbar-logo-link" aria-label="AxelBase Home">
				<img src="{base}/AxelLab-Logo.ico" alt="AxelBase Logo" class="navbar-logo-img" />
			</a>
			<a href="{base}/" class="navbar-brand">AxelBase</a>

			<div class="bmac-container" use:clickOutside on:click_outside={closeDropdown}>
				<button
					class="bmac-button"
					on:click={toggleDropdown}
					aria-haspopup="true"
					aria-expanded={isDropdownOpen}
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z"
						/>
					</svg>
					<span>Buy me a coffee</span>
				</button>

				{#if isDropdownOpen}
					<div class="bmac-dropdown" transition:fly={{ y: -10, duration: 250 }}>
						{#each donationAmounts as amount}
							<a
								href="https://paypal.me/{paypalUsername}/{amount}"
								target="_blank"
								rel="noopener noreferrer"
								on:click={closeDropdown}
							>
								${amount}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<nav class="navbar-right">
			<ul class="navbar-links">
				<li><a class="nav-link" href="{base}/">Home</a></li>
				<li><a class="nav-link" href="{base}/#about">About</a></li>
				<li><a class="nav-link" href="{base}/#how-to-use">How to use</a></li>
				<li><a class="nav-link" href="{base}/#faq">FAQ</a></li>
				<li><a class="nav-link" href="{base}/blog">Blog</a></li>
			</ul>
		</nav>
	</div>
</header>

<main class="main-content" in:fade={{ duration: 300, delay: 150 }}>
	<slot />
</main>

<footer class="footer">
	<div class="footer-content">
		<span>© {currentYear} AxelBase JWT Claims Tree View Visualizer</span>
		<div class="footer-links">
			<a href="{base}/privacy">Privacy Policy</a>
			<a href="{base}/terms">Terms and Conditions</a>
		</div>
	</div>
</footer>
