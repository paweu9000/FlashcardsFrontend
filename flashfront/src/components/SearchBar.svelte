<script>
    import axios from "axios";
    import { useNavigate } from "svelte-navigator";

    const navigate = useNavigate();

    const collectionApi = "http://localhost:3000/api/collection/search/";
    const userApi = "http://localhost:3000/api/user/search/";

    let input = "";

    let isCollection = true;

    let content = [];

    function search() {
        if (isCollection) {
            axios.get(collectionApi + input, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => {
                content = response.data;
                console.log(content);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                jQuery('.ui.search').search({
                source: content.map(collection => ({title: collection.title})),
                minCharacters: 0,
                maxResults: 20,
                searchFields: ['title'],
                onSelect: function(result, response) {
                    navigate(`/flashcards/${result.id}`, {replace: true, reload: true});
                    location.reload();
                }
            })
            })
        } else {
            axios.get(userApi + input, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => {
                content = response.data;
                console.log(content);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                jQuery('.ui.search').search({
                    source: content.map(user => ({title: user.username})),
                    minCharacters: 0,
                    maxResults: 20,
                    searchFields: ['title'],
                onSelect: function(result, response) {
                    console.log(result.id);
                    navigate(`/profile/${result.id}`, {replace: true, reload: true});
                    location.reload();
                }
            })
            })
        }
    }

    function slide() {
        input = "";
        isCollection = !isCollection;
    }

</script>

<div class="ui search">
    <i class="copy icon"></i>
    <div class="ui toggle checkbox">
        <input type="checkbox" name="public" id="check_id" on:click={slide}>
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
