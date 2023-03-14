<script>
    import {useNavigate} from "svelte-navigator";

    const navigate = useNavigate();

</script>

<nav>
    <button on:click="{() => navigate('/2')}"> Page two </button>
</nav>
<h1>Home page</h1>

<style>

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

</style>