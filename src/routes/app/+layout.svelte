<script>
    import Login from "$lib/components/Login.svelte";
    import { user } from "$lib/sessionStore";
</script>

{#if $user}
    <slot />
{:else}
    <Login />
{/if}
