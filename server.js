const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware para manejar JSON
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pasteldelimon', // Reemplaza con tu contraseña
  database: 'shows_db'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Ruta para obtener los shows
app.get('/shows', (req, res) => {
  const query = 'SELECT * FROM shows';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
