const jwt = require('jsonwebtoken');

const refreshTokenMiddleware = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer', '');

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const newToken = jwt.sign({ _id: decoded._id, name: decoded.name, email: decoded.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token: newToken });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = refreshTokenMiddleware;