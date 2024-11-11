const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Sample data store for demonstration (you can replace this with a real database)
let products = [
    { id: 1, name: "Penn State Crew Neck Sweatshirt", description: "Cozy sweatshirt", category: "Clothing", uom: "Piece", price: 47.99, weight: 1.2 },
    { id: 2, name: "Penn State Stainless Steel Tumbler", description: "Durable tumbler", category: "Accessories", uom: "Piece", price: 25.99, weight: 0.5 },
    { id: 3, name: "Penn State Football Hooded Sweatshirt", description: "PSU Football Hoodie", category: "Clothing", uom: "Piece", price: 62.99, weight: 1.4 }
];

// API route to search products by query
app.get('/api/products/search', (req, res) => {
    const query = req.query.query.toLowerCase();
    const results = products.filter(product =>
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
    );
    res.json({ products: results });
});

// API route to handle returns (POST)
app.post('/api/returns', (req, res) => {
    const returnData = req.body;

    // For simplicity, let's assume we're logging the return request
    console.log('Return Request:', returnData);

    // You can process the return data here (e.g., updating the database, sending confirmation emails)

    res.status(200).json({ message: 'Return request submitted successfully.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
