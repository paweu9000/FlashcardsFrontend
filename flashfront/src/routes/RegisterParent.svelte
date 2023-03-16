<script>
    import { onMount } from 'svelte';
    import Register from './Register.svelte';
    import Navbar from '../components/Navbar.svelte';
    import axios from 'axios';
    import SuccessRegister from '../components/SuccessRegister.svelte';

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