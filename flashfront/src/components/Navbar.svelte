<script>
  import {useNavigate} from "svelte-navigator";

  const navigate = useNavigate();

</script>

<nav>
    <div class="navbar-brand">Flashcards</div>
	  <div class="navbar-menu">
		  <button on:click="{() => navigate('/')}" class="navbar-button">
			  Home
		  </button>
      <button on:click="{() => navigate('/2')}" class="navbar-button">
			  PageTwo
		  </button>
      <button on:click="{() => navigate('/register')}" class="navbar-button">
			  Register
		  </button>
      <button on:click="{() => navigate('/login')}" class="navbar-button">
			  Login
		  </button>
	  </div>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f0f0f0;
  }

  .navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .navbar-menu {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .navbar-item {
    margin-right: 1rem;
    text-decoration: none;
    color: #333;
  }

  .navbar-item:hover {
    color: #666;
  }
  .navbar-button {
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  padding: 5px 10px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.navbar-button:hover {
  background-color: #333;
  color: #fff;
  cursor: pointer;
}
</style>