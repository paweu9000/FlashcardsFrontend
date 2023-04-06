<script>
	import Navbar from "../components/Navbar.svelte";
	import Error from "../components/Error.svelte";
    import { onDestroy, onMount } from "svelte";

	let errors = [];
	onMount(() => {
		errors = localStorage.getItem("error");
	})
	onDestroy(() => {
		localStorage.removeItem("error");
	})
	
</script>

<Navbar></Navbar>

<center>
	{#if errors != null}
		<Error errorValue={errors}/>
	{/if}
	<h1>Home page</h1>
</center>


<style>

	h1 {
		color: #4bce68;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

</style>