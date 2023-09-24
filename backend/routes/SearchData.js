import express from "express";
import {Scrapdata} from "../controller/dataScrap.js"
import { SearchScrapdata } from "../controller/CompareData.js";


export const productDetail = express.Router();

// redirecting to the data 
productDetail.post('/search' ,  Scrapdata.searchProduct)


// redirecting to the comparison between the product
// productDetail.get('/compare' , CompareProduct.ComparetheProducts )
productDetail.post('/compare' , SearchScrapdata.CompareSearchScrapdata )
