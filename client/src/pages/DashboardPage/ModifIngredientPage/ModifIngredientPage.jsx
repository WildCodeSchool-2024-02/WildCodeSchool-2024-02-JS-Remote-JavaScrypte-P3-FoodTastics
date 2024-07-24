/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import { useForm } from "react-hook-form";
import "./ModifIngredientPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton/BackButton";

export default function ModifIngredientPage() {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  const ingredient = useLoaderData();

  const {
    id,
    name,
    user_id,
    calories,
    carbohydrates,
    category,
    fiber,
    image,
    proteins,
    lipids,
    salt,
    sugar,
  } = ingredient;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/checkauth`,
          {
            withCredentials: true,
          }
        );
        const authenticatedUser = response.data.user;
        if (!authenticatedUser || authenticatedUser.id !== currentUser.id) {
          navigate("/connexion");
        }
      } catch (e) {
        console.error(e);
        navigate("connexion");
      }
    };

    checkAuth();
  }, [currentUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!currentUser) {
    return navigate("/connexion");
  }
  const onSubmit = async (formData) => {
    const data = { ...formData };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/ingredient/${id}`,
        data
      );

      toast.success("Modification effectuée avec succès");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur es survenue, veuillez réessayer ultérieurement");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/ingredient/${id}`
      );
      toast.success("Ingrédient supprimé avec succès");
      navigate("/admin/ingredients");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue, veuillez réessayer ultérieurement");
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
      <div className="ingredients-container">
        <h1 className="title-ingredient-ad">Modifiez votre ingrédient :</h1>
        <form className="ingredient-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="ingredient-image-container-ad">
            <img className="img-ingredient-ad" src={image} alt="Ajouter" />
            <label htmlFor="url" className="label-field">
              Saissez l'url de l'image :
            </label>
            <input
              type="url"
              name="image"
              className="input-field-ingredient"
              defaultValue={image}
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
              className="input-field-ingredient"
              defaultValue={name}
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
              className="input-field-ingredient"
              defaultValue={category}
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
              <span className="error-ingredient">
                {errors.category.message}
              </span>
            )}

            {errors.image && (
              <span className="error-ingredient">{errors.image.message}</span>
            )}
            <label htmlFor="calories">Calories (pour 100 gr)</label>
            <input
              type="number"
              name="calories"
              className="input-field-ingredient"
              defaultValue={calories}
              {...register("calories", nutritionalValidationRules)}
            />
            {errors.calories && (
              <span className="error-ingredient">
                {errors.calories.message}
              </span>
            )}
            <label htmlFor="proteins">Protéines (pour 100 gr)</label>
            <input
              type="number"
              name="proteins"
              className="input-field-ingredient"
              defaultValue={proteins}
              {...register("proteins", nutritionalValidationRules)}
            />
            {errors.proteins && (
              <span className="error-ingredient">
                {errors.proteins.message}
              </span>
            )}
            <label htmlFor="carbohydrates">Glucides (pour 100 gr)</label>
            <input
              type="number"
              name="carbohydrates"
              className="input-field-ingredient"
              defaultValue={carbohydrates}
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
              className="input-field-ingredient"
              defaultValue={sugar}
              {...register("sugar", nutritionalValidationRules)}
            />
            {errors.sugar && (
              <span className="error-ingredient">{errors.sugar.message}</span>
            )}
            <label htmlFor="lipids">Lipides (pour 100 gr)</label>
            <input
              type="number"
              name="lipids"
              className="input-field-ingredient"
              defaultValue={lipids}
              {...register("lipids", nutritionalValidationRules)}
            />
            {errors.lipids && (
              <span className="error-ingredient">{errors.lipids.message}</span>
            )}
            <label htmlFor="salt">Sel(pour 100 gr)</label>
            <input
              type="number"
              name="salt"
              className="input-field-ingredient"
              defaultValue={salt}
              {...register("salt", nutritionalValidationRules)}
            />
            {errors.salt && (
              <span className="error-ingredient">{errors.salt.message}</span>
            )}
            <label htmlFor="fiber">Fibres(pour 100 gr)</label>
            <input
              type="number"
              name="fiber"
              className="input-field-ingredient"
              defaultValue={fiber}
              {...register("fiber", nutritionalValidationRules)}
            />
            {errors.fiber && (
              <span className="error-ingredient">{errors.fiber.message}</span>
            )}
            <label htmlFor="user_id">User(id)</label>
            <input
              type="number"
              name="user_id"
              className="input-field-ingredient"
              defaultValue={user_id}
              {...register("user_id", nutritionalValidationRules)}
            />
            {errors.user_id && (
              <span className="error-ingredient">{errors.fiber.message}</span>
            )}
            <button className="button-ingredient-ad" type="submit">
              Enregistrer
            </button>
          </div>
        </form>
        <div className="btn-delete-container">
          <button
            className="btn-ingredient-delete"
            type="button"
            onClick={handleDelete}
          >
            Supprimer l'ingrédient
          </button>
        </div>
      </div>
    </>
  );
}
