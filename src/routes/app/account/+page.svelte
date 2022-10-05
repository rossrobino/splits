<script>
	import { user, userProfile } from "$lib/sessionStore";
	import { title, accountTag } from "$lib/modules/info";
	import { supabase } from "$lib/modules/supabaseClient";
	import AlertError from "$lib/components/AlertError.svelte";
	import AlertSuccess from "$lib/components/AlertSuccess.svelte";
	import PageHeader from "$lib/components/PageHeader.svelte";

	let email = "";
	let username = "";
	let fname = "";
	let lname = "";
	let loading = false;
	let alert = "";
	let success = "";

	// controls the focus outline of the wrapper div for @ prefix
	let usernameFocus = false;
	const onFocus = () => (usernameFocus = true);
	const onBlur = () => (usernameFocus = false);

	async function updateProfile() {
		try {
			alert = "";
			success = "";
			loading = true;

			const profileUpdates = { updated_at: new Date() };
			// check which fields have values and set to profileUpdates
			if (username) profileUpdates.username = username;
			if (fname) profileUpdates.first_name = fname;
			if (lname) profileUpdates.last_name = lname;
			if ($userProfile.avatar_url)
				profileUpdates.avatar_url = $userProfile.avatar_url;

			// if there is anything entered...
			if (Object.keys(profileUpdates).length > 1 || email) {
				if (Object.keys(profileUpdates).length > 1) {
					let { error } = await supabase
						.from("profiles")
						.update(profileUpdates)
						.match({ id: $user.id });
					if (error) throw error;

					// success - set $userProfile immediately according to which values were entered
					let keys = Object.keys(profileUpdates);
					for (const key of keys) {
						if (key === "username") {
							$userProfile.username = username;
							username = "";
						}
						if (key === "first_name") {
							$userProfile.first_name = fname;
							fname = "";
						}
						if (key === "last_name") {
							$userProfile.last_name = lname;
							lname = "";
						}
					}
				}
				if (email) {
					const { user, error } = await supabase.auth.update({
						email,
					});
					if (error) throw error;
				}
				success = "Your updates have been confirmed!";
			} else {
				alert = "Please enter a new value to submit.";
			}
		} catch (error) {
			alert = error.message;
		} finally {
			loading = false;
		}
	}

	async function sendResetEmail() {
		try {
			loading = true;
			success = "";
			const { data, error } =
				await supabase.auth.api.resetPasswordForEmail($user.email);
			if (error) throw error;
			// success
			success = "Password reset sent.";
		} catch (error) {
			alert = error.message;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>{title} - Account</title>
	<meta name={accountTag} />
</svelte:head>

<form
	on:submit|preventDefault={updateProfile}
	class="form-control w-full max-w-sm"
>
	<PageHeader>
		<span slot="h1">Account</span>
		<span slot="h2">{accountTag}</span>
	</PageHeader>

	<label for="email" class="label">
		<span class="label-text">Email</span>
		<span class="label-text-alt">{$user.email}</span>
	</label>
	<input
		id="email"
		type="text"
		placeholder="new email"
		bind:value={email}
		class="input input-bordered input-accent w-full max-w-sm"
	/>
	<label for="email" class="label mb-3">
		<span class="label-text-alt">
			Upon email update a confirmation email will be sent to the current
			and new address. Both messages must be confirmed to update.
		</span>
	</label>

	<label for="username" class="label">
		<span class="label-text">Username</span>
		<span class="label-text-alt">@{$userProfile.username}</span>
	</label>
	<div
		class="input input-bordered input-accent {usernameFocus
			? 'inputOutline'
			: ''} w-full max-w-sm mb-3"
	>
		@
		<input
			class="h-full w-[90%] focus:outline-0 bg-base-100"
			id="username"
			type="text"
			placeholder="new username"
			on:focus={onFocus}
			on:blur={onBlur}
			bind:value={username}
		/>
	</div>

	<label for="first_name" class="label">
		<span class="label-text">First</span>
		<span class="label-text-alt">{$userProfile.first_name}</span>
	</label>
	<input
		id="first_name"
		type="text"
		placeholder="new first name"
		bind:value={fname}
		class="input input-bordered input-accent w-full max-w-sm mb-3"
	/>

	<label for="last_name" class="label">
		<span class="label-text">Last</span>
		<span class="label-text-alt">{$userProfile.last_name}</span>
	</label>
	<input
		id="last_name"
		type="text"
		placeholder="new last name"
		bind:value={lname}
		class="input input-bordered input-accent w-full max-w-sm mb-3"
	/>

	{#if loading}
		<button class="btn loading mt-3">Loading</button>
	{:else}
		<input type="submit" value="Submit" class="btn btn-accent mt-3" />
	{/if}

	{#if alert}
		{#if alert == 'duplicate key value violates unique constraint "profiles_username_key"'}
			<AlertError error="username is unavailable" class="mt-6" />
		{:else}
			<AlertError error={alert} class="mt-6" />
		{/if}
	{/if}

	{#if success}
		<AlertSuccess {success} class="mt-6" />
	{/if}
</form>

<div class="link mt-6" on:click={sendResetEmail}>Reset Password</div>

<style>
	.inputOutline {
		outline: 2px solid hsl(var(--a));
		outline-offset: 2px;
	}
</style>
