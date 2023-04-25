<script>
    import { Router, Route } from 'svelte-navigator';
    import Home from './routes/Home.svelte';
	import RegisterParent from './routes/RegisterParent.svelte';
	import EmailVerification from './routes/EmailVerification.svelte';
	import Login from './routes/Login.svelte';
    import CreateCollection from './routes/CreateCollection.svelte';
	import UserPage from './routes/UserPage.svelte';
    import Flashcards from './routes/Flashcards.svelte';
	import Profile from './routes/Profile.svelte';
    import Test from './routes/Test.svelte';
</script>

<main>
	<Router>
		<Route path="/" component={Home} />
		<Route path="/register" component={RegisterParent}/>
		<Route path="/login" component={Login}/>
		<Route path="/addcards" component={CreateCollection}/>
		<Route path="/verify/:token" component={EmailVerification}/>
		<Route path="/user" component={UserPage}/>
		<Route path="/flashcards/:id" component={Flashcards}/>
		<Route path="/profile/:id" component={Profile}/>
		<Route path="/test/:collectionId" component={Test}/>
	</Router>
</main>


