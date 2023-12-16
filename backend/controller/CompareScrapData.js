import fs from "fs";
import { readFileSync } from "fs";
import request from "request-promise";
import cheerio from "cheerio";


const getProductNames = () => {
    try {
        const jsonContent = readFileSync("./data/list1.json", "utf8");
        return JSON.parse(jsonContent);
    } catch (error) {
        console.error("Error reading JSON file:", error.message);
        return null;
    }
    };

// Helper function to fetch product data
async function fetchProductData(element) {
    const url = `https://www.amazon.in/s?k=${element.Product_name}&crid=WJR4H2D9PEBN&sprefix=ac%2Caps%2C197&ref=nb_sb_noss_1`;

    const response = await request({
        uri: url,
        headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        },
        gzip: true,
    });

    const $ = cheerio.load(response);
    const Product_name = $('div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(7) > div > div > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.a-section.a-spacing-none.puis-padding-right-small.s-title-instructions-style > h2 > a > span').text();
    const Product_desc = $('div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(7) > div > div > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20.sg-col-4-of-24 > div > div.a-section.a-spacing-none.a-spacing-top-micro.puis-price-instructions-style > div.a-row.a-size-base.a-color-secondary > span > span > span > span.a-truncate-cut').text();
    const price = $(' div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20.sg-col-4-of-24 > div > div.a-section.a-spacing-none.a-spacing-top-micro.puis-price-instructions-style > div.a-row.a-size-base.a-color-base > a > span > span.a-offscreen').eq(0).text();
    const Product_Url = `https://www.amazon.in/` + $('span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(6) > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20.sg-col-4-of-24 > div > div.a-section.a-spacing-none.a-spacing-top-micro.puis-price-instructions-style > div.a-row.a-size-base.a-color-base > a ').attr('href');
    const ImageUrl = $('div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(6) > div > div > div > div > div > div.sg-col.sg-col-4-of-12.sg-col-8-of-16.sg-col-12-of-20.sg-col-12-of-24.s-list-col-right > div > div > div.sg-row > div.sg-col.sg-col-4-of-12.sg-col-4-of-16.sg-col-4-of-20.sg-col-4-of-24 > div > div.a-section.a-spacing-none.a-spacing-top-micro.puis-image-instructions-style > span > a > div > img').attr('src');

    return {
        Product_name,
        Product_desc,
        price,
        ImageUrl,
        Product_Url
    };
}

    export const CompareProduct = {
    async ComparetheProducts(_, res) {
        try {
        const productName = getProductNames();
        const ScrapedDataUrl2 = [];

        for (const element of productName) {
            const scrapproductData = await fetchProductData(element);
        ScrapedDataUrl2.push(scrapproductData);
        }

        fs.writeFile('./data/data2.json', JSON.stringify(ScrapedDataUrl2), (err) => {
            if (err) {
            console.error("Error writing JSON file:", err.message);
            res.status(500).json({ "Error": "Internal Server Error" });
            } else {
            res.json({ "Message": "Compare Done", "record": ScrapedDataUrl2 });
            }
        });
        } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ "Error": "Internal Server Error" });
        }
    }
};
