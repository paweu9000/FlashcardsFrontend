<script>
    import Navbar from "../components/Navbar.svelte";
    import { useParams } from "svelte-navigator";
    import { onMount } from "svelte";
    import axios from "axios";
    import jdenticon from 'jdenticon';

    const params = useParams();
    const id = $params.id;
    const userApi = "http://localhost:3000/api/user/";

    let profile = {
        username: "",
        collections: []
    }

    onMount(() => {
        axios.get(userApi + id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            const data = response.data;
            profile.username = data.username;
            profile.collections = data.collections;
            const canvas = document.getElementById("myIcon");
            jdenticon.drawIcon(canvas.getContext('2d'), profile.username);
        }).catch(error => {
            console.log(error);
        })
    })
</script>


<Navbar/>
<div class="container">
    <div class="ui card transition visible" style="display: flex !important; align-items: center;">
        <div class="image">
            <canvas width="80" height="80" id="myIcon"></canvas>
        </div>
        <div class="content">
            <p>{profile.username}</p>
        </div>
        <div class="extra content">
            <div class="ui bulleted link list">
                {#each profile.collections as collection}
                    <p class="item">{collection.title}</p>
                {/each}
            </div>
        </div>
    </div>
</div>
    
    <!-- <h1></h1>
    <div>
        <p>Collections</p>
        <div class="ui bulleted link list">
            {#each profile.collections as collection}
                <p class="item">{collection}</p>
            {/each}
        </div>
    </div>
</div> -->

<style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
</style>