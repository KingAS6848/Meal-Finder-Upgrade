// creating local storage if not created
if (localStorage.getItem("favouritesList") == null) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}

// fetching data from API
async function fetchMealsFromApi(url,value) {
    const response=await fetch(`${url+value}`);
    const meals=await response.json();
    return meals;
}

document.getElementById('full-body').style.display='none';
function skel(){
    
    document.getElementById('homepage-skeleton').style.display='none';
    document.getElementById('full-body').style.display='block';

}
// Homepage Skeleton show while content loading

window.onload=setTimeout(skel,2000);




function showMealAtStart(){
    let inputValue = "c";
    let arr=JSON.parse(localStorage.getItem("favouritesList"));
    let url="https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let html = "";
    let meals=fetchMealsFromApi(url,inputValue);
    meals.then(data=>{
        if (data.meals) {
            data.meals.forEach((element) => {
                let isFav=false;
                for (let index = 0; index < arr.length; index++) {
                    if(arr[index]==element.idMeal){
                        isFav=true;
                    }
                }
                if (isFav) {
                    html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.strMealThumb}" class="card-img-top " alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                            <button id="main${element.idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${element.idMeal})" >Remove</button>
                        </div>
                    </div>
                </div>
                `;
                } else {
                    html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                            <button id="main${element.idMeal}" class="btn btn-outline-light" onclick="addRemoveToFavList(${element.idMeal})">Favourite</button>
                        </div>
                    </div>
                </div>
                `;
                }  
            });
        }
        
              document.getElementById("main").innerHTML = html;

          
        
    });
}
// Skeleton show while content loading
window.onload = setTimeout(showMealAtStart,4000);


// Show all the meal got from Results
async function showMealList(){
  
    let inputValue = document.getElementById("my-search").value;
    let arr=JSON.parse(localStorage.getItem("favouritesList"));
    let url="https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let html = "";
    // Skeleton
    document.getElementById("main").innerHTML = `<div id="card" class="card mb-3 skeleton" style="width: 20rem;">
    <div class="skeleton-img card-img-top"></div> 
  
         <div class="card-body">
              <h5 class="card-body"></h5>
              <div class="skeleton-line d-flex justify-content-between mt-5"></div>
          </div>
      </div>
        <div id="card" class="card mb-3 skeleton" style="width: 20rem;">
          <div class="skeleton-img card-img-top"></div> 
  
         <div class="card-body">
              <h5 class="card-body"></h5>
              <div class="skeleton-line d-flex justify-content-between mt-5"></div>
          </div>
      </div>
        <div id="card" class="card mb-3 skeleton" style="width: 20rem;">
          <div class="skeleton-img card-img-top"></div> 
          <div class="card-body">
              <div class="skeleton-title"></div>
              <div class="skeleton-line d-flex justify-content-between mt-5"></div>
           </div>
       </div>
       </div>
  </div>`;
    let data = await fetchMealsFromApi(url,inputValue);
        if (data.meals) {
            data.meals.forEach((element) => {
                let isFav=false;
                for (let index = 0; index < arr.length; index++) {
                    if(arr[index]==element.idMeal){
                        isFav=true;
                    }
                }
                if (isFav) {
                    html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                            <button id="main${element.idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${element.idMeal})" >Remove</button>
                        </div>
                    </div>
                </div>
                `;
                } else {
                    html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                            <button id="main${element.idMeal}" class="btn btn-outline-light" onclick="addRemoveToFavList(${element.idMeal})">Favourite</button>
                        </div>
                    </div>
                </div>
                `;
                }  
            });
        }
        document.getElementById("main").innerHTML = html;
    
}



//When Click on More Details then this code will run and this show the details about the Meal
async function showMealDetails(id) {
    let url="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html="";
   let data = await fetchMealsFromApi(url,id);
   
        html += `
          <div id="meal-details" class="mb-5">
            <div id="meal-header" class="d-flex justify-content-around flex-wrap">
              <div id="meal-thumbail">
                <img class="mb-2" src="${data.meals[0].strMealThumb}" alt="" srcset="">
              </div>
              <div id="details">
                <h3>${data.meals[0].strMeal}</h3>
                <h6>Category : ${data.meals[0].strCategory}</h6>
                <h6>Area : ${data.meals[0].strArea}</h6>
              </div>
            </div>
            <div id="meal-instruction" class="mt-3">
              <h5 class="text-center">Instruction :</h5>
              <p>${data.meals[0].strInstructions}</p>
            </div>
            <div class="text-center">
              <a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-outline-light mt-3">Watch Video</a>
            </div>
          </div>
        `;
   
    document.getElementById("main").innerHTML=html;
}



//Created to Add or remove from the favourite List
function addRemoveToFavList(id) {
    let arr=JSON.parse(localStorage.getItem("favouritesList"));
    let contain=false;
    for (let index = 0; index < arr.length; index++) {
        if (id==arr[index]) {
            contain=true;
        }
    }
    if (contain) {
        let number = arr.indexOf(id);
        arr.splice(number, 1);
        alert("Meal Removed Sucessfully from Favourite List");
    } else {
        arr.push(id);
        alert("Meal Added Sucessfully from Favourite List");
    }
    localStorage.setItem("favouritesList",JSON.stringify(arr));
    showMealList();
    showFavMealList();
}

// Favourite List created (When we click on favourite button this List will Open)
async function showFavMealList() {
    document.getElementById("favSearch").value = '';
    let arr=JSON.parse(localStorage.getItem("favouritesList"));
    let url="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html="";
    if (arr.length==0) {
        html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                No meal added in your favourites list.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    } else {
        for (let index = 0; index < arr.length; index++) {
         let data=   await fetchMealsFromApi(url,arr[index]);
                
                html += `
                <div id="cardfav" style="display="block">
             <span>   ${data.meals[0].strMeal} </span>

                   <img src="${data.meals[0].strMealThumb}"  alt="..."> <br>
                      <button id="main${data.meals[0].idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${data.meals[0].idMeal})">Remove</i></button>

                      </div>

                `;
          
        }
    }
    document.getElementById("favourites-body").innerHTML=html;
}


function showFavSearch(){
    let inputValue = document.getElementById("favSearch").value;
    let arr=JSON.parse(localStorage.getItem("favouritesList"));
    let url="https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let html = "";
    let meals=fetchMealsFromApi(url,inputValue);
    meals.then(data=>{
        if (data.meals) {
            data.meals.forEach((element) => {
                let isFav=false;
                for (let index = 0; index < arr.length; index++) {
                    if(arr[index]==element.idMeal){
                        isFav=true;
                    }
                }
                if (isFav) {
                    html += `
                <div id="cardfav" style="display="block">
             <span>   ${data.meals[0].strMeal} </span>

                    <img src="${data.meals[0].strMealThumb}"  alt="..."> <br>
                      <button id="main${data.meals[0].idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${data.meals[0].idMeal})">Remove</i></button>
                </div>
                `;
                }
            });
        }else{
            html+="This item is not in Your Favourite List";
        }
        document.getElementById("favourites-body").innerHTML = html;
    });
}






