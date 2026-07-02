/**
 * forms.js - Inquiry form validation, success triggers, and backend mock endpoints
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('inquiryForm');
  const successToast = document.getElementById('formSuccessToast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('clientName');
      const phoneInput = document.getElementById('clientPhone');
      const emailInput = document.getElementById('clientEmail');
      const messageInput = document.getElementById('clientMessage');

      let isValid = true;

      // Helper function to show/hide validation message
      const validateField = (input, validationFn) => {
        if (!validationFn(input.value.trim())) {
          input.classList.add('is-invalid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      };

      // Validation Rules
      validateField(nameInput, val => val.length >= 3);
      validateField(phoneInput, val => /^\+?[0-9\s\-]{10,15}$/.test(val));
      validateField(emailInput, val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
      validateField(messageInput, val => val.length >= 10);

      if (isValid) {
        // Collect form data
        const formData = {
          name: nameInput.value,
          phone: phoneInput.value,
          email: emailInput.value,
          message: messageInput.value
        };

        // Placeholder for backend API integration
        console.log('Form submitted successfully with data:', formData);
        
        /* 
         * INTEGRATION PLACEHOLDER:
         * To send this form to an actual backend (e.g. Formspree, EmailJS, Web3Forms, or custom REST API):
         * 
         * fetch('YOUR_API_ENDPOINT_HERE', {
         *   method: 'POST',
         *   headers: {
         *     'Content-Type': 'application/json',
         *     'Accept': 'application/json'
         *   },
         *   body: JSON.stringify(formData)
         * })
         * .then(response => response.json())
         * .then(data => console.log('API Success:', data))
         * .catch(error => console.error('API Error:', error));
         */

        // Reset the form
        contactForm.reset();
        
        // Show success notification
        if (successToast) {
          successToast.classList.add('show');

          // Hide toast after 5 seconds
          setTimeout(() => {
            successToast.classList.remove('show');
          }, 5000);
        }
      }
    });

    // Real-time error removal on input focus/type
    const inputs = contactForm.querySelectorAll('.form-premium-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });
  }
});
