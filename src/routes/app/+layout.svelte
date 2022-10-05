<script>
	import Login from "$lib/components/Login.svelte";
	import { user } from "$lib/sessionStore";
</script>

{#if $user}
	<div class="p-4 sm:p-8"><slot /></div>
{:else}
	<Login />
{/if}
