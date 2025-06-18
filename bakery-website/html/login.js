document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the email and password from the form
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Updated hardcoded credentials for demonstration purposes
        const validEmail = "esraa@gmail.com"; // Updated to a valid email format
        const validPassword = "12345";

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check if the email and password are correct
        if (email === validEmail && password === validPassword) {
            // Successful login
            alert("Login successful!");
            // Redirect to home page or another page
            window.location.href = "index.html";
        } else {
            // Login failed
            alert("Invalid email or password. Please try again.");
        }
    });
});
