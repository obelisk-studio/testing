<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Mod } from '$lib/types';

	let { mod, onClose }: { mod: Mod; onClose: () => void } = $props();

	let statusStyle = $derived.by(() => {
		if (mod.status === 'compatible') {
			return 'background-color: rgba(74, 222, 128, 0.1); border-color: rgb(74, 222, 128);';
		} else if (mod.status === 'warning') {
			return 'background-color: rgba(250, 204, 21, 0.1); border-color: rgb(250, 204, 21);';
		} else {
			return 'background-color: rgba(248, 113, 113, 0.1); border-color: rgb(248, 113, 113);';
		}
	});

	// Handle Escape key to close drawer
	$effect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				onClose();
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<!-- Backdrop -->
<div
	class="fixed inset-0 z-40"
	role="button"
	tabindex="-1"
	onclick={onClose}
	onkeydown={(e) => {
		if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
			onClose();
		}
	}}
	aria-label="Close drawer"
	transition:fly={{ opacity: 0, duration: 200 }}
></div>

<!-- Drawer -->
<div
	class="fixed top-0 right-0 z-50 flex h-full w-full max-w-[480px] flex-col border-l shadow-2xl transition-colors duration-300"
	style="
		background-color: var(--bg-sidebar);
		border-color: var(--border-color);
	"
	transition:fly={{ x: 480, duration: 250 }}
	onclick={(e) => e.stopPropagation()}
	onkeydown={(e) => e.stopPropagation()}
	role="dialog"
	aria-modal="true"
	aria-labelledby="drawer-title"
	tabindex="-1"
>
	<!-- Header -->
	<div
		class="flex items-center justify-between border-b px-6 py-4"
		style="border-color: var(--border-color);"
	>
		<h2 id="drawer-title" class="text-lg font-bold" style="color: var(--text-main);">
			Mod Details
		</h2>
		<button
			onclick={onClose}
			aria-label="Close drawer"
			class="flex h-8 w-8 items-center justify-center rounded-sm transition-colors hover:bg-white/10"
			style="color: var(--text-sec);"
		>
			<i class="fa-solid fa-xmark text-sm"></i>
		</button>
	</div>

	<!-- Content -->
	<div class="flex-1 overflow-y-auto p-6">
		<!-- Mod Name -->
		<h1 class="mb-2 text-2xl font-bold" style="color: var(--text-main);">{mod.name}</h1>

		<!-- JAR Filename -->
		<p class="mb-6 font-mono text-sm" style="color: var(--text-sec);">{mod.jarName}</p>

		<!-- Version and Loader Badges -->
		<div class="mb-6 flex gap-2">
			<span
				class="inline-block rounded-sm border px-2.5 py-1 text-xs font-medium"
				style="
						background-color: var(--bg-input);
						color: var(--text-sec);
						border-color: var(--border-color);
					"
			>
				{mod.loader}
			</span>
			<span
				class="inline-block rounded-sm border px-2.5 py-1 text-xs font-medium"
				style="
						background-color: var(--bg-input);
						color: var(--text-sec);
						border-color: var(--border-color);
					"
			>
				{mod.version}
			</span>
		</div>

		<!-- Status Alert -->
		<div class="mb-6 rounded-sm border p-4" style={statusStyle}>
			<div class="flex items-start gap-3">
				{#if mod.status === 'compatible'}
					<i class="fa-solid fa-check-circle text-2xl text-green-400"></i>
					<div class="flex-1">
						<h3 class="mb-1 text-sm font-bold text-green-400">Compatible</h3>
						<p class="text-sm" style="color: var(--text-sec);">
							This mod is compatible with your selected loader and version.
						</p>
					</div>
				{:else if mod.status === 'warning'}
					<i class="fa-solid fa-triangle-exclamation text-2xl text-yellow-400"></i>
					<div class="flex-1">
						<h3 class="mb-1 text-sm font-bold text-yellow-400">Warning</h3>
						<p class="text-sm" style="color: var(--text-sec);">
							This mod may have compatibility issues or requires attention.
						</p>
					</div>
				{:else}
					<i class="fa-solid fa-circle-xmark text-2xl text-red-400"></i>
					<div class="flex-1">
						<h3 class="mb-1 text-sm font-bold text-red-400">Conflict</h3>
						<p class="text-sm" style="color: var(--text-sec);">
							This mod is not compatible with your selected loader. You may need to find a
							compatible version or switch loaders.
						</p>
					</div>
				{/if}
			</div>
		</div>

		<!-- Find Compatible Version Button (only for conflicts) -->
		{#if mod.status === 'conflict'}
			<button
				class="w-full rounded-sm px-4 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:brightness-110"
				style="background-color: var(--accent);"
			>
				<i class="fa-solid fa-search mr-2"></i>
				Find Compatible Version
			</button>
		{/if}
	</div>
</div>
