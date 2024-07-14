const argon2 = require("argon2");
const tables = require("../../database/tables");

const { encodeJWT, decodeJWT } = require("../helpers/jwtHelpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await tables.user.findUserByEmail(email);
  console.info(user);
  if (!user) {
    return res.status(404).json({
      message: "Email and password do not match",
    });
  }

  const verified = await argon2.verify(user.password, password);

  if (!verified) {
    return res.status(404).json({
      message: "Email and password do not match",
    });
  }

  delete user.password;

  const token = encodeJWT(user);
  return res
    .status(200)
    .cookie("auth_token", token, { httpOnly: true, secure: false })
    .json({ user, token });
};

const checkAuth = async (req, res) => {
  const token = req.cookies?.auth_token;
  if (!token) {
    return res.status(403).json(null);
  }
  try {
    const validToken = await decodeJWT(token);
    return res
      .status(200)
      .cookie("auth_token", token, {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ user: validToken });
  } catch (e) {
    return console.error(e);
  }
};

const logout = (req, res) => {
  res.clearCookie("auth").sendStatus(200);
};

module.exports = { login, logout, checkAuth };
