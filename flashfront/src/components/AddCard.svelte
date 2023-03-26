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
        <button class="close-button" on:click={cancelAdding}>X</button>
        <label>Term:
            <input minlength="1" bind:value={card.side} placeholder="{card.side}">
        </label>
        <label>Definition:
            <input minlength="1" bind:value={card.value} placeholder="{card.value}">
        </label>
    </div>
    <div>
        <button class="button-29" on:click={add}>Add Flashcard</button>
    </div>
</div>


<style>
    .to-add-card {
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
</style>