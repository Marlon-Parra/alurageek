const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const dataPath = path.join(__dirname, '..', 'data.json');

function readData() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// Configuración del servidor
app.use(express.json());

// Ruta para obtener todos los productos
app.get('/api/products', (req, res) => {
  const data = readData();
  res.json(data);
});

// Ruta para agregar un nuevo producto
app.post('/api/products', (req, res) => {
  const data = readData();
  const nuevoProducto = req.body;
  nuevoProducto.id = Date.now().toString();
  data.push(nuevoProducto);
  writeData(data);
  res.status(201).json(nuevoProducto);
});

// Ruta para eliminar un producto
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const newData = data.filter(product => product.id !== id);

  if (data.length === newData.length) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  writeData(newData);
  res.json({ message: 'Producto eliminado' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
