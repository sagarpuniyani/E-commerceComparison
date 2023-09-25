import request from "request-promise";
import cheerio from "cheerio";
import fs from "fs/promises"; // Use async file operations
import {ScrapedProduct} from "../model/productModel.js";

export const NameScrapedDataUrl1 = [];
export const SearchScrapdata = {

    async CompareSearchScrapdata(req, res) {
        const searchItem = req.body.productName;
        console.log("searchItem " , searchItem);
        const url1 = `https://www.amazon.in/s?k=${searchItem}&crid=WJR4H2D9PEBN&sprefix=ac%2Caps%2C197&ref=nb_sb_noss_1`;
        try {
            const response = await request({
                uri: url1,
                headers: {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
                },
                gzip: true,
            });

            const $ = cheerio.load(response);
            const ScrapedDataUrl1 = [];

            $(' div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.a-section.a-spacing-none.puis-padding-right-small.s-title-instructions-style > h2 > a > span').each((i, element) => {
                const Product_name = $(element).text();
                const Product_desc = $(' div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20.sg-col-4-of-24 > div > div:nth-child(2) > div > span').eq(i).text();
                const price = $('div.a-section.a-spacing-none.a-spacing-top-micro.puis-price-instructions-style > div.a-row.a-size-base.a-color-base > a > span > span.a-offscreen').eq(i).text();
                const ImageUrl = $('div.s-product-image-container.aok-relative.s-text-center.s-image-overlay-grey.puis-image-overlay-grey.s-padding-left-small.s-padding-right-small.s-flex-expand-height.puis.puis-v20azwp0smsgc01ytmkntf1rk7n > div > span > a > div > img').eq(i).attr('src');
                const Product_Url = `https://www.amazon.in` + $('div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.a-section.a-spacing-none.puis-padding-right-small.s-title-instructions-style > h2 > a').eq(i).attr('href');

                // Create product record
                const scrapproductData = {
                    Product_name,
                    Product_desc,
                    price,
                    ImageUrl,
                    Product_Url,
                };

                const NamescrapproductData = {
                    Product_name
                }

                ScrapedDataUrl1.push(scrapproductData);
                NameScrapedDataUrl1.push(NamescrapproductData);

                // Create product record in the database
                ScrapedProduct.create(scrapproductData).then((doc) => {
                    console.log("Product created:", doc);
                }).catch((err) => {
                    console.log("Error creating product:", err);
                });
            });

            console.log("ScrapedDataUrl1: ", ScrapedDataUrl1);

            // Write to a JSON file asynchronously
            await fs.writeFile('./data/data2.json', JSON.stringify(ScrapedDataUrl1));

            res.json({ message: "products are ", record: ScrapedDataUrl1 });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
