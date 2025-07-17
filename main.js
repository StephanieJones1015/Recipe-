const SEARCH_API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s="; // TODO: Set your API URL here
const RANDOM_RECIPE_API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsGrid = document.getElementById("results-grid");
const messageArea = document.getElementById("message-area");
const randomButton = document.getElementById("random-button");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    

    if (searchTerm) {
        searchRecipes(searchTerm);
    } else {
        showMessage("Please enter an ingredient.", true);
    } 
});
async function searchRecipes(query) {
   showMessage(`Searching for "${query}"...`, false, true);
   resultsGrid.innerHTML= ""; 

   try {
    const response = await fetch(`${SEARCH_API_URL}${query}`);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    clearMessage();
    console.log("data:", data);
    if (data.meals) {
        displayRecipes(data.meals);  
    }else {
        showMessage(`There is no recipe for "${query}"`, true);
    }
   } catch (error) {
    showMessage("OOPS something isn't quite right, Please retry.", true);
   }
}

function showMessage(message, isError = false, isLoading = false) {
    messageArea.textContent = message; 
    if (isError) messageArea.classList.add("error");
    if (isLoading) messageArea.classList.add("loading");
    else {
    
    }
    
}
//function to clear the message area
function clearMessage() {
    messageArea.textContent = "";
    messageArea.className = "message";
}

function displayRecipes(recipes) {
    if (!recipes || recipes.length === 0) {
        showMessage("No recpes found.", true);
        return;
}

recipes.forEach(recipe => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe-item");

    recipeDiv.innerHTML = `
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" loading="lazy">
        <h3>${recipe.strMeal}</h3>
        <p>${recipe.strInstructions.slice(0, 100)}...</p>
    `;
    resultsGrid.appendChild(recipeDiv);
});


}
randomButton.addEventListener("click", getRandomRecipe);

async function getRandomRecipe() {
    showMessage("Fetching a random recipe...", false, true);
    resultsGrid.innerHTML = "";

    try {
        const response = await fetch(RANDOM_RECIPE_API_URL);
        if (!response.ok) throw new Error("Opps! Something went wrong.");

        const data = await response.json();

        clearMessage();
        
        if (data.meals && data.meals.length > 0) {
            displayRecipes(data.meals);
        } else {
            showMessage("No random recipe found.", true);
        }
        } catch (error) {
        showMessage("Failed to find a random recipe. Please try again.", true);
    }
}