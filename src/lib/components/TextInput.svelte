<script>
	export let label = "label";
	export let placeholder = label;
	export let id = "inputId";
	export let value = "";
</script>

<div class="mb-4">
	<label for={id} class="label">
		<span class="label-text">{label}</span>
	</label>
	<input
		{id}
		type="text"
		minlength="1"
		maxlength="40"
		{placeholder}
		bind:value
		class="input input-bordered w-full max-w-md"
	/>
</div>
