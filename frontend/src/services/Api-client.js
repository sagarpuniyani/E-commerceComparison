import axios from 'axios';
export const apiclient ={
    async post(URL, data){
        try{
        const response = await axios.post(URL, data);
        return response;
        }
        catch(err){
            throw err;
        }
    },
    async get(URL){
        try{
        const response = await axios.get(URL);
        return response;
        }
        catch(err){
            throw err;
        }
    },
}