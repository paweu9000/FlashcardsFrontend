<script>
    import { onMount } from "svelte";
    import Navbar from "../components/Navbar.svelte";
    import { useParams, useNavigate } from "svelte-navigator";
    import axios from "axios";
    import { get } from "svelte/store";
    
    const params = useParams();
    const navigate = useNavigate();
    const id = $params.collectionId;
    const testApi = "http://localhost:3000/api/test/";
    let test;
    let index = 0;
    let points = 0;
    let wait = false;

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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handlePoints(userAnswer, questionAnswer, i) {
        if (index + 1 >= test.questions.length) {
            console.log("END");
        } else if (userAnswer == questionAnswer && !wait) {
            wait = !wait;
            points++;
            const element = document.getElementById(i);
            element.style.backgroundColor = 'green';
            await sleep(1000);
            index++;
            wait = !wait;
            element.style = "answer";
        } else if (userAnswer != questionAnswer && !wait) {
            wait = !wait;
            const element = document.getElementById(i);
            element.style.backgroundColor = 'red';
            await sleep(1000);
            index++;
            wait = !wait;
            element.style = "answer";
        }
    }

</script>

<Navbar/>

<br>
{#if test != null}
<div class="container">
    <h2>{test.questions[index].question}</h2>
    <div class="test">
        {#each test.questions[index].answers as answer, i}
            <button class="answer" id={i} on:click={handlePoints(answer, test.questions[index].answer, i)}>{answer}</button>
        {/each}
    </div>
</div>
{/if}


<style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
    .test {
        margin-top: 20px;
        align-items: center;
        justify-content: center;
        width: 600px;
    }
    .answer {
        font-family: 'Times New Roman', Times, serif;
        font-size: 16px;
        font-weight: bold;
        display: block;
        width: 600px;
        height: 100px;
        transition-duration: 0.4s;
        background-color: #f1f1f1;
    }
    .answer:hover {
        background-color: #565756;
        color: white;
        cursor: pointer;
    }
</style>