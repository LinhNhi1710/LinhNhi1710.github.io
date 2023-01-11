const checkLogin = localStorage.getItem('jwt')

if(checkLogin === null){
    window.location.href = 'index.html'
}

const btn_sign_out = document.querySelector("#btn_sign_out")

const title_edit = document.querySelector("#title_edit")
const description_edit = document.querySelector("#description_edit")
const intro_edit = document.querySelector("#intro_edit")

const jwt = localStorage.getItem('jwt');
const client = localStorage.getItem('client');
const uid = localStorage.getItem('uid');

const btn_edit_post = document.querySelector("#btn_edit_post")

const category_list = document.querySelector(".category_list")

btn_sign_out.onclick = function(){
    localStorage.removeItem("jwt");
    window.location.href = 'index.html'
}

function start() {
    handleEditPost()
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

function editPost(data, callback) {

    var options = {
        method: "PUT",
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
    const post_id = localStorage.getItem('id_post_edit')

    fetch("http://dev.thanqminh.com:3000/task_lists/" + category_id + "/todos/" + post_id, options)
        .then(function (response) {
            alert("Edit post successfully !")
            window.location.reload()
        })
        .then(callback)
}

function handleEditPost() {

    btn_edit_post.onclick = function () {

        var data =
        {
            "name": title_edit.value,
            "description" : description_edit.value,
            "done" : intro_edit.value
        }

        editPost(data)
        
    }
}