<script>
    import { onMount } from 'svelte';
    import Register from './Register.svelte';
    import Navbar from '../components/Navbar.svelte';
    import axios from 'axios';
    import SuccessRegister from '../components/SuccessRegister.svelte';
    import {useNavigate} from 'svelte-navigator';

    const navigate = useNavigate();

    const apiAdress = "http://localhost:3000/api/auth/register";

    let verified = false;

    onMount(async () => {
      const storedValue = localStorage.getItem('verified');
      if (storedValue !== null) {
        verified = false;
      }
    })

    const handleRegistration = (formData) => {
      axios.post(apiAdress, {
          login: formData.login,
          username: formData.username,
          email: formData.email,
          password: formData.password
      })
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          verified = true;
        }
      })
      .catch((error) => {
        console.log(error);
      })
    };
</script>

<Navbar />
{#if verified}
  <SuccessRegister />
{/if}
<Register onSubmit={handleRegistration} />

<div class="container">
  <p>Already have an account?</p>
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