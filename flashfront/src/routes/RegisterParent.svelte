<script>
    import { onMount } from 'svelte';
    import Register from './Register.svelte';
    import Navbar from '../components/Navbar.svelte';
    import axios from 'axios';
    import SuccessRegister from '../components/SuccessRegister.svelte';
    import {useNavigate} from 'svelte-navigator';
    import Error from '../components/Error.svelte';

    const navigate = useNavigate();

    const apiAdress = "http://localhost:3000/api/auth/register";

    let verified = false;

    let errors = [];

    onMount(async () => {
      const storedValue = localStorage.getItem('verified');
      if (storedValue !== null) {
        verified = false;
      }
    })

    function formValid(formData) {
      errors = [];
      if(formData.login.length > 30 || formData.login.length < 2) errors.push("Login length must be between 2 and 30 characters.");
      if(formData.username.length > 30 || formData.username.length < 2) errors.push("Username length must be between 2 and 30 characters.");
      if(formData.password.length < 6) errors.push("Password length must be at least 6 characters.");
    }

    const handleRegistration = (formData) => {
      formValid(formData);
      if (errors.length == 0) {
        axios.post(apiAdress, {
          login: formData.login,
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
        .then((response) => {
          if (response.status == 201) {
            verified = true;
          }
        })
        .catch((error) => {
          console.log(error);
        })
      }
    };
</script>

<Navbar />
{#if verified}
  <SuccessRegister />
{/if}
{#if !verified && errors.length > 0}
  {#each errors as error}
  <div class="container">
    <Error errorValue={error}/>
  </div>
  {/each }
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