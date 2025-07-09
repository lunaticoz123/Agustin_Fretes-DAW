document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('subscription-form');
    var modal = document.getElementById('modal');
    var modalContent = document.getElementById('modal-content');
    var modalClose = document.getElementById('modal-close');
    var dynamicTitle = document.getElementById('dynamic-title');
    var fullnameInput = document.getElementById('fullname');

    fullnameInput.addEventListener('keyup', function () {
        var name = fullnameInput.value.trim();
        dynamicTitle.textContent = name ? 'HOLA ' + name.toUpperCase() : 'HOLA';
    });

    var inputs = document.querySelectorAll('input');

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('blur', function () {
            validateField(this);
        });

        inputs[i].addEventListener('focus', function () {
            var errorElement = document.getElementById(this.id + '-error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    }

    function validateField(field) {
        var value = field.value.trim();
        var errorElement = document.getElementById(field.id + '-error');
        var isValid = true;
        var errorMessage = '';

        switch (field.id) {
            case 'fullname':
                if (value.length <= 6 || value.indexOf(' ') === -1) {
                    isValid = false;
                    errorMessage = 'Debe tener más de 6 letras y al menos un espacio';
                }
                break;

            case 'email':
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Ingrese un email válido';
                }
                break;

            case 'password':
                var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                if (!passwordRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Mínimo 8 caracteres con letras y números';
                }
                break;

            case 'confirm-password':
                var password = document.getElementById('password').value;
                if (value !== password) {
                    isValid = false;
                    errorMessage = 'Las contraseñas no coinciden';
                }
                break;

            case 'age':
                var age = parseInt(value);
                if (isNaN(age) || age < 18) {
                    isValid = false;
                    errorMessage = 'Debe ser mayor o igual a 18';
                }
                break;

            case 'phone':
                var phoneRegex = /^\d{7,}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Mínimo 7 dígitos, sin espacios ni guiones';
                }
                break;

            case 'address':
                if (value.length < 5 || value.indexOf(' ') === -1) {
                    isValid = false;
                    errorMessage = 'Mínimo 5 caracteres con letras, números y un espacio';
                }
                break;

            case 'city':
                if (value.length < 3) {
                    isValid = false;
                    errorMessage = 'Mínimo 3 caracteres';
                }
                break;

            case 'zip':
                if (value.length < 3) {
                    isValid = false;
                    errorMessage = 'Mínimo 3 caracteres';
                }
                break;

            case 'dni':
                var dniRegex = /^\d{7,8}$/;
                if (!dniRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Debe tener 7 u 8 dígitos';
                }
                break;
        }

        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validateForm() {
        var isValid = true;
        var errorSummary = '';
        var allInputs = document.querySelectorAll('input');

        for (var i = 0; i < allInputs.length; i++) {
            var input = allInputs[i];
            if (!validateField(input)) {
                isValid = false;
                var errorElement = document.getElementById(input.id + '-error');
                errorSummary += '<li>' + input.labels[0].textContent + ': ' + errorElement.textContent + '</li>';
            }
        }

        return {
            isValid: isValid,
            errorSummary: errorSummary
        };
    }

    function showModal(data, errors) {
        var content = '';

        if (errors) {
            content =
                '<p style="color: red;">Por favor corrija los siguientes errores:</p>' +
                '<ul style="color: red;">' + errors + '</ul>';
        } else {
            content =
                '<p><strong>Nombre completo:</strong> ' + data.fullname + '</p>' +
                '<p><strong>Email:</strong> ' + data.email + '</p>' +
                '<p><strong>Edad:</strong> ' + data.age + '</p>' +
                '<p><strong>Teléfono:</strong> ' + data.phone + '</p>' +
                '<p><strong>Dirección:</strong> ' + data.address + '</p>' +
                '<p><strong>Ciudad:</strong> ' + data.city + '</p>' +
                '<p><strong>Código Postal:</strong> ' + data.zip + '</p>' +
                '<p><strong>DNI:</strong> ' + data.dni + '</p>' +
                '<p style="margin-top: 20px; color: green;">¡Suscripción exitosa!</p>';
        }

        modalContent.innerHTML = content;
        modal.style.display = 'flex';
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var validation = validateForm();

        if (validation.isValid) {
            var formData = {
                fullname: document.getElementById('fullname').value,
                email: document.getElementById('email').value,
                age: document.getElementById('age').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                zip: document.getElementById('zip').value,
                dni: document.getElementById('dni').value
            };

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Error ' + response.status + ': ' + response.statusText);
                    }
                    return response.json();
                })
                .then(function (data) {
                    showModal(formData, null);
                    localStorage.setItem('formData', JSON.stringify(formData));
                })
                .catch(function (error) {
                    showModal(null, '<li>Hubo un problema al enviar los datos: ' + error.message + '</li>');
                });
        } else {
            showModal(null, validation.errorSummary);
        }
    });

    modalClose.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Cargar datos del LocalStorage al inicio
    var savedData = localStorage.getItem('formData');
    if (savedData) {
        var data = JSON.parse(savedData);
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var input = document.getElementById(key);
                if (input) {
                    input.value = data[key];
                }
            }
        }
        dynamicTitle.textContent = 'HOLA ' + data.fullname.toUpperCase();
    }
});