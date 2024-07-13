/* eslint-disable react/jsx-props-no-spreading */
import "./ContactPage.css";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const templateParams = {
        from_email: data.email,
        to_name: "Anne",
        subject: data.subject,
        message: data.text,
      };
      await emailjs.send(
        "service_cb43sr8",
        "template_1uwri6y",
        templateParams,
        "uefBkedcJSqSkusR4"
      );

      toast.success("Votre formulaire a bien été soumis");
      reset();
    } catch (e) {
      toast.error("Une erreur est survenue, veuillez re-essayer plus tard");
    }
  };

  return (
    <main>
      <h1 className="title">Envoyer un message</h1>
      <form
        className="form-contact"
        method="post"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="email"
          type="email"
          placeholder="E-mail"
          name="email"
          {...register("email", {
            required: "L'email est obligatoire",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,7}$/,
              message: "Le format de l'e-mail est incorrect.",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          className="confirm-email"
          type="email"
          placeholder="Confirmation e-mail"
          name="confirmemail"
          {...register("confirmemail", {
            required: "L'email est obligatoire",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,7}$/,
              message: "Le format de l'e-mail est incorrect.",
            },
            validate: (value) =>
              value === watch("email") || "Les emails ne correspondent pas.",
          })}
        />
        {errors.confirmemail && <span>{errors.confirmemail.message}</span>}
        <input
          className="subject"
          type="text"
          placeholder="Sujet"
          name="subject"
          {...register("subject", {
            required: "Le sujet de votre message est obligatoire",
          })}
        />
        {errors.subject && <span>{errors.subject.message}</span>}
        <textarea
          className="text"
          type="text"
          placeholder="Veuillez écrire votre message ici"
          {...register("text", {
            required: "Le message est obligatoire",
          })}
        />
        {errors.text && <span>{errors.text.message}</span>}
        <button className="btn-contact" type="submit">
          Envoyer
        </button>
      </form>
    </main>
  );
}
