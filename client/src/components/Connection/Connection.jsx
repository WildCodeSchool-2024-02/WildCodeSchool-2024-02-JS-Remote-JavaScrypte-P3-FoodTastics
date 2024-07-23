/* eslint-disable react/jsx-props-no-spreading  */
import axios from "axios";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./Connection.css";

export default function Connection() {
  const { setCurrentUser } = useOutletContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const express = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${express}/api/auth/login`, data, {
        withCredentials: true,
      });
      toast.success("Vous êtes connecté(e) !");
      setCurrentUser(response.data.user);

      navigate(`/`);
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue, veuillez réessayer ultérieurement");
    }
  };

  return (
    <div className="connection-container">
      <h1 className="title-connection">Je me connecte</h1>
      <form
        className="form-connection"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email" className="label-connection">
          E-mail{" "}
        </label>
        <input
          className="email-connection"
          type="email"
          placeholder="Insérez votre e-mail"
          name="email"
          {...register("email", {
            required: "L'email est obligatoire",
            pattern: {
              value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
              message: "Le format de l'e-mail est incorrect.",
            },
          })}
        />

        {errors.email && <span className="error"> {errors.email.message}</span>}

        <label htmlFor="password" className="label-connection">
          Mot de passe
        </label>
        <input
          className="password-connection"
          type="password"
          placeholder="Insérer votre mot de passe"
          name="password"
          {...register("password", {
            required: "Le mot de passe est obligatoire",
            pattern: {
              value:
                /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,64}$/,
              message:
                "Le mot de passe doit au moins contenir 1 majuscule, 1 caractère spécial et 1 chiffre",
            },
          })}
        />

        {errors.password && (
          <span className="error"> {errors.password.message}</span>
        )}

        <button className="btn-connection" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}
