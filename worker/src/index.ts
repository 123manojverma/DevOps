import {createClient} from "redis"

const client=createClient()

client.connect();

async function main() {
    while(1){
        const response=await client.brPop("submission",0);
        console.log(response);
        
        // actually run the user code docker exec
        await new Promise((resolve)=>setTimeout(resolve,1000));
        console.log("Processed user submission")
    }
    
}
