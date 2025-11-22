document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const login = document.getElementById('login').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            clearErrors();
            let isValid = true;
            if (login.length < 3) {
                showError('login', 'Логин должен содержать минимум 3 символа');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('email', 'Введите корректный email');
                isValid = false;
            }

            if (password.length < 6) {
                showError('password', 'Пароль должен содержать минимум 6 символов');
                isValid = false;
            }

            if (password !== confirmPassword) {
                showError('confirmPassword', 'Пароли не совпадают');
                isValid = false;
            }
            
            if (isValid) {
                console.log('Форма валидна, отправляем данные');
                window.location.href = "./lk.html"; 
            }
        });
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.mb-3');
        field.classList.add('is-invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        
        formGroup.appendChild(errorDiv);
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.invalid-feedback');
        errorMessages.forEach(msg => msg.remove());
        const errorFields = document.querySelectorAll('.is-invalid');
        errorFields.forEach(field => field.classList.remove('is-invalid'));
    }
    const formFields = ['login', 'email', 'password', 'confirmPassword'];
    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                clearFieldError(fieldId);
            });
        }
    });
    
    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.mb-3');
        const errorMessage = formGroup.querySelector('.invalid-feedback');
        
        if (errorMessage) {
            errorMessage.remove();
            field.classList.remove('is-invalid');
        }
    }
});

