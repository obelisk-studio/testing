<script lang="ts">
	import type { Mod } from '$lib/types';

	let { mod, viewMode, onClick }: { mod: Mod; viewMode: 'grid' | 'list'; onClick?: (mod: Mod) => void } =
		$props();
</script>

<div
	class="cursor-pointer rounded-sm border p-4 transition-colors hover:brightness-110 {viewMode === 'list'
		? 'flex items-center gap-4'
		: 'flex flex-col'}"
	style="
		background-color: var(--bg-card);
		border-color: var(--border-color);
	"
	onclick={() => onClick?.(mod)}
>
	<div class="mb-2 flex items-center justify-between {viewMode === 'list' ? 'mb-0' : ''}">
		{#if mod.status === 'compatible'}
			<i class="fa-solid fa-check-circle text-green-600 dark:text-green-500" title="Compatible"></i>
		{:else if mod.status === 'warning'}
			<i
				class="fa-solid fa-triangle-exclamation text-yellow-600 dark:text-yellow-500"
				title="Warning"
			></i>
		{:else}
			<i class="fa-solid fa-circle-xmark text-red-600 dark:text-red-500" title="Conflict"></i>
		{/if}
	</div>

	<div class="min-w-0 flex-1">
		<h3 class="truncate text-sm font-bold" style="color: var(--text-main);">
			{mod.name}
		</h3>

		<p class="mt-0.5 truncate font-mono text-xs" style="color: var(--text-sec);">
			{mod.jarName}
		</p>

		<div class="mt-2 flex gap-2">
			<span
				class="inline-block rounded-sm border px-1.5 py-0.5 text-xs font-medium"
				style="
					background-color: var(--bg-input);
					color: var(--text-sec);
					border-color: var(--border-color);
				"
			>
				{mod.loader}
			</span>

			<span
				class="inline-block rounded-sm border px-1.5 py-0.5 text-xs font-medium"
				style="
					background-color: var(--bg-input);
					color: var(--text-sec);
					border-color: var(--border-color);
				"
			>
				{mod.version}
			</span>
		</div>
	</div>

	<div class="flex gap-2 {viewMode === 'list' ? 'ml-auto w-48' : 'mt-4 w-full'}">
		<button
			class="flex-1 rounded-sm border border-green-200 bg-green-50 px-1.5 py-1.5 text-xs
			font-bold text-green-800 transition-colors
			hover:bg-green-100
			dark:border-[#2e4c32] dark:bg-[#1b2e1e] dark:text-[#81c784] dark:hover:bg-[#233b27]"
			onclick={(e) => e.stopPropagation()}
		>
			Modrinth
		</button>

		<button
			class="flex-1 rounded-sm border border-orange-200 bg-orange-50 px-1.5 py-1.5 text-xs
			font-bold text-orange-800 transition-colors
			hover:bg-orange-100
			dark:border-[#4c342e] dark:bg-[#2e201b] dark:text-[#ffb74d] dark:hover:bg-[#3d2a24]"
			onclick={(e) => e.stopPropagation()}
		>
			CurseForge
		</button>
	</div>
</div>
