const SEARCH_API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s="; // TODO: Set your API URL here

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsGrid = document.getElementById("results-grid");
const messageArea = document.getElementById("message-area");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    console.log("search term: ", searchTerm);
});