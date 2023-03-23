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
    <h2>My Collections :</h2>
        <div>
            {#each collections as collection}
                <div>
                    <button>{collection.title}</button>
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
    }
    
    h2 {
      font-size: 24px;
      margin-bottom: 20px;
    }
    
    button {
      background-color: #f5f5f5;
      border: none;
      border-radius: 5px;
      color: #333;
      font-size: 16px;
      padding: 10px 20px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    button:hover {
      background-color: #ddd;
    }
  </style>