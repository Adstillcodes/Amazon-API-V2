const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;


const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API');
});

// Endpoint 1 GET Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try{
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.in/dp/${productId}`)
        res.json(JSON.parse(response));
    }   catch(error) {
        res.json(error);
    }
})
//End Endpoint 1

// Endpoint 2  GET Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try{
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.in/product-reviews/${productId}`)
        res.json(JSON.parse(response));
    }   catch(error) {
        res.json(error);
    }
})
//End Endpoint 2

// Endpoint 3  GET Product Offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try{
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.in/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response));
    }   catch(error) {
        res.json(error);
    }
})
//End Endpoint 3

// Endpoint 4  GET Search Reasults
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try{
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.in/s?k=${searchQuery}`)
        res.json(JSON.parse(response));
    }   catch(error) {
        res.json(error);
    }
})
//End Endpoint 4

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));