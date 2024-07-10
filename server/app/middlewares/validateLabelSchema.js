const { z } = require("zod");

const labelSchema = z.object({
    name: z
    .string({
        invalid_type_error: "Le format du nom n'est pas valide",
    })
    .min(2, {
        invalid_type_error: "Le nom doit contenir 2 caractères minimum",
    })
    .max(80, {
        message: "Le nom ne doit pas contenir plus de 80 caractères"
    }),

    image: z
    .string()
    .url({
        message:"L'image doit être une url",
    })
    .min(10, {
        message: "Votre lien doit contenir au moins 10 caractères",
    }),

    description: z
    .string({
        invalid_type_error: "le format de la description n'est pas valide",
    })
    .min(10, {
        message: "Votres description doit contenir au moins 10 caractères",
    })
    .max(255, {
        message: "Votre description ne doit pas contenir plus de 250 caractères",
    }),
});

const validateLabelSchema = (req, res, next) => {
    const { name, image, description} = req.body;

    const validate = labelSchema.sageParse({
        name,
        image,
        description,
    });

    if (!validate.success) {
        const errors = validate.error.issues.reduce((acc, issue) => {
            acc[issue.parth[0]] = issue.message;
            return acc;
    }, {});

    return res.status(403).json(errors);
}
return next();
};

module.exports = validateLabelSchema;





    
