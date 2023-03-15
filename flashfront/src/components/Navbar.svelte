<script>
  import {useNavigate} from "svelte-navigator";

  const navigate = useNavigate();

</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
	<div id="navbarBasicExample" class="navbar-menu">
		<div class="navbar-start">
		  <button on:click="{() => navigate('/')}" class="navbar-item">
			  Home
		  </button>
      <button on:click="{() => navigate('/2')}" class="navbar-item">
			  PageTwo
		  </button>
		</div>
	</div>
  
    <!-- <button on:click="{() => navigate('/')}"> Home </button> -->
</nav>