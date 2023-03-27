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

<form class="ui large form" on:submit={handleSubmit}>
  <div class="ui stacked segment">
    <div class="field">
      <div class="ui left icon input">
        <i class="user icon"></i>
        <input min=2 max=30 type="text" bind:value={login} placeholder="Login">
      </div>
    </div>
    <div class="field">
      <div class="ui left icon input">
        <i class="child icon"></i>
        <input min=2 max=30 type="text" bind:value={username} placeholder="Username">
      </div>
    </div>
    <div class="field">
      <div class="ui left icon input">
        <i class="envelope icon"></i>
        <input type="email" bind:value={email} placeholder="E-mail Adress">
      </div>
    </div>
    <div class="field">
      <div class="ui left icon input">
        <i class="lock icon"></i>
        <input min=6 type="password" bind:value={password} placeholder="Password">
      </div>
    </div>
    <button class="ui fluid large teal submit button" type="submit">Register</button>
  </div>

  <div class="ui error message"></div>

</form>

<style>
  form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;
  }

  input {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      margin-left: 10px;
  }
</style>