<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import { user, userProfile } from "$lib/sessionStore";

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
{:else if !$user}
	<a href="/app" class="btn">Sign In</a>
{:else if $userProfile.username}
	<div class="dropdown dropdown-end dropdown-hover">
		<label
			for="navEnd"
			tabindex="0"
			class="btn btn-ghost btn-circle avatar placeholder"
		>
			<div
				class="bg-base-content text-base-100 rounded-full w-full"
			>
				<span class="text-lg">
					{`${$userProfile.first_name.charAt(
						0
					)}${$userProfile.last_name.charAt(0)}`}
				</span>
			</div>
		</label>
		<ul
			id="navEnd"
			tabindex="0"
			class="menu menu-compact dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
		>
			<li><a href="/app/profile/{$userProfile.username}">Profile</a></li>
			<li><a href="/app/account">Account</a></li>
			<li><a href="/" on:click={signOut}>Sign Out</a></li>
		</ul>
	</div>
{/if}
