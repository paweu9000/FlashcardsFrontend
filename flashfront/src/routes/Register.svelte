<script>
    export let onSubmit;
    
    let login = '';
    let username = '';
    let email = '';
    let password = '';
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit({ login, username, email, password });
    };
</script>
  
<form on:submit={handleSubmit}>
    <label>
        Login:
        <input type="text" bind:value={login} required>
      </label>

    <label>
      Username:
      <input type="text" bind:value={username} required>
    </label>
  
    <label>
      Email:
      <input type="email" bind:value={email} required>
    </label>
  
    <label>
      Password:
      <input type="password" bind:value={password} required>
    </label>
  
    <button type="submit">Register</button>
</form>