const { z } = require("zod");

const userRegex =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,200}$/;

const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const userSchema = z.object({
  firstname: z
    .string({
      invalid_type_error: "Le format de votre prénom n’est pas valide",
    })
    .min(2, {
      message: "votre prénom doit contenir au minimum 2 caractères",
    })
    .max(20, {
      message: "votre prénom doit contenir au maximum 20 caractères",
    }),
  lastname: z
    .string({
      invalid_type_error: "Le nom de votre format n’est pas valide",
    })
    .min(2, {
      message: "Votre nom doit contenir au minimum 2 caractères",
    })
    .max(20, {
      message: "Votre nom doit contenir au maximum 20 caractères",
    }),
  password: z
    .string()
    .regex(userRegex, {
      message:
        "Votre mot de passe doit contenir, un chiffre, une lettre majuscule et un caractère spécial",
    })
    .min(8, {
      message: "Votre nom doit contenir au minimum 8 caractères",
    }),
  pseudo: z
    .string({
      invalid_type_error: "Le format de votre pseudo n’est pas valide",
    })
    .min(2, {
      message: "Votre prénom doit contenir au minimum 2 caractères",
    }),
  email: z.string().regex(emailRegex, {
    message: "votre mail n'a pas le bon format",
  }),
});

const validateUserSchema = (req, res, next) => {
  const { firstname, lastname, password, pseudo, email } = req.body;

  const validate = userSchema.safeParse({
    firstname,
    lastname,
    password,
    pseudo,
    email,
  });

  if (!validate.success) {
    const errors = validate.error.issues.reduce((acc, issue) => {
      acc[issue.path[0]] = issue.message;
      return acc;
    }, {});

    return res.status(403).json(errors);
  }
  return next();
};

module.exports = validateUserSchema;
