<script>
    import { supabase } from '$lib/modules/supabaseClient';
    import { user } from '$lib/sessionStore';

    let loading = false;

    async function signOut() {
        try {
            loading = true;
            let { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            alert(error.message);
        } finally {
            loading = false;
        }
    }
</script>

{#if loading}
    <button class="btn loading">Loading</button>
{:else}
    {#if !$user}
        <a href="/app" class="btn">Sign In</a>
    {:else}
        <button on:click={signOut} class="btn">Sign Out</button>
    {/if}
{/if}