const searchBox = document.querySelector(".searchbox");
const searchButton = document.querySelector(".searchbutton");
const recepiecontainer = document.querySelector(".recepie-container");
const recepieclosebtn = document.querySelector(".recepie-closebtn");
const recepieDetails = document.querySelector(".receipe-details-content");
// feteh data from api/
const fetchDetails = async (query) => {
  recepiecontainer.innerHTML = "<h2>Fetching Recepies.... </h2>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = await data.json();

    recepiecontainer.innerHTML = "";
    response.meals.forEach((meal) => {
      const recepiediv = document.createElement("div");
      recepiediv.classList.add("recpie");
      recepiediv.innerHTML = `<img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea} <span>Dish</span></p>
    <p>Belongs to  <span>${meal.strCategory}</span> Categories</p>
    `;
      const recpiebutton = document.createElement("button");

      recpiebutton.textContent = "view Details";

      recepiecontainer.appendChild(recepiediv);
      //adding eventlistener to recepie button
      recpiebutton.addEventListener("click", () => {
        openRecepiePopup(meal);
      });
      recepiediv.appendChild(recpiebutton);
    });
  } catch (error) {
    recepiecontainer.innerHTML = `<h2>Error in Fetching Recepies </h2>
   <div>
    <img src="img/1.jpg">
    </div>`
  }
};
//function to fetch intredients and measurements
const fetchIntredients = (meal) => {
  let ingredientslist = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientslist += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientslist;
};

const openRecepiePopup = (meal) => {
  recepieDetails.innerHTML = `
  <h2 class="recepiename">${meal.strMeal}</h2>
    <h3>Intredients:</h3>
    <ul class="IntredientsList" >${fetchIntredients(meal)}</ul> 
    <div class="instructions">
      <h3> Instructions : </h3>
      <p >${meal.strInstructions}</p>
    </div>
    `;

  recepieDetails.parentElement.style.display = "block";
};
//close button of recipe details
recepieclosebtn.addEventListener("click", () => {
  recepieDetails.parentElement.style.display = "none";
});
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recepiecontainer.innerHTML = `<h2>Type the meal you want to search</h2>`;
    return;
  }
  fetchDetails(searchInput);
  searchBox.value = "";
  // console.log("button is clicked");
});
