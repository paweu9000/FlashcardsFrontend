<script>
    import { Router, Route } from 'svelte-navigator';
    import Home from './routes/Home.svelte';
    import RouteTwo from './routes/RouteTwo.svelte';
	import RegisterParent from './routes/RegisterParent.svelte';
	import EmailVerification from './routes/EmailVerification.svelte';
	import Login from './routes/Login.svelte';
</script>

<main>
	<Router>
		<Route path="/" component={Home} />
		<Route path="/2" component={RouteTwo} />
		<Route path="/register" component={RegisterParent}/>
		<Route path="/login" component={Login}/>
		<Route path="/verify/:token" component={EmailVerification}/>
	</Router>
</main>


