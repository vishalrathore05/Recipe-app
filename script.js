const meals = document.getElementById('meals');
 
getRandomMeal();
 async function getRandomMeal(){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    console.log(randomMeal);

    addMeal(randomMeal, true);
} 

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
     const respData = await resp.json();
     const randomMeal = respData.meal[0];

     addMeal(randomMeal, true);
}

async function getMealBySearch(term) {
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
} 

function addMeal(mealData, random = false ) {
    
    console.log(mealData);

    const meal = document.createElement('div'); 
    meal.classList.add('meal');
    meal.innerHTML = `
     <div class="meal-header">
        ${random ? `<span class="random">Random Recipe</span>`: '' }
        <img src="${mealData.strMealThumb}" 
        alt="${mealData.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn" onclick="">
            <i class="fas fa-heart"></i>
        </button>
    </div>
    `;  
    
     const btn = meal.querySelector(".meal-body .fav-btn")

     btn.addEventListener("click",() => {
        if(btn.classList.contains('active')){
            removeMealLS(mealData.idMeal)
            btn.classList.remove("active");
        }else{
            addMealLS(mealData.idMeal)
            btn.classList.add("active");
        }
      } );
    meals.appendChild(meal);
}
    function addMealLS(mealId){
        const mealIds = getMealsLS();

        localStorage.setItem('mealIds', JSON.stringify
        ([...mealIds, mealId]));  
    }

    function removeMealLS(mealId){
        const mealIds = getMealsLS();

        localStorage.setItem('mealIds', JSON.stringify
        (mealIds.filter((id) => id
         !== mealId))
          );  
    }

    function getMealsLS(){  
        const mealIds = JSON.parse(localStorage.
            getItem("mealIds"));
         return mealIds === null ? [] : mealIds
    }

    async function fetchFavMeals(){
        const mealIds = getMealsLS();
        const meals = [];

        for (let i=0; i<mealIds.length; i++)  {
            const mealId = mealIds[i];
            meal = await getMealById(mealId);

            addMealToFav(meal);
         }
     }

     function addMealFav(mealData) {
    
        const favMeal = document.createElement('li'); 
        
        meal.innerHTML = ` <img src="${mealData.strMealThumb}" 
        alt="${mealData.strMeal}", style="border-radius: 100px;">
        <span>${mealData.strMeal}</span>
        `;  
        
         favoriteContainer.appendChild(meal);
    }