const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, '..', 'data.json');

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

app.post('/api/products', (req, res) => {
    const products = readProducts();
    const product = req.body;
    product.id = uuidv4();
    products.push(product);
    writeProducts(products);
    res.status(201).send(product);
});

app.get('/api/products', (req, res) => {
    const products = readProducts();
    res.send(products);
});

app.delete('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const products = readProducts();
    const updatedProducts = products.filter(product => product.id !== productId);
    writeProducts(updatedProducts);
    res.status(204).send();
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

});




