const SEARCH_API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s="; // TODO: Set your API URL here

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsGrid = document.getElementById("results-grid");
const messageArea = document.getElementById("message-area");

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