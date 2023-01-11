
const email_sign_in = document.querySelector("#email_sign_in")
const password_sign_in = document.querySelector("#password_sign_in")

const btn_sign_in = document.querySelector(".btn_sign_in")



function start() {
    handleSignIn()
}


start()

/*SIGN IN AREA*/

function signIn(data, callback) {

    var options = {
        method: "POST",
        cache: 'no-cache',
        headers:
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch("http://dev.thanqminh.com:3000/auth/sign_in", options)
        .then(function (response) {
            var jwtValue = response.headers.get('access-token')
            var uidValue = response.headers.get('uid')
            var clientValue = response.headers.get('client')

            localStorage.setItem('jwt', jwtValue) 
            localStorage.setItem('uid', uidValue) 
            localStorage.setItem('client', clientValue) 
        })
        .then(callback)
}

function handleSignIn() {

    btn_sign_in.onclick = function () {

        var data =
        {
            "email": email_sign_in.value,
            "password": password_sign_in.value
        }

        signIn(data, function() {
            window.location.href = 'homepage.html'
        })

    }

}

/*------------*/