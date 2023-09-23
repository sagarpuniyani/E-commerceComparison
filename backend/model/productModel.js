/* This is the model of the  products as 
the object being created as per the call of the the model */

import mongoose from 'mongoose';
import { SchemaTypes } from "mongoose";

// Define your product schema
export  const productSchema = new mongoose.Schema({
    "Product_name": {type:SchemaTypes.String, required:true, unique:true},
    "Product_desc": {type:SchemaTypes.String, required:true, unique:true},
    "price": {type:SchemaTypes.String, required:true ,  unique:true  },
    "ImageUrl":{type:SchemaTypes.String, required:true ,  unique:true  },
    "Product_Url": {type:SchemaTypes.String, required:true ,  unique:true  },
});

// Create a Mongoose model from the schema
export const ScrapedProduct = mongoose.model('Product', productSchema);
