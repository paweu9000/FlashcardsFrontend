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
{#if test != null}
<div class="container">
    <h2>{test.questions[index].question}</h2>
    <div class="test">
        {#each test.questions[index].answers as answer}
            <button class="answer">{answer}</button>
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
        background-color: rgb(117, 117, 116);
    }
    .answer {
        font-family: 'Times New Roman', Times, serif;
        font-size: 16px;
        font-weight: bold;
        display: block;
        width: 600px;
        height: 100px;
        transition-duration: 0.4s;
    }
    .answer:hover {
        background-color: #565756;
        color: white;
        cursor: pointer;
    }
</style>