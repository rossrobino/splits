<script>
    export let value = 0;
    export let units = "units";
</script>

<div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-4xl xs:text-5xl sm:text-6xl">
        <span style="--value:{value};" />
    </span>
    <span class="sm:text-xl">{units}</span>
</div>
