const tables = require("../../database/tables");

const create = async (req, res, next) => {
  const badge = req.body;
  try {
    const insertId = await tables.badge.create(badge);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const readAll = async (req, res, next) => {
  try {
    const badges = await tables.badge.readAll();
    res.json(badges);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const badge = await tables.badge.read(req.params.id);

    if (badge == null) {
      res.sendStatus(404);
    } else {
      res.json(badge);
    }
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const badge = { ...req.body, id: req.params.id };
  try {
    await tables.badge.update(badge);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.badge.destroy(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, readAll, read, update, destroy };
