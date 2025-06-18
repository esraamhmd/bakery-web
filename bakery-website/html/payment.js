// Function to handle form submission
function handlePayment(event) {
    event.preventDefault(); // Prevent default form submission

    // Get values from the form
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCVC = document.getElementById('card-cvc').value;
    const cardholderName = document.getElementById('cardholder-name').value;

    // Validate the input
    if (!validateInput(cardNumber, cardExpiry, cardCVC, cardholderName)) {
        return; // Stop if validation fails
    }

    // Simulate payment processing
    setTimeout(() => {
        const userConfirmed = confirm('Payment processed successfully! ');

        if (userConfirmed) {
            // Reload the payment page (stays on the same page)
            window.location.reload();
        }
    }, 2000);
}

// Function to validate payment information
function validateInput(cardNumber, cardExpiry, cardCVC, cardholderName) {
    const cardNumberPattern = /^\d{16}$/; // Basic validation for card number (16 digits)
    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // Format MM/YY
    const cvcPattern = /^\d{3}$/; // CVC (3 digits)

    if (!cardNumber.match(cardNumberPattern)) {
        alert('Please enter a valid card number (16 digits).');
        return false;
    }
    if (!cardExpiry.match(expiryPattern)) {
        alert('Please enter a valid expiry date (MM/YY).');
        return false;
    }
    if (!cardCVC.match(cvcPattern)) {
        alert('Please enter a valid CVC (3 digits).');
        return false;
    }
    if (!cardholderName.trim()) {
        alert('Please enter your name.');
        return false;
    }

    return true; // All validations passed
}

// Attach event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', handlePayment);
});
