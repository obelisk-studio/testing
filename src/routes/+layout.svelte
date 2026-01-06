<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { Settings } from '$lib/settings.svelte.js';

	let { children } = $props();

	// The Magic: Watch for theme changes and update CSS variables
	$effect(() => {
		const current =
			Settings.themes.find((t) => t.id === Settings.activeTheme) || Settings.themes[0];

		// Apply ALL colors to CSS variables
		const root = document.body.style;
		root.setProperty('--bg-main', current.bg);
		root.setProperty('--bg-sidebar', current.sidebar);
		root.setProperty('--bg-input', current.input);
		root.setProperty('--bg-card', current.card);
		root.setProperty('--border-color', current.border);
		root.setProperty('--accent', current.accent);
		root.setProperty('--text-main', current.text);
		root.setProperty('--text-sec', current.textSec);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<main
	class="min-h-screen text-white transition-colors duration-300"
	style="background-color: var(--bg-main)"
>
	{@render children()}
</main>
