const { z } = require("zod");

const commentSchema = z.object({
  description: z
    .string({
      invalid_type_error: "Votred description n´est pas valide",
    })
    .min(2, {
      message: "Votre commentaire doit contenir au minimun 2 charactères",
    }),
});

const validateCommentSchema = (req, res, next) => {
  const { description } = req.body;

  const validate = commentSchema.safeParse({
    description,
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
module.exports = validateCommentSchema;
