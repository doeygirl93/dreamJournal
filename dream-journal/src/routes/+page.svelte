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

<div class="body">
    <div class="signlog">
            <div>
                <h1>Log In</h1>
                <p>Username</p>
                <input type="text" placeholder="username" bind:value={loginUsername}>
                <p>Password</p>
                <input type="password" placeholder="password" bind:value={loginPassword}>
                <button onclick={login}>Log In!</button>
                <a href="signup.html">Or sign up!</a>
            </div>
        </div>

        <div class="signlog">
            <div>
            <h1>Name</h1>
            <input type="text" placeholder="name" bind:value={signupUsername}>
            <h1>Password</h1>
            <input type="password" placeholder="password" bind:value={signupPassword}>
            <button onclick={signup}>sign up</button>
        </div>
    </div>
</div>

<style>
    .body{
        margin:0%;
        font-family:sans-serif;
    }

    .signlog{
        display:flex;
        justify-content: center;
        height:100vh;
        width:100vw;
        gap:3%;
        flex-direction: column;
        align-items: center;
        background: #733535;
        background: linear-gradient(360deg, rgba(115, 53, 53, 1) 0%, rgba(94, 45, 117, 1) 38%, rgba(14, 38, 99, 1) 100%);

    }

    .signlog > *{
        padding:10%;
        border-color:rgb(244, 244, 244);;
        border-radius:20%;
        border-style:solid;
        border-width:5px;
        width:fit-content;
        height:fit-content;
        background-color:#d8fffe95;
        opacity:0.4;
        transition:transform 10s ease-in-out;
    }

    .signlog >* >*:hover{
        transform:scale(1.05);
    }

    button{
        text-decoration:none;
        border:none;
        background:none;
        font-size:45px;
        opacity:1;
    }

    .star1{
        width:2px;
        height:2px;
        border-radius:100%;
        animation: twinkle ease-in-out infinite;
        box-shadow: 0px 0px 6px 1px;
    }

    .star2{
        width:4px;
        height:4px;
        border-radius:100%;
        box-shadow: 0px 0px 6px 1px;
        animation: twinkle ease-in-out infinite;

    }

    .star3{
        width:6px;
        height:6px;
        border-radius:100%;
        box-shadow: 0px 0px 6px 1px;
        animation: twinkle ease-in-out infinite;

    }

    @keyframes twinkle{
        50%{opacity:0;}
    }

    input{
        background-color:rgba(255, 255, 255, 0.523);
        border-radius:10px;
        margin-left:10px;
        padding:5px;

    }
</style>