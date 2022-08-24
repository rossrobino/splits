<script>
    import Login from '$lib/components/Login.svelte';
    import { user, userProfile } from '$lib/sessionStore';
    import { supabase } from '$lib/modules/supabaseClient';

    user.set(supabase.auth.user());
    if ($user) {
        setUserProfile();
    }

    supabase.auth.onAuthStateChange((state, session) => {
        if (state == 'SIGNED_IN') {
    		user.set(session.user);
            setUserProfile();
    	} else {
    		user.set(false);
            userProfile.set(false);
    	}
    });

    async function setUserProfile() {
        const user = supabase.auth.user();
        const { data, error } = await supabase
            .from("profiles")
            .select(`username, first_name, last_name, avatar_url`)
            .eq("id", user?.id)
            .single();
        if (error) throw new Error(error.message);
        userProfile.set(data);
    }
    
</script>

{#if $user}
    <slot />
{:else}
    <Login />
{/if}