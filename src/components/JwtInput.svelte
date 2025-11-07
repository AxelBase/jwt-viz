<!-- src/components/JwtInput.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let jwtText = '';
	let isDragOver = false;
	const textareaId = 'jwt-input-textarea';

	function handleInput() {
		dispatch('input', jwtText.trim());
	}

	function handleFile(e: Event) {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;
		readFile(file);
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragOver = false;
		const file = e.dataTransfer?.files?.[0];
		if (!file) return;
		readFile(file);
	}

	function readFile(file: File) {
		const reader = new FileReader();
		reader.onload = (ev) => {
			jwtText = String(ev.target?.result ?? '').trim();
			handleInput();
		};
		reader.readAsText(file);
	}
</script>

<div
	class="jwt-input-wrapper card"
	class:drag-over={isDragOver}
	role="region"
	aria-label="JWT input area"
	on:drop={handleDrop}
	on:dragover|preventDefault={() => (isDragOver = true)}
	on:dragleave|preventDefault={() => (isDragOver = false)}
>
	<div class="drop-overlay">
		<svg
			class="drop-icon"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path
				d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"
			/>
		</svg>
		<span class="drop-text">Drop your JWT file here</span>
	</div>

	<div class="jwt-input-content">
		<label class="form-label" for={textareaId}>Paste or Drop JWT</label>

		<!-- Explicit closing tag + correct variable -->
		<textarea
			id={textareaId}
			bind:value={jwtText}
			on:input={handleInput}
			class="form-control"
			rows="5"
			placeholder="Paste JWT here..."
		></textarea>

		<div class="input-footer">
			<label class="file-upload-btn">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						d="M9.25 13.25a.75.75 0 001.5 0V4.77l1.97 1.97a.75.75 0 001.06-1.06l-3.25-3.25a.75.75 0 00-1.06 0L6.22 5.68a.75.75 0 001.06 1.06l1.97-1.97v8.48z"
					/>
					<path
						d="M3.5 12.75a.75.75 0 000 1.5h13a.75.75 0 000-1.5h-13zM10 15.25a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0V16a.75.75 0 01.75-.75z"
					/>
				</svg>
				Upload File
				<input
					type="file"
					accept=".txt,.jwt"
					on:change={handleFile}
					class="visually-hidden"
					aria-label="Upload JWT file"
				/>
			</label>
			<small class="helper-text">Auto-decodes after paste or upload.</small>
		</div>
	</div>
</div>

<style>
	/* ── Main Wrapper ── */
	.jwt-input-wrapper {
		position: relative;
		padding: 1.5rem;
		overflow: hidden;
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: 0.75rem;
		box-shadow: var(--shadow-color);
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	.jwt-input-content {
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
	}

	/* ── Label ── */
	.form-label {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
	}

	/* ── Textarea (Bootstrap) ── */
	.form-control {
		width: 100%;
		font-family: monospace;
		resize: vertical;
		min-height: 120px;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		border: 1px solid var(--border-color);
		border-radius: 0.5rem;
		padding: 0.75rem;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.form-control:focus {
		border-color: var(--accent-primary);
		box-shadow: 0 0 0 0.2rem var(--focus-ring);
		outline: none;
	}

	/* ── Drop Overlay ── */
	.drop-overlay {
		position: absolute;
		inset: 0;
		background-color: hsla(24, 94%, 50%, 0.1);
		border: 2px dashed var(--accent-primary);
		border-radius: 0.75rem;
		margin: 4px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		opacity: 0;
		visibility: hidden;
		transform: scale(0.95);
		pointer-events: none;
		transition:
			opacity 0.2s ease-out,
			visibility 0.2s ease-out,
			transform 0.2s ease-out;
	}

	.drop-icon {
		width: 48px;
		height: 48px;
		color: var(--accent-primary);
		opacity: 0.8;
	}

	.drop-text {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--accent-primary);
	}

	.jwt-input-wrapper.drag-over .drop-overlay {
		opacity: 1;
		visibility: visible;
		transform: scale(1);
	}

	.jwt-input-wrapper.drag-over .jwt-input-content {
		opacity: 0.2;
		transform: scale(0.98);
	}

	/* ── Footer & File Button ── */
	.input-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1rem;
	}

	.file-upload-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--text-primary);
		background-color: var(--bg-secondary);
		border: 1px solid var(--border-color);
		border-radius: 0.375rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.file-upload-btn svg {
		width: 16px;
		height: 16px;
	}

	.file-upload-btn:hover {
		border-color: var(--accent-primary);
		color: var(--accent-primary);
		box-shadow: var(--shadow-color);
		transform: translateY(-1px);
	}

	.helper-text {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.visually-hidden {
		position: absolute !important;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
		white-space: nowrap;
		opacity: 0;
	}
</style>
