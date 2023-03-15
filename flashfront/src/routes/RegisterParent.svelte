<script>
    import Register from './Register.svelte';
    import Navbar from '../components/Navbar.svelte';
  
    const handleRegistration = (formData) => {
      console.log(formData);
    };
</script>
  
<Navbar />
<Register onSubmit={handleRegistration} />