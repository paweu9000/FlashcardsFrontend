<script>
    import Navbar from "../components/Navbar.svelte";
    import { useParams } from "svelte-navigator";
    import { onMount } from "svelte";
    import axios from "axios";

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
        }).catch(error => {
            console.log(error);
        })
    })
</script>


<Navbar/>
<h1>{profile.username}</h1>