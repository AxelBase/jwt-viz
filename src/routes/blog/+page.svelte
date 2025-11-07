<script lang="ts">
	import { base } from '$app/paths';

	const posts = [
		{
			href: '/blog/posts/post1',
			title: 'JWT Basics: Understanding the Anatomy',
			description: 'Break down the structure of a JSON Web Token and what each part means.'
		},
		{
			href: '/blog/posts/post2',
			title: 'Why Use JWT for Authentication?',
			description: 'Explore the advantages of JWT over traditional session-based auth.'
		},
		{
			href: '/blog/posts/post3',
			title: 'Common JWT Security Pitfalls',
			description: 'Learn about alg:none attacks, weak keys, and token leakage.'
		},
		{
			href: '/blog/posts/post4',
			title: 'Visualizing Claims: A Developer’s Best Friend',
			description: 'How tree views make complex nested claims readable at a glance.'
		},
		{
			href: '/blog/posts/post5',
			title: 'Offline JWT Debugging with PWA',
			description: 'Use JWT Viz anywhere — no internet, no installation.'
		},
		{
			href: '/blog/posts/post6',
			title: 'Verifying Signatures Without a Backend',
			description: 'Client-side RS256/HS256 validation using Web Crypto API.'
		},
		{
			href: '/blog/posts/post7',
			title: 'Exporting & Sharing JWT Insights',
			description: 'Copy, export JSON, or screenshot your decoded token for reports.'
		}
	];
</script>

<svelte:head>
	<title>Blog | JWT Viz Insights</title>
	<meta
		name="description"
		content="Tutorials, security tips, and deep dives into JWT visualization and debugging."
	/>
</svelte:head>

<div class="container fade-in blog-index">
	<header class="blog-header">
		<h1>Blog: JWT Viz Insights</h1>
		<p class="subtitle">
			Master JWT debugging with practical guides, security best practices, and advanced
			visualization techniques. All powered by our open-source <a
				href="https://github.com/your-repo/jwt-viz"
				target="_blank"
				rel="noopener noreferrer">GitHub project</a
			>.
		</p>
	</header>

	<div class="posts-grid">
		{#each posts as post, i}
			<a href="{base}{post.href}" class="card post-card" style="--delay-index: {i};">
				<div class="card-body">
					<h2 class="post-title">{post.title}</h2>
					<p class="post-description">{post.description}</p>
					<span class="read-more">Read Article</span>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	/* --- Animations --- */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.fade-in {
		animation: fadeIn 0.6s ease-out forwards;
	}

	/* --- Page Layout --- */
	.blog-index {
		padding-top: 2rem;
		padding-bottom: 4rem;
	}

	.blog-header {
		text-align: center;
		margin-bottom: 3.5rem;
		padding-bottom: 2.5rem;
		border-bottom: 1px solid var(--border-color);
	}

	.blog-header h1 {
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: var(--accent-secondary); /* Use accent for main title */
	}

	.subtitle {
		font-size: 1.15rem;
		color: var(--text-secondary);
		max-width: 700px;
		margin: 0 auto;
		line-height: 1.7;
	}

	.subtitle a {
		color: var(--accent-primary);
		text-decoration: none;
		font-weight: 500;
	}
	.subtitle a:hover {
		text-decoration: underline;
	}

	/* --- Post Grid --- */
	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
	}

	.post-card {
		/* Use variables from the card itself for staggered animation */
		--animation-delay: calc(var(--delay-index) * 50ms + 200ms);

		text-decoration: none;
		display: flex;
		flex-direction: column;
		border-color: var(--border-color);
		box-shadow: var(--shadow-color);

		/* Staggered fade-in for each card */
		opacity: 0;
		transform: translateY(20px);
		animation: fadeIn 0.5s ease-out forwards;
		animation-delay: var(--animation-delay);

		/* Smooth transitions for hover effects */
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			border-color 0.3s ease;
	}

	.post-card:hover {
		transform: translateY(-8px);
		border-color: var(--accent-primary);
		box-shadow: 0 12px 24px var(--shadow-color-hover);
	}

	.post-card .card-body {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.post-title {
		font-size: 1.3rem;
		color: var(--text-primary);
		margin-bottom: 0.75rem;
		font-weight: 600;
		transition: color 0.2s ease;
	}

	.post-card:hover .post-title {
		color: var(--accent-primary);
	}

	.post-description {
		color: var(--text-secondary);
		flex-grow: 1; /* Pushes the "Read More" link to the bottom */
		margin-bottom: 1.5rem;
		font-size: 0.95rem;
		line-height: 1.6;
	}

	.read-more {
		color: var(--accent-primary);
		font-weight: 600;
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		transition: color 0.2s ease;
	}

	/* Fancy arrow animation */
	.read-more::after {
		content: '→';
		display: inline-block;
		margin-left: 0.25rem;
		opacity: 0;
		transform: translateX(-5px);
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}

	.post-card:hover .read-more::after {
		opacity: 1;
		transform: translateX(0);
	}
</style>
