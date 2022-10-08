<script>
	import Login from "$lib/components/Login.svelte";
	import { user } from "$lib/sessionStore";
</script>

{#if $user}
	<div class="p-4 sm:p-8 max-w-6xl mx-auto overflow-hidden"><slot /></div>
{:else}
	<Login />
{/if}
