import { MONGO_URI, DB, USER_COLL, DREAMS_COLL } from "$env/static/private";
import MongoDB, { MongoClient, ObjectId, Collection } from "mongodb";
import bcrypt from "bcryptjs"
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

let client = new MongoClient(MONGO_URI)
let db = client.db(DB);
let userColl:Collection<Document> = db.collection(USER_COLL);
let dreamsColl = db.collection(DREAMS_COLL);

/*type Dream={
    _id:ObjectId
    name:string,
    summary:string,
    starColor:string,
    isPublic:boolean,
    comments:comment[]
}*/

type comment={
    name:string,
    comment:string
}

type Document={
    _id:ObjectId
    username:string,
    password:string,
    currentStreak:number,
    longestStreak:number,
    dreams:ObjectId[],
    following:ObjectId[]
}

export const POST:RequestHandler=async({request})=>{
    let { username, name, summary, isPublic } = await request.json();
    try{
        let found = await userColl.findOne({username:username});
        if(found!=null){
            let createdDream = {
                name:name,
                summary:summary,
                starColor:"#FCC8BD",
                isPublic:isPublic,
                comments:[]
            }
            await dreamsColl.insertOne(createdDream);
            let newDreamObj = await dreamsColl.findOne({name:name, summary:summary});
            let newDreamId = newDreamObj?._id;
            await userColl.updateOne({username:username},{
                $push:{
                    dreams:newDreamId
                }
            });
            return json({msg:"dream successfully added", success:true});
        }else{
            return json({msg:"user auth error", success:false});
        }
    }catch(e){
        return json({msg:e, success:false});
    }
}