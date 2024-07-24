const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const recipes = await tables.recipe.readAll();
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};
const read = async (req, res, next) => {
  try {
    const ingredients = await tables.ingredient.readAll();

    if (ingredients == null) {
      res.sendStatus(404);
    }
    const recipeIngredients = await tables.recipe.readRecipeIngredients(
      req.params.id
    );
    if (recipeIngredients == null) {
      res.sendStatus(404);
    }

    const recipeUser = await tables.recipe.readRecipeUser(req.params.id);

    if (recipeUser == null) {
      res.sendStatus(404);
    }
    const data = {
      ingredients,
      recipeIngredients,
      recipeUser,
    };
    res.json(data);
  } catch (err) {
    next(err);
  }
};
const edit = async (req, res, next) => {
  const recipe = { ...req.body, id: req.params.id };
  try {
    await tables.recipe.update(recipe);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { recipe, ingredient } = req.body;
  try {
    const insertId = await tables.recipe.create(recipe);
    const ingredientInsert = ingredient.map(async (i) => {
      await tables.recipeIngredient.create({
        recipe_id: insertId,
        ingredient_id: i.id,
      });
    });

    res.status(201).json({ insertId, ingredientInsert });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.recipe.delete(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
