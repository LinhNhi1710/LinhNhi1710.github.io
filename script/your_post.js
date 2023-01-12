const checkLogin = localStorage.getItem('jwt')

if(checkLogin === null){
    window.location.href = 'index.html'
}

const btn_sign_out = document.querySelector("#btn_sign_out")

const jwt = localStorage.getItem('jwt');
const client = localStorage.getItem('client');
const uid = localStorage.getItem('uid');

const block_list_post = document.querySelector(".block_list_post")
const category_list = document.querySelector(".category_list")

btn_sign_out.onclick = function(){
    localStorage.removeItem("jwt");
    window.location.href = 'index.html'
}

function start() {
    fetchPost()
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

    const category_id = localStorage.getItem('category_add')

    fetch("http://dev.thanqminh.com:3001/task_lists/" + category_id + "/todos", options)
    .then(function(response){
        return data =  response.json()
    })
    .then(callback)
}

function fetchPost(){
    getPost(function(postListByFolder){

    const postList = postListByFolder.map(function(post){
        return `<div class="row ml-5 mt-5">
        <div class="col-xl-4">
            <img src="image/my_post1.jpg" alt="" class="img-thumbnail" style="height: 220px;  width: 300px;">
        </div><!--end col-->
        <div class="col-xl-8">
            <div class="card w-100 bg-seashell">
                <div class="card-body">
                    <h5 class="card-title">${post.name}<span>|</span> <small class="text-muted">Last updated 3 mins ago</small></h5>
                    <div class="dropdown show text-right dropleft">
                        <i class="bi bi-three-dots-vertical " id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenuLink">
                          <li><a class="dropdown-item" onclick="setIdPostEdit(${post.id})" href="save_post.html">Edit</a></li>
                          <li><a class="dropdown-item" href="">Duplicate</a></li>
                          <li class="dropdown-submenu ">
                            <a class="dropdown-item"  href="#">Move to otherlist</a>
                            <ul class="dropdown-menu ">
                              <li><a class="dropdown-item" href="#"></a></a></li>
                              <li><a class="dropdown-item" href="#"></a>Rice</li>
                              <li><a class="dropdown-item" href="#"></a>Pizza</li>
                            </ul>
                          </li>
                          <li class="dropdown-item" data-toggle="modal" data-target="#shareModal"><a href="#">Share</a></li>
                          <li class="dropdown-item"><a onclick="deletePost(${post.id})" href="#">Delete</a>
                            </li>
                        </ul>
                      </div>
                    <p class="card-text">${post.description}</p>
                    <a onclick="setPostDetail(${post.id})" href="post_detail.html" class=" btn bg-pink" style="font-size: 20px;">Read more -></a>
                </div>
            </div>
        </div>
    </div>`
    })

    block_list_post.innerHTML = postList

    })
}

function deletePost(id){
    var options = {
        method: "DELETE",
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
    fetch("http://dev.thanqminh.com:3001/task_lists/" + category_id + "/todos/" + id, options)
    .then(function(response){
        window.location.reload()
    })
}

function setIdPostEdit(id){
    localStorage.setItem('id_post_edit', id)
}

function setPostDetail(id){
    localStorage.setItem('id_post_detail', id)
}