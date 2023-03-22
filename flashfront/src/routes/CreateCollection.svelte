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
                navigate("/");
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
            <button class="close-button" on:click={() => deleteFlashcard(i)}>X</button>
            <label>Term:
                <input minlength="1" bind:value={flashcard.side} placeholder="{flashcard.side}">
            </label>
            <label>Definition:
                <input minlength="1" bind:value={flashcard.value} placeholder="{flashcard.value}">
            </label>
        </div>
    {/each}
    <div>
        <button class="button-29" on:click={addFlashcard}>Add Flashcard</button>
        {#if flashcards.length > 1}
            <button class="button-29" on:click={saveFlashcards}>Save Flashcards</button>
        {/if}
    </div>
</div>

<style>
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
        height: 170px;
        border-radius: 10px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
    }
    label {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
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
    
    .close-button {
        width: 20px;
        height: 20px;
        border: none;
        background-color: transparent;
        font-size: 16px;
        font-weight: bold;
        color: black;
        cursor: pointer;
    }

    .button-29 {
        align-items: center;
        appearance: none;
        background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
        border: 0;
        border-radius: 6px;
        box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        font-family: "JetBrains Mono",monospace;
        height: 48px;
        justify-content: center;
        line-height: 1;
        list-style: none;
        overflow: hidden;
        padding-left: 16px;
        padding-right: 16px;
        position: relative;
        text-align: left;
        text-decoration: none;
        transition: box-shadow .15s,transform .15s;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        white-space: nowrap;
        will-change: box-shadow,transform;
        font-size: 18px;
    }

    .button-29:focus {
        box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
    }

    .button-29:hover {
        box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
        transform: translateY(-2px);
    }

    .button-29:active {
        box-shadow: #3c4fe0 0 3px 7px inset;
        transform: translateY(2px);
    }
</style>