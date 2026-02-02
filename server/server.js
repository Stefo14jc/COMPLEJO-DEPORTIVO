const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// SEGURIDAD: Sanitización de datos
app.use((req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].replace(/[<>]/g, '');
      }
    });
  }
  next();
});
// Conexión MongoDB
mongoose.connect('mongodb://localhost:27017/complejo-deportivo')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error MongoDB:', err));

// MODELOS
const CanchaSchema = new mongoose.Schema({
  nombre: String,
  deporte: String,
  precio_hora: Number,
  capacidad: Number,
  caracteristicas: {
    superficie: String,
    techada: Boolean,
    iluminacion: String
  },
  estado: String
}, { timestamps: true });

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String,
  telefono: String,
  cedula: String,
  rol: String
}, { timestamps: true });

const ReservaSchema = new mongoose.Schema({
  cancha_id: String,
  usuario_id: String,
  nombre_cancha: String,
  fecha_reserva: String,
  horario: {
    inicio: String,
    fin: String
  },
  monto_total: Number,
  estado_pago: String,
  metodo_pago: String
}, { timestamps: true });

const InventarioSchema = new mongoose.Schema({
  nombre_articulo: String,
  tipo: String,
  categoria: String,
  stock_total: Number,
  stock_disponible: Number,
  precio_uso: Number,
  estado_articulos: String
}, { timestamps: true });

const Cancha = mongoose.model('Cancha', CanchaSchema);
const Usuario = mongoose.model('Usuario', UsuarioSchema);
const Reserva = mongoose.model('Reserva', ReservaSchema);
const Inventario = mongoose.model('Inventario', InventarioSchema);

// RUTAS CANCHAS
app.get('/api/canchas', async (req, res) => {
  try {
    const canchas = await Cancha.find();
    res.json(canchas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/canchas', async (req, res) => {
  try {
    const cancha = new Cancha(req.body);
    await cancha.save();
    res.json(cancha);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/canchas/:id', async (req, res) => {
  try {
    const cancha = await Cancha.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cancha);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/canchas/:id', async (req, res) => {
  try {
    await Cancha.findByIdAndDelete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RUTAS USUARIOS
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/usuarios', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RUTAS RESERVAS
app.get('/api/reservas', async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/reservas', async (req, res) => {
  try {
    const reserva = new Reserva(req.body);
    await reserva.save();
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/reservas/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/reservas/:id', async (req, res) => {
  try {
    await Reserva.findByIdAndDelete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RUTAS INVENTARIO
app.get('/api/inventario', async (req, res) => {
  try {
    const inventario = await Inventario.find();
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/inventario', async (req, res) => {
  try {
    const item = new Inventario(req.body);
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/inventario/:id', async (req, res) => {
  try {
    const item = await Inventario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/inventario/:id', async (req, res) => {
  try {
    await Inventario.findByIdAndDelete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));