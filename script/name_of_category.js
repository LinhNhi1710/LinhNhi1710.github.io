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

const list_post_by_folder = document.querySelector(".list_post_by_folder")

const jwt = localStorage.getItem('jwt');
const client = localStorage.getItem('client');
const uid = localStorage.getItem('uid');

function start() {
    fetchCategory()
    fetchPost()
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


function getPost(callback){
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

    const category_id = localStorage.getItem('check_folder')

    fetch("http://dev.thanqminh.com:3000/task_lists/" + category_id + "/todos", options)
    .then(function(response){
        console.log(123)
        return data =  response.json()
    })
    .then(callback)
}

function fetchPost(){
    getPost(function(postListByFolder){

    const postList = postListByFolder.map(function(post){
        return `<div class="col-xl-4" id="list-Catogory">
                    <div class="card " style="width: 18rem;">
                        <img class="card-img-top" src="image/noodle.jpg" alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title">${post.name}</h5>
                        <p class="card-text">Writer <span>|</span> <small class="text-muted">Last updated 3 mins ago</small></p>
                        <p class="card-text">intro.....</p>
                        <a onclick="setPostDetail(${post.id})" href="post_detail.html" class=" btn bg-warning" style="font-size: 20px;">Read more -></a>
                        </div>
                    </div>
                </div>`
    })

    list_post_by_folder.innerHTML = postList

    })
}

function setPostDetail(id){
    localStorage.setItem('id_post_detail', id)
}