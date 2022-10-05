<script>
	import { title, tagline } from "$lib/modules/info.js";
	import { onMount } from "svelte";
	import AlertError from "$lib/components/AlertError.svelte";
	import ResetPassword from "$lib/components/ResetPassword.svelte";
	import Card from "$lib/components/Card.svelte";
	import tiles from "$lib/images/tiles.webp";
	import eventChart from "$lib/images/eventChart.webp";

	let hash;
	let hashType;
	let hashToken;
	let hashError;
	let innerWidth;

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
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={tagline} />
</svelte:head>

<svelte:window bind:innerWidth />

{#if hashType === "recovery"}
	<!-- password recovery -->
	{#if hashToken}
		<ResetPassword token={hashToken} />
	{:else}
		<AlertError error={hashError} />
	{/if}
{:else}
	<div class="hero py-24">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl sm:text-6xl font-bold">
					{title.toLowerCase()}
				</h1>
				<p class="py-6">{tagline}</p>
				<a href="/app" class="btn btn-accent">Get Started</a>
			</div>
		</div>
	</div>

	<div class="hero bg-base-200 fullscreen:rounded-lg p-2 py-12">
		<div class="hero-content grid grid-cols-1 md:grid-cols-2 gap-8">
			<div>
				<h1
					class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pb-6"
				>
					On your mark,
				</h1>
				<p>
					Track all participants in real time with the multi-athlete
					timer.
				</p>
			</div>
			<Card
				isLink={false}
				class="w-fit justify-self-center md:justify-self-start"
			>
				<img
					src={tiles}
					height="450px"
					width="300px"
					alt="Timer tiles"
					class="rounded"
				/>
			</Card>
		</div>
	</div>

	<div class="hero px-2 py-12">
		<div class="hero-content grid grid-cols-1 md:grid-cols-2 gap-8">
			{#if innerWidth > 768}
				<Card
					isLink={false}
					class="w-fit justify-self-center md:justify-self-start"
				>
					<img
						src={eventChart}
						height="309px"
						width="300px"
						alt="Event chart"
						class="rounded"
					/>
				</Card>
			{/if}
			<div>
				<h1
					class="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary pb-6"
				>
					get set,
				</h1>
				<p>Instant analysis after each event.</p>
			</div>
			{#if innerWidth < 768}
				<Card
					isLink={false}
					class="w-fit justify-self-center md:justify-self-start"
				>
					<img
						src={eventChart}
						height="309px"
						width="300px"
						alt="Event chart"
						class="rounded"
					/>
				</Card>
			{/if}
		</div>
	</div>

	<div class="hero py-24 bg-base-200 fullscreen:rounded-lg fullscreen:mb-8">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1
					class="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pb-8"
				>
					go.
				</h1>
				<a href="/app" class="btn">Get Started</a>
			</div>
		</div>
	</div>
{/if}
