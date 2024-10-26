document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission
            resetErrorMessages(form);

            const validationResults = validateForm(form);
            if (validationResults.isValid) {
                // Show success message
                alert('Message has been sent successfully! Feedback will be given soon.'); 
                form.reset(); // Reset form fields
            } else {
                displayErrors(form, validationResults.errors);
            }
        });

        // Real-time validation
        form.addEventListener('input', function (event) {
            const target = event.target;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                validateField(target);
            }
        });
    });

    function resetErrorMessages(form) {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }

    function validateForm(form) {
        const errors = [];
        let isValid = true;

        const fields = [
            { id: 'name', message: 'Name is required!', minLength: 1 },
            { id: 'email', message: 'Email is required!', minLength: 1 },
            { id: 'subject', message: 'Subject is required!', minLength: 1 },
            { id: 'message', message: 'Message cannot be empty!', minLength: 10 },
            { id: 'mobile', message: 'Provide Mobile number!', minLength: 1 }
        ];

        fields.forEach(field => {
            const value = form.querySelector(`#${field.id}`)?.value.trim();
            if (!value || containsBotScripts(value)) {
                errors.push({ field: field.id, message: field.message });
                isValid = false;
            } else if (field.id === 'message' && value.length < 10) {
                errors.push({ field: field.id, message: 'Message must be at least 10 characters long.' });
                isValid = false;
            } else if (field.id === 'email' && !validateEmail(value)) {
                errors.push({ field: field.id, message: 'Please enter a valid email address.' });
                isValid = false;
            } else if (field.id === 'mobile' && !validateMobile(value)) {
                errors.push({ field: field.id, message: 'Please enter a valid mobile number.' });
                isValid = false;
            }
        });

        return { isValid, errors };
    }

    function validateField(input) {
        const value = input.value.trim();
        const fieldId = input.id;

        if (containsBotScripts(value)) {
            displayError(input, 'Input should not contain scripts.');
        } else {
            clearError(input);
            if (fieldId === 'message' && value.length < 10) {
                displayError(input, 'Message must be at least 10 characters long.');
            } else if (fieldId === 'email' && !validateEmail(value)) {
                displayError(input, 'Please enter a valid email address.');
            } else if (fieldId === 'mobile' && !validateMobile(value)) {
                displayError(input, 'Please enter a valid mobile number.');
            }
        }
    }

    function displayError(input, message) {
        clearError(input); // Remove previous error if any
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message text-danger';
        errorMsg.textContent = message;
        input.parentNode.appendChild(errorMsg);
    }

    function clearError(input) {
        const errorMsg = input.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }

    function displayErrors(form, errors) {
        errors.forEach(error => {
            const inputField = form.querySelector(`#${error.field}`);
            displayError(inputField, error.message);
        });
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
        return re.test(String(email).toLowerCase());
    }

    function validateMobile(mobile) {
        const re = /^\+?[0-9\s()-]{7,15}$/; 
        return re.test(String(mobile));
    }

    function containsBotScripts(input) {
        const botScripts = /<script.*?>.*?<\/script>|<\/?[^>]+/i; 
        return botScripts.test(input);
    }
});
