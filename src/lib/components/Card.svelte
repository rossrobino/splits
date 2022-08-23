<script>
    export let title = 'Title';
    export let buttonText = 'Button';
    export let buttonLink = '/';
    let className = '';
    export { className as class};
</script>

<div class="card w-96 bg-base-100 shadow-xl {className}" >
    <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p>
            <slot>No content yet.</slot>
        </p>
        <div class="card-actions justify-end">
            <a href={buttonLink} class="btn btn-primary">{buttonText}</a>
        </div>
    </div>
</div>