<script>
    import { createEventDispatcher } from 'svelte';

    let card = {side: "", value: ""};

    const dispatch = createEventDispatcher();

    function cancelAdding() {
        dispatch('cancel', false);
    }

    function add() {
        dispatch('add', card);
    }
</script>
<div class="to-add-card-container">
    <div class="to-add-card">
        <button class="ui red button" on:click={cancelAdding}>
            <i class="archive icon"></i>
        </button>
        <br>
        <br>
        <label>Term:
            <input minlength="1" bind:value={card.side} placeholder="{card.side}">
        </label>
        <label>Definition:
            <input minlength="1" bind:value={card.value} placeholder="{card.value}">
        </label>
    </div>
    <div>
        <button class="ui active button" on:click={add}>
            <i class="plus circle icon"></i>
            Add Flashcard
        </button>
    </div>
</div>


<style>
    .to-add-card {
        display: inline-block;
        margin: 10px;
        padding: 20px;
        width: 600px;
        height: 200px;
        border-radius: 10px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
        background-color: #fff;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
    }
    .to-add-card-container {
        display: flex;
        flex-direction: column;
        align-items: center;
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
</style>