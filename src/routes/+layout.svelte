<script>
	import "../app.postcss";
	import NavBar from "$lib/components/NavBar/NavBar.svelte";
	import Footer from "$lib/components/Footer/Footer.svelte";
	import { user, userProfile, theme } from "$lib/sessionStore";
	import { supabase } from "$lib/modules/supabaseClient";

	user.set(supabase.auth.user());
	if ($user) {
		setUserProfile();
	}

	supabase.auth.onAuthStateChange((state, session) => {
		if (state == "SIGNED_IN") {
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
			.select(`id, username, first_name, last_name`)
			.eq("id", user?.id)
			.single();
		if (error) throw new Error(error.message);
		userProfile.set(data);
	}
</script>

<svelte:head>
	<!-- Google tag (gtag.js) -->
	<script
		async
		src="https://www.googletagmanager.com/gtag/js?id=G-178DY6T8JQ"
	></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag("js", new Date());
		gtag("config", "G-178DY6T8JQ");
	</script>
</svelte:head>

<div
	data-theme={$theme}
	class="
    flex 
    flex-col 
    justify-between 
    min-h-screen 
    min-w-[270px]
    vp-dyn
	selection:bg-primary
	selection:text-primary-content
    "
>
	<div>
		<header>
			<NavBar />
		</header>
		<main class="overflow-hidden">
			<slot />
		</main>
	</div>
	<Footer />
</div>
