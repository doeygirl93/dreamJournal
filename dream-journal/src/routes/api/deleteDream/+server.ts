import { MONGO_URI, DB, DREAMS_COLL, USER_COLL } from "$env/static/private";
import MongoDB, { MongoClient, ObjectId, Collection } from "mongodb";
import bcrypt from "bcryptjs"
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

let client = new MongoClient(MONGO_URI)
let db = client.db(DB);
let userColl = db.collection(USER_COLL);
let dreamsColl:Collection<dream> = db.collection(DREAMS_COLL);

type dream={
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

export const POST:RequestHandler=async({request})=>{
    let {id, username} = await request.json();
    try{
        let found = await dreamsColl.findOne({_id:id});
        if(found!=null){
            dreamsColl.deleteOne({_id:id});
            await userColl.updateOne({username:username},{
                $pull:{
                    dreams:id
                }
            });
            return json({msg:"success", success:true});
        }else{
            return json({msg:"project finding error", success:false});
        }
    }catch(e){
        return json({msg:e, success:false});
    }
}