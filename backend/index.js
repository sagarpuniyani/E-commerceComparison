import express from "express";
import{ productDetail} from "./routes/SearchData.js";
import cors from "cors"

const app = express();
app.use(cors());


// To take input from the Url Request 
app.use(express.json());

// directing to the search routes 
app.use('/' , productDetail)

app.use((req , res , next ) =>{
    res.json({message : '404 not found '})
})

// startup the server 
const server = app.listen(1234, err=>{
    if(err){
        console.log('Server Crash ', err);
    }
    else{
        console.log('Server Up and Running ', server.address().port);
    }
})