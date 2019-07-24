'use strict';

/**
 * var users= where keep all the users registered.
 * var panel= all html panels.
 */



var panels = document.getElementsByClassName('panel');
/* var errorText = document.querySelector('.errorText');
var registerFeedback = resgisterPanel.children[1] 

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}*/



var initialPanel = panels[0]; //-------------------------Initial Panel---------------------------[0]of panels 
//option register
var registerLink = initialPanel.children[0]; //a>Register
var loginLink = initialPanel.children[1]; //a>Login

registerLink.addEventListener('click', function (event) { //child[1] of initialPanel 
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    registerPanel.classList.remove('panel--hide');
    registerPanel.classList.add('panel--show');

});
//option login

loginLink.addEventListener('click', function (event) { //child[1] of initialPanel 
    event.preventDefault();

    initialPanel.classList.remove('panel--show');
    initialPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');

});

var registerPanel = panels[1]; //-------------------------Register Panel----------------------------[1]of panels 

// form register
var registerForm = registerPanel.children[0];

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        register(name, surname, email, password);

        registerPanel.classList.remove('panel--show');
        registerPanel.classList.add('panel--hide');

        registerSuccessPanel.classList.remove('panel--hide');
        registerSuccessPanel.classList.add('panel--show');
    } catch (error) {

        var registerFeedback = registerPanel.childre[1]; // panel__feedback

        registerFeedback.innerText = error.message;

    }

});

// option back return
var registerBackLink = registerPanel.children[2];

registerBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    registerPanel.classList.remove('panel--show');
    registerPanel.classList.add('panel--hide');

    initialPanel.classList.remove('panel--hide');
    initialPanel.classList.add('panel--show');

});

var registerSuccessPanel = panels[2]; //-------------------------Success Panel----------------------------[2]of panels 

//option login return
var loginBackLink = registerSuccessPanel.children[0];

loginBackLink.addEventListener('click', function (event) {
    event.preventDefault();

    registerSuccessPanel.classList.remove('panel--show');
    registerSuccessPanel.classList.add('panel--hide');

    loginPanel.classList.remove('panel--hide');
    loginPanel.classList.add('panel--show');


});
var loginPanel = panels[3]; //-------------------------Login Panel----------------------------[3]of panels 
//form login
var loginForm = loginPanel.children[0];
var loginSuccessPanel = panels[4];

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

    try {
        login(email, password);

        loginPanel.classList.remove('panel--show');
        loginPanel.classList.add('panel--hide');

        welcomePanel.classList.remove('panel--hide');
        welcomePanel.classList.add('panel--show');

    } catch (error) {
        var loginFeedback = loginPanel.children[1];
        loginFeedback.innerText = error.message;
    }

});

var welcomePanel = panels[4];