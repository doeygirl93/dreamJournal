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

    let blue = "rgb(207, 233, 255)"
    let red = "rgb(192, 134, 134)"
    let yellow = "rgb(255, 217, 91)"
    let white = "rgb(255, 255, 255)"
    let circle = document.getElementById("circle")
    let starnum = Math.floor(Math.random()*200);
    let sky = document.getElementById("sky")
    
    function randompoint(){ 
        for (let i=0; i<starnum; i++){
            let x = Math.random()*100
            let y = Math.floor(Math.random()*100)
            let anitime = Math.floor(Math.random()*5)
    
            let doc = document.createElement('div')
            let tsukasa = Math.random()
            let rui = Math.random()
            var compare
            var blah
    
            if (tsukasa<0.25){
                compare = blue;
            } else if(tsukasa<0.5){
                compare = red;
            } else if(tsukasa<0.75){
                compare = yellow;
            } else if(tsukasa<1){
                compare = white;
            }
    
            if (rui<0.25){
                blah = "star1"
                
            } else if(rui<0.5){
                blah = "star2"
                
            } else if(rui<0.75){
                blah = "star3"
                
            } else if(rui<1){
                blah = "star4"
                
            }
    
        doc.style.backgroundColor=compare
        doc.classList.add(blah)
        doc.classList.add("blink")
        doc.style.left = x + 'vw'
        doc.style.top = y + 'vh'
        doc.style.animationDuration=anitime + 's'
        sky.appendChild(doc);
    
        }

    

}

randompoint();

</script>

<div id="sky">
            <div class="mountains">
                <div class="mountain-1"></div>
                <div class="mountain-2"></div>
                <div class="land-1"></div>
                <div class="land-2"></div>
                <div class="land-3"></div>
            </div>
            <div class="mountains-base"></div>
            <div class="light-base"></div>

        </div>
        
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

<style>
* {
  box-sizing: border-box;
}

#sky {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(359deg,rgba(133, 0, 93, 1) 0%, rgba(94, 45, 117, 1) 38%, rgba(14, 38, 99, 1) 100%);
  transform: scale(1);
}

.mountains {
  position: absolute;
  height: 80px;
  width: 100%;
  bottom: 0px;
  left: 0px;
  z-index: 2;
}

.light-base {
  position: absolute;
  bottom: -80px;
  left: 10vw;
  width: 80vw;
  height: 100px;
  border-radius: 50%;
  box-shadow: -0px -10px 30px 10px #ffc1a0, -0px -20px 40px 20px #fe9c7f,
    -0px -30px 60px 30px #be6590, -0px -50px 150px 75px #632b6c;
  background-color: #ffc1a0;
  z-index: 1;
}

.mountains-base {
  content: "";

  background: -moz-linear-gradient(
    top,
    rgba(55, 5, 105, 0) 0%,
    rgba(9, 0, 22, 1) 100%
  );
  background: -webkit-linear-gradient(
    top,
    rgba(55, 5, 105, 0) 0%,
    rgba(9, 0, 22, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(55, 5, 105, 0) 0%,
    rgba(9, 0, 22, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr="#00370569",
      endColorstr="#090016",
      GradientType=0
    );

  width: 100%;
  height: 100px;
  position: absolute;
  bottom: -10px;
  z-index: 3;
}

.mountains-base:after {
  content: "";

  background: -moz-linear-gradient(
    top,
    rgba(55, 5, 105, 0) 0%,
    rgba(9, 0, 22, 1) 100%
  );
  background: -webkit-linear-gradient(
    top,
    rgba(55, 5, 105, 0) 0%,
    rgba(9, 0, 22, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(55, 5, 105, 0) 0%,
    rgba(9, 0, 22, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr="#00370569",
      endColorstr="#090016",
      GradientType=0
    );
  width: 100%;
  height: 20px;
  position: absolute;
  bottom: 0px;
  z-index: 3;
}

.mountains-base:before {
  content: "";

  background: -moz-linear-gradient(
    top,
    rgba(55, 5, 105, 0) 0%,
    rgba(9, 0, 22, 1) 100%
  );
  background: -webkit-linear-gradient(
    top,
    rgba(55, 5, 105, 0) 0%,
    rgba(9, 0, 22, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(55, 5, 105, 0) 0%,
    rgba(9, 0, 22, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr="#00370569",
      endColorstr="#090016",
      GradientType=0
    );
  width: 100%;
  height: 15px;
  position: absolute;
  bottom: 10px;
  z-index: 2;
}

.mountains > [class^="mountain"],
.mountains > [class^="mountain"]:after,
.mountains > [class^="mountain"]:before,
.mountains > [class^="land"],
.mountains > [class^="land"]:after,
.mountains > [class^="land"]:before {
  background: #110124;
  box-shadow: 0px 0px 50px 5px rgba(255, 255, 255, 0.2);
  position: absolute;
  bottom: 0px;
}

.mountain-2 {
  width: 60px;
  height: 60px;
  bottom: -20px !important;
  left: -10px;
  transform: rotate(45deg);
  border-top-left-radius: 10px;
}

.mountain-1 {
  width: 100px;
  height: 100px;
  bottom: -40px !important;
  left: 10px;
  transform: rotate(45deg);
  border-top-left-radius: 10px;
}

.land-1 {
  width: 30%;
  height: 20px;
  border-top-right-radius: 100%;
}

.land-2 {
  width: 60%;
  height: 15px;
  left: 30%;
  border-top-left-radius: 200%;
  border-top-right-radius: 200%;
}

.land-3 {
  width: 20%;
  height: 20px;
  left: 80%;
  border-top-left-radius: 100%;
}

.stars {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 000vw;
  height: 100vh;
  transition: all 10s linear;
}

.star {
  position: absolute;
  border-radius: 50%;
  background-color: white;
  opacity: 0.8;
}

.blink {
  animation: blink 3s ease-in-out infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.star1 {
  height: 1px;
  width: 1px;
  position: absolute;
}

.star2 {
  height: 1.5px;
  width: 1.5px;
  position: absolute;
}

.star3 {
  height: 2px;
  width: 2px;
  position: absolute;
}

.star4 {
  height: 2.5px;
  width: 2.5px;
  box-shadow: 0px 0px 6px 1px rgba(255,255,255,0.5);
  position: absolute;
}

.star-5 {
  height: 2.5px;
  width: 2.5px;
  box-shadow: 0px 0px 6px 1px rgba(255,255,255,0.7);
  position: absolute;
}

.stars-cross > .blur,
.stars-cross-aux > .blur {
  position: absolute;
  border-radius: 50%;
  background-color: white;
  opacity: 1;
  filter: blur(15px);
  width: 5px;
  height: 10px;
}
</style>
