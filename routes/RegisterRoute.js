const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const logoutMiddleware = require('../middleware/logoutMiddleware');
const registerController = require('../controllers/RegisterController');

/** 
 * Ruta para cerrar sesión 
 */
router.post('/logout', (req, res) => {
    console.log('llego a a ruta /logout');
    logoutMiddleware(req, res);
});

/** 
 * Ruta para perfil de usuario (requiere autenticación) 
 */
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.json({ message: `Bienvenido, ${req.user.name}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

/** 
 * Rutas para registro de usuarios 
*/
router.use('/register', registerController);

module.exports = router;