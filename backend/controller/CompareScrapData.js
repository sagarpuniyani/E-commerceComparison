
import productname from "../data/list1.json" assert { type : "json"}

export const compareFunction = {
        
    comparionMethod (req , res ){
        try {
            console.log("NameScrapedDataUrl1 " , productname);
            res.json({"message " : "Done"})
        }
        catch ( err ) {
            console.log("Err " , err )
            throw err 
        }
    } 
}