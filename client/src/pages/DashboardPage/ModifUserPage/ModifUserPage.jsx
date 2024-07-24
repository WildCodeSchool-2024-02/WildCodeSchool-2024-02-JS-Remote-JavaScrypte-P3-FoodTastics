/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import { useForm } from "react-hook-form";
import "./ModifUserPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton/BackButton";

export default function ModifUserPage() {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  const user = useLoaderData();
  const {
    user_id,
    firstname,
    lastname,
    password,
    pseudo,
    image_profile,
    email,
    role,
  } = user.user[0];

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
        `${import.meta.env.VITE_API_URL}/api/user/${user_id}`,
        data
      );

      toast.success("Modification effectuée avec succès");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur es survenue, veuillez réessayer ultérieurement");
    }
  };

  return (
    <>
      <BackButton />
      <div className="users-container">
        <h1>Utilisateurs</h1>

        <form
          className="card-user"
          key={user_id}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card-img-container">
            <img className="card-image" src={image_profile} alt="avatar" />
          </div>
          <div className="card-pseudo">
            <label className="card-label" htmlFor="pseudo">
              Pseudo :
            </label>
            <input
              className="card-input"
              defaultValue={pseudo}
              type="text"
              {...register("pseudo", {
                required: "Le pseudo est requis",
              })}
            />
          </div>
          <div className="card-prenom-nom">
            <label className="card-label" htmlFor="firstname">
              Prénom:
            </label>
            <input
              type="text"
              className="card-input"
              defaultValue={firstname}
              {...register("firstname", {
                minLength: 2,
                required: "Le prénom est requis",
              })}
            />
            <label className="card-label" htmlFor="lastname">
              Nom:
            </label>
            <input
              type="text"
              className="card-input"
              defaultValue={lastname}
              {...register("lastname", {
                minLength: 2,
                required: "Le nom est requis",
              })}
            />
          </div>
          <div className="card-email">
            <label className="card-label" htmlFor="email">
              Email :
            </label>
            <input
              className="card-input"
              defaultValue={email}
              type="email"
              {...register("email", {
                required: "L'e-mail est obligatoire",
                pattern: {
                  value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                  message: "Le format de votre e-mail est incorrect",
                },
              })}
            />
            {errors.email && <span>{errors.message}</span>}
          </div>
          <div className="card-password">
            <label className="card-label" htmlFor="password">
              Mot de passe
            </label>
            <input
              className="card-input"
              defaultValue={password}
              type="password"
              {...register("password", {
                required: "Le mot de passe est obligatoire",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,200}$/,
                  message:
                    "Le mot de passe doit au moins contenir 1 majuscule, 1 caractère spécial et 1 chiffre",
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="card-label-input-url">
            <label htmlFor="image_profile" className="card-label">
              Image (Url) :
            </label>
            <input
              className="card-input"
              defaultValue={image_profile}
              type="url"
              {...register("image_profile", {
                pattern: {
                  value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                  message: "Veuillez entrer une URL valide",
                },
              })}
            />
          </div>

          <div className="card-role">
            <label className="card-label" htmlFor="role">
              Role :
            </label>
            <input
              className="card-input"
              defaultValue={role}
              type="text"
              {...register("role", {
                required: "Le rôle est requis",
              })}
            />
          </div>
          <div className="btn-card-container">
            <button className="btn-card" type="submit">
              Modifier
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
