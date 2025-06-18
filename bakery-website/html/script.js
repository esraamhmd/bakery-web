document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector(".signup-form");

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validation
        if (name === "" || email === "" || password === "") {
            alert("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Example of sending the data to a server or storing locally
        console.log("Signup successful:", { name, email, password });

        // Reset the form after successful submission
        signupForm.reset();
        alert("Signup successful!"); // Display success message
    });
});
