<script>
    export let onSubmit;
    
    let loginOrEmail = '';
    let password = '';
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit({ login, username, email, password });
    };
</script>
  
<form on:submit={handleSubmit}>
    <label>
        Login:
        <input type="text" bind:value={loginOrEmail} required>
    </label>
  
    <label>
      Password:
        <input type="password" bind:value={password} required>
    </label>
  
    <button type="submit">Login</button>
</form>