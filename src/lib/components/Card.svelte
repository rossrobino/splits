<script>
	import { goto } from "$app/navigation";
	export let title = "title";
	export let cardLink = "/";
	export let isLink = true;
	let className = "";
	export { className as class };
	export let cardClick = () => {
		if (isLink) goto(cardLink);
	};
</script>

<div
	class="
		card bg-base-100 shadow-xl
		{isLink
		? 'hover:cursor-pointer active:scale-[0.98] transform transition duration-200 active:brightness-95'
		: ''} 
		{className}
	"
	on:click={cardClick}
>
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<div>
			<slot>
				props / title, buttonText, buttonLink, buttonClass
				<br />
				slot /
			</slot>
		</div>
	</div>
</div>
