import { MONGO_URI, DB, USER_COLL } from "$env/static/private";
import MongoDB, { MongoClient } from "mongodb";
import bcrypt from "bcryptjs"
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

let client = new MongoClient(MONGO_URI)
let db = client.db(DB);
let coll = db.collection(USER_COLL);

export const POST:RequestHandler=async({request})=>{
    let { username, password } = await request.json();
    try{
        let found=await coll.findOne({username:username});
        if(found==null){
            return json({msg:"Username not found",success:false});
        }
        let hashPass = found.password;
        if(bcrypt.compareSync(password, hashPass)){
            return json({msg:"success", success:true});
        }
        return json({msg:"Incorrect password",success:false});
    }catch(e){
        return json({msg:e, success:false})
    }
}