<script lang="ts">
	import { Settings } from '$lib/settings.svelte.js';
	import type { PageId } from '$lib/types';

	let { activePage, onNavigate }: { activePage: PageId; onNavigate: (pageId: PageId) => void } =
		$props();
</script>

{#snippet navItem(id: PageId, icon: string, label: string)}
	<button
		onclick={() => onNavigate(id)}
		class="mb-1 flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5"
		style={activePage === id
			? 'border-left: 2px solid var(--accent); background-color: rgba(59, 130, 246, 0.1); color: var(--accent);'
			: 'border-left: 2px solid transparent; color: var(--text-sec);'}
	>
		<i class="{icon} w-5 text-center"></i>
		<span>{label}</span>
	</button>
{/snippet}

<aside
	class="flex h-full w-64 flex-col border-r transition-colors duration-300"
	style="background-color: var(--bg-sidebar); border-color: var(--border-color);"
>
	<div class="border-b p-4" style="border-color: var(--border-color);">
		<div class="mb-2 text-xs font-bold tracking-wider uppercase" style="color: var(--text-sec);">
			Active Instance
		</div>
		<button
			class="group flex w-full items-center gap-3 rounded-sm border p-3 text-left transition-colors hover:border-gray-500"
			style="
				background-color: var(--bg-input);
				border-color: var(--border-color);
			"
		>
			<div
				class="flex h-10 w-10 items-center justify-center rounded-sm text-xl transition-colors"
				style="background-color: var(--bg-card); color: var(--text-sec);"
			>
				<i class="fa-solid fa-cube group-hover:text-white"></i>
			</div>
			<div class="overflow-hidden">
				<div class="truncate font-bold" style="color: var(--text-main);">Survival 1.21</div>
				<div class="truncate text-xs" style="color: var(--text-sec);">Fabric 0.15.7</div>
			</div>
			<i class="fa-solid fa-chevron-right ml-auto text-xs" style="color: var(--text-sec);"></i>
		</button>
	</div>

	<div class="flex-1 overflow-y-auto p-4">
		<div
			class="mt-2 mb-2 text-xs font-bold tracking-wider uppercase"
			style="color: var(--text-sec);"
		>
			Manage
		</div>
		{@render navItem('dashboard', 'fa-solid fa-gauge-high', 'Dashboard')}
		{@render navItem('mods', 'fa-solid fa-box-archive', 'Browse Mods')}
		{@render navItem('worlds', 'fa-solid fa-earth-americas', 'Worlds & Saves')}
		{@render navItem('screenshots', 'fa-solid fa-image', 'Screenshots')}
	</div>

	<div
		class="border-t p-4"
		style="background-color: var(--bg-sidebar); border-color: var(--border-color);"
	>
		<button
			class="mb-2 flex w-full items-center gap-3 px-3 py-2 text-sm transition-colors hover:text-white"
			style="color: var(--text-sec);"
		>
			<i class="fa-solid fa-terminal w-5 text-center"></i>
			<span>Open Console</span>
		</button>

		<div
			class="mt-2 flex items-center gap-2 border-t pt-2"
			style="border-color: var(--border-color);"
		>
			<button
				class="flex flex-1 items-center gap-2 rounded-sm p-2 text-left transition-colors hover:bg-gray-700/20"
			>
				<div
					class="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-xs text-green-500"
				>
					<i class="fa-solid fa-user"></i>
				</div>
				<span class="text-xs font-bold" style="color: var(--text-main);">BySnowden</span>
			</button>

			<button
				onclick={() => Settings.open()}
				aria-label="Open Settings"
				class="flex h-8 w-8 items-center justify-center rounded-sm transition-colors hover:bg-gray-700/20 hover:text-white"
				style="color: var(--text-sec);"
			>
				<i class="fa-solid fa-gear"></i>
			</button>
		</div>
	</div>
</aside>
