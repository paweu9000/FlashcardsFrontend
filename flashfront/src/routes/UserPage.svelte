<script>
    import axios from "axios";
    import Navbar from "../components/Navbar.svelte";
    import { useNavigate } from "svelte-navigator";
    import { onMount } from "svelte";

    let navigate = useNavigate();

    const myCollections = "http://localhost:3000/api/collection/myCollections";

    let collections = [];

    onMount(() => {
        if (localStorage.getItem("token") == null) {
            navigate("/");
        }
        axios.get(myCollections, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            localStorage.setItem("myCollections", response.data);
            collections = response.data;
        })
        .catch(error => {
            console.error(error);
        });
    })

</script>

<Navbar/>
<br>
<div class="container">
    <div class="ui divided items">
        <h2>My Collections :</h2>
            {#each collections as collection}
                <div class="item">
                    <div class="middle aligned content">
                        <button class="massive ui button" on:click={navigate(`/flashcards/${collection.id}`)}>{collection.title}</button>
                    </div>
                </div>
            {/each}
    </div>
</div>
<style>
   .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
</style>