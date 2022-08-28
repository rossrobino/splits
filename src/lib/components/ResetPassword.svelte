<script>
    import AlertError from '$lib/components/AlertError.svelte';
    import AlertSuccess from '$lib/components/AlertSuccess.svelte';
    import { supabase } from '$lib/modules/supabaseClient';
    
    export let token;

    let newPassword;
    let loading;
    let err;
    let success;

    async function resetPassword() {
        try {
            loading = true;
            const { error, data } = await supabase.auth.api.updateUser(token, {
                password: newPassword,
            });
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

            <h1>Reset Password</h1>

            {#if success}
                <AlertSuccess success="Password successfully reset." />
            {:else if err}
                <AlertError error={err} />
            {:else}
                <div class="form-control">
                    <label class="label" for="password">
                        <span class="label-text">New Password</span>
                    </label>
                    <input id="password" minlength="8" type="password" placeholder="password" class="input input-bordered" bind:value={newPassword}/>
                </div>

                <div class="form-control mt-6">
                    <input type="submit" class="btn btn-primary" value={loading ? "Loading" : "Reset"} disabled={loading}/>
                </div>
            {/if}

        </form>
    </div>
</div>