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

	<div class="hero bg-base-200 rounded-lg p-2">
		<div class="hero-content flex-col lg:flex-row gap-12">
			<div class="mt-8">
				<h1
					class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pb-1"
				>
					On your mark,
				</h1>
				<p class="pt-6">
					Track all participants at once with the multi-athlete timer.
				</p>
			</div>
			<Card isLink={false}>
				<img
					src={tiles}
					height="400px"
					width="266px"
					alt="Timer tiles"
					class="rounded"
				/>
			</Card>
		</div>
	</div>

	<div class="hero p-2 my-12">
		<div class="hero-content flex-col lg:flex-row gap-12">
			<Card isLink={false}>
				<img
					src={eventChart}
					height="400px"
					width="388px"
					alt="Event chart"
					class="rounded"
				/>
			</Card>
			<div>
				<h1
					class="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary pb-1"
				>
					get set,
				</h1>
				<p class="py-6">Get instant analysis after each event.</p>
			</div>
		</div>
	</div>

	<div class="hero py-24 bg-base-200 rounded-lg">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pb-1">go.</h1>
				<p class="py-6">Create an account to get started today.</p>
				<a href="/app" class="btn" >Get Started</a>
			</div>
		</div>
	</div>
{/if}
