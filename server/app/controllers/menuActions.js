const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const menu = await tables.menu.readAll();
    res.json(menu);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const menu = await tables.menu.read(req.params.id);
    if (menu == null) {
      res.sendStatus(404);
    } else {
      res.json(menu);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const menu = { ...req.body, id: req.params.id };
  try {
    await tables.menu.update(menu);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const menu = req.body;
  try {
    const insertId = await tables.menu.create(menu);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    await tables.menu.delete(id);

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
