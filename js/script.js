var userName_Sg = document.getElementById('userNameBtn_Sg');
var emailBtn_Sg = document.getElementById('emailBtn_Sg');
var passwordBtn_Sg = document.getElementById('passwordBtn_Sg');

var emailBtn_Lg = document.getElementById('emailBtn_Lg');
var passwordBtn_Lg = document.getElementById('passwordBtn_Lg');

var signupBtn_Sg = document.getElementById('signupBtn_Sg');
var signinBtn_Lg = document.getElementById('signinBtn_Lg');


if (localStorage.getItem('localStorage_DB') == null) {
    var login_DB = [];
} else {
    var login_DB = JSON.parse(localStorage.getItem('localStorage_DB'));
}


function signup() {
    var loginData = {
        userName: userName_Sg.value,
        email: emailBtn_Sg.value,
        password: passwordBtn_Sg.value
    }

    if (validateSGInput()) {
        document.getElementById('alert').style.display = 'block';
        document.getElementById('alert').innerHTML = '<span class="text-danger">All inputs is required</span>';
    } else if (validateSGEmail() == true) {
        document.getElementById('alert').style.display = 'block';
        document.getElementById('alert').innerHTML = '<span class="text-danger">email already exists</span>';
    } else {
        login_DB.push(loginData);
        localStorage.setItem('localStorage_DB', JSON.stringify(login_DB));

        document.getElementById('alert').style.display = 'block';
        document.getElementById('alert').innerHTML = '<span class="text-success">Success</span>';

        clear();
    }

}


function validateSGEmail() {
    for (var i = 0; i < login_DB.length; i++) {
        if (login_DB[i].email.toLowerCase() == emailBtn_Sg.value.toLowerCase()) {
            return true;
        } else {
            return false;
        }
    }
}

function validateSGInput() {
    if (userName_Sg.value == "" || emailBtn_Sg.value == "" || passwordBtn_Sg.value == "") {
        return true;
    } else {
        return false;
    }
}


function validateLGInput() {
    if (emailBtn_Lg.value == "" || passwordBtn_Lg.value == "") {
        return true;
    } else {
        return false;
    }
}

function signin() {
    if (validateLGInput() == true) {
        document.getElementById('alert').style.display = 'block';
        document.getElementById('alert').innerHTML = '<span class="text-danger">incorrect email or password</span>';
    } else {
        for (var i = 0; i < login_DB.length; i++) {
            if (login_DB[i].email.toLowerCase() == emailBtn_Lg.value.toLowerCase() && login_DB[i].password.toLowerCase() == passwordBtn_Lg.value.toLowerCase()) {

                var userName = '?userName=' + login_DB[i].userName;
                window.location.href = 'home.html' + userName;

                document.getElementById('alert').style.display = 'none';
            } else {
                document.getElementById('alert').style.display = 'block';
                document.getElementById('alert').innerHTML = '<span class="text-danger">incorrect email or password</span>';
            }
        }
    }
}

// function getUserName() {
//     var queryString = decodeURIComponent(window.location.search);
//     queryString = queryString.substring(1);
//     var queries = queryString.split("?");

//     for (var i = 0; i < queries.length; i++) {
//         document.getElementById('userName_Txt').innerHTML = queries[i];
//     }
// }


window.onload = function getUserName() {
    if (window.location.href.indexOf('home.html') > -1) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const page_type = urlParams.get('userName')

        document.getElementById('userName_Txt').innerHTML = 'Welcome ' + page_type;
        document.getElementById('userName_Txt').style.textTransform = 'capitalize';
    }
}


function clear() {
    userName_Sg.value = "";
    emailBtn_Sg.value = "";
    passwordBtn_Sg.value = "";
}