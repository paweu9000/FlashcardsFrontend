<script>
    export let onSubmit;
    
    let loginOrEmail = '';
    let password = '';
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onSubmit({ loginOrEmail, password });
    };
</script>

<form class="ui large form" on:submit={handleSubmit}>
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" bind:value={loginOrEmail} placeholder="E-mail address">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" bind:value={password} placeholder="Password">
          </div>
        </div>
        <button class="ui fluid large teal submit button" type="submit">Login</button>
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

</style>