const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al registrar usuario' });
    }
});

module.exports = router;