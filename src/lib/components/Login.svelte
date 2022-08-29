<script>
    import { supabase } from '$lib/modules/supabaseClient';
  
    let loading = false;
    let email;
    let password;
  
    async function handleLogin() {
        try {
            loading = true;
            const { user, error } = await supabase.auth.signIn({
                 email: email,
                 password: password,
            });
            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            loading = false;
        }
    }
</script>

<div class="hero px-4 py-24">   
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" on:submit|preventDefault="{handleLogin}">

            <h1 class="font-bold">Login</h1>

            <div class="form-control">
                <label class="label" for="email">
                    <span class="label-text">Email</span>
                </label>
                <input id="email" type="text" placeholder="email" class="input input-bordered" bind:value="{email}"/>
            </div>
            <div class="form-control">
                <label class="label" for="password">
                    <span class="label-text">Password</span>
                </label>
                <input id="password" type="password" placeholder="password" class="input input-bordered" bind:value="{password}"/>
                <label class="label" for="forgot">
                    <a href="/forgotPassword" id="forgot" class="label-text-alt link link-hover">Forgot password?</a>
                </label>
                <label class="label" for="signup">
                    <a href="/signup" id="signup" class="label-text-alt link link-hover">New here? Sign Up</a>
                </label>
            </div>
            <div class="form-control mt-6">
                <input type="submit" class="btn btn-primary" value={loading ? "Loading" : "Login"} disabled={loading}/>
            </div>
        </form>
    </div>
</div>