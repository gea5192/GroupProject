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

        // Validate form
        if (validateProductForm(productId, productDescription, productCategory, productUOM, productPrice)) {
            addOrUpdateProduct(productId, productDescription, productCategory, productUOM, productPrice, productWeight);
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
        validationMessage.innerHTML = '';

        let messages = [];
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        // Validate email format
        if (!email.match(emailPattern)) {
            messages.push("Please enter a valid email");
        }

        // Validate password length and confirmation
        if (password.length < 6) messages.push("Password must be at least 6 characters.");
        if (password !== confirmPassword) messages.push("Passwords do not match");

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
