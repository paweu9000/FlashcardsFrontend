<script>
    import { onMount } from "svelte";
    import Navbar from "../components/Navbar.svelte";
    import { useParams, useNavigate } from "svelte-navigator";
    import axios from "axios";
    
    const params = useParams();
    const navigate = useNavigate();
    const id = $params.collectionId;
    const testApi = "http://localhost:3000/api/test/";
    let test = {
        collectionId: '',
        id: '',
        questions: []
    }

    onMount(() => {
        axios.get(testApi + id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            test = response.data;
            console.log(test);
        }).catch(error => {
            console.log(error);
            navigate("/");
        })
    })

</script>

<Navbar/>

<br>

<div class="container">
    <h2>Test {id}</h2>
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