/* eslint-disable camelcase */
const { z } = require("zod");

const badgeSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Le format du nom n'est pas valide",
    })
    .min(2, {
      message: "Le nom doit contenir au moins 2 caractères",
    })
    .max(80, {
      message: "Le nom ne doit pas contenir plus de 80 caractères",
    }),

  description: z
    .string({
      invalid_type_error: "Le format de la description n'est pas valide",
    })
    .min(10, {
      message: "Votre description doit contenir au moins 10 caractères",
    })
    .max(255, {
      message: "Votre description ne doit pas contenir plus de 250 caractères",
    }),

  image: z
    .string()
    .url({
      message: "L'image doit être une URL",
    })
    .min(10, {
      message: "Votre lien doit contenir au moins 10 caractères",
    }),
});

const validateBadgeSchema = (req, res, next) => {
  const { name, description, image } = req.body;

  const validate = badgeSchema.safeParse({
    name,
    description,
    image,
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

module.exports = validateBadgeSchema;
