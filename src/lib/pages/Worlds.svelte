<script lang="ts">
	import logo from '$lib/assets/icon-transparent.png';
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
				>VAULT</span
			>
		</div>
	</div>
</div>

<div
	class="flex h-full flex-col items-center justify-center p-6 transition-colors duration-300"
	style="background-color: var(--bg-main);"
>
	<div class="animate-fade-in flex flex-col items-center">
		<div
			class="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border shadow-xl"
			style="
				background-color: var(--bg-card);
				border-color: var(--border-color);
				color: var(--text-sec);
			"
		>
			<span class="text-4xl"><i class="fa-solid fa-earth-americas"></i></span>
		</div>
		<h2 class="mb-2 text-2xl font-bold" style="color: var(--text-main);">Worlds & Saves</h2>
		<p class="max-w-md text-center" style="color: var(--text-sec);">
			Manage your Minecraft worlds and save files. This feature is coming soon.
		</p>
	</div>
</div>
