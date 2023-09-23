import productname from "../data/list1.json"  assert { type: "json" };

export const compareFunction = {
        
    comparionMethod : (req , res ) =>  {
        console.log("NameScrapedDataUrl1 " , productname);
        res.json({"message " : "Done"})
    } 
}

