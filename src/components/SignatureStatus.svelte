<script>
	import { checkSignature } from '$lib/signatureChecker';
	export let token = '';
	let key = '';
	let status = '';
	let statusMessage = '';

	async function verify() {
		statusMessage = 'Verifying...';
		status = 'Verifying...'; // Set status for badge class
		const res = await checkSignature(token, key);
		status = res.status;
		statusMessage = res.message || res.status;
	}

	// Reactive block to set initial status
	$: if (token && !key) {
		(async () => {
			const res = await checkSignature(token);
			status = res.status;
			statusMessage = res.message || res.status;
		})();
	}

	// Reactive constant to map status to a badge class
	$: badgeClass = ((s) => {
		switch (s) {
			case 'Verified':
				return 'badge-success';
			case 'Invalid':
				return 'badge-danger';
			case 'Unsigned':
				return 'badge-warning';
			case 'Verifying...':
				return 'badge-info';
			default:
				return 'badge-secondary';
		}
	})(status);
</script>

<div class="card p-3 sig-status-card">
	<h6 class="mb-2">Signature Status</h6>
	<div class="input-group mb-2">
		<span class="input-group-text">Key</span>
		<input
			type="text"
			placeholder="Optional secret or public key..."
			bind:value={key}
			class="form-control"
			aria-label="Signature key"
		/>
		<button class="btn" on:click={verify}> Verify </button>
	</div>
	<div>
		<span class="status-badge {badgeClass}">{statusMessage}</span>
	</div>
</div>

<style>
	.sig-status-card {
		margin-top: 1.5rem;
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: 0.75rem;
		box-shadow: var(--shadow-color);
	}
	.p-3 {
		padding: 1.25rem;
	}
	.mb-2 {
		margin-bottom: 0.75rem;
	}
	h6 {
		margin-top: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.input-group {
		display: flex;
	}
	.input-group-text {
		background-color: var(--bg-primary);
		border: 1px solid var(--border-color);
		border-right: 0;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem 0 0 0.5rem;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}
	.input-group .form-control {
		border-radius: 0;
		font-size: 0.9rem;
		font-family: monospace;
		border: 1px solid var(--border-color);
		background-color: var(--bg-secondary);
		color: var(--text-primary);
	}
	.input-group .form-control:focus {
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 0.2rem var(--focus-ring);
		outline: none;
		position: relative; /* Fix z-index issue */
		z-index: 2;
	}
	.input-group .btn {
		border-radius: 0 0.5rem 0.5rem 0;
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		border: 1px solid var(--border-color);
		font-weight: 500;
		font-size: 0.9rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease;
		z-index: 1;
	}
	.input-group .btn:hover {
		background-color: var(--bg-primary);
		color: var(--accent-primary);
		border-color: var(--accent-primary);
	}
	.input-group .btn:focus {
		position: relative;
		z-index: 3;
	}

	.status-badge {
		display: inline-block;
		padding: 0.4em 0.8em;
		font-size: 0.9rem;
		font-weight: 600;
		line-height: 1;
		color: var(--text-on-accent);
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: 0.375rem;
		margin-top: 0.75rem;
	}
	.badge-secondary {
		background-color: #6c757d;
		color: #fff;
	}
	.badge-success {
		background-color: #198754;
		color: #fff;
	}
	.badge-danger {
		background-color: #dc3545;
		color: #fff;
	}
	.badge-warning {
		background-color: #ffc107;
		color: #000;
	}
	.badge-info {
		background-color: #0dcaf0;
		color: #000;
	}
</style>
