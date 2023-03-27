<script>
    import { onMount } from "svelte";
    import Navbar from "../components/Navbar.svelte";
    import {useNavigate} from "svelte-navigator";
    import axios from "axios";

    const navigate = useNavigate();
    const collectionApi = "http://localhost:3000/api/collection";
    const cardApi = "http://localhost:3000/api/cards";

    let flashcards = [{ side: "", value: "", collectionId: "", creatorId: "" }];

    let title = "";

    onMount(() => {
        if(localStorage.getItem("token") == null) {
            navigate("/");
        }
    })

    function addFlashcard() {
        flashcards = [...flashcards, { side: "", value: "", collectionId: "", creatorId: "" }];
    }

    function saveFlashcards() {
        axios.post(collectionApi, {
                'title': title,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            const ids = response.data.split(" ");
            flashcards.forEach(flashcard => {
                flashcard.collectionId = ids[0];
                flashcard.creatorId = ids[1];
            })
            axios.post(cardApi + `/${ids[0]}/all`, flashcards, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                navigate(`/flashcards/${ids[0]}`);
            })
            .catch(error => {
                console.error(error);
            });
        })
        .catch(error => {
            console.error(error);
        });
    }

    function deleteFlashcard(index) {
        if(flashcards.length > 1) {
            flashcards = flashcards.filter((_, i) => i !== index);
        }
    }

</script>

<Navbar/>
<div class="flashcards-container">
    <div style="margin-top: 8px; margin-bottom: 8px">
        <label>
            Collection Title:
            <input minlength="1" bind:value={title} placeholder="{title}">
        </label>
    </div>
    {#each flashcards as flashcard, i}
        <div class="flashcard">
            <button class="ui red button" on:click={() => deleteFlashcard(i)}>
                <i class="archive icon"></i>
            </button>
            <br>
            <br>
            <label>Term:
                <input minlength="1" bind:value={flashcard.side} placeholder="{flashcard.side}">
            </label>
            <label>Definition:
                <input minlength="1" bind:value={flashcard.value} placeholder="{flashcard.value}">
            </label>
        </div>
    {/each}
    <div>
        <button class="ui active button" on:click={addFlashcard}>
            <i class="plus circle icon"></i>
            Add Flashcard
        </button>
        {#if flashcards.length > 1 && title.length >= 1}
            <button class="ui active button" on:click={saveFlashcards}>
                <i class="save icon"></i>
                Save Flashcards
            </button>
        {/if}
    </div>
</div>
<br>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    .flashcards-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .flashcard {
        display: inline-block;
        margin: 10px;
        padding: 20px;
        width: 600px;
        height: 230px;
        border-radius: 10px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
    }
    label {
        font-size: 20px;
        margin-bottom: 10px;
        font-family: 'Roboto', sans-serif;
    }

    input {
        padding: 5px 10px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 20px;
    }

    input:focus {
        outline: none;
        box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
        border-color: blue;
    }
</style>