<script>
	export let confirmed = false;
</script>

{#if confirmed}
	<div class="badge badge-md badge-success">
		confirmed
	</div>
{:else}
	<div class="badge badge-md badge-warning">
		pending
	</div>
{/if}
