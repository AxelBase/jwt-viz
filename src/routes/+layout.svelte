<script lang="ts">
	import { base } from '$app/paths';
	import { fly, fade } from 'svelte/transition';
	import '../app.css';

	// --- Buy Me a Coffee Dropdown (from File 1, integrated) ---
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

	// --- Footer ---
	const currentYear = new Date().getFullYear();
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="icon" href="{base}/AxelLab-Logo.ico" sizes="any" />
	<link rel="manifest" href="{base}/manifest.json" />
</svelte:head>

<header class="navbar">
	<div class="navbar-container">
		<div class="navbar-left">
			<a href="{base}/" class="navbar-logo-link" aria-label="AxelBase Home">
				<img src="{base}/AxelLab-Logo.ico" alt="AxelBase Logo" class="navbar-logo-img" />
			</a>
			<a href="{base}/" class="navbar-brand">AxelBase</a>

			<!-- Buy Me a Coffee Button & Dropdown (File 1 style) -->
			<div class="bmac-container" use:clickOutside on:click_outside={closeDropdown}>
				<button
					class="bmac-button-file1"
					on:click={toggleDropdown}
					aria-haspopup="true"
					aria-expanded={isDropdownOpen}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path
							d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z"
						/>
					</svg>
					<span class="d-none d-sm-inline">Buy me a Coffee</span>
				</button>

				{#if isDropdownOpen}
					<div class="bmac-dropdown-file1" transition:fly={{ y: -10, duration: 250 }}>
						<a
							href="https://buymeacoffee.com/axelbase"
							target="_blank"
							rel="noopener"
							on:click={closeDropdown}
						>
							<span class="amount">$3</span> One Coffee
						</a>
						<a
							href="https://buymeacoffee.com/axelbase"
							target="_blank"
							rel="noopener"
							on:click={closeDropdown}
						>
							<span class="amount">$5</span> Two Coffees
						</a>
						<a
							href="https://buymeacoffee.com/axelbase"
							target="_blank"
							rel="noopener"
							on:click={closeDropdown}
						>
							<span class="amount">$10</span> Three Coffees
						</a>

						<a
							href="https://buymeacoffee.com/axelbase"
							target="_blank"
							rel="noopener"
							on:click={closeDropdown}
							class="custom-amount"
						>
							Custom Amount
						</a>

						<a
							href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
							on:click={closeDropdown}
							class="custom-amount"
						>
							Buy via Crypto (Bitcoin)
						</a>
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

<style>
	/* Existing File 2 styles remain unchanged above this point */
	/* ... (all the styles you provided in "File 2 Styling") ... */

	/* === Buy Me a Coffee Styles from File 1 (preserved and adapted) === */
	.bmac-button-file1 {
		background: var(--accent-primary);
		color: var(--text-on-accent);
		font-size: 0.95rem;
		border: 0;
		border-radius: 9999px; /* pill shape */
		padding: 0.5rem 1.25rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		box-shadow: 0 2px 6px var(--shadow-color);
		transition: all 0.3s ease;
		font-weight: 600;
	}
	.bmac-button-file1:hover {
		background: var(--accent-primary-hover);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px var(--shadow-color-hover);
	}

	.bmac-dropdown-file1 {
		position: absolute;
		top: calc(100% + 10px);
		left: 50%;
		transform: translateX(-50%);
		width: 240px;
		background: var(--bg-secondary);
		border-radius: 16px;
		box-shadow: 0 12px 32px rgba(249, 115, 22, 0.15); /* orange-based shadow */
		overflow: hidden;
		border: 1px solid rgba(249, 115, 22, 0.1);
		z-index: 1001;
	}

	.bmac-dropdown-file1 a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 20px;
		color: var(--text-primary);
		text-decoration: none;
		font-size: 0.98rem;
		transition: all 0.2s ease;
	}

	.bmac-dropdown-file1 a:hover {
		background: var(--accent-primary-subtle);
		color: var(--accent-primary);
		padding-left: 28px;
	}

	.bmac-dropdown-file1 .amount {
		font-weight: 700;
		color: var(--accent-primary);
		font-size: 1.1rem;
	}

	.bmac-dropdown-file1 .custom-amount {
		font-weight: 600;
		color: var(--accent-primary);
		border-top: 1px solid var(--border-color);
		justify-content: center !important;
	}
</style>
