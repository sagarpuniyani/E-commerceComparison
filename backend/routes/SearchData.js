import express from "express";
import {Scrapdata} from "../controller/dataScrap.js"
import { compareFunction } from "../controller/CompareScrapData.js"

export const productDetail = express.Router();

// redirecting to the data 
productDetail.post('/search' ,  Scrapdata.searchProduct)


// redirecting to the comparison between the product
productDetail.post('/compare' , compareFunction.comparionMethod )
