<script>
    import LoginForm from "../components/LoginForm.svelte";
    import axios from "axios";
    import Navbar from "../components/Navbar.svelte";
    import {useNavigate} from "svelte-navigator";

    const navigate = useNavigate();

    const apiAdress = "http://localhost:3000/api/authenticate";
    const userApiAdress = "http://localhost:3000/api/user";

    const handleLogin = (formData) => {
      axios.post(apiAdress, {
          emailOrLogin: formData.loginOrEmail,
          password: formData.password
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
            const token = response.headers.authorization.split(" ")[1];
            localStorage.setItem("token", token);
            axios.get(userApiAdress, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            }).then(response => {
              localStorage.setItem("user", JSON.stringify(response.data));
            }).catch(error => {
              console.log(error);
            })
            navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      })
    };

</script>

<Navbar/>
<div class="ui middle aligned center aligned grid">
  <div class="column">
    <h2 class="ui teal image header">
      <div class="content">
        Log-in to your account
      </div>
    </h2>
    <LoginForm onSubmit={handleLogin}/>
    <div class="ui message">
      Don't have an account?
      <button class="mini ui button" on:click="{() => navigate('/register')}">
        Register
      </button>
    </div>
  </div>
</div>

