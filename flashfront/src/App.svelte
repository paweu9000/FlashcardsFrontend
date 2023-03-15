<script>
    import { Router, Route } from 'svelte-navigator';
    import Home from './routes/Home.svelte';
    import RouteTwo from './routes/RouteTwo.svelte';
	import RegisterParent from './routes/RegisterParent.svelte';
</script>

<main>
	<Router>
		<Route path="/" component={Home} />
		<Route path="/2" component={RouteTwo} />
		<Route path="/register" component={RegisterParent}/>
	</Router>
</main>


