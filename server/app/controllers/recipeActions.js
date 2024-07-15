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
    const recipe = await tables.recipe.read(req.params.id);

    if (recipe == null) {
      res.sendStatus(404);
    }
    const recipeIngredients = await tables.recipe.readIngredients(
      req.params.id
    );
    if (recipeIngredients == null) {
      res.sendStatus(404);
    }
    const data = {
      recipe,
      recipeIngredients,
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
  const recipe = req.body;

  try {
    const insertId = await tables.recipe.create(recipe);

    res.status(201).json({ insertId });
  } catch (err) {
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
