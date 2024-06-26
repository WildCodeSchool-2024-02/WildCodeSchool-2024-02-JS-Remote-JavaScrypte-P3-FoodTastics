/* eslint-disable react/jsx-props-no-spreading */

import "./Connection.css";

import { useForm } from "react-hook-form";

export default function Connexion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};

  return (
    <div className="connection-container">
      <h1 className="title-connection">Je me connecte</h1>
      <form
        className="form-connection"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="email-connection"
          type="email"
          placeholder="Adresse e-mail"
          name="emailconnection"
          {...register("emailconnection", {
            required: "L'e-mail est obligatoire",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,7}$/,
              message: "Le format de l'e-mail est incorrect.",
            },
          })}
        />
        {errors.emailconnection && (
          <span> {errors.emailconnection.message}</span>
        )}

        <input
          className="password-connection"
          type="password"
          placeholder="Mot de passe"
          name="passwordconnection"
          {...register("passwordconnection", {
            required: "le mot de passe est obligatoire",
            pattern: {
              value:
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              message:
                "Le mot de passe doit au moins contenir 1 majuscule, 1 caractère spécial et 1 chiffre",
            },
          })}
        />
        {errors.passwordconnection && (
          <span> {errors.passwordconnection.message}</span>
        )}
        <button className="btn-connection" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}
