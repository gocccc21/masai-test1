document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recipe-form");
    const recipesContainer = document.getElementById("recipes-container");
    const filter = document.getElementById("filter");

    function loadRecipes() {
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipesContainer.innerHTML = "";
        recipes.forEach(recipe => displayRecipe(recipe));
    }

    function saveRecipe(recipe) {
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        loadRecipes();
    }

    function displayRecipe(recipe) {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><b>Category:</b> ${recipe.category}</p>
            <p>${recipe.steps}</p>
            <h4>Ingredients:</h4>
            <table>${recipe.ingredients.split(',').map(ing => `<tr><td>${ing.trim()}</td></tr>`).join('')}</table>
        `;
        recipesContainer.appendChild(card);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const recipe = {
            name: document.getElementById("recipe-name").value,
            ingredients: document.getElementById("ingredients").value,
            category: document.getElementById("category").value,
            steps: document.getElementById("steps").value
        };
        saveRecipe(recipe);
        form.reset();
    });

    filter.addEventListener("change", () => {
        const selectedCategory = filter.value;
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipesContainer.innerHTML = "";
        recipes.filter(recipe => selectedCategory === "All" || recipe.category === selectedCategory)
            .forEach(recipe => displayRecipe(recipe));
    });

    loadRecipes();
});
