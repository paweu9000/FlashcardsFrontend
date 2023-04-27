<script>
    import axios from "axios";
    import Navbar from "../components/Navbar.svelte";
    import { useNavigate } from "svelte-navigator";
    import { onMount } from "svelte";

    let navigate = useNavigate();

    const myCollections = "http://localhost:3000/api/collection/myCollections";

    let collections = [];
    let savedCollections = [];

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
            collections = response.data[0];
            savedCollections = response.data[1];
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
    <div class="ui divided items">
        <h2>Saved Collections :</h2>
            {#each savedCollections as collection}
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
    margin-top: 20px;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  .ui.divided.items {
    width: 50%;
    text-align: center;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
</style>