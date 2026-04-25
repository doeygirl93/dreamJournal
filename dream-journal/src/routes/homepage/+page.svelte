<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";

    // mock data
    let mockUser = "12345";
    let mockPass = "";

    let creationErrMsg = $state("");

    type dream = {
        _id:string,
        name:string,
        summary:string,
        starColor:string,
        isPublic:boolean,
        comments:comment[]
    }

    type comment={
        name:string,
        comment:string
    }

    let dreamsRecord:Record<string,dream>={};

    let dreamsArr:string[]=$state([]);

    onMount(async ()=>{
        let dreams = (await axios.post("/api/fetchDreams",{
            username:mockUser,
            password:mockPass
        })).data;
        if(dreams.success){
            console.log("success!!!");
            dreamsRecord=dreams.dreams;
            dreamsArr=Object.keys(dreamsRecord).reverse();
        }else{
            console.log("not success...");
            console.log(dreams.msg)
        }
    });

    let dreams = $state([
    {
        id: 1, 
        name: "Toxic Yuri nightmare", 
        desc: "i tried to turn a straight gurl gay but she ended up leaving me a for a man who didn't like me back :c", 
        x: 20, y: 70,
        comments: [
            { id: 101, user: "Reem", text: "i fawkking hate toxic yuri fml" },
            { id: 102, user: "Zrl", text: "ugh i had a nightmare i got stuck in a dream and faced twink death"}
        ]
    },
]);

    // ts is what to determine if some parts of the UI show or now
    let isZoomed = $state(false);
    let showAddDreamMenu = $state(false);
    let selectFlower = $state(null); // fow the spefic flower u wanna zoom/clicl in on
    let showGarden =  $state(false); 

    // Varibles for the backend
    let dreamName = $state("");
    let dreamDesc = $state("");
    let dreamPublic = $state(false);

    // basically the function that loop
    function publishDreams() {
        if (!dreamName || !dreamDesc) return; // returns if dream name or desc is empty

        // data in each dream
        const newFlower = {
            id: Date.now(), //placeholder id
            name: dreamName,
            desc: dreamDesc,
            x:Math.random(), //make it that it don't touch edges some how
            y: Math.random(), // make it appear in bottem
            comments: [] 
        };

        // updates list and adds the new dream
        dreams = [...dreams, newFlower];
        // clears up the stuff so that it shows up empty and ready for input next time

        dreamName = "";
        dreamDesc = "";
        showAddDreamMenu = false;
    }
    
    async function createDream(){
        if(dreamName==""){
            creationErrMsg="name empty";
        }else if(dreamDesc==""){
            creationErrMsg="dream empty";
        }else{
            let response = (await axios.post("/api/createDream",{
                username:mockUser,
                password:mockPass,
                name:dreamName,
                summary:dreamDesc,
                isPublic:dreamPublic
            })).data;
            if(response.success){
                console.log("successfully created!!!");
            }else{
                console.log(response.msg);
            }
        }
    }

    function showInfo(id:string){
        console.log(dreamsRecord[id]);
    }
</script>

<svelte:head>
	<title>Garden</title>
	<meta name="description" content="Main page" />
</svelte:head>

<main class="relative w-full h-screen bg-amber-200 overflow-hidden font-sans">
    <!-- main thing in the middle of the screen-->
    <div class="aboslute absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <button
        onclick={() => isZoomed = true}
        class = " transition-all duration-1500 ease-in-out transform size-32 bg-white rounded-full flex items-center justify-center text-4xl {isZoomed ? 'scale-[3] translate-y-[-10%]':'scale-100'}"
        > 
        main chracter

    </button>

    </div>

    <div class="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-blue-300 w-[80%] h-[80%]">
        <button>close</button>
    </div>

    {#each dreamsArr as dreamId}
        <button class="w-[50px] h-[50px]" style={`background-color:${dreamsRecord[dreamId].starColor}`} onclick={function(){showInfo(dreamId)}}>dream</button>
    {/each}

    {#if isZoomed}
        <div
            class="mb-24 flex flex-col">
            <button
                onclick={() => showAddDreamMenu = true}
                class="rounded-2xl px-6 py-2 bg-blue-500 border border-slate-200">
                Journal Dream
            </button>
            <button
                class="rounded-2xl px-6 py-2 bg-blue-500 border border-slate-200">
                Analyze Dreams
            </button>
            <button
                class="rounded-2xl px-6 py-2 bg-blue-500 border border-slate-200">
                Teleport to Garden
            </button>
            
            
        </div>
    {/if}
</main>

<div>
    <h1>Create</h1>
    <p>Name</p><input type="text" placeholder="name" id="name" bind:value={dreamName}>
    <p>Content</p><textarea name="content" rows="4" cols="50" placeholder="content" bind:value={dreamDesc}></textarea>
    <br>
    <input type="checkbox" name="visibility" id="visibility" onchange={function(){this.checked==true?dreamPublic=true:dreamPublic=false}}>
    <label for="visibility">Public?</label>
    <br>
    <button onclick={createDream}>Create</button>
    <p>{creationErrMsg}</p>
</div>
