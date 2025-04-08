
  document.addEventListener('DOMContentLoaded', function() {
    const authModal = document.getElementById('authModal');
    const openAuthModal = document.getElementById('openAuthModal');
    const closeModal = document.querySelector('.close-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    const switchToSignupLinks = document.querySelectorAll('.switch-to-signup');
    const switchToLoginLinks = document.querySelectorAll('.switch-to-login');

    // Open modal when sign in link is clicked
    openAuthModal.addEventListener('click', (e) => {
      e.preventDefault();
      authModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    // Close modal when X is clicked
    closeModal.addEventListener('click', () => {
      authModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', e => {
      if (e.target === authModal) {
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });

    // Tab switching between login and signup
    authTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        authTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById(`${tabName}Form`).classList.add('active');
      });
    });

    // User type switching (customer/worker)
    userTypeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const userType = this.getAttribute('data-user-type');
        const formType = document.querySelector('.auth-form.active').id.replace('Form', '');
        this.parentNode.querySelectorAll('.user-type-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll(`.${formType}-section`).forEach(section => section.classList.remove('active'));
        document.getElementById(`${userType}${formType.charAt(0).toUpperCase() + formType.slice(1)}`).classList.add('active');
      });
    });

    // Switch to signup from login
    switchToSignupLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        authTabs.forEach(t => t.classList.remove('active'));
        document.querySelector('[data-tab="signup"]').classList.add('active');
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById('signupForm').classList.add('active');
      });
    });

    // Switch to login from signup
    switchToLoginLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        authTabs.forEach(t => t.classList.remove('active'));
        document.querySelector('[data-tab="login"]').classList.add('active');
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById('loginForm').classList.add('active');
      });
    });

    // Form submission handling
    const forms = document.querySelectorAll('.auth-form form');
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically handle form submission via AJAX
        const formType = this.id.includes('Login') ? 'Login' : 'Signup';
        const userType = this.id.includes('customer') ? 'Customer' : 'Worker';
        alert(`${userType} ${formType} form submitted successfully!`);
        
        // Reset form and close modal
        this.reset();
        authModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    });

    // Aadhaar validation for worker signup
    const workerAadhaar = document.getElementById('workerAadhaar');
    if (workerAadhaar) {
      workerAadhaar.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 12);
      });
    }
  });
