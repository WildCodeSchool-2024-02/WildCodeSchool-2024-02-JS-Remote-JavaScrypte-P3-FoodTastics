/* eslint-disable camelcase */
const { z } = require("zod");

const recipeNameRegex = /^([A-Z][A-Za-z ,.'`-]{3,150})$/;

const recipeSchema = z.object({
  name: z.string().regex(recipeNameRegex, {
    message:
      "Le nom de votre recette doit contenir entre 3 et 150 caractères, sans aucun chiffre",
  }),
  number_of_people: z
    .number({
      required_error: "Le nombre de personnes est obligatoire",
      invalid_type_error:
        "Le nombre de personnes doit être un chiffre ou un nombre",
    })
    .int()
    .positive(),
  description: z.string().min(30),
  image: z.string().url(),
  set_up_time: z
    .number({
      required_error: "Le temps de préparation doit être précisé",
      invalid_type_error:
        "Le temps de préparation doit être un chiffre ou un nombre",
    })
    .positive(),
});

const validateRecipeSchema = (req, res, next) => {
  const { recipe } = req.body;

  const { name, number_of_people, description, image, set_up_time } =
    recipe.data;

  const validate = recipeSchema.safeParse({
    name,
    number_of_people: Number(number_of_people),
    description,
    image,
    set_up_time: Number(set_up_time),
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

module.exports = validateRecipeSchema;
