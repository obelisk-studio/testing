<script lang="ts">
	let { value = $bindable() } = $props();

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
</script>

<div class="relative">
	<select
		bind:value
		class="h-9 w-32 appearance-none rounded-sm border pr-8 pl-3 text-sm focus:border-blue-500 focus:outline-none"
		style="
			background-color: var(--bg-input);
			border-color: var(--border-color);
			color: var(--text-main);
			/* FORCE HIDE DEFAULT ARROW */
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
		"
	>
		{#each minecraftVersions as version (version)}
			<option value={version}>{version}</option>
		{/each}
	</select>
</div>
