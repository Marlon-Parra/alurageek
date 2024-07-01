const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Importar v4 de uuid para generar UUIDs
const app = express();
const port = 3000;

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');

function readProducts() {
    try {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo data.json:', error);
        return [];
    }
}

function writeProducts(products) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Error al escribir en el archivo data.json:', error);
    }
}

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de productos');
});

app.post('/products', (req, res) => {
    const products = readProducts();
    const product = req.body;
    product.id = uuidv4(); // Generar un UUID único
    products.push(product);
    writeProducts(products);
    res.status(201).send(product);
});

app.get('/products', (req, res) => {
    const products = readProducts();
    res.send(products);
});

app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const products = readProducts();
    const updatedProducts = products.filter(product => product.id !== productId);
    writeProducts(updatedProducts);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

