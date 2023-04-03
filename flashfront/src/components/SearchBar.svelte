<script>
    import axios from "axios";
    import { useNavigate } from "svelte-navigator";

    const navigate = useNavigate();

    const collectionApi = "http://localhost:3000/api/collection/search/";

    let input = "";

    let content = [];

    function search() {
        axios.get(collectionApi + input, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
            content = response.data;
        }).catch(error => {
            console.log(error);
        })

        jQuery('.ui.search').search({
            source: content,
            onSelect: function(result, response) {
                navigate(`/flashcards/${result.id}`, {replace: true, reload: true});
                location.reload();
            }
        })
    }

</script>

<div class="ui search">
    <i class="copy icon"></i>
    <div class="ui toggle checkbox">
        <input type="checkbox" name="public">
        <label></label>
    </div>
    <i class="user icon"></i>
    <div class="ui icon input">
      <input class="prompt" id="input" type="text" placeholder="Search" bind:value={input} on:input={search}>
      <i class="search icon"></i>
    </div>
    <div class="results">
    </div>
</div>

<style>
    .ui.search {
        margin-left: 20%;
    }
</style>
