<script>
    import Navbar from "../components/Navbar.svelte";
    import { useParams } from "svelte-navigator";

    const params = useParams();
    const id = $params.id;
</script>


<Navbar/>
<h1>Id = {id}</h1>