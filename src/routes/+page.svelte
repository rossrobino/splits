<script>
	import { title, tagline } from "$lib/modules/info.js";
	import { onMount } from "svelte";
	import { fly, fade } from "svelte/transition";
	import { theme } from "$lib/sessionStore";
	import AlertError from "$lib/components/AlertError.svelte";
	import ResetPassword from "$lib/components/ResetPassword.svelte";
	import Card from "$lib/components/Card.svelte";
	import tiles from "$lib/images/tiles.webp";
	import tilesDark from "$lib/images/tiles-dark.webp";
	import eventChart from "$lib/images/eventChart.webp";
	import eventChartDark from "$lib/images/eventChart-dark.webp";

	let hash;
	let hashType;
	let hashToken;
	let hashError;

	let innerWidth;
	let innerHeight;
	let scrollY;
	let duration = 500;
	let fadeDuration = 1000;
	let showHero2 = false;
	let showHero3 = false;
	let showHero4 = false;

	onMount(async () => {
		// password reset
		if (window.location.hash) {
			// hash exists
			hash = new URLSearchParams(window.location.hash.substring(1));
			if (hash) {
				if (hash.get("error_description")) {
					hashError = hash.get("error_description");
				} else {
					hashType = hash.get("type");
					hashToken = hash.get("access_token");
				}
			}
		}
	});

	$: if (innerWidth < 768) fadeDuration = 2000;
	$: if (scrollY > 50) showHero2 = true;
	$: if (scrollY > 800) showHero3 = true;
	$: if (scrollY > 1000) showHero4 = true;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={tagline} />
</svelte:head>

<svelte:window bind:innerWidth bind:innerHeight bind:scrollY />

{#if hashType === "recovery"}
	<!-- password recovery -->
	{#if hashToken}
		<ResetPassword token={hashToken} />
	{:else}
		<AlertError error={hashError} />
	{/if}
{:else}
	{#if innerHeight}
		<div
			class="bg-primary p-1 w-64 md:w-[32rem] h-56 md:h-72 rounded-full fixed"
			style="
				left: {(scrollY * innerWidth) / 600 / 5 + innerWidth / 8}px; 
				top: {-scrollY / 10 + innerHeight / 2.2}px;
			"
		/>
		<div
			class="bg-accent p-1 w-64 md:w-[32rem] h-56 md:h-72 rounded-full fixed"
			style="
				right: {(scrollY * innerWidth) / 600 / 5 + innerWidth / 8}px; 
				top: {-scrollY / 4 + innerHeight / 1.5}px;
			"
		/>
		<div
			class="bg-secondary p-1 w-64 md:w-[32rem] h-56 md:h-72 rounded-full fixed"
			style="
				right: {(-scrollY * innerWidth) / 600 / 20 + innerWidth / 2.5}px; 
				top: {-scrollY / 2.5 + innerHeight * 0.85}px;"
		/>
	{/if}
	<div class="backdrop-blur-[130px] md:backdrop-blur-[220px] text-accent-content">
		<section class="hero py-52">
			<div class="hero-content text-center ">
				<div class="max-w-md">
					<h1 class="text-5xl sm:text-6xl font-bold">
						{title.toLowerCase()}
					</h1>
					<p class="py-6">{tagline}</p>
					<a href="/app" class="btn text-primary-content">
						Get Started
					</a>
				</div>
			</div>
		</section>

		<section class="hero p-2 py-12">
			<div class="hero-content grid grid-cols-1 md:grid-cols-2 gap-8">
				<div class="h-32">
					{#if showHero2}
						<div in:fly={{ x: -400, duration }}>
							<h2 class="text-4xl font-bold pb-6">
								On your mark,
							</h2>
							<p>
								Track all participants in real time with the
								multi-athlete timer.
							</p>
						</div>
					{/if}
				</div>
				<Card
					isLink={false}
					class="w-fit justify-self-center md:justify-self-start bg-base-100 opacity-90 bg-opacity-70"
				>
					<img
						src={$theme === "light" ? tiles : tilesDark}
						height="450px"
						width="300px"
						alt="Timer tiles"
						class="rounded"
					/>
				</Card>
			</div>
		</section>

		<section class="hero px-2 py-12">
			<div class="hero-content grid grid-cols-1 md:grid-cols-2 gap-8">
				{#if innerWidth > 768}
					<Card
						isLink={false}
						class="w-fit justify-self-center md:justify-self-start bg-base-100 opacity-90 bg-opacity-70"
					>
						<img
							src={$theme === "light"
								? eventChart
								: eventChartDark}
							height="309px"
							width="300px"
							alt="Event chart"
							class="rounded"
						/>
					</Card>
					<div class="h-32">
						{#if showHero3}
							<div in:fly={{ x: 400, duration }}>
								<h2 class="text-6xl font-bold pb-6">
									get set,
								</h2>
								<p>Instant analysis after each event.</p>
							</div>
						{/if}
					</div>
				{:else}
					<div class="h-32">
						{#if showHero3}
							<div in:fly={{ x: 400, duration }}>
								<h2 class="text-6xl font-bold pb-6">
									get set,
								</h2>
								<p>Instant analysis after each event.</p>
							</div>
						{/if}
					</div>

					<Card
						isLink={false}
						class="w-fit justify-self-center md:justify-self-start bg-base-100 opacity-90 bg-opacity-70"
					>
						<img
							src={$theme === "light"
								? eventChart
								: eventChartDark}
							height="309px"
							width="300px"
							alt="Event chart"
							class="rounded"
						/>
					</Card>
				{/if}
			</div>
		</section>

		<section class="hero py-24">
			<div class="hero-content text-center">
				{#if showHero4}
					<div class="max-w-md">
						<h2
							class="text-8xl font-bold pb-8"
							in:fade={{ duration: fadeDuration }}
						>
							go.
						</h2>
						<a href="/app" class="btn text-primary-content">
							Get Started
						</a>
					</div>
				{:else}
					<div class="p-12" />
				{/if}
			</div>
		</section>
	</div>
{/if}
