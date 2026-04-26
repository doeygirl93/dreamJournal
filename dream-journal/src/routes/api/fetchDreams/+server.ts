import { MONGO_URI, DB, USER_COLL, DREAMS_COLL } from "$env/static/private";
import MongoDB, { MongoClient, ObjectId, Collection } from "mongodb";
import bcrypt from "bcryptjs"
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

let client = new MongoClient(MONGO_URI)
let db = client.db(DB);
let userColl = db.collection(USER_COLL);
let dreamsColl:Collection<dream> = db.collection(DREAMS_COLL);

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

export const POST:RequestHandler=async({request})=>{
    let { username } = await request.json();
    try{
        let found = await userColl.findOne({username:username});
        if(found!=null){
            let dreamIds = found.dreams;
            let dreamRecord:Record<string, dream>={};
            for(let i in dreamIds){
                let foundDream = await dreamsColl.findOne({_id:dreamIds[i]});
                if(foundDream!=null){
                    dreamRecord[i]=foundDream;
                }
            }
            return json({msg:"success", success:true, dreams:dreamRecord});
        }else{
            return json({msg:"this object is null!", success:false});
        }
    }catch(e){
        return json({msg:e, success:false});
    }
}