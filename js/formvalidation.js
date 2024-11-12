
document.getElementById("appointmentForm").addEventListener("submit", function(event) {
    // Prevent form submission if validation fails
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value.trim();
    const time = document.getElementById("time").value.trim();
    const message = document.getElementById("message").value.trim();

    // Clear previous error messages
    clearErrors();

    // Perform validation
    let isValid = true;

    // Name Validation (Alphanumeric and space, no special characters allowed)
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
        showError("name", "Please enter a valid name (letters and spaces only).");
        isValid = false;
    }

    // Email Validation (standard email format)
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
    }

    // Mobile Validation (only digits, length of 10-15 digits)
    if (!mobile || !/^\d{10,15}$/.test(mobile)) {
        showError("mobile", "Please enter a valid mobile number (10-15 digits).");
        isValid = false;
    }

    // Service Validation (ensure service is selected)
    if (!service) {
        showError("service", "Please choose a service.");
        isValid = false;
    }

    // Date Validation (non-empty, could be customized for a specific date format if needed)
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        showError("date", "Please choose a valid date (format: YYYY-MM-DD).");
        isValid = false;
    }

    // Time Validation (non-empty, could be customized for a specific time format)
    if (!time || !/^\d{2}:\d{2}$/.test(time)) {
        showError("time", "Please choose a valid time (format: HH:MM).");
        isValid = false;
    }

    // Message Validation (non-empty, max 500 characters)
    if (!message || message.length > 500) {
        showError("message", "Please enter a valid message (max 500 characters).");
        isValid = false;
    }

    // If all fields are valid, submit the form
    if (isValid) {
        // You can submit the form using AJAX or a normal form submit
        this.submit();  // For normal form submission
        // or use AJAX for submission (example below)
        /*
        const formData = new FormData(this);
        fetch('/handleappointment', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert("Appointment booked successfully!");
        })
        .catch(error => {
            alert("There was an error with the appointment booking.");
        });
        */
    }
});

// Function to clear previous error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(message => message.remove());
}

// Function to show error messages
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.style.color = "red";
    errorMessage.innerText = message;

    // Insert error message after the field
    field.parentElement.appendChild(errorMessage);
}

// Helper function to sanitize user inputs (to prevent XSS)
function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;  // Return sanitized input
}
