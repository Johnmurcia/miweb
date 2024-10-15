const logoutMiddleware = async (req, res) => {
    console.log('Llegó a logoutMiddleware');
    try {
      // Borra la cookie de autenticación
      res.clearCookie('token', { 
        httpOnly: true, 
        secure: true, 
        sameSite: 'Strict' 
      });
  
      // Redirige a la página de login con un mensaje de éxito
      res.redirect('/login?message=Has cerrado sesión con éxito');
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        message: 'Error al cerrar sesión', 
        error: error.message 
      });
    }
  };
  
  module.exports = logoutMiddleware;
  