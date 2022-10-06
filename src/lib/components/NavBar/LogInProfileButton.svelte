<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import { user, userProfile } from "$lib/sessionStore";
	import { fly } from "svelte/transition";

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

<div class="{$user ? "w-14" : "w-[6.5rem]"} h-12" >
	{#if loading}
		<button class="btn loading w-24" />
	{:else if !$user}
		<a href="/app" class="btn w-24">Sign In</a>
	{:else if $userProfile.username}
		<div
			class="dropdown dropdown-end dropdown-hover"
			
		>
			<div class="overflow-hidden">
				<label
					for="navEnd"
					tabindex="0"
					class="btn btn-ghost btn-circle avatar placeholder"
					in:fly={{ duration: 250, x: 100 }}
				>
					<div
						class="bg-base-content text-base-100 rounded-full w-10"
					>
						<span class="text-md">
							{`${$userProfile.first_name.charAt(
								0
							)}${$userProfile.last_name.charAt(0)}`}
						</span>
					</div>
				</label>
			</div>
			<ul
				id="navEnd"
				tabindex="0"
				class="menu menu-compact dropdown-content p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li>
					<a href="/app/profile/{$userProfile.username}">Profile</a>
				</li>
				<li><a href="/app/account">Account</a></li>
				<li><a href="/" on:click={signOut}>Sign Out</a></li>
			</ul>
		</div>
	{/if}
</div>
