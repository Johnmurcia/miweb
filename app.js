const express = require('express');
const app = express();
const authMiddleware = require('./middleware/authMiddleware');
const refreshTokenMiddleware = require('./middleware/refreshTokenMiddleware');
const port = 3000;
const mongoose = require('mongoose');
const registerRouter = require('./routes/RegisterRoute');

mongoose.connect('mongodb://localhost/RifasOnline', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado a MongoDB');
})
.catch((err) => {
  console.error('Error conectando a MongoDB:', err);
});

app.use(express.json());

// Rutas públicas
const loginRouter = require('./controllers/LoginController');
app.use('/login', loginRouter);
app.use('/api', registerRouter); 

// Rutas protegidas con autenticación
app.use('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Bienvenido, ' + req.user.name });
});

// Ruta para renovar token
app.use('/refresh-token', refreshTokenMiddleware);

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
});