const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Requerir dotenv

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: 'Usuario no encontrado' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  // Generar token de autenticación
  const token = jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email
  }, process.env.SECRET_KEY, {
    expiresIn: '1h' // Token válido por 1 hora
  });

  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

module.exports = router;