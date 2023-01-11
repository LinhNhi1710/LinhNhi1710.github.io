const checkLogin = localStorage.getItem('jwt')

if(checkLogin === null){
    window.location.href = 'index.html'
}

const jwt = localStorage.getItem('jwt');
const client = localStorage.getItem('client');
const uid = localStorage.getItem('uid');

const new_category = document.querySelector("#new_category")
const btn_add_category = document.querySelector("#btn_add_category")

const block_list_category = document.querySelector(".block_list_category")

const btn_edit_category = document.querySelector("#btn_edit_category")

const category_list = document.querySelector(".category_list")

function start() {
    handleAddCategory()
    fetchCategory()
    handleEditCategory()
    fetchCategoryList()
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

function fetchCategoryList(){
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


function addCategory(data, callback) {

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
    fetch("http://dev.thanqminh.com:3000/task_lists", options)
        .then(function (response) {
            alert("Add category successfully !")
            window.location.reload()
        })
        .then(callback)
}

function handleAddCategory() {

    btn_add_category.onclick = function () {

        var data =
        {
            "name": new_category.value,
        }

        addCategory(data)
        
    }
}

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
        return   `<div class="row">
<div class="col-xl-4" >
    <a href="Name_of_category.html" class="btn bg-yellow" style="width: 100px;">${cate.name}</a>
</div>
<div class="col-xl-7">
    <p class="card-text"><small class="text-muted">total post</small> <span>|</span> <small class="text-muted">total author</small></p>
</div>
<div class="col-xl-1">
    <div class="dropdown show text-right dropleft">
        <i class="bi bi-three-dots-vertical " id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenuLink">
        <a href="#" onclick="setIdCategory(${cate.id})" data-toggle="modal" data-target="#editNameModal" >Edit Category</a>
          <li><a class="dropdown-item" href="">Duplicate</a></li>
          <li class="dropdown-submenu ">
            <a class="dropdown-item"  href="#">Move to otherlist</a>
            <ul class="dropdown-menu ">
              <li><a class="dropdown-item" href="#"></a>Noodle</a></li>
              <li><a class="dropdown-item" href="#"></a>Rice</li>
              <li><a class="dropdown-item" href="#"></a>Pizza</li>
            </ul>
          </li>
          <li class="dropdown-item" data-toggle="modal" data-target="#shareModal"><a href="#">Share</a></li>
          <li class="dropdown-item" id="deletefolder_lists"><a onclick="deleteCategory(${cate.id})">Delete</a>
            </li>
        </ul>
      </div><!--end dropdown-->
</div>
</div>
<div class="row mt-5"></div>`
    })

    block_list_category.innerHTML = categoryList

    })
}


function getPost(id, callback){
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

    fetch("http://dev.thanqminh.com:3000/task_lists/" + id + "/todos", options)
    .then(function(response){
        console.log(123)
        return data =  response.json()
    })
    .then(callback)
}

function deleteCategory(id){

    getPost(id,function(postListByFolder){


    postListByFolder.map(function(post){
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
        fetch("http://dev.thanqminh.com:3000/task_lists/" + id + "/todos/" + post.id, options)
        .then(function(response){

        })
    })
    })

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
    fetch("http://dev.thanqminh.com:3000/task_lists/" + id, options)
    .then(function(response){
        window.location.reload()
    })

}

function setIdCategory(id){
    localStorage.setItem('editId', id)
}

function editCategory(data, callback) {

    const get_category_id = localStorage.getItem('editId')

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
    fetch("http://dev.thanqminh.com:3000/task_lists/" + get_category_id, options)
        .then(function (response) {
            alert("Edit category successfully !")
            window.location.reload()
        })
        .then(callback)
}

function handleEditCategory() {

    const new_name_category = document.querySelector("#new_name_category")

    btn_edit_category.onclick = function () {

        var data =
        {
            "name": new_name_category.value,
        }

        editCategory(data)
        
    }
}