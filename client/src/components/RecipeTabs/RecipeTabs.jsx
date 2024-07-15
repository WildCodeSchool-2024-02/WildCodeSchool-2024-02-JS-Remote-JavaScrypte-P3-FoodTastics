import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import "./RecipeTabs.css";

function RecipeTabs() {
  const recipeLabelData = useLoaderData();

  const [activeTab, setActiveTab] = useState("végétarien");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filterRecipes = (tab) => {
    const filtered = recipeLabelData.filter((label) => {
      if (tab === "végétarien") return label.label_id === 2;
      if (tab === "sans gluten") return label.label_id === 3;
      if (tab === "sans lactose") return label.label_id === 1;
      return false;
    });
    return filtered;
  };

  const filteredRecipes = filterRecipes(activeTab);

  return (
    <div className="recipes-container">
      <div className="tabs">
        <button
          type="button"
          className={activeTab === "végétarien" ? "active" : ""}
          onClick={() => handleTabChange("végétarien")}
        >
          Végétariennes
        </button>
        <button
          type="button"
          className={activeTab === "sans gluten" ? "active" : ""}
          onClick={() => handleTabChange("sans gluten")}
        >
          Sans Gluten
        </button>
        <button
          type="button"
          className={activeTab === "sans lactose" ? "active" : ""}
          onClick={() => handleTabChange("sans lactose")}
        >
          Sans Glucose
        </button>
      </div>
      <div className="all-recipes">
        {filteredRecipes &&
          filteredRecipes.map((recipe) => (
            <div key={recipe.recipe_id} className="recipe-card">
              <h3>{recipe.recipe_name}</h3>
              <img src={recipe.recipe_image} alt={recipe.recipe_name} />
              <Link to={`/details/${recipe.recipe_id}`}>
                <button type="button" className="buttonDetails">
                  Details
                </button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecipeTabs;
