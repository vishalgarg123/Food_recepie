const searchBox = document.querySelector(".searchbox");
const searchButton = document.querySelector(".searchbutton");
const recepiecontainer = document.querySelector(".recepie-container");
// feteh data from api/
const fetchDetails = async (query) => {
  recepiecontainer.innerHTML = "<h2>Fetching Recepies.... </h2>";
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
    recpiebutton.classList.add("repiebtn")
    recpiebutton.textContent = "view Details";
    recepiecontainer.appendChild(recepiediv);
    recepiediv.appendChild(recpiebutton);
  });
};
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchDetails(searchInput);
  searchBox.value = "";
  // console.log("button is clicked");
});
