<script>
    import Login from '$lib/components/Login.svelte';
    import { user } from '$lib/sessionStore';
    import { supabase } from '$lib/modules/supabaseClient';


    user.set(supabase.auth.user());

    supabase.auth.onAuthStateChange((state, session) => {
        if (state == 'SIGNED_IN') {
    		user.set(session.user);
    	} else {
    		user.set(false);
    	}
    });

    async function getRouteProfile() {
        const { data, error } = await supabase
            .from("profiles")
            .select(`username, first_name, last_name, avatar_url`)
            .eq("id", user?.id) // params are passed into the url
            .single();
        if (error) throw new Error(error.message);
        routeProfile.set(data);
    }
</script>


{#if $user}
    <slot />
{:else}
    <Login />
{/if}