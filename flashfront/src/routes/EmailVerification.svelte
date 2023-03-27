<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { useParams, useNavigate } from 'svelte-navigator';
    import Navbar from '../components/Navbar.svelte';

    const navigate = useNavigate();
    const token  = useParams();
    const toVerify = $token.token;
    console.log(toVerify);
    const apiAdress = "http://localhost:3000/api/verify?token=";

    onMount(async () => {
      axios.post(apiAdress + toVerify)
        .then((response) => {
        console.log(response);
        if (response.status == 200) {
          console.log("Verified");
        }
      })
      .catch((error) => {
        console.log(error);
      })
    })
</script>

<Navbar/>
<br>

<div class="container">
  <p>Email verified succesfully!</p>
  <button on:click="{() => navigate('/login')}">
    Login
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