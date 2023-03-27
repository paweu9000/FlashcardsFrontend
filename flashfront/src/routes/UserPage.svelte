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
<div class="ui two column centered grid">
    <h2>My Collections :</h2>
    <br>
        <div class="four column centered row">
            {#each collections as collection}
                <div class="column">
                    <button class="massive ui button" on:click={navigate(`/flashcards/${collection.id}`)}>{collection.title}</button>
                </div>
            {/each}
    </div>
</div>

<style>
   
</style>