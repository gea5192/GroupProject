
$(document).ready(function () {
    var products = [
        { id: 1, name: "Penn State Crew Neck Sweatshirt", description: "Cozy sweatshirt", category: "Clothing", uom: "Piece", price: 47.99, weight: 1.2 },
        { id: 2, name: "Penn State Stainless Steel Tumbler", description: "Durable tumbler", category: "Accessories", uom: "Piece", price: 25.99, weight: 0.5 },
        { id: 3, name: "Penn State Football Hooded Sweatshirt", description: "PSU Football Hoodie", category: "Clothing", uom: "Piece", price: 62.99, weight: 1.4 }
    ];
});
    // Function to display product list
    function displayProducts() {
        console.log("Current Products:", products);
    }

    // Function to search and update a product by id
    function updateProduct(id, newPrice) {
        var product = products.find(function (p) {
            return p.id === id;
        });
        if (product) {
            product.price = newPrice;
            console.log("Product updated:", product);
        } else {
            console.log("Product not found");
        }
    }

    // Function to add or update a product in the catalog
    function addOrUpdateProduct(productId, productDescription, productCategory, productUOM, productPrice, productWeight) {
        const existingProduct = products.find(p => p.id === productId);

        if (existingProduct) {
            // Update product
            existingProduct.description = productDescription;
            existingProduct.category = productCategory;
            existingProduct.uom = productUOM;
            existingProduct.price = productPrice;
            existingProduct.weight = productWeight;

            console.log("Product updated:", existingProduct);
        } else {
            // Add new product
            const newProduct = {
                id: productId,
                name: "New Product",
                description: productDescription,
                category: productCategory,
                uom: productUOM,
                price: productPrice,
                weight: productWeight || 0 // Optional weight
            };
            products.push(newProduct);
            console.log("Product added:", newProduct);
        }
        displayProducts();
    }

    // Function to validate form data
    function validateProductForm(productId, productDescription, productCategory, productUOM, productPrice) {
        const validationMessage = $("#validation-message");
        validationMessage.html("");

        let errors = [];
        if (!productId || isNaN(productId)) errors.push("Product ID must be a valid number.");
        if (!productDescription) errors.push("Product description is required.");
        if (!productCategory) errors.push("Product category is required.");
        if (!productUOM) errors.push("Unit of Measure is required.");
        if (!productPrice || isNaN(productPrice)) errors.push("Price must be a valid number.");

        if (errors.length > 0) {
            validationMessage.html(errors.join("<br>"));
            return false;
        }
        return true;
    }

    // Form submission handling for adding/updating products
    $("#product-form").submit(function (e) {
        e.preventDefault();
        // Get form values
        const productId = parseInt($("#productId").val());
        const productDescription = $("#productDescription").val();
        const productCategory = $("#productCategory").val();
        const productUOM = $("#productUOM").val();
        const productPrice = parseFloat($("#productPrice").val());
        const productWeight = parseFloat($("#productWeight").val()) || null; // Optional field

        // Validation messages array
        let validationMessages = [];

        // Validate required fields
        if (!productId) validationMessages.push("Product ID is required.");
        if (!productDescription) validationMessages.push("Product Description is required.");
        if (!productCategory) validationMessages.push("Product Category is required.");
        if (!productUOM) validationMessages.push("Unit of Measure is required.");
        if (!productPrice || productPrice <= 0) validationMessages.push("Price must be greater than 0.");

        // Validate weight if provided
        if (productWeight && productWeight < 0) {
            validationMessages.push("Weight cannot be negative.");
        }
    });

    // Function to create and show the contact box
    function showContactBox() {
        const contactBox = document.createElement('div');
        contactBox.className = 'contact-box';
        contactBox.innerHTML = `
            <p>Phone: (123) 456-7890</p>
            <p>Email: NittanyStore@gmail.com</p>
            <button id="close-btn">Close</button>`;
        document.body.appendChild(contactBox);
        document.getElementById('close-btn').addEventListener('click', function () {
            contactBox.style.display = 'none';
        });
        contactBox.style.display = 'block';
    }

    // Function to create and show the login/signup feature
    function showLoginSignupBox() {
        const loginSignupBox = document.createElement('div');
        loginSignupBox.className = 'login-signup-box';
        loginSignupBox.innerHTML = `
            <div id="login-form">
                <h2>Login</h2>
                <div class="validation-message" id="login-validation"></div>
                <input type="text" placeholder="Username" id="username"><br>
                <input type="password" placeholder="Password" id="password"><br>
                <a href="#">Forgot Password?</a>
                <button id="login-btn">Login</button>
                <button id="show-signup-btn">Sign Up</button>
            </div>
            <div id="signup-form" style="display:none;">
                <h2>Sign Up</h2>
                <div class="validation-message" id="signup-validation"></div>
                <input type="text" placeholder="Name" id="signup-name"><br>
                <input type="email" placeholder="Email" id="signup-email" required><br>
                <input type="number" placeholder="Age" id="signup-age" required><br>
                <input type="text" placeholder="Address" id="signup-address" required><br>
                <input type="tel" placeholder="Phone Number" id="signup-phone" pattern="[0-9]{10}"><br>
                <input type="password" placeholder="New Password" id="signup-password"><br>
                <input type="password" placeholder="Confirm Password" id="confirm-password"><br>
                <button id="signup-btn">Sign Up</button>
                <button id="close-login-btn">Close</button>
            </div>`;
        document.body.appendChild(loginSignupBox);

        document.getElementById('close-login-btn').addEventListener('click', function () {
            loginSignupBox.style.display = 'none';
        });

        document.getElementById('show-signup-btn').addEventListener('click', function () {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('signup-form').style.display = 'block';
        });

        document.getElementById('signup-btn').addEventListener('click', validateSignup);
        document.getElementById('login-btn').addEventListener('click', validateLogin);

        loginSignupBox.style.display = 'block';
    }

    // Function for validating signup form inputs
    function validateSignup() {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const age = document.getElementById('signup-age').value;
        const phone = document.getElementById('signup-phone').value;
        const address = document.getElementById('signup-address').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const validationMessage = document.getElementById('signup-validation');
        validationMessage.innerHTML = ''; // Clear previous message
    
        let messages = []; // Array to hold error messages
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; // Simple email regex
    
        // Validate fields
        if (!name) messages.push("Name is required.");
        if (!email.match(emailPattern)) messages.push("Please enter a valid email.");
        if (!age || age < 0 || age > 120) messages.push("Please enter a valid age.");
        if (!phone) messages.push("Phone number is required.");
        if (!address) messages.push("Address is required.");
        if (password.length < 6) messages.push("Password must be at least 6 characters.");
        if (password !== confirmPassword) messages.push("Passwords do not match.");

        // Display validation messages or success message
        if (messages.length > 0) {
            validationMessage.innerHTML = messages.join("<br>");
        } else {
            validationMessage.innerHTML = "Signup successful!";
        }
    }

    // Function to validate login form inputs
    function validateLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const validationMessage = document.getElementById('login-validation');
        validationMessage.innerHTML = '';

        let messages = [];
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        // Validate both fields
        if (!username || !password) {
            messages.push("Please fill out both fields");
        } else {
            if (!username.match(emailPattern)) {
                messages.push("Please enter a valid email");
            }
        }

        // Display validation messages or success message
        if (messages.length > 0) {
            validationMessage.innerHTML = messages.join("<br>");
        } else {
            validationMessage.innerHTML = "Login successful!";
        }
    }

    // Function to collect shopper data and convert it into a JSON object
    function collectShopperData(name, email, age, phone, address) {
        const shopper = {
            name: name,
            email: email,
            age: age,
        }};

/* shipping js */
$(document).ready(function() {
    $('#shippingForm').on('submit', function(event) {
        event.preventDefault();
        
        // Validate form
        if (validateForm()) {
            const shippingDetails = {
                address: $('#address').val(),
                carrier: $('#carrier').val(),
                method: $('#method').val()
            };
            // Convert to JSON and send to Shopping Cart
            const jsonDetails = JSON.stringify(shippingDetails);
            console.log(jsonDetails); // For testing

            // AJAX call to send details
            $.ajax({
                url: 'https://api.example.com/shipping',
                method: 'POST',
                contentType: 'application/json',
                data: jsonDetails,
                success: function(response) {
                    console.log('Shipping details sent successfully:', response);
                },
                error: function(error) {
                    console.error('Error sending shipping details:', error);
                }
            });
        }
    });

    function validateForm() {
        return $('#address').val() && $('#carrier').val() && $('#method').val();
    }
});

// AngularJS code for shipping handaling
angular.module('myApp', [])
.controller('CartController', function($scope, $http) {
    $scope.shippingDetails = {};

    $scope.submitShipping = function() {
        $http.post('https://api.example.com/shipping', $scope.shippingDetails)
            .then(function(response) {
                console.log('Shipping details submitted:', response.data);
            }, function(error) {
                console.error('Error submitting shipping details:', error);
            });
    };
});

/* billing */
// billing form
$('#billing-form').on('submit', function(event){
    event.preventDefault();

    let billingData = {
        name: $('#name').val(),
        address: $('#address').val(),
        city: $('#city').val(),
        postal: $('#postal').val()
    };

    console.log('Billing Details: ', billingData);
});

//product searching
$('#searchBtn').on('click', function() {
    let query = $('#searchProduct').val();
    if(query) {
        $.ajax({
            url: '/api/products/search', // A mock API endpoint to fetch products
            method: 'GET',
            data: { query: query },
            success: function(data) {
                let productList = $('#productList');
                productList.empty();
                data.products.forEach(function(product) {
                    productList.append(`<li class="list-group-item">${product.name} - ${product.price}</li>`);
                });
            }
        });
    }
});

//returns
$('#submitReturns').on('click', function() {
    let returnData = {
        shopperId: 123, // Assume some shopper ID
        returnProducts: [] // This should be dynamically populated based on product selection
    };

    // Example: Send to Node.js backend using AJAX
    $.ajax({
        url: '/api/returns', 
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(returnData),
        success: function(response) {
            alert('Return request submitted!');
        },
        error: function() {
            alert('An error occurred while submitting the return request.');
        }
    });
});
// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Create Express app
const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/storefront'; // Default to local MongoDB if no .env file

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// -------------------- Models --------------------

// Shopper Schema
const shopperSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String, // Remember to hash passwords before storing in production
  createdAt: { type: Date, default: Date.now }
});
const Shopper = mongoose.model('Shopper', shopperSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  imageUrl: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
});
const Product = mongoose.model('Product', productSchema);

// Shopping Cart Schema
const shoppingCartSchema = new mongoose.Schema({
  shopperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shopper' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});
const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

// Shipping and Billing Schema
const shippingBillingSchema = new mongoose.Schema({
  shopperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shopper' },
  address: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  shippingMethod: String,
  billingMethod: String,
  createdAt: { type: Date, default: Date.now }
});
const ShippingBilling = mongoose.model('ShippingBilling', shippingBillingSchema);

// Returns Schema
const returnSchema = new mongoose.Schema({
  shopperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shopper' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  returnReason: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});
const Return = mongoose.model('Return', returnSchema);

// -------------------- Routes --------------------

// Shopper Routes
app.post('/api/shopper/register', async (req, res) => {
  try {
    const newShopper = new Shopper(req.body);
    await newShopper.save();
    res.status(201).send('Shopper registered successfully');
  } catch (err) {
    res.status(400).send('Error registering shopper');
  }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Error fetching products');
  }
});

// Shopping Cart Routes
app.post('/api/shopping-cart/add', async (req, res) => {
  try {
    const { shopperId, productId, quantity } = req.body;
    const cart = await ShoppingCart.findOne({ shopperId });
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    } else {
      const newCart = new ShoppingCart({
        shopperId,
        items: [{ productId, quantity }],
        totalPrice: 0
      });
      await newCart.save();
    }
    res.status(200).send('Item added to cart');
  } catch (err) {
    res.status(500).send('Error adding item to cart');
  }
});

// Shipping and Billing Routes
app.post('/api/shipping-billing', async (req, res) => {
  try {
    const { shopperId, address, city, state, postalCode, country, shippingMethod, billingMethod } = req.body;
    const newShippingBilling = new ShippingBilling({
      shopperId,
      address,
      city,
      state,
      postalCode,
      country,
      shippingMethod,
      billingMethod
    });
    await newShippingBilling.save();
    res.status(200).send('Shipping and Billing info saved');
  } catch (err) {
    res.status(500).send('Error saving shipping and billing info');
  }
});

// Return Routes
app.post('/api/returns', async (req, res) => {
  try {
    const { shopperId, productId, returnReason } = req.body;
    const newReturn = new Return({
      shopperId,
      productId,
      returnReason
    });
    await newReturn.save();
    res.status(200).send('Return request submitted');
  } catch (err) {
    res.status(500).send('Error submitting return');
  }
});
// -------------------- Start Server --------------------
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// lesson 12
// Required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of Express app
const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/nittanyshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Define MongoDB Schemas
const ShopperSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    address: String,
    phone: String,
    password: String
});

const CartItemSchema = new mongoose.Schema({
    productId: Number,
    quantity: { type: Number, default: 1 },
    name: String,
    description: String,
    price: Number
});

const ReturnRequestSchema = new mongoose.Schema({
    productId: Number,
    name: String,
    reason: String,
    dateRequested: { type: Date, default: Date.now }
});

// Create models for MongoDB collections
const Shopper = mongoose.model('Shopper', ShopperSchema);
const CartItem = mongoose.model('CartItem', CartItemSchema);
const ReturnRequest = mongoose.model('ReturnRequest', ReturnRequestSchema);

// Routes for Shopper (Login/Signup)
app.post('/api/signup', (req, res) => {
    const { name, email, age, address, phone, password } = req.body;
    const newShopper = new Shopper({ name, email, age, address, phone, password });
    
    newShopper.save()
        .then(shopper => res.status(201).json(shopper))
        .catch(err => res.status(500).json({ error: 'Error saving shopper data', message: err }));
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    Shopper.findOne({ email, password })
        .then(shopper => {
            if (shopper) {
                res.status(200).json(shopper);
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        })
        .catch(err => res.status(500).json({ error: 'Error during login', message: err }));
});

// Routes for Shopping Cart
app.get('/api/cart', (req, res) => {
    CartItem.find()
        .then(cartItems => res.json(cartItems))
        .catch(err => res.status(500).json({ error: 'Error fetching cart items', message: err }));
});

app.post('/api/cart', (req, res) => {
    const { productId, quantity, name, description, price } = req.body;
    const newCartItem = new CartItem({ productId, quantity, name, description, price });
    
    newCartItem.save()
        .then(item => res.status(201).json(item))
        .catch(err => res.status(500).json({ error: 'Error adding item to cart', message: err }));
});

app.delete('/api/cart/:id', (req, res) => {
    CartItem.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: 'Item removed from cart' }))
        .catch(err => res.status(500).json({ error: 'Error removing item from cart', message: err }));
});

app.delete('/api/cart', (req, res) => {
    CartItem.deleteMany({})
        .then(() => res.status(200).json({ message: 'Cart cleared' }))
        .catch(err => res.status(500).json({ error: 'Error clearing cart', message: err }));
});

// Routes for Return Requests
app.post('/api/returns', (req, res) => {
    const { productId, name, reason } = req.body;
    const newReturnRequest = new ReturnRequest({ productId, name, reason });
    
    newReturnRequest.save()
        .then(request => res.status(201).json(request))
        .catch(err => res.status(500).json({ error: 'Error submitting return request', message: err }));
});

app.get('/api/returns', (req, res) => {
    ReturnRequest.find()
        .then(returnRequests => res.json(returnRequests))
        .catch(err => res.status(500).json({ error: 'Error fetching return requests', message: err }));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


