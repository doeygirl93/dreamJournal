import { MONGO_URI, DB, USER_COLL } from "$env/static/private";
import MongoDB, { Collection, MongoClient, ObjectId } from "mongodb";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

let client = new MongoClient(MONGO_URI)
let db = client.db(DB);
let coll:Collection<Document> = db.collection(USER_COLL);

type Document={
    _id:ObjectId
    username:string,
    password:string,
    gardenIsPublic:boolean,
    currentStreak:number,
    longestStreak:number,
    dreams:ObjectId[],
    following:ObjectId[]
}

export const POST:RequestHandler=async({request})=>{
    let { username } = await request.json();
    try{
        let found = await coll.findOne({username:username});
        if(found!=null){
            return json({msg:"success", success:true, userInfo:found});
        }else{
            return json({msg:"user auth error", success:false});
        }
    }catch(e){
        return json({msg:e, success:false});
    }
}