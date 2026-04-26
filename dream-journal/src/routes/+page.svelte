<script lang="ts">

    import { goto } from "$app/navigation";
    import axios from "axios";

    let loginUsername:string=$state("");
    let loginPassword:string=$state("");

    let signupUsername:string=$state("");
    let signupPassword:string=$state("");

    async function login(){
        if(loginUsername!="" && loginPassword!=""){
            let response = (await axios.post("/api/login",{
                username:loginUsername,
                password:loginPassword
            })).data;

            if(response.success){
                localStorage.setItem("username",loginUsername);
                localStorage.setItem("password", loginPassword);
                goto("homepage");
            }else{
                console.log(response.msg);
            }
        }
    }

    async function signup(){
        if(signupUsername!="" && signupPassword!=""){
            let response = (await axios.post("/api/signUp",{
                username:signupUsername,
                password:signupPassword
            })).data;
            if(response.success){
                localStorage.setItem("username",signupUsername);
                localStorage.setItem("password", signupPassword);
                goto("homepage");
            }else{
                console.log(response.msg);
            }
        }
    }
</script>

<div class="w-full h-screen flex flex-col items-center justify-center backdrop-saturate-150 font-sans">


    <div class="fixed inset-0 w-screen h-screen -z-10">

        <img
        src='/shoot_stars.png'
        alt="Background" 
        class="object-csover object-center w-full h-full bg-cover"
        />
        
    </div>
            <div class=" mt-10 w-[40%] h-[50%] bg-white/15 backdrop-blur-[1.5px] border border-white/30 rounded-xl grid grid-row-4">
                <!-- Header-->
                <div class=" pt-4 px-9 flex flex-col items-center justify-center">
                    <h1 class="text-6xl text-white/90 font-semibold tracking-widest"> Login </h1>
                </div>

                <!-- Username place-->
                <div class=" px-9 flex flex-col items-right justify-center">
                    <h2 class="text-3xl text-white/90 font-semibold tracking-tighter"> Enter UserName </h2>
                    <input 
                    type="text" 
                    placeholder="     username     "
                     bind:value={loginUsername}
                     class="mt-4 border-4 border-dotted border-purple-950/60 w-[60%] rounded-3xl"
                     >
                </div>
                <!-- Password palce-->
                <div class=" px-9 flex flex-col items-right justify-center">
                    <h2 class="text-3xl text-white/90 font-semibold tracking-tighter"> Enter PassWord </h2>
                    <input 
                    type="password"
                     placeholder="password" 
                     bind:value={loginPassword}
                     class="mt-4 border-4 border-dotted border-purple-950/60 w-[60%] rounded-3xl"
                     >
                </div>


                <!-- Signup button-->
                <div>
                    <button 
                    onclick={login}
                    class="bg-amber-50 rounded-full hover:scale-120 active:scale-75"
                    >Log In!</button>

                    <button 
                    onclick={signup}
                    class="bg-amber-50 rounded-full hover:scale-120 active:scale-75"
                    >
                    sign up
                </button>
        
                </div>


                </div>

            
            </div>
