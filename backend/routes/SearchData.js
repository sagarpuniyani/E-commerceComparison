import express from "express";
import {Scrapdata} from "../controller/dataScrap.js"
import {CompareProduct} from "../controller/CompareScrapData.js"

export const productDetail = express.Router();

// redirecting to the data 
productDetail.post('/search' ,  Scrapdata.searchProduct)


// redirecting to the comparison between the product
productDetail.get('/compare' , CompareProduct.ComparetheProducts )
