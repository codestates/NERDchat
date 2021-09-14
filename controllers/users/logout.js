const { verifyAccess } = require('../../middlewares/token');

module.exports = (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) res.status(401).json({ isLogout: false });

  const accesTokenData = verifyAccess(accessToken);
  if (!accesTokenData) res.status(401).json({ isLogout: false });
  else res.status(200).json({ isLogout: true });
};
