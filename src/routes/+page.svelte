<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';
	import SettingsModal from '$lib/SettingsModal.svelte';
	import Dashboard from '$lib/pages/Dashboard.svelte';
	import BrowseMods from '$lib/pages/BrowseMods.svelte';
	import Worlds from '$lib/pages/Worlds.svelte';
	import Screenshots from '$lib/pages/Screenshots.svelte';
	import type { PageId } from '$lib/types';

	let activePage = $state<PageId>('dashboard');

	function handleNavigate(pageId: PageId) {
		activePage = pageId;
	}
</script>

<div class="flex h-screen overflow-hidden">
	<Sidebar {activePage} onNavigate={handleNavigate} />

	<div class="flex flex-1 flex-col overflow-hidden">
		{#if activePage === 'dashboard'}
			<Dashboard />
		{:else if activePage === 'mods'}
			<BrowseMods />
		{:else if activePage === 'worlds'}
			<Worlds />
		{:else if activePage === 'screenshots'}
			<Screenshots />
		{/if}
	</div>
</div>

<SettingsModal />
