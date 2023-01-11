const checkLogin = localStorage.getItem('jwt')

if(checkLogin === null){
    window.location.href = 'index.html'
}

const btn_sign_out = document.querySelector("#btn_sign_out")

const btn_add_post = document.querySelector("#btn_add_post")

const title_post = document.querySelector("#title_post")
const description_post = document.querySelector("#description_post")
const intro_post = document.querySelector("#intro_post")

const jwt = localStorage.getItem('jwt');
const client = localStorage.getItem('client');
const uid = localStorage.getItem('uid');

const category_list = document.querySelector(".category_list")

btn_sign_out.onclick = function(){
    localStorage.removeItem("jwt");
    window.location.href = 'index.html'
}

function start() {
    handleAddPost()
    fetchCategory()
}

start()

function getCategory(callback){
    var options = {
        method: "GET",
        cache: 'no-cache',
        headers:
        {
            "Content-Type" : "application/json",
            "Access-Token" : jwt,
            "Uid" : uid,
            "Client" : client
        }
    }
    fetch("http://dev.thanqminh.com:3000/task_lists", options)
    .then(function(response){
        return data =  response.json()
    })
    .then(callback)
}

function fetchCategory(){
    getCategory(function(category){

    const categoryList = category.map(function(cate){
        return `<a onclick="setCategoryIdAdd(${cate.id})" class="dropdown-item" href="your_post.html">${cate.name}</a>`
    })

    category_list.innerHTML = categoryList

    })
}

function setCategoryIdAdd(id){
    localStorage.setItem('category_add', id)
}


function addPost(data, callback) {

    var options = {
        method: "POST",
        cache: 'no-cache',
        headers:
        {
            "Content-Type" : "application/json",
            "Access-Token" : jwt,
            "Uid" : uid,
            "Client" : client
        },
        body: JSON.stringify(data)
    }

    const category_id = localStorage.getItem('category_add')

    fetch("http://dev.thanqminh.com:3000/task_lists/" + category_id + "/todos", options)
        .then(function (response) {
            alert("Add post successfully !")
            window.location.reload()
        })
        .then(callback)
}

function handleAddPost() {

    btn_add_post.onclick = function () {

        var data =
        {
            "name": title_post.value,
            "description" : description_post.value,
            "done" : intro_post.value
        }

        addPost(data)
        
    }
}