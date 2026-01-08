<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Mod, AvailableVersion } from '$lib/types';

	let {
		mod,
		onClose,
		selectedLoader,
		onVersionSelect
	}: {
		mod: Mod;
		onClose: () => void;
		selectedLoader: string;
		onVersionSelect?: (version: AvailableVersion) => void;
	} = $props();

	let isSearching = $state(false);

	// Generate mock available versions based on mod name
	// Use a function to avoid reactive dependencies that could cause infinite loops
	function generateAvailableVersions(
		modName: string,
		modVersion: string,
		modLoader: string,
		modJarName: string,
		currentSelectedLoader: string
	): AvailableVersion[] {
		const versions: AvailableVersion[] = [];
		const modNameLower = modName.toLowerCase();

		// Generate versions for different loaders
		const loaders = ['Fabric', 'NeoForge', 'Quilt', 'Forge'];

		for (const loader of loaders) {
			// Skip the current loader
			if (loader === modLoader) continue;

			// Generate JAR name based on mod name pattern
			let jarName = '';
			if (modNameLower.includes('just enough items') || modNameLower.includes('jei')) {
				jarName = `jei-1.21-${loader.toLowerCase()}.jar`;
			} else if (modNameLower.includes('sodium')) {
				jarName = `sodium-mc1.21-${modVersion}.jar`;
			} else if (modNameLower.includes('iris')) {
				jarName = `iris-mc1.21-${modVersion}.jar`;
			} else if (modNameLower.includes('architectury')) {
				jarName = `architectury-${modVersion}.jar`;
			} else if (modNameLower.includes('lithium')) {
				jarName = `lithium-${loader.toLowerCase()}-mc1.21.jar`;
			} else if (modNameLower.includes('jade')) {
				jarName = `jade-1.21-${loader.toLowerCase()}.jar`;
			} else {
				// Generic pattern
				const modSlug = modName.toLowerCase().replace(/\s+/g, '-');
				jarName = `${modSlug}-1.21-${loader.toLowerCase()}.jar`;
			}

			const isCompatible = loader === currentSelectedLoader;

			versions.push({
				loader,
				version: modVersion,
				jarName,
				isCompatible
			});
		}

		// Add a compatible version if none exist and current mod loader doesn't match selectedLoader
		const hasCompatible = versions.some((v) => v.isCompatible);
		if (!hasCompatible && modLoader !== currentSelectedLoader) {
			// Generate JAR name for compatible version
			let compatibleJarName = modJarName;
			const jarNameMatch = modJarName.match(/^(.+?)(?:-\w+)?\.jar$/);
			if (jarNameMatch) {
				const baseName = jarNameMatch[1];
				compatibleJarName = `${baseName}-${currentSelectedLoader.toLowerCase()}.jar`;
			} else {
				// Fallback: replace extension
				compatibleJarName = modJarName.replace(
					/\.jar$/,
					`-${currentSelectedLoader.toLowerCase()}.jar`
				);
			}

			versions.push({
				loader: currentSelectedLoader,
				version: modVersion,
				jarName: compatibleJarName,
				isCompatible: true
			});
		}

		return versions;
	}

	// Cache the mod properties to avoid reactive dependency issues
	// Create a snapshot when mod changes or when starting search
	let modSnapshot = $state<{
		name: string;
		version: string;
		loader: string;
		jarName: string;
	} | null>(null);

	// Update snapshot when mod changes or when starting search
	$effect(() => {
		modSnapshot = {
			name: mod.name,
			version: mod.version,
			loader: mod.loader,
			jarName: mod.jarName
		};
	});

	// Only compute when we have a snapshot
	let availableVersions = $derived.by(() => {
		if (!modSnapshot) return [];

		return generateAvailableVersions(
			modSnapshot.name,
			modSnapshot.version,
			modSnapshot.loader,
			modSnapshot.jarName,
			selectedLoader
		);
	});

	let statusStyle = $derived.by(() => {
		if (mod.status === 'compatible') {
			return 'background-color: rgba(74, 222, 128, 0.1); border-color: rgb(74, 222, 128);';
		} else if (mod.status === 'warning') {
			return 'background-color: rgba(250, 204, 21, 0.1); border-color: rgb(250, 204, 21);';
		} else {
			return 'background-color: rgba(248, 113, 113, 0.1); border-color: rgb(248, 113, 113);';
		}
	});

	// Handle Escape key to go back or close drawer
	$effect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				if (isSearching) {
					isSearching = false;
				} else {
					onClose();
				}
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
		<div class="flex items-center gap-3">
			{#if isSearching}
				<button
					onclick={() => (isSearching = false)}
					aria-label="Back to mod details"
					class="flex h-8 w-8 items-center justify-center rounded-sm transition-colors hover:bg-white/10"
					style="color: var(--text-sec);"
				>
					<i class="fa-solid fa-arrow-left text-sm"></i>
				</button>
			{/if}
			<h2 id="drawer-title" class="text-lg font-bold" style="color: var(--text-main);">
				{isSearching ? 'Available Versions' : 'Mod Details'}
			</h2>
		</div>
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
		{#if isSearching}
			<!-- Version Search View -->
			<h1 class="mb-6 text-2xl font-bold" style="color: var(--text-main);">
				Available Versions for {mod.name}
			</h1>

			<div class="flex flex-col gap-3">
				{#each availableVersions as version (version.jarName)}
					<div
						class="rounded-sm border p-4 transition-colors"
						style="
							background-color: var(--bg-card);
							border-color: var(--border-color);
						"
					>
						<div class="mb-3 flex items-start justify-between">
							<div class="flex-1">
								<div class="mb-2 flex gap-2">
									<span
										class="inline-block rounded-sm border px-2.5 py-1 text-xs font-medium"
										style="
											background-color: var(--bg-input);
											color: var(--text-sec);
											border-color: var(--border-color);
										"
									>
										{version.loader}
									</span>
									<span
										class="inline-block rounded-sm border px-2.5 py-1 text-xs font-medium"
										style="
											background-color: var(--bg-input);
											color: var(--text-sec);
											border-color: var(--border-color);
										"
									>
										{version.version}
									</span>
									{#if version.isCompatible}
										<span
											class="inline-flex items-center gap-1 rounded-sm border px-2.5 py-1 text-xs font-medium text-green-400"
											style="
												background-color: rgba(74, 222, 128, 0.1);
												border-color: rgb(74, 222, 128);
											"
										>
											<i class="fa-solid fa-check text-xs"></i>
											Compatible
										</span>
									{:else}
										<span
											class="inline-flex items-center gap-1 rounded-sm border px-2.5 py-1 text-xs font-medium text-red-400"
											style="
												background-color: rgba(248, 113, 113, 0.1);
												border-color: rgb(248, 113, 113);
											"
										>
											<i class="fa-solid fa-xmark text-xs"></i>
											Incompatible
										</span>
									{/if}
								</div>
								<p class="font-mono text-xs" style="color: var(--text-sec);">
									{version.jarName}
								</p>
							</div>
						</div>
						{#if version.isCompatible}
							<button
								onclick={() => onVersionSelect?.(version)}
								class="w-full rounded-sm px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:brightness-110"
								style="background-color: var(--accent);"
							>
								<i class="fa-solid fa-download mr-2"></i>
								Install
							</button>
						{:else}
							<button
								disabled
								class="w-full cursor-not-allowed rounded-sm px-4 py-2 text-sm font-medium opacity-50 transition-colors"
								style="
									background-color: var(--bg-input);
									color: var(--text-sec);
									border: 1px solid var(--border-color);
								"
							>
								Not Compatible
							</button>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<!-- Mod Details View -->
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
					onclick={() => (isSearching = true)}
					class="w-full rounded-sm px-4 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:brightness-110"
					style="background-color: var(--accent);"
				>
					<i class="fa-solid fa-search mr-2"></i>
					Find Compatible Version
				</button>
			{/if}
		{/if}
	</div>
</div>
