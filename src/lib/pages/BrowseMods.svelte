<script lang="ts">
	import logo from '$lib/assets/icon-transparent.png';

	// State for filters
	let searchQuery = $state('');
	let sortBy = $state('downloads');
	let selectedLoader = $state('all');
	let selectedCategory = $state('all');

	// Mock mod data
	let mockMods = $state([
		{
			id: 1,
			name: 'Sodium',
			description:
				'A modern rendering engine for Minecraft which greatly improves frame rates and fixes graphical issues.',
			author: 'jellysquid3',
			downloads: 45200000,
			thumbnailColor: '#4ade80',
			loader: 'fabric',
			category: 'optimization'
		},
		{
			id: 2,
			name: 'Iris Shaders',
			description:
				'A modern shaders mod for Minecraft intended to be compatible with existing OptiFine shader packs.',
			author: 'coderbot',
			downloads: 32100000,
			thumbnailColor: '#a78bfa',
			loader: 'fabric',
			category: 'shaders'
		},
		{
			id: 3,
			name: 'Create',
			description:
				'Aesthetic technology that empowers the player with tools of creativity and automation.',
			author: 'simibubi',
			downloads: 28500000,
			thumbnailColor: '#f59e0b',
			loader: 'forge',
			category: 'tech'
		},
		{
			id: 4,
			name: 'Just Enough Items (JEI)',
			description:
				'JEI is an item and recipe viewing mod focused on stability, performance, and ease of use.',
			author: 'mezz',
			downloads: 52300000,
			thumbnailColor: '#60a5fa',
			loader: 'forge',
			category: 'utility'
		},
		{
			id: 5,
			name: 'Fabric API',
			description: 'Lightweight and modular API providing common hooks and utilities for mods.',
			author: 'FabricMC',
			downloads: 89000000,
			thumbnailColor: '#f472b6',
			loader: 'fabric',
			category: 'library'
		},
		{
			id: 6,
			name: 'Applied Energistics 2',
			description:
				'A mod about matter, energy, and using them to conquer the world with digital storage.',
			author: 'AlgorithmX2',
			downloads: 18200000,
			thumbnailColor: '#22d3d1',
			loader: 'forge',
			category: 'tech'
		},
		{
			id: 7,
			name: 'Lithium',
			description:
				'A general-purpose optimization mod for Minecraft that improves game physics and server tick times.',
			author: 'jellysquid3',
			downloads: 21500000,
			thumbnailColor: '#fb7185',
			loader: 'fabric',
			category: 'optimization'
		},
		{
			id: 8,
			name: 'Botania',
			description:
				'A tech mod themed around natural magic using mystical flowers and mana manipulation.',
			author: 'Vazkii',
			downloads: 25600000,
			thumbnailColor: '#a3e635',
			loader: 'forge',
			category: 'magic'
		},
		{
			id: 9,
			name: 'Xaeros Minimap',
			description:
				'A self-writing fullscreen map with waypoints, entities, and player location tracking.',
			author: 'xaero96',
			downloads: 35800000,
			thumbnailColor: '#38bdf8',
			loader: 'fabric',
			category: 'utility'
		},
		{
			id: 10,
			name: 'Tinkers Construct',
			description:
				'A mod about putting tools together in a variety of ways, then modifying them until they fit your needs.',
			author: 'mDiyo',
			downloads: 41200000,
			thumbnailColor: '#c084fc',
			loader: 'forge',
			category: 'tech'
		},
		{
			id: 11,
			name: 'ModMenu',
			description:
				'Adds a mod menu button to the main screen for easy access to your installed mods list.',
			author: 'Prospector',
			downloads: 28900000,
			thumbnailColor: '#34d399',
			loader: 'fabric',
			category: 'utility'
		},
		{
			id: 12,
			name: 'Biomes O Plenty',
			description:
				'An extensive biome mod that adds over 90 unique biomes to explore in your world.',
			author: 'Glitchfiend',
			downloads: 19400000,
			thumbnailColor: '#fbbf24',
			loader: 'forge',
			category: 'worldgen'
		}
	]);

	// Derived filtered mods based on search and filters
	let filteredMods = $derived(
		mockMods
			.filter((mod) => {
				// SAFETY: Fallback to empty string to prevent 500 error if data is missing
				const safeName = (mod.name || '').toLowerCase();
				const safeDesc = (mod.description || '').toLowerCase();
				const safeQuery = searchQuery.toLowerCase();

				const matchesSearch = safeName.includes(safeQuery) || safeDesc.includes(safeQuery);
				const matchesLoader = selectedLoader === 'all' || mod.loader === selectedLoader;
				const matchesCategory = selectedCategory === 'all' || mod.category === selectedCategory;

				return matchesSearch && matchesLoader && matchesCategory;
			})
			.sort((a, b) => {
				if (sortBy === 'downloads') return b.downloads - a.downloads;
				if (sortBy === 'name') return a.name.localeCompare(b.name);
				return 0; // Default (Updated) - assuming data comes in sorted order for now
			})
	);

	function formatDownloads(count: number): string {
		if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
		if (count >= 1000) return (count / 1000).toFixed(0) + 'K';
		return count.toString();
	}
</script>

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
				>MARKETPLACE</span
			>
		</div>
	</div>

	<div class="relative max-w-md flex-1">
		<i
			class="fa-solid fa-search absolute top-1/2 left-3 -translate-y-1/2 text-xs"
			style="color: var(--text-sec);"
		></i>
		<input
			type="text"
			placeholder="Search mods..."
			bind:value={searchQuery}
			class="ghost-input h-8 w-full rounded-sm border py-0 pr-3 pl-9 text-sm transition-colors outline-none focus:ring-0 focus:outline-none"
			style="
                background-color: transparent;
                border-color: var(--border-color);
                color: var(--text-main);
            "
		/>
	</div>

	<div class="flex items-center gap-2">
		<span class="text-xs font-medium whitespace-nowrap" style="color: var(--text-sec);">Sort</span>
		<select
			bind:value={sortBy}
			class="ghost-select h-8 cursor-pointer appearance-none rounded-sm border px-3 py-0 pr-8 text-sm transition-colors focus:ring-0 focus:outline-none"
			style="
                background-color: transparent;
                border-color: var(--border-color);
                color: var(--text-main);
                background-image: url('data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%239ca3af%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E');
                background-repeat: no-repeat;
                background-position: right 0.75rem center;
            "
		>
			<option value="downloads">Downloads</option>
			<option value="updated">Updated</option>
			<option value="name">Name</option>
		</select>
	</div>

	<div class="flex items-center gap-2">
		<span class="text-xs font-medium whitespace-nowrap" style="color: var(--text-sec);">Loader</span
		>
		<select
			bind:value={selectedLoader}
			class="ghost-select h-8 cursor-pointer appearance-none rounded-sm border px-3 py-0 pr-8 text-sm transition-colors focus:ring-0 focus:outline-none"
			style="
                background-color: transparent;
                border-color: var(--border-color);
                color: var(--text-main);
                background-image: url('data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%239ca3af%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E');
                background-repeat: no-repeat;
                background-position: right 0.75rem center;
            "
		>
			<option value="all">All Loaders</option>
			<option value="fabric">Fabric</option>
			<option value="forge">Forge</option>
			<option value="neoforge">NeoForge</option>
			<option value="quilt">Quilt</option>
		</select>
	</div>

	<div class="flex items-center gap-2">
		<span class="text-xs font-medium whitespace-nowrap" style="color: var(--text-sec);"
			>Category</span
		>
		<select
			bind:value={selectedCategory}
			class="ghost-select h-8 cursor-pointer appearance-none rounded-sm border px-3 py-0 pr-8 text-sm transition-colors focus:ring-0 focus:outline-none"
			style="
                background-color: transparent;
                border-color: var(--border-color);
                color: var(--text-main);
                background-image: url('data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%239ca3af%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E');
                background-repeat: no-repeat;
                background-position: right 0.75rem center;
            "
		>
			<option value="all">All Categories</option>
			<option value="tech">Technology</option>
			<option value="magic">Magic</option>
			<option value="optimization">Optimization</option>
			<option value="utility">Utility</option>
			<option value="worldgen">World Gen</option>
			<option value="library">Library</option>
			<option value="shaders">Shaders</option>
		</select>
	</div>
</div>

<div
	class="flex-1 overflow-y-auto p-6 transition-colors duration-300"
	style="background-color: var(--bg-main);"
>
	{#if filteredMods.length === 0}
		<div class="flex h-full items-center justify-center">
			<div class="text-center">
				<i class="fa-solid fa-search mb-4 text-4xl" style="color: var(--text-sec);"></i>
				<h3 class="mb-2 text-lg font-semibold" style="color: var(--text-main);">No mods found</h3>
				<p class="text-sm" style="color: var(--text-sec);">
					Try adjusting your search or filter criteria
				</p>
			</div>
		</div>
	{:else}
		<div
			class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
		>
			{#each filteredMods as mod (mod.id)}
				<div
					class="group hover:border-opacity-80 flex flex-col rounded-lg border p-4 transition-all duration-200 hover:shadow-lg"
					style="
                        background-color: var(--bg-card);
                        border-color: var(--border-color);
                    "
				>
					<div class="mb-3 flex items-start gap-3">
						<div
							class="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-xl font-bold text-white shadow-sm"
							style="background-color: {mod.thumbnailColor || '#666'};"
						>
							{mod.name.charAt(0)}
						</div>
						<div class="min-w-0 flex-1">
							<h3
								class="truncate text-sm leading-tight font-bold"
								style="color: var(--text-main);"
								title={mod.name}
							>
								{mod.name}
							</h3>
							<p class="mt-0.5 text-xs" style="color: var(--text-sec);">
								by {mod.author}
							</p>
						</div>
					</div>

					<p
						class="mb-3 line-clamp-2 flex-1 text-xs leading-relaxed"
						style="color: var(--text-sec);"
					>
						{mod.description}
					</p>

					<div
						class="flex items-center justify-between border-t pt-2"
						style="border-color: var(--border-color);"
					>
						<div class="flex items-center gap-3 text-xs" style="color: var(--text-sec);">
							<span class="flex items-center gap-1">
								<i class="fa-solid fa-download text-[10px]"></i>
								{formatDownloads(mod.downloads)}
							</span>
							<span
								class="rounded-sm px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase"
								style="background-color: var(--bg-input); border: 1px solid var(--border-color);"
							>
								{mod.loader}
							</span>
						</div>
						<button
							class="rounded-sm px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-110"
							style="background-color: var(--accent);"
						>
							Install
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.ghost-input:hover,
	.ghost-select:hover {
		background-color: rgba(255, 255, 255, 0.03) !important;
	}

	.ghost-input:focus,
	.ghost-select:focus {
		background-color: rgba(255, 255, 255, 0.05) !important;
	}

	.ghost-select option {
		background-color: var(--bg-card);
		color: var(--text-main);
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
