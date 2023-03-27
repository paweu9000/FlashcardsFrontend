<script>
  import {useNavigate} from "svelte-navigator";
  import {onMount} from 'svelte';

  const navigate = useNavigate();

  let isLoggedIn = localStorage.getItem("token");

  onMount(() => {
    if(isLoggedIn !== null) {
      const decodedToken = JSON.parse(atob(isLoggedIn.split('.')[1]));
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      if(currentTime > expirationTime) {
        handleLogout();
      }
    }
  })

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    isLoggedIn = localStorage.getItem("token");
    navigate('/');
  }
</script>

<nav class="ui navbar menu">
  <div class="navbar-brand">
    <p class="navbar-item">
      <img src="/logo.png" width="162" height="46" alt="">
    </p>
  </div>
  <button style="margin-left: 20px" on:click="{() => navigate('/')}" class="ui green button">
    Home
  </button>
  {#if isLoggedIn != null}
      <button on:click="{() => navigate('/addcards')}" class="ui green button">
        Add Cards
      </button>

      <button on:click="{() => navigate('/user')}" class="ui green button">
        User Info
      </button>
  {/if}
  <div class="right menu">
    {#if isLoggedIn == null}
          <button on:click="{() => navigate('/register')}" class="ui teal button">
            <strong>Sign up</strong>
          </button>
          <button on:click="{() => navigate('/login')}" class="ui blue button">
            Log in
          </button>
    {/if}
    {#if isLoggedIn != null}
          <button on:click={handleLogout} class="ui red button">
            <strong>Logout</strong>
          </button>
    {/if}
  </div>
</nav>

<style>
  .navbar {
    background-color: #f9f9f9;
    border-bottom: 1px solid #ddd;
    padding: 1rem;
  }

  .navbar .menu {
    margin: 0;
  }

  .navbar .item {
    font-weight: bold;
    color: #333;
  }

  .navbar .item.active {
    background-color: #fff;
    color: #2185d0;
    border: 1px solid #ddd;
    border-bottom: none;
    border-radius: 0.25rem 0.25rem 0 0;
  }
</style>