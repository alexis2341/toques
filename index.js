const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tu_contraseña',
  database: 'shows_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL!');
});

// Rutas
app.get('/shows', (req, res) => {
  connection.query('SELECT * FROM shows', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/shows', (req, res) => {
  const { date, name, image_url } = req.body;
  connection.query(
    'INSERT INTO shows (date, name, image_url) VALUES (?, ?, ?)',
    [date, name, image_url],
    (err, results) => {
      if (err) throw err;
      res.status(201).json({ id: results.insertId, date, name, image_url });
    }
  );
});

app.delete('/shows/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM shows WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
