// Login

var btnLogin = document.getElementById('submit');
var inputEmail = document.getElementById('user');
var inputPassword = document.getElementById('senha');


btnLogin.addEventListener('click', function () {

    firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputPassword.value).then(function (result) {
        alert("Usuário Conectado!");
        console.log("Success!");
        window.location.replace('/home');

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        alert(errorMessage);
        console.log("Failure!")
    });


    firebase.auth().createUserWithEmailAndPassword(inputEmailCad.value, inputPasswordCad.value).then(function (result) {
        alert("Cadastrado Com Sucesso");
        console.log("Success!");
        window.location.replace('/');

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        alert(errorMessage);
        console.log("Failure!")
    });

});

//Cadastro


var inputEmailCad = document.getElementById('email-cad');
var inputPasswordCad = document.getElementById('senha-cad');

btnLogin.addEventListener('click', function () {

    firebase.auth().createUserWithEmailAndPassword(inputEmailCad.value, inputPasswordCad.value).then(function (result) {
        alert("Cadastrado Com Sucesso");
        console.log("Success!");
        window.location.replace('/');

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...

        alert(errorMessage);
        console.log("Failure!")
    });

});