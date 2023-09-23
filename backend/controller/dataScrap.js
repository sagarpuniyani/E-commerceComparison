import request from "request-promise";
import cheerio from "cheerio";
import fs from "fs/promises"; // Use async file operations
import {ScrapedProduct} from "../model/productModel.js";

export const NameScrapedDataUrl1 = [];
export const Scrapdata = {

    async searchProduct(req, res) {
        const searchItem = req.body.productName;
        console.log("searchItem " , searchItem);
        const url1 = `https://www.flipkart.com/search?q=${searchItem}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`;
        try {
            const response = await request({
                uri: url1,
                headers: {
                    "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "Accept-Encoding" : "gzip, deflate, br",
                    "Accept-Language":"en-US,en;q=0.9"
                },
                gzip: true,
            });

            const $ = cheerio.load(response);
            const ScrapedDataUrl1 = [];

            $('div._2kHMtA div._4rR01T').each((i, element) => {
                const Product_name = $(element).text();
                const Product_desc = $('._2kHMtA .fMghEO ._1xgFaf').eq(i).text();
                const price = $('._2kHMtA ._3tbKJL ._1_WHN1').eq(i).text();
                const ImageUrl = $('._2kHMtA .MIXNux .CXW8mj ._396cs4').eq(i).attr('src');
                const Product_Url = `https://www.flipkart.com` + $('._2kHMtA ._1fQZEK').eq(i).attr('href');

                // Create product record
                const scrapproductData = {
                    Product_name,
                    Product_desc,
                    price,
                    ImageUrl,
                    Product_Url,
                };

                ScrapedDataUrl1.push(scrapproductData);
                NameScrapedDataUrl1.push(scrapproductData.Product_name);

                // Create product record in the database
                ScrapedProduct.create(scrapproductData).then((doc) => {
                    console.log("Product created:", doc);
                }).catch((err) => {
                    console.log("Error creating product:", err);
                });
            });

            console.log("ScrapedDataUrl1: ", ScrapedDataUrl1);

            // Write to a JSON file asynchronously
            await fs.writeFile('./data/data1.json', JSON.stringify(ScrapedDataUrl1));
            await fs.writeFile('./data/list1.json', JSON.stringify(NameScrapedDataUrl1));

            res.json({ message: "products are ", record: ScrapedDataUrl1 });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
