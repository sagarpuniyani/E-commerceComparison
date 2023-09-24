import fs ,{readFileSync} from "fs";

const getProductNames = () => {
    try {
        const jsonContent = readFileSync("./data/list1.json", "utf8");
        return JSON.parse(jsonContent);
        console.log("jsonContent " , jsonContent);
    } catch (error) {
        console.error("Error reading JSON file:", error.message);
        return null;
    }
    };

export const CompareProduct = {
    ComparetheProducts (req , res ){
        try {
            const productName = getProductNames();
            res.json({"Message " : "Comapre Done " })
            console.log("productName ", productName)

        
        }
        catch (err ){
            console.log("Error " , err);
            res.status(500).json({"Error " : "Internal Server Error "})
        }
    }
}