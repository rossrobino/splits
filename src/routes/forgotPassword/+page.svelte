<script>
    import AlertError from '$lib/components/AlertError.svelte';
    import AlertSuccess from '$lib/components/AlertSuccess.svelte';
    import { supabase } from '$lib/modules/supabaseClient';

    let email;
    let loading;
    let err;
    let success;

    async function resetPassword() {
        try {
            loading = true;
            const { error, data } = await supabase.auth.api.resetPasswordForEmail(email);
            if (error) throw error;
            success = true;
        } catch (error) {
            err = (error.error_description || error.message);
        } finally {
            loading = false;
        }
    }
</script>

<div class="hero px-4 py-24">   
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" on:submit|preventDefault="{resetPassword}">
            
            <h1 class="font-bold">Forgot Password</h1>

            {#if success}
                <AlertSuccess success="Reset link sent to {email}" />
            {:else if err}
                <AlertError error={err} />
            {:else}
                <div class="form-control">
                    <label class="label" for="email">
                        <span class="label-text">Email</span>
                    </label>
                    <input id="email" type="text" placeholder="email" class="input input-bordered" bind:value="{email}"/>
                </div>

                <div class="form-control mt-6">
                    <input type="submit" class="btn btn-primary" value={loading ? "Loading" : "Send Reset Link"} disabled={loading}/>
                </div>
            {/if}

        </form>
    </div>
</div>