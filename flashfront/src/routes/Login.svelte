<script>
    import LoginForm from "../components/LoginForm.svelte";
    import axios from "axios";
    import Navbar from "../components/Navbar.svelte";
    import {useNavigate} from "svelte-navigator";

    const navigate = useNavigate();

    const apiAdress = "http://localhost:3000/api/authenticate";

    const handleLogin = (formData) => {
      axios.post(apiAdress, {
          emailOrLogin: formData.loginOrEmail,
          password: formData.password
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
            const token = response.headers.authorization.split(" ")[1];
            console.log(token);
            localStorage.setItem("token", token);
            navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      })
    };

</script>

<Navbar/>
<LoginForm onSubmit={handleLogin}/>
<p>Don't have an account?</p>
<button on:click="{() => navigate('/register')}">
    Register
</button>