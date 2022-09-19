<script>
	let className = "";
	export { className as class };
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 {className}">
	<slot />
</div>
