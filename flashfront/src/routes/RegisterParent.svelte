<script>
    import Register from './Register.svelte';
    import Navbar from '../components/Navbar.svelte';
    import axios from 'axios';

    const apiAdress = "http://localhost:3000/api/auth/register";

    const handleRegistration = (formData) => {
      axios.post(apiAdress, {
          login: formData.login,
          username: formData.username,
          email: formData.email,
          password: formData.password
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    };
</script>
  
<Navbar />
<Register onSubmit={handleRegistration} />