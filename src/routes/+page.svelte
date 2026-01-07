<script lang="ts">
	import ModCard from '$lib/ModCard.svelte';
	import ModDrawer from '$lib/ModDrawer.svelte';
	import Sidebar from '$lib/Sidebar.svelte';
	import VersionSelector from '$lib/VersionSelector.svelte';
	import SettingsModal from '$lib/SettingsModal.svelte';

	import logo from '$lib/assets/icon-transparent.png';
	import type { Mod } from '$lib/types';

	let folderPath = $state('');
	let selectedLoader = $state('Fabric');
	let selectedVersion = $state('1.21.11');
	let isScanning = $state(false);
	let viewMode = $state<'grid' | 'list'>('grid');
	let searchQuery = $state('');
	let activeFilter = $state('all');
	let selectedMod = $state<Mod | null>(null);

	let hasFolder = $derived(folderPath.length > 0);

	let allMods = $state([
		{ name: 'Sodium', jarName: 'sodium-mc1.21-0.5.11.jar', version: '0.5.11', loader: 'Fabric' },
		{ name: 'Iris Shaders', jarName: 'iris-mc1.21-1.7.0.jar', version: '1.7.0', loader: 'Fabric' },
		{
			name: 'Just Enough Items',
			jarName: 'jei-1.21-neoforge.jar',
			version: '15.3.0.4',
			loader: 'NeoForge'
		},
		{
			name: 'Architectury API',
			jarName: 'architectury-9.2.14.jar',
			version: '9.2.14',
			loader: 'Fabric'
		},
		{ name: 'Lithium', jarName: 'lithium-fabric-mc1.21.jar', version: '0.12.7', loader: 'Fabric' },
		{ name: 'Jade', jarName: 'jade-1.21-fabric.jar', version: '11.11.1', loader: 'Quilt' }
	]);

	let processedMods = $derived(
		allMods.map((mod): Mod => {
			let status: Mod['status'] = 'compatible';
			if (mod.loader !== selectedLoader) status = 'conflict';
			if (mod.name === 'Jade') status = 'warning';
			return { ...mod, status };
		})
	);

	let filteredMods = $derived(
		processedMods
			.filter((mod) => mod.name.toLowerCase().includes(searchQuery.toLowerCase()))
			.filter((mod) => {
				if (activeFilter === 'all') return true;
				return mod.status === activeFilter;
			})
	);

	let stats = $derived({
		total: processedMods.length,
		compatible: processedMods.filter((m) => m.status === 'compatible').length,
		conflicts: processedMods.filter((m) => m.status === 'conflict').length,
		warnings: processedMods.filter((m) => m.status === 'warning').length
	});

	function handleBrowse() {
		folderPath = 'C:\\Dev\\TestMods';
	}

	function handleValidate() {
		isScanning = true;
	}

	function handleModClick(mod: Mod) {
		selectedMod = mod;
	}

	function handleCloseDrawer() {
		selectedMod = null;
	}
</script>

{#snippet loaderButton(name: string)}
	<button
		onclick={() => (selectedLoader = name)}
		class="flex h-full w-24 items-center justify-center border-r text-sm transition-colors first:rounded-l-sm last:rounded-r-sm last:border-r-0"
		style="
			border-color: var(--border-color);
			background-color: {selectedLoader === name ? 'var(--accent)' : 'var(--bg-input)'};
			color: {selectedLoader === name ? '#ffffff' : 'var(--text-sec)'};
		"
	>
		{name}
	</button>
{/snippet}

<div
	class="flex w-full items-center gap-4 border-b px-4 py-3 transition-colors duration-300"
	style="background-color: var(--bg-sidebar); border-color: var(--border-color);"
>
	<div class="mr-2 flex items-center gap-3">
		<div
			class="h-8 w-8"
			style="
				background-color: var(--text-main);
				mask-image: url({logo});
				mask-size: contain;
				mask-repeat: no-repeat;
				mask-position: center;
				-webkit-mask-image: url({logo});
				-webkit-mask-size: contain;
				-webkit-mask-repeat: no-repeat;
				-webkit-mask-position: center;
			"
		></div>

		<div class="flex items-baseline gap-2">
			<h1 class="text-lg font-bold tracking-tight" style="color: var(--text-main);">OBELISK</h1>
			<span class="text-xs font-medium tracking-wide uppercase" style="color: var(--text-sec);"
				>STUDIO</span
			>
		</div>
	</div>

	<VersionSelector bind:value={selectedVersion} />

	<div class="ml-2 flex items-center gap-2">
		<span class="text-sm font-medium whitespace-nowrap" style="color: var(--text-sec);">Loader</span
		>
		<div
			class="flex h-9 overflow-hidden rounded-sm border"
			style="border-color: var(--border-color);"
		>
			{@render loaderButton('Fabric')}
			{@render loaderButton('NeoForge')}
			{@render loaderButton('Quilt')}
			{@render loaderButton('Forge')}
		</div>
	</div>

	<div class="ml-2 flex flex-1 items-center gap-2">
		<span class="text-sm font-medium whitespace-nowrap" style="color: var(--text-sec);">Folder</span
		>
		<div class="relative flex flex-1">
			<input
				type="text"
				placeholder="Select mod folder..."
				bind:value={folderPath}
				class="h-9 w-full rounded-l-sm border px-3 text-sm transition-colors focus:border-blue-500 focus:outline-none"
				style="
					background-color: var(--bg-input);
					border-color: var(--border-color);
					color: var(--text-main);"
			/>
			<button
				onclick={handleBrowse}
				aria-label="Browse Folder"
				class="flex h-9 items-center rounded-r-sm border-y border-r px-3 transition-colors hover:brightness-110"
				style="
					background-color: var(--bg-input);
					border-color: var(--border-color);
					color: var(--text-sec);"
			>
				<i class="fa-regular fa-folder-open text-xs"></i>
			</button>
		</div>
	</div>

	<button
		onclick={handleValidate}
		class="flex h-9 items-center gap-2 rounded-sm px-6 text-sm font-medium text-white shadow-lg transition-colors hover:brightness-110"
		style="background-color: var(--accent); shadow-color: var(--accent);"
	>
		<i class="fa-solid fa-bars-progress"></i>
		Validate Mods
	</button>
</div>

<div class="flex h-[calc(100vh-64px)] overflow-hidden">
	<Sidebar />

	<div
		class="relative flex flex-1 flex-col overflow-hidden p-6 transition-colors duration-300"
		style="background-color: var(--bg-main);"
	>
		{#if !hasFolder}
			<div class="animate-fade-in m-auto flex flex-col items-center">
				<div
					class="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border shadow-xl"
					style="
						background-color: var(--bg-card);
						border-color: var(--border-color);
						color: var(--text-sec);
					"
				>
					<span class="text-4xl"><i class="fa-solid fa-box-open"></i></span>
				</div>
				<h2 class="mb-2 text-2xl font-bold" style="color: var(--text-main);">
					No Mod Folder Selected
				</h2>
				<p class="max-w-md text-center" style="color: var(--text-sec);">
					Select your Minecraft mods folder above to get started. Obelisk will scan for conflicts
					and suggest fixes instantly.
				</p>
			</div>
		{:else if !isScanning}
			<div class="animate-fade-in m-auto flex flex-col items-center">
				<div class="mb-4 text-center font-mono text-green-400">
					<div class="text-xl">Ready To Scan</div>
					<div class="mt-1 text-sm text-gray-500">{folderPath}</div>
				</div>
				<button
					onclick={handleValidate}
					class="rounded-sm px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105"
					style="background-color: var(--accent);"
				>
					Start Validation Scan
				</button>
			</div>
		{:else}
			<div
				class="mb-6 flex items-center justify-between rounded-sm border p-4"
				style="background-color: var(--bg-card); border-color: var(--border-color);"
			>
				<div class="flex items-center gap-2 text-sm font-medium">
					<button
						onclick={() => (activeFilter = 'all')}
						class="flex items-center rounded-md px-3 py-1 transition-colors hover:bg-white/5"
						style="color: var(--text-main); {activeFilter === 'all'
							? 'background-color: rgba(255,255,255,0.1); border: 1px solid var(--text-main);'
							: 'border: 1px solid transparent;'}"
					>
						<span class="mr-2 text-xl leading-none font-bold">{stats.total}</span>
						<span>Total Mods</span>
					</button>
					<button
						onclick={() => (activeFilter = 'compatible')}
						class="flex items-center rounded-md px-3 py-1 text-green-400 transition-colors hover:bg-white/5"
						style={activeFilter === 'compatible'
							? 'background-color: rgba(74, 222, 128, 0.1);  border: 1px solid rgb(74, 222, 128);'
							: 'border: 1px solid transparent;'}
					>
						<i class="fa-solid fa-check mr-2 text-xs"></i>
						<span>{stats.compatible} Compatible</span>
					</button>
					<button
						onclick={() => (activeFilter = 'conflict')}
						class="flex items-center rounded-md px-3 py-1 text-red-400 transition-colors hover:bg-white/5"
						style={activeFilter === 'conflict'
							? 'background-color: rgba(248, 113, 113, 0.1); border: 1px solid rgb(248, 113, 113);'
							: 'border: 1px solid transparent;'}
					>
						<i class="fa-solid fa-xmark mr-2 text-xs"></i>
						<span>{stats.conflicts} Conflicts</span>
					</button>
					<button
						onclick={() => (activeFilter = 'warning')}
						class="flex items-center rounded-md px-3 py-1 text-yellow-400 transition-colors hover:bg-white/5"
						style={activeFilter === 'warning'
							? 'background-color: rgba(250, 204, 21, 0.1); border: 1px solid rgb(250, 204, 21);'
							: 'border: 1px solid transparent;'}
					>
						<i class="fa-solid fa-triangle-exclamation mr-2 text-xs"></i>
						<span>{stats.warnings} Warnings</span>
					</button>
				</div>

				<div class="flex gap-3">
					<div class="relative">
						<i
							class="fa-solid fa-search absolute top-1/2 left-3 -translate-y-1/2 text-xs"
							style="color: var(--text-sec);"
						></i>
						<input
							type="text"
							placeholder="Search mods..."
							bind:value={searchQuery}
							class="h-9 w-64 rounded-sm border pr-3 pl-8 text-sm transition-colors outline-none focus:border-blue-500"
							style="
								background-color: var(--bg-input);
								border-color: var(--border-color);
								color: var(--text-main);"
						/>
					</div>

					<div
						class="flex h-9 items-center rounded-sm border p-0.5 transition-colors"
						style="background-color: var(--bg-input); border-color: var(--border-color);"
					>
						<button
							onclick={() => (viewMode = 'grid')}
							aria-label="Grid View"
							class="h-full rounded-sm px-3 text-xs transition-colors"
							style="
								background-color: {viewMode === 'grid' ? 'var(--bg-card)' : 'transparent'};
								color: {viewMode === 'grid' ? 'var(--text-main)' : 'var(--text-sec)'};
								box-shadow: {viewMode === 'grid' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'};
							"
						>
							<i class="fa-solid fa-grip"></i>
						</button>
						<button
							onclick={() => (viewMode = 'list')}
							aria-label="List View"
							class="h-full rounded-sm px-3 text-xs transition-colors"
							style="
								background-color: {viewMode === 'list' ? 'var(--bg-card)' : 'transparent'};
								color: {viewMode === 'list' ? 'var(--text-main)' : 'var(--text-sec)'};
								box-shadow: {viewMode === 'list' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'};
							"
						>
							<i class="fa-solid fa-list"></i>
						</button>
					</div>
				</div>
			</div>

			<div class="scrollbar-thin overflow-y-auto pr-2">
				<div
					class={viewMode === 'grid'
						? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
						: 'flex flex-col gap-2'}
				>
					{#each filteredMods as mod (mod.name)}
						<ModCard {mod} {viewMode} onClick={handleModClick} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

{#if selectedMod}
	<ModDrawer mod={selectedMod} onClose={handleCloseDrawer} />
{/if}

<SettingsModal />
