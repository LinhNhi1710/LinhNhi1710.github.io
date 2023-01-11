
const email_sign_up = document.querySelector("#email")
const password_sign_up = document.querySelector("#password")


const btn_sign_up = document.querySelector(".btn_sign_up")

function start() {
    handleSignUp()
}


start()

/*SIGN UP AREA*/

function createNewUser(data, callback) {

    var options = {
        method: "POST",
        cache: 'no-cache',
        headers:
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch("http://dev.thanqminh.com:3000/auth", options)
        .then(function (response) {
            const data = response.json()
            console.log(data)
        })
        .then(callback)
}


function handleSignUp() {
        btn_sign_up.onclick = function () {

        var data =
        {
            "email": email_sign_up.value,
            "password": password_sign_up.value
        }

        createNewUser(data, function () {
            window.location.href = "index.html"
        })
        }

}

/*------------*/

