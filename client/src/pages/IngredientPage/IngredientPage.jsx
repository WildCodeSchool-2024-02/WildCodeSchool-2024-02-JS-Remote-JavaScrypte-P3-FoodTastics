/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from "react-hook-form";
import "./IngredientPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../../components/BackButton/BackButton";

export default function IngredientPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userId = 1;
  const onSubmit = async (formData) => {
    const data = { ...formData };

    if (!data.image) {
      data.image = "images/Logo_foodtastics.png";
    }
    data.user_id = userId;

    try {
      await axios.post("http://localhost:3310/api/ingredient", data);
      toast.success("Votre formulaire a bien été soumis");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur es survenue, veuillez réessayer ultérieurement");
    }
  };

  const nutritionalValidationRules = {
    required: "Ce champ est requis",
    valueAsNumber: true,
    min: {
      value: 0,
      message: "La valeur doit être égale ou supérieure à 0",
    },
  };
  return (
    <>
      <BackButton />
      <h1 className="title-ingredient">Ajouter votre ingrédient</h1>

      <form className="container-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="container-image">
          <img
            className="img-ingredient"
            src="images/add_img.png"
            alt="Ajouter"
          />
          <label htmlFor="url" className="label-field">
            Saissez l'url de l'image
          </label>
          <input
            type="url"
            name="image"
            className="input-field"
            {...register("image", {
              pattern: {
                value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                message: "Veuillez entrer une URL valide",
              },
            })}
          />
        </div>
        <div className="form-ingredient">
          <label htmlFor="name" className="label-field">
            Nom
          </label>
          <input
            type="text"
            name="name"
            className="input-field"
            {...register("name", {
              required: "Ce champ est requis",
              minLength: {
                value: 2,
                message:
                  "Le nom de l'ingredient doit contenir au minimun 2 caractères",
              },
            })}
          />
          {errors.name && (
            <span className="error-ingredient">{errors.name.message}</span>
          )}

          <label htmlFor="category" className="label-field">
            Catégorie
          </label>
          <input
            type="text"
            name="category"
            className="input-field"
            {...register("category", {
              required: "Ce champ est requis",
              minLength: {
                value: 2,
                message:
                  "Le nom de la category doit contenir au minimun 2 caractères",
              },
            })}
          />
          {errors.category && (
            <span className="error-ingredient">{errors.category.message}</span>
          )}

          {errors.image && (
            <span className="error-ingredient">{errors.image.message}</span>
          )}
          <label htmlFor="calories">Calories (pour 100 gr)</label>
          <input
            type="number"
            name="calories"
            className="input-field"
            {...register("calories", nutritionalValidationRules)}
          />
          {errors.calories && (
            <span className="error-ingredient">{errors.calories.message}</span>
          )}
          <label htmlFor="proteins">Protéines (pour 100 gr)</label>
          <input
            type="number"
            name="proteins"
            className="input-field"
            {...register("proteins", nutritionalValidationRules)}
          />
          {errors.proteins && (
            <span className="error-ingredient">{errors.proteins.message}</span>
          )}
          <label htmlFor="carbohydrates">Glucides (pour 100 gr)</label>
          <input
            type="number"
            name="carbohydrates"
            className="input-field"
            {...register("carbohydrates", nutritionalValidationRules)}
          />
          {errors.carbohydrates && (
            <span className="error-ingredient">
              {errors.carbohydrates.message}
            </span>
          )}
          <label htmlFor="sugar">Sucre (pour 100 gr)</label>
          <input
            type="number"
            name="sugar"
            className="input-field"
            {...register("sugar", nutritionalValidationRules)}
          />
          {errors.sugar && (
            <span className="error-ingredient">{errors.sugar.message}</span>
          )}
          <label htmlFor="lipids">Lipides (pour 100 gr)</label>
          <input
            type="number"
            name="lipids"
            className="input-field"
            {...register("lipids", nutritionalValidationRules)}
          />
          {errors.lipids && (
            <span className="error-ingredient">{errors.lipids.message}</span>
          )}
          <label htmlFor="salt">Sel(pour 100 gr)</label>
          <input
            type="number"
            name="salt"
            className="input-field"
            {...register("salt", nutritionalValidationRules)}
          />
          {errors.salt && (
            <span className="error-ingredient">{errors.salt.message}</span>
          )}
          <label htmlFor="fiber">Fibres(pour 100 gr)</label>
          <input
            type="number"
            name="fiber"
            className="input-field"
            {...register("fiber", nutritionalValidationRules)}
          />
          {errors.fiber && (
            <span className="error-ingredient">{errors.fiber.message}</span>
          )}
          <button className="button-ingredient" type="submit">
            Enregistrer
          </button>
        </div>
      </form>
    </>
  );
}
