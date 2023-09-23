import express from "express";
import {Scrapdata} from "../controller/dataScrap.js"

export const productDetail = express.Router();

// redirecting to the data 
productDetail.post('/search' ,  Scrapdata.searchProduct)
