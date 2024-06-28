const {z} = require ("zod");

const userRegex =  /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,32}$/;

const userSchema = z.object ({

firstname : z.string({
    invalid_type_error : "Le prénom de votre format n’est pas valide"}).min(2, {
        message : "votre prénom doit contenir au minimum 2 caractères"
    }).max(20, {
        message : "votre prénom doit contenir au minimum 20 caractères"
    }),
lastname : z.string({
    invalid_type_error : "Le nom de votre format n’est pas valide"}).min(2, {
        message : "Votre nom doit contenir au minimum 2 caractères"
    }).max(20, {
        message : "Votre nom doit contenir au minimum 20 caractères"
    }),
password : z.string().regex(userRegex, {
        message : "Votre mot de passe doit contenir, un chiffre, une lettre majuscule et un caractère spécial"
    }),
pseudo :z.string({
    invalid_type_error :"Votre prénom doit contenir au minimum 2 caractères"
    }).max(20, {
        message : "Votre prénom doit contenir au minimum 20 caractères"
    }),
email :z.string().email({
    invalid_type_error : "Votre adresse mail n’est pas valide"
    })
});

const validateUserSchema = (req, res, next) => {
    const { firstname, lastname, password, pseudo, email} = req.body;
  
    const validate = userSchema.safeParse({
        firstname, lastname, password, pseudo, email
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

