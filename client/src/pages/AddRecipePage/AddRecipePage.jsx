/* eslint-disable react/jsx-props-no-spreading */

import "./AddRecipePage.css";
import { NavLink, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autosuggest from "react-autosuggest";

export default function AddRecipePage() {
  const ingredientsData = useLoaderData();
  const [value, setValue] = useState("");
  const [ingredientsSelected, setIngredientsSelected] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const data = { ...formData };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/recipe`, data);
      toast.success("Votre recette a bien été ajoutée!");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue, veuillez réessayer ultérieurement");
    }
  };

  const filterInputs = (inputValue) => {
    const trimmedInputValue = inputValue.trim().toLowerCase();
    const inputLength = trimmedInputValue.length;
    return inputLength === 0
      ? []
      : ingredientsData.filter((ingredient) =>
          ingredient.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(trimmedInputValue)
        );
  };

  const onSuggestionsFetchRequested = ({ value: inputValue }) => {
    setSuggestions(filterInputs(inputValue));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const selectIngredient = (ingredient) => {
    setIngredientsSelected((prevSelected) => [...prevSelected, ingredient]);
    setValue("");
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => `${suggestion.name}`;

  const renderSuggestion = (suggestion) => (
    <button
      type="button"
      className="suggestion"
      onClick={() => selectIngredient(suggestion)}
    >
      {suggestion.name}
    </button>
  );

  const removeIngredient = (ingredientToRemove) => {
    setIngredientsSelected((prevSelected) =>
      prevSelected.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Cherchez un ingrédient",
    value,
    onChange,
  };

  const eventEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const ingredient = e.target.value;
      selectIngredient(ingredient);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="connectionForm">
      <div className="recipeTopContainer">
        <input
          type="text"
          className="recipeName"
          name="name"
          placeholder="Écrivez le nom de votre recette"
          {...register("name", {
            required: "Le nom de la recette est obligatoire",
            pattern: {
              value: /^[a-zA-Z\s]*$/,
              message: "Le nom de la recette ne doit contenir que des lettres",
            },
          })}
        />
        {errors.name && (
          <span className="recipeCreationError">{errors.name.message}</span>
        )}

        <img className="recipeImage" src="images/add_img.png" alt="Ajouter" />
        <input
          type="url"
          name="image"
          className="recipeImageLink"
          placeholder="Saisissez l'url de l'image"
          {...register("image", {
            required: "L'URL de l'image est obligatoire",
            pattern: {
              value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
              message: "Veuillez entrer une URL valide",
            },
          })}
        />
        {errors.image && (
          <span className="recipeCreationError">{errors.image.message}</span>
        )}
      </div>
      <div className="recipeSecondaryInfo">
        <input
          type="text"
          className="numberOfPeople"
          name="number_of_people"
          placeholder="Nombre de personnes"
          {...register("number_of_people", {
            required: "Le nombre de personnes est obligatoire",
            pattern: {
              value: /^[0-9]+$/,
              message:
                "Le nombre de personnes ne doit contenir que des chiffres",
            },
          })}
        />
        {errors.number_of_people && (
          <span className="recipeCreationError">
            {errors.number_of_people.message}
          </span>
        )}
        <input
          type="text"
          className="preparationTime"
          name="set_up_time"
          placeholder="Temps de préparation (en minutes)"
          {...register("set_up_time", {
            required: "Le temps de préparation est obligatoire",
            pattern: {
              value: /^[0-9]+$/,
              message:
                "Le temps de préparation ne doit contenir que des chiffres",
            },
          })}
        />
        {errors.set_up_time && (
          <span className="recipeCreationError">
            {errors.set_up_time.message}
          </span>
        )}
      </div>
      <div className="autosuggest">
        <div className="autosuggestInteraction">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={eventEnter}
          />
          <NavLink to="/ingredient" className="newIngredient">
            {" "}
            Créez un ingrédient s'il n'existe pas
          </NavLink>
        </div>
        <p>Ingrédients ajoutés :</p>
        <ul>
          {ingredientsSelected.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name}
              <button
                type="button"
                className="removeIngredient"
                onClick={() => removeIngredient(ingredient)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="recipeDescriptionContainer">
        <label htmlFor="recipeDescription">Description de votre recette</label>
        <textarea
          name="description"
          className="recipeDescription"
          placeholder="Décrivez ici le déroulé de votre recette"
          rows="5"
          cols="33"
          {...register("description", {
            required: "Une description est obligatoire",
          })}
        />
        {errors.description && (
          <span className="recipeCreationError">
            {errors.description.message}
          </span>
        )}
        <button className="recipeSubmit" type="submit">
          Ajoutez votre recette
        </button>
      </div>
    </form>
  );
}
