<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import AlertError from "$lib/components/AlertError.svelte";
	import { capitalizeFirstLetter } from "$lib/modules/utilities/capitalizeFirstLetter";


	let loading = false;
	let email;
	let password;
	let username;
	let firstname;
	let lastname;
	let err = "";
	let sent = false;

	async function handleSignUp() {
		email = email.trim().toLowerCase();
		username = username.trim().toLowerCase();
		firstname = capitalizeFirstLetter(firstname.trim());
		lastname = capitalizeFirstLetter(lastname.trim());
		try {
			loading = true;
			err = "";
			const { user, error } = await supabase.auth.signUp(
				{
					email: email,
					password: password,
				},
				{
					data: {
						username: username,
						first_name: firstname,
						last_name: lastname,
					},
				}
			);
			if (error) {
				throw error;
			} else {
				sent = true;
			}
		} catch (error) {
			err = error.error_description || error.message;
		} finally {
			loading = false;
		}
	}
</script>

{#if !sent}
	<div class="hero min-h-screen bg-base-100 p-4">
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<form class="card-body" on:submit|preventDefault={handleSignUp}>
				<h1 class="font-bold">Sign Up</h1>

				<div class="form-control">
					<label class="label" for="email">
						<span class="label-text">Email</span>
					</label>
					<input
						id="email"
						type="email"
						minlength="5"
						maxlength="50"
						placeholder="email"
						class="input input-bordered"
						required
						bind:value={email}
					/>
				</div>

				<div class="form-control">
					<label class="label" for="username">
						<span class="label-text">Username</span>
					</label>
					<input
						id="username"
						type="text"
						minlength="2"
						maxlength="20"
						pattern={String.raw`^[a-zA-Z0-9]+`}
						title="Letters and numbers only."
						placeholder="username"
						class="input input-bordered"
						required
						bind:value={username}
					/>
				</div>

				<div class="form-control">
					<label class="label" for="firstname">
						<span class="label-text">First</span>
					</label>
					<input
						id="firstname"
						type="text"
						minlength="2"
						maxlength="30"
						pattern={String.raw`^[a-zA-Z -]+`}
						title="Letters, spaces and dashes only."
						placeholder="name"
						class="input input-bordered"
						required
						bind:value={firstname}
					/>
				</div>

				<div class="form-control">
					<label class="label" for="lastname">
						<span class="label-text">Last</span>
					</label>
					<input
						id="lastname"
						type="text"
						minlength="2"
						maxlength="30"
						pattern={String.raw`^[a-zA-Z -]+`}
						title="Letters, spaces and dashes only."
						placeholder="name"
						class="input input-bordered"
						required
						bind:value={lastname}
					/>
				</div>

				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input
						id="password"
						type="password"
						minlength="8"
						maxlength="50"
						pattern={String.raw`(?=.*?[0-9])(?=.*?[A-Za-z]).+`}
						title="At least one letter and one number is required."
						placeholder="password"
						class="input input-bordered"
						required
						bind:value={password}
					/>
				</div>

				<label class="label" for="login">
					<a
						href="/app"
						id="login"
						class="label-text-alt link link-hover"
					>
						Already a user? Log In
					</a>
				</label>

				{#if err === 'duplicate key value violates unique constraint "profiles_username_key"'}
					<AlertError error="username is unavailable" />
				{:else if err}
					<AlertError error={err} />
				{/if}

				<div class="form-control mt-6">
					<input
						type="submit"
						class="btn btn-primary"
						value={loading ? "Loading" : "Sign Up"}
						disabled={loading}
					/>
				</div>
			</form>
		</div>
	</div>
{:else}
	<div class="hero min-h-screen bg-base-100">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<p class="py-6">Check your email to complete verification!</p>
				<a href="/app" class="btn btn-primary">Log In</a>
			</div>
		</div>
	</div>
{/if}
