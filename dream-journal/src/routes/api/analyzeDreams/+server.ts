import { HC_API_KEY } from "$env/static/private";
import { OpenRouter } from "@openrouter/sdk";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

const client=new OpenRouter({
    apiKey: HC_API_KEY,
    serverURL: 'https://ai.hackclub.com/proxy/v1',
});

export const POST:RequestHandler=async({request})=>{
  let { dreams } = await request.json();
  try{
    const response = await client.chat.send({
      chatRequest: {
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'user', content: `${dreams}\nThis is a collection of dream journal entries. Analyze these entries for recurring SPECIFIC objects/symbols, themes, or situations. This is to help the user identify "dream signs", which signal that someone is in a dream to help with lucid dreaming. Do not give the user a "tutorial" on how to lucid dream. Only classify a symbol/pattern as recurring if it appears in at least 2/3 of the dreams (this is NOT a metric the user knows about-- do not reference it in the response). Symbols/patterns that are recurring in at least 2/3 of dreams but are somewhat ambiguous or "a stretch", appropriate warning should be provided. Remove all astericks, hashtags, and other special characters unless they are used as punctuation.
          Response should be one or two small paragraphs 6-8 sentences each. 
          `}
        ]
      }
    });

    return json({msg:"success", success:true, patternAnalysis:response.choices[0].message.content});
  }catch(e){
    return json({msg:e, success:false});
  }
}