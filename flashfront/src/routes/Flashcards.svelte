<script>
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { useParams, useNavigate } from 'svelte-navigator';
    import Navbar from '../components/Navbar.svelte';

    const navigate = useNavigate();
    const id  = useParams();
    const checkId = $id.id;
    const apiAdress = "http://localhost:3000/api/collection/" + checkId;
    let collection = [];
    let index = 0;

    let isFlipped = false;

    function handleMouseOver() {
        isFlipped = true;
    }

    function handleMouseOut() {
        isFlipped = false;
    }

    onMount(() => {
        axios.get(apiAdress).then(response => {
            collection = response.data;
            console.log(collection);
            console.log(collection.title);
        })
        .catch(error => {
            console.error(error);
            navigate("/user");
        });
    })

    function deleteCollection() {
        axios.delete(apiAdress, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            console.log(response);
            navigate("/user");
        }).catch(error => {
            console.log(error);
        })
    }

    function getNextCard() {
        if(index + 1 == collection.cards.length) {
            index = 0;
        } else {
            ++index;
        }
    }

    function getPreviousCard() {
        if(index - 1 == -1) {
            index = collection.cards.length-1;
        } else {
            --index;
        }
    }
</script>

<Navbar/>
<br>
<div class="container">
    <h2 class="h2-h2">{collection.title}</h2>
    <button class="delete-button" on:click={deleteCollection}>Delete Collection</button>
</div>
<div class="card-container">
    {#if collection.cards != null}
      <div class="flashcard" on:mouseover={handleMouseOver} on:mouseout={handleMouseOut} tabindex="0">
        <div class="flashcard-inner" class:flipped={isFlipped}>
          <div class="flashcard-front">
            <h2>{collection.cards[index].side}</h2>
          </div>
          <div class="flashcard-back">
            <h2>{collection.cards[index].value}</h2>
          </div>
        </div>
      </div>
    {/if}
    <br>
    <br>
    <br>
    <br>
    <br>
    {#if collection.cards != null}
        <h3>{index+1} / {collection.cards.length}</h3>
    {/if}
    <div class="container">
        <button on:click={getPreviousCard}>Previous card</button>
        <button on:click={getNextCard}>Next card</button>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .card-container {
        margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    h2 {
        font-size: 24px;
        margin-bottom: 20px;
        flex-grow: 1;
        text-align: center;
        margin: 0;
    }
    
    .delete-button {
    background-color: #d10b0b;
    border: none;
    border-radius: 5px;
    color: #000000;
    font-size: 16px;
    padding: 10px 20px;
    margin-left: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .delete-button:hover {
    background-color: #f76f6f;
  }

  .flashcard {
    position: relative;
    width: 200px;
    height: 200px;
    border: 1px solid black;
    border-radius: 10px;
    perspective: 1000px;
  }

  .flashcard-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flashcard-inner.flipped {
    transform: rotateY(180deg);
  }

  .flashcard-front,
  .flashcard-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .flashcard-front {
    background-color: #ffffff;
    color: black;
    transform: rotateY(0deg);
  }

  .flashcard-back {
    background-color: #1e90ff;
    color: white;
    transform: rotateY(-180deg);
  }
</style>
