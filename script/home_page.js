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
const list_folder = document.querySelector(".list_folder")

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

    const list_category = category.map(function(cate){
        return `<div class="col-xl-4 ">
                    <div class="card bg-seashell" style="width: 18rem;">
                    <img class="card-img rounded mx-auto d-block" style="width: 100%;" src="image/noodle.jpg" alt="Card image">
                    <div class="card-body">
                        <a href="#" class="btn bg-yellow" style="font-size: 25px;">${cate.name}</a>   
                    </div>
                    <div>
                        <a onclick="setCheckFolder(${cate.id})" href="Name_of_category.html" class=" btn bg-pink" style="font-size: 30px;">Check them -></a>
                    </div>
                    </div>
                </div>`
    })

    category_list.innerHTML = categoryList
    
    list_folder.innerHTML = list_category

    })

    
}

function setCategoryIdAdd(id){
    localStorage.setItem('category_add', id)
}


function setCheckFolder(id){
    localStorage.setItem('check_folder', id)
}