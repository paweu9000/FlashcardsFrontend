<script>
    import { Router, Route } from 'svelte-navigator';
    import Home from './routes/Home.svelte';
    import RouteTwo from './routes/RouteTwo.svelte';
	import RegisterParent from './routes/RegisterParent.svelte';
	import EmailVerification from './routes/EmailVerification.svelte';
</script>

<main>
	<Router>
		<Route path="/" component={Home} />
		<Route path="/2" component={RouteTwo} />
		<Route path="/register" component={RegisterParent}/>
		<Route path="/verify/:token" component={EmailVerification}/>
	</Router>
</main>


