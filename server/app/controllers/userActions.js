const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const user = await tables.user.readAll();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await tables.user.readBadges(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    }
    const menu = await tables.user.readMenus(req.params.id);
    if (menu == null) {
      res.sendStatus(404);
    }

    const recipes = await tables.user.readRecipesByUserId(req.params.id);
    if (recipes == null) {
      res.sendStatus(404);
    }
    const data = {
      user,
      menu,
      recipes,
    };
    res.json(data);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const user = { ...req.body, id: req.params.id };
  try {
    await tables.user.update(user);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;
  try {
    const insertId = await tables.user.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.user.delete(id);

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
