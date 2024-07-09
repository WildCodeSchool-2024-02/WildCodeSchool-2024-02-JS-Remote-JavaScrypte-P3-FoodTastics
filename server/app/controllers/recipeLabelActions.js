/* eslint-disable camelcase */

const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const recipeLabels = await tables.recipeLabel.readAll();
    res.json(recipeLabels);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const recipeLabel = await tables.recipeLabel.read(req.params.id);
    if (recipeLabel == null) {
      res.sendStatus(404);
    } else {
      res.json(recipeLabel);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { recipe_id, label_id } = req.body;

  try {
    const insertId = await tables.recipeLabel.create(recipe_id, label_id);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await tables.recipeLabel.delete(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  destroy,
};
