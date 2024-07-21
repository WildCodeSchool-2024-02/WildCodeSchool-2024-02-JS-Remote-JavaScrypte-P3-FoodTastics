/* eslint-disable react/jsx-props-no-spreading  */
import axios from "axios";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./Connection.css";
import { useForm } from "react-hook-form";

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
      setCurrentUser(response.data.user);

      navigate(`/`);
    } catch (e) {
      console.error(e);
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
        <div className="email-connection">
          <label>
            Email
            <input
              className="email-connection"
              type="email"
              placeholder="Adresse email"
              name="email"
              {...register("email", {
                required: "L'email est obligatoire",
                pattern: {
                  value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                  message: "Le format de l'e-mail est incorrect.",
                },
              })}
            />
          </label>
          {errors.email && <span> {errors.email.message}</span>}
        </div>

        <div className="password-connection">
          <label>
            Mot de passe
            <input
              className="password-connection"
              type="password"
              placeholder="Mot de passe"
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
          </label>
          {errors.password && <span> {errors.password.message}</span>}
        </div>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
