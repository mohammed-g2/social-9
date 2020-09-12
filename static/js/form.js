(($) => {
    const registerForm = $('#register-form');
    const loginForm = $('#login-form');

    const btnGroup = $('#btn-group');
    const registerBtn = $('#register-btn');
    const loginBtn = $('#login-btn');

    function toggleRegisterForm() {
        loginForm.hide();
        btnGroup.fadeOut('slow', function() {
            registerForm.slideDown();
        });
    }

    function toggleLoginForm() {
        registerForm.hide();
        btnGroup.fadeOut('slow', function() {
            loginForm.slideDown();
        });
    }

    function hashHandler(event) {
        if (window.location.hash === '#/register') { toggleRegisterForm(); }
        else if (window.location.hash === '#/login') { toggleLoginForm(); }
    }

    hashHandler();
    $(window).on('hashchange', hashHandler);

    registerBtn.click(function(event) {
        window.location.hash = '#/register';
    });
    loginBtn.click(function(event) {
        window.location.hash = '#/login';
    });


    registerForm.submit(function(event) {
        event.preventDefault();
        const data = {
            csrf_token: $('#register-form #csrf_token').val(),
            username: $('#register-form #username').val(),
            password: $('#register-form #password').val()
        };
        const request = {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': data.csrf_token,
            },
            body: JSON.stringify(data),
        };

        fetch($URL_ROOT + 'register', request)
            .then(response => {
                if (response.status === 400) { return response.json(); }
                else { window.location = $URL_ROOT + '/'; }
            })
            .then(errors => {
                for (fieldName in errors) {
                    $(`#register-form #${fieldName}`).addClass('is-invalid');
                    $(`#register-${fieldName}-feedback`).text(errors[fieldName]);
                }
            });
        return false;
    });

    loginForm.submit(function(event) {
        event.preventDefault();
        const data = {
            csrf_token: $('#login-form #csrf_token').val(),
            username: $('#login-form #username').val(),
            password: $('#login-form #password').val()
        };
        const request = {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': data.csrf_token,
            },
            body: JSON.stringify(data),
        };

        fetch($URL_ROOT + 'login', request)
            .then(response => {
                if (response.status === 400) { return response.json(); }
                else { window.location = $URL_ROOT + '/'; }
            })
            .then(errors => {
                $("#login-form-feedback").text(errors['error']);
            });

        return false;
    });

})(jQuery);