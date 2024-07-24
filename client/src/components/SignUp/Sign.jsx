/* eslint-disable react/jsx-props-no-spreading  */
import "./Sign.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Sign() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = { ...data };
    delete formData.confirmpassword;
    reset();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/register`,
        data
      );
      toast.success("Vous êtes bien inscrit(e) !");
    } catch (e) {
      console.error(e.response.data);
      toast.error("Une erreur est survenue, veuillez réessayer ultérieurement");
    }
  };

  return (
    <div className="sign-container">
      <h1 className="title-sign">Je créé un compte</h1>
      <form className="form-sign" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName" className="label-sign">
          Prénom
        </label>
        <input
          className="firstname-sign"
          id="grid-first-name"
          name="firstname"
          type="text"
          placeholder="Insérer votre prénom"
          {...register("firstname", {
            required: "Le prénom est obligatoire",
            minLength: {
              value: 2,
              message: "Votre prénom doit contenir au minimun 2 caractères",
            },
          })}
        />
        {errors.firstname && (
          <span className="error"> {errors.firstname.message}</span>
        )}

        <label htmlFor="lastname" className="label-sign">
          Nom
        </label>
        <input
          className="lastname-sign"
          name="lastname"
          type="text"
          placeholder="Insérer votre nom"
          {...register("lastname", {
            required: "Votre nom est obligatoire",
            minLength: {
              value: 2,
              message: "Votre nom doit contenir au minimun 2 caractères",
            },
          })}
        />
        {errors.lastname && (
          <span className="error"> {errors.lastname.message}</span>
        )}
        <label htmlFor="pseudo" className="label-sign">
          Pseudo
        </label>
        <input
          className="pseudo-sign"
          id="grid-first-name"
          name="pseudo"
          type="text"
          placeholder="Insérer votre pseudo"
          {...register("pseudo", {
            required: "Le pseudo est obligatoire",
            minLength: {
              value: 2,
              message: "Votre pseudo doit contenir au minimun 2 caractères",
            },
          })}
        />
        {errors.pseudo && (
          <span className="error"> {errors.pseudo.message}</span>
        )}
        <label htmlFor="email" className="label-sign">
          {" "}
          E-mail
        </label>
        <input
          className="email-sign"
          type="email"
          placeholder="Insérer votre e-mail"
          name="email"
          {...register("email", {
            required: "L'e-mail est obligatoire",
            pattern: {
              value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
              message: "Le format de votre e-mail est incorrect",
            },
          })}
        />
        {errors.email && <span className="error"> {errors.email.message}</span>}
        <label htmlFor="password" className="label-sign">
          {" "}
          Mot de passe
        </label>
        <input
          className="password-sign"
          type="password"
          placeholder="Insérer votre mot de passe"
          name="password"
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
        {errors.password && (
          <span className="error"> {errors.password.message}</span>
        )}
        <label htmlFor="confirmpassword" className="label-sign">
          {" "}
          Confirmer le mot de passe
        </label>
        <input
          className="confirm-password"
          name="confirmpassword"
          type="password"
          placeholder="Confirmer votre mot de passe"
          {...register("confirmpassword", {
            pattern:
              /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,200}$/,
            required: "required",
            validate: (value) =>
              value === watch("password") ||
              "Les mots de passe ne correspondent pas",
          })}
        />
        <button className="btn-sign" type="submit">
          S'inscrire
        </button>
      </form>
    </div>
  );
}
