 // Function to create and show the contact box
        function showContactBox() {
            const contactBox = document.createElement('div');
            contactBox.className = 'contact-box';
            contactBox.innerHTML = `
                <p>Phone: (123) 456-7890</p>
                <p>Email: NittanyStore@gmail.com</p>
                <button id="close-btn">Close</button>
            `;
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
                    <input type="name" placeholder="Name" id="signup-name"><br>
                    <input type="email" placeholder="Email" id="signup-email" required><br>
                    <input type="age" placeholder="Age" id="signup-age" required><br>
                    <input type="address" placeholder="Address" id="signup-address" required><br>
                    <input type="tel" placeholder="Phone Number" id="signup-phone" pattern="[0-9]{10}"><br>
                    <input type="password" placeholder="New Password" id="signup-password"><br>
                    <input type="password" placeholder="Confirm Password" id="confirm-password"><br>
                    <button id="signup-btn">Sign Up</button>
                    <button id="close-login-btn">Close</button>
                </div>
            `;
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

        // Function for validating signup from inputs
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

            // Validate email format
            if (!email.match(emailPattern)) {
                messages.push("Please enter a valid email");
            }

            // Validate password length
            if (password.length < 6) {
                messages.push("Password must be at least 6 characters.");
            }

            // Validate password confirmation
            if (password !== confirmPassword) {
                messages.push("Passwords do not match");
            }

            // Display validation messages or success message
            if (messages.length > 0) {
                validationMessage.innerHTML = messages.join('<br>');
            } else {
                validationMessage.innerHTML = "Signup successful!";
            }
        }

        // Function to validate login form
        function validateLogin() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const validationMessage = document.getElementById('login-validation');
            validationMessage.innerHTML = ''; // Clear previous message

            let messages = []; 
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            // Check if both fields are filled
            if (!username || !password) {
                messages.push("Please fill out both fields");
            } else {
                if (!username.match(emailPattern)) {
                    messages.push("Please enter a valid email");
                }
            }

            // Display validation messages or success message
            if (messages.length > 0) {
                validationMessage.innerHTML = messages.join('<br>');
            } else {
                validationMessage.innerHTML = "Login successful!";
            }
        }

        // Add event listener to the contact link
        document.getElementById('contact-link').addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            showContactBox(); // Show the contact box 
        });

        // Add event listener to the login-signup link
        document.getElementById('login-signup-link').addEventListener('click', function (event) {
            event.preventDefault();
            showLoginSignupBox();
        });