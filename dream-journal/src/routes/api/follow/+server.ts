import { MONGO_URI, DB, USER_COLL } from "$env/static/private";
import MongoDB, { MongoClient } from "mongodb";
import bcrypt from "bcryptjs"
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

let client = new MongoClient(MONGO_URI)
let db = client.db(DB);
let coll = db.collection(USER_COLL);

export const POST:RequestHandler=async({request})=>{
    let { username, friendUser } = await request.json();
    try{
        let found = await coll.findOne({username:username});
        if(found!=null){
            await coll.updateOne({username:username},{
                $push:{
                    friends:friendUser
                }
            });
            return json({msg:"successfully added friend", success:true});
        }else{
            return json({msg:"user auth error", success:false});
        }
    }catch(e){
        return json({msg:e, success:false});
    }
}