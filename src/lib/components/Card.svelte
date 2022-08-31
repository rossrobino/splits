<script>
    export let title = 'title';
    export let buttonText = ''; // controls if button is visible -- if text entered
    export let buttonLink = '/';
    let className = '';
    export { className as class};
    export let buttonClass = '';
</script>

<div class="card bg-base-100 shadow-xl {className}" >
    <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <div>
            <slot>props / title, buttonText, buttonLink, buttonClass<br>slot / </slot>
        </div>
        {#if buttonText}
            <div class="card-actions justify-end">
                <a href={buttonLink} class="btn {buttonClass}">{buttonText}</a>
            </div>
        {/if}
    </div>
</div>