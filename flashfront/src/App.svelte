<script>
    import { Router, Route } from 'svelte-navigator';
    import Home from './routes/Home.svelte';
    import RouteTwo from './routes/RouteTwo.svelte';
</script>

<main>
	<Router>
		<Route path="/" component={Home} />
		<Route path="/2" component={RouteTwo} />
	</Router>
</main>


