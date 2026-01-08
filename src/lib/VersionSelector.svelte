<script lang="ts">
	import { slide } from 'svelte/transition'; // Animation for smooth opening
	// If you don't have a clickOutside action, I provided a simple alternative below.

	let { value = $bindable() } = $props();
	let isOpen = $state(false);

	const minecraftVersions = [
		'1.21.11',
		'1.21.10',
		'1.21.9',
		'1.21.8',
		'1.21.7',
		'1.21.6',
		'1.21.5',
		'1.21.4',
		'1.21.3',
		'1.21.2',
		'1.21.1',
		'1.21',
		'1.20.6',
		'1.20.5',
		'1.20.4',
		'1.20.3',
		'1.20.2',
		'1.20.1',
		'1.19.4',
		'1.19.3',
		'1.19.2',
		'1.19.1',
		'1.19',
		'1.18.2',
		'1.18.1',
		'1.18',
		'1.17.1',
		'1.17',
		'1.16.5',
		'1.16.4',
		'1.16.3',
		'1.16.2',
		'1.16.1',
		'1.16'
	];

	function toggle() {
		isOpen = !isOpen;
	}

	function select(version: string) {
		value = version;
		isOpen = false;
	}

	// Simple click outside handler (if you don't want a utility file)
	function handleBackdropClick() {
		isOpen = false;
	}
</script>

<div class="relative w-32 font-sans text-sm">
	<button
		onclick={toggle}
		class="flex h-8 w-full items-center justify-between rounded-sm border px-3 transition-colors hover:brightness-110"
		style="
            background-color: var(--bg-input);
            border-color: var(--border-color);
            color: var(--text-main);
        "
	>
		<span class="truncate">{value}</span>
		<i
			class="fa-solid fa-chevron-down text-[10px] transition-transform duration-200 {isOpen
				? 'rotate-180'
				: ''}"
			style="color: var(--text-sec);"
		></i>
	</button>

	{#if isOpen}
		<div class="fixed inset-0 z-40" onclick={handleBackdropClick}></div>
	{/if}

	{#if isOpen}
		<div
			transition:slide={{ duration: 200, axis: 'y' }}
			class="absolute top-full left-0 z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-sm border shadow-xl"
			style="
                background-color: var(--bg-card); /* Dark background */
                border-color: var(--border-color);
            "
		>
			{#each minecraftVersions as version}
				<button
					onclick={() => select(version)}
					class="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/5"
					style="
                        color: {value === version ? 'var(--accent)' : 'var(--text-main)'};
                        background-color: {value === version
						? 'rgba(255,255,255,0.05)'
						: 'transparent'};
                    "
				>
					{version}
				</button>
			{/each}
		</div>
	{/if}
</div>
