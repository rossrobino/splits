<script>
	export let h2 = true;
</script>

<div class="bg-base-100 mb-4 sm:mb-6">
	<h1 class="text-2xl sm:text-5xl font-bold">
		<slot name="h1">slot="h1"</slot>
	</h1>
	{#if h2}
		<h2 class="text-xl sm:text-2xl">
			<slot name="h2">slot="h2"</slot>
		</h2>
	{/if}
</div>
