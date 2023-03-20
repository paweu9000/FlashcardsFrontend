<script>
    import LoginForm from "../components/LoginForm.svelte";
    import axios from "axios";
    import Navbar from "../components/Navbar.svelte";
    import {useNavigate} from "svelte-navigator";

    const navigate = useNavigate();

</script>

<Navbar/>
<LoginForm/>
<p>Don't have an account?</p>
<button on:click="{() => navigate('/register')}">
    Register
</button>