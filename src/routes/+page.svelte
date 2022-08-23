<script>
    import { title, tagline } from '$lib/modules/info.js';
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={tagline} />
</svelte:head>


<div class="hero bg-base-100 py-24">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">{title}</h1>
        <p class="py-6">{tagline}</p>
        <a href="/signup" class="btn btn-primary">Get Started</a>
      </div>
    </div>
</div>