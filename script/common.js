const checkLogin = localStorage.getItem('jwt')

if(checkLogin === null){
    window.location.href = 'index.html'
}

const btn_sign_out = document.querySelector("#btn_sign_out")

btn_sign_out.onclick = function(){
    localStorage.removeItem("jwt");
    window.location.href = 'index.html'
}

const category_list = document.querySelector(".category_list")

const jwt = localStorage.getItem('jwt');
const client = localStorage.getItem('client');
const uid = localStorage.getItem('uid');

function start() {
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