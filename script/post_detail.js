const checkLogin = localStorage.getItem('jwt')

if(checkLogin === null){
    window.location.href = 'index.html'
}

const btn_sign_out = document.querySelector("#btn_sign_out")

const jwt = localStorage.getItem('jwt');
const client = localStorage.getItem('client');
const uid = localStorage.getItem('uid');

const description_post_detail = document.querySelector("#description_post_detail")
const title_detail_post = document.querySelector("#title_detail_post")

const category_list = document.querySelector(".category_list")

btn_sign_out.onclick = function(){
    localStorage.removeItem("jwt");
    window.location.href = 'index.html'
}

function start() {
    fetchCategory()
    fetchPostDetail()
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
    fetch("http://dev.thanqminh.com:3001/task_lists", options)
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


function getPostDetail(callback){
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

    const category_id = localStorage.getItem('category_add')
    const id_post_detail = localStorage.getItem('id_post_detail')

    fetch("http://dev.thanqminh.com:3001/task_lists/" + category_id + "/todos/" + id_post_detail, options)
    .then(function(response){
        return data =  response.json()
    })
    .then(callback)
}

function fetchPostDetail(){
    getPostDetail(function(postDetail){
        description_post_detail.textContent = postDetail.description
        title_detail_post.textContent = postDetail.name
    })
}