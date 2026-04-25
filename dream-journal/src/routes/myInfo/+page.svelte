<script lang="ts">
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { onMount } from "svelte";

    let mockUser="12345";

    let dreamerProfileVisible:string=$state("display:block");
    let settingsVisible:string=$state("display:none");

    let currentStreak:string=$state("");
    let longestStreak:string=$state("");
    let entriesRecorded:string=$state("");

    onMount(async ()=>{
        let response=(await axios.post("/api/fetchUserInfo",{
            username:mockUser
        })).data;
        if(response.success){
            currentStreak=response.userInfo.currentStreak;
            longestStreak=response.userInfo.longestStreak;
            entriesRecorded=response.userInfo.dreams.length;
        }else{
            console.log(response.msg);
        }
    });
</script>

<div style={dreamerProfileVisible}>
    <button onclick={function(){goto("homepage")}}>Back</button>
    <h1>~Dreamer Profile~</h1>
    <h3>Current streak: {currentStreak}</h3>
    <h3>Longest streak: {longestStreak}</h3>
    <h3>Entries recorded: {entriesRecorded}</h3>
    <button onclick={function(){
        settingsVisible="display:block";
        dreamerProfileVisible="display:none";
    }}>Show Settings</button>
</div>

<div style={settingsVisible}>
    <button onclick={function(){
        settingsVisible="display:none";
        dreamerProfileVisible="display:block";
    }}>Close Settings</button>
    <br>
    <input type="checkbox" checked={false} id="privacySetting" name="privacySetting">
    <label for="privacySetting">Public dreamland</label>
    <p>Making your dreamland public means that other people can see your dream journal. Keeping it private makes it accessible only to you. Individual dreams can be set as public/private on a public dreamland.</p>
</div>
<!--
<div>
    <h3>Following</h3>
</div>
-->