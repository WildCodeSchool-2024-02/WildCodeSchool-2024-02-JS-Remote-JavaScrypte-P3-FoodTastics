/* eslint-disable react/jsx-props-no-spreading  */
import "./Sign.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";

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
    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <div>
      <div className="sign-container">
        <h1 className="title-sign">Je créé un compte</h1>
        <form className="form-sign" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstName">First Name</label>
          <input
            className="firstname-sign"
            id="grid-first-name"
            name="firstname"
            type="text"
            placeholder="Toto"
            {...register("firstname", {
              minLength: 2,
              required: "required",
            })}
          />
          <label className="" htmlFor="lastname">
            Last Name
          </label>
          <input
            className="email-sign"
            name="lastname"
            type="text"
            placeholder="Doe"
            {...register("lastname", {
              minLength: 2,
              required: "required",
            })}
          />
          Pseudo
          <input
            className="pseudo-s"
            id="grid-first-name"
            name="pseudo"
            type="text"
            placeholder="Toto"
            {...register("pseudo", {
              required: "required",
            })}
          />
          <input
            className="email-sign"
            type="email"
            placeholder="Adresse e-mail"
            name="email"
            {...register("email", {
              required: "L'e-mail est obligatoire",
              pattern: {
                value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                message: "Le format de votre e-mail est incorrect",
              },
            })}
          />
          {errors.email && <span> {errors.email.message}</span>}
          <input
            className="password-sign"
            type="password"
            placeholder="Mot de passe"
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
          {errors.password && <span> {errors.password.message}</span>}
          <label htmlFor="confirmpassword"> Confirm Password</label>
          <input
            className="confirm-password"
            name="confirmpassword"
            type="password"
            placeholder="******"
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
    </div>
  );
}
