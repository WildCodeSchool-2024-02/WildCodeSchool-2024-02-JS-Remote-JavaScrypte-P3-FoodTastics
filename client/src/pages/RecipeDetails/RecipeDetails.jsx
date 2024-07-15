/* eslint-disable camelcase */
import { useLoaderData } from "react-router-dom";
import "./RecipeDetails.css";

function RecipeDetails() {
  const data = useLoaderData();

  const {
    recipe_name,
    recipe_number_of_people,
    recipe_description,
    recipe_image,
    recipe_date,
    user_id,
    user_firstname,
    user_lastname,
  } = data.recipe;

  const postDate = new Date(recipe_date);
  const day = postDate.getDate();
  const month = postDate.getMonth() + 1;
  const year = postDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className="container">
      <h1 className="recipeName">{recipe_name}</h1>
      <button type="button" className="numberPeople">
        Nombre de personne : {recipe_number_of_people}
      </button>
      <img className="recipeImage" src={recipe_image} alt={recipe_name} />

      <div className="buttonContainer">
        <button type="button" className="planning">
          Ajouter au planning
        </button>
        <button type="button" className="favoris">
          Mettre en favoris 🧡
        </button>
      </div>

      <div className="lineContainer">
        <h2 className="ingredientTitle">Ingrédients</h2>
        <div className="customLine" />
      </div>

      <div className="ingredientContainer">
        {data.recipeIngredients.map((ingredient) => (
          <div key={ingredient.ingredient_id} className="ingredientItem">
            <img
              className="ingredientImage"
              src={ingredient.ingredient_image}
              alt={ingredient.ingredient_name}
            />
            <p className="ingredientName">{ingredient.ingredient_name}</p>
          </div>
        ))}
      </div>

      <div className="lineContainer">
        <h2 className="recipeTitle">Recette</h2>
        <div className="customLine" />
      </div>
      <p className="recipeDescription">{recipe_description}</p>

      <div className="lineContainer">
        <h2 className="authorTitle">Auteur</h2>
        <div className="customLine" />
      </div>
      <div className="textContainer">
        <p className="post">Postée le : {formattedDate}</p>
        <p className="">
          Par : {user_id} {user_firstname} {user_lastname}
        </p>
      </div>

      <div className="lineContainer">
        <h2 className="avisTitle">Donnez votre avis</h2>
        <div className="customLine" />
      </div>

      <div className="comment-box">-- Ajouter un commentaire --</div>
    </div>
  );
}

export default RecipeDetails;