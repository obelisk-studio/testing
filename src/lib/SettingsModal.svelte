<script>
	import { Settings } from '$lib/settings.svelte.js';

	let activeTab = $state('appearance');
</script>

{#if Settings.isOpen}
	<div class="overlay" onclick={() => Settings.close()}>
		<div class="window" onclick={(e) => e.stopPropagation()}>
			<header>
				<div class="header-title">
					<i class="fa-solid fa-gear"></i>
					<h2>Settings</h2>
				</div>
				<button class="close-btn" onclick={() => Settings.close()} aria-label="Close Settings">
					<i class="fa-solid fa-xmark"></i>
				</button>
			</header>

			<div class="settings-body">
				<aside>
					<button
						class="nav-btn {activeTab === 'appearance' ? 'active' : ''}"
						onclick={() => (activeTab = 'appearance')}
					>
						<i class="fa-solid fa-paintbrush"></i>
						Appearance
					</button>
					<button
						class="nav-btn {activeTab === 'account' ? 'active' : ''}"
						onclick={() => (activeTab = 'account')}
					>
						<i class="fa-solid fa-user"></i>
						Account
					</button>
					<button
						class="nav-btn {activeTab === 'about' ? 'active' : ''}"
						onclick={() => (activeTab = 'about')}
					>
						<i class="fa-solid fa-circle-info"></i>
						About
					</button>
				</aside>

				<main>
					{#if activeTab === 'appearance'}
						<div class="tab-header">
							<h3>Theme</h3>
							<p>Choose how Glacier looks to you.</p>
						</div>

						<div class="theme-grid">
							{#each Settings.themes as theme}
								<button
									class="theme-card {Settings.activeTheme === theme.id ? 'selected' : ''}"
									onclick={() => (Settings.activeTheme = theme.id)}
									aria-label="Select {theme.name} theme"
								>
									<div class="preview-box" style="background-color: {theme.bg}">
										<div class="preview-sidebar" style="background-color: {theme.sidebar}"></div>
										<div class="preview-content">
											<div
												class="preview-line"
												style="background-color: {theme.accent}; opacity: 0.8; width: 40%"
											></div>
											<div
												class="preview-line"
												style="background-color: {theme.accent}; opacity: 0.3"
											></div>
											<div
												class="preview-line"
												style="background-color: {theme.accent}; opacity: 0.3"
											></div>
										</div>
									</div>

									<span class="theme-name">{theme.name}</span>
								</button>
							{/each}
						</div>
					{:else}
						<div class="empty-state">
							<p>This tab is empty for now.</p>
						</div>
					{/if}
				</main>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(5px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}

	.window {
		/* UPDATED: Use dynamic variable */
		background: var(--bg-main, #1a1c23);
		color: var(--text-main, white);
		width: 800px;
		height: 550px;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		border: 1px solid #2c2e36;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
		overflow: hidden;
		transition:
			background-color 0.2s,
			color 0.2s;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 24px;
		border-bottom: 1px solid #2c2e36;
		/* UPDATED: Use sidebar color for header */
		background: var(--bg-sidebar, #15171e);
		transition: background-color 0.2s;
	}

	.header-title {
		display: flex;
		gap: 12px;
		align-items: center;
		color: var(--text-main, #e5e7eb);
	}

	h2 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.close-btn {
		background: transparent;
		border: none;
		color: #9ca3af;
		cursor: pointer;
		font-size: 1.1rem;
		padding: 4px;
		transition: color 0.2s;
	}
	.close-btn:hover {
		color: var(--text-main, white);
	}

	.settings-body {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	aside {
		width: 200px;
		/* UPDATED: Dynamic Sidebar Color */
		background: var(--bg-sidebar, #15171e);
		border-right: 1px solid #2c2e36;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		transition: background-color 0.2s;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
		padding: 10px 12px;
		background: transparent;
		border: none;
		color: #9ca3af;
		text-align: left;
		cursor: pointer;
		border-radius: 6px;
		font-size: 0.9rem;
		font-weight: 500;
		transition: all 0.2s;
	}

	.nav-btn:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-main, white);
	}
	.nav-btn.active {
		background: var(--accent, #2563eb);
		color: white;
	}

	main {
		flex: 1;
		padding: 32px;
		overflow-y: auto;
		/* UPDATED: Dynamic Main Background */
		background: var(--bg-main, #1a1c23);
		transition: background-color 0.2s;
	}

	.tab-header {
		margin-bottom: 24px;
	}
	.tab-header h3 {
		margin: 0 0 4px 0;
		font-size: 1.25rem;
		color: var(--text-main, white);
	}
	.tab-header p {
		margin: 0;
		color: #9ca3af;
		font-size: 0.9rem;
	}

	.theme-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 16px;
	}

	.theme-card {
		background: transparent;
		border: 2px solid #2c2e36;
		border-radius: 8px;
		padding: 8px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		gap: 8px;
		transition: all 0.2s;
	}

	.theme-card:hover {
		border-color: #4b5563;
	}
	.theme-card.selected {
		border-color: var(--accent, #2563eb);
		background: rgba(255, 255, 255, 0.03);
	}

	.theme-name {
		color: var(--text-main, #d1d5db);
		font-size: 0.85rem;
		font-weight: 500;
	}

	.preview-box {
		width: 100%;
		aspect-ratio: 16/10;
		border-radius: 4px;
		display: flex;
		overflow: hidden;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.preview-sidebar {
		width: 25%;
		height: 100%;
		border-right: 1px solid rgba(255, 255, 255, 0.1);
	}

	.preview-content {
		flex: 1;
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.preview-line {
		height: 4px;
		border-radius: 2px;
		width: 100%;
	}
</style>
