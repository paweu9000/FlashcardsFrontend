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
              console.log(response.data);
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
<LoginForm onSubmit={handleLogin}/>
<div class="container">
  <p>Don't have an account?</p>
  <button on:click="{() => navigate('/register')}">
      Register
  </button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  button {
    background-color: #222;
    color: #fff;
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #444;
  }

</style>
