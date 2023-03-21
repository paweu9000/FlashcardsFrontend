<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { useParams, useNavigate } from 'svelte-navigator';

    const navigate = useNavigate();
    const token  = useParams();
    const toVerify = $token.token;
    console.log(toVerify);
    const apiAdress = "http://localhost:3000/api/verify?token=";

    onMount(async () => {
      axios.post(apiAdress + toVerify)
        .then((response) => {
        console.log(response);
        if (response.status == 200) {
          console.log("Verified");
        }
      })
      .catch((error) => {
        console.log(error);
      })
    })
</script>

<h2 class="email-popup">Email verified succesfully</h2>

<p>You can now login</p>
<button on:click="{() => navigate('/login')}">
  Login
</button>

<style>
.email-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #8BC34A;
  color: #fff;
  padding: 1rem;
  border-radius: 5px;
  z-index: 1000;
}

.email-popup p {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}
</style>