/* eslint-disable camelcase */

const tables = require("../../database/tables");

const edit = async (req, res, next) => {
  const recipe_ingredient = { ...req.body, id: req.params.id };
  try {
    await tables.recipeIngredient.update(recipe_ingredient);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const browse = async (req, res, next) => {
  try {
    const recipeIngredients = await tables.recipeIngredient.readAll();

    res.json(recipeIngredients);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const recipeIngredient = await tables.recipeIngredient.read(req.params.id);

    if (recipeIngredient == null) {
      res.sendStatus(404);
    }

    res.json(recipeIngredient);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const recipeIngredient = req.body;
  try {
    const insertId = await tables.recipeIngredient.create(recipeIngredient);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await tables.recipeIngredient.delete(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
};
