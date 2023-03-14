<script>
    import {useNavigate} from "svelte-navigator";

    const navigate = useNavigate();

</script>

<nav>
    <button on:click="{() => navigate('/')}"> Home </button>
</nav>

<h1>Test route 2</h1>

<style>

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

</style>