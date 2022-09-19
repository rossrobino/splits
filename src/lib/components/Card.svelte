<script>
    export let title = "title";
    export let buttonText = ""; // controls if button is visible -- if text entered
    export let buttonLink = "/";
    let className = "";
    export { className as class };
    export let buttonClass = "";
	export let cardClick = () => {};
</script>

<div class="card bg-base-100 shadow-xl {className}" on:click={cardClick}>
    <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <div>
            <slot
                >props / title, buttonText, buttonLink, buttonClass<br />slot /
            </slot>
        </div>
        {#if buttonText}
            <div class="card-actions justify-end">
                <a href={buttonLink} class="btn {buttonClass}">{buttonText}</a>
            </div>
        {/if}
    </div>
</div>
