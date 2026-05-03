const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Almacenamiento temporal (luego lo pasamos a SQLite)
let pedidos = [];

// Ruta API: Crear pedido
app.post('/api/pedido', (req, res) => {
    const nuevoPedido = {
        id: Date.now(),
        ...req.body,
        estado: 'pendiente',
        hora: new Date().toLocaleTimeString()
    };
    pedidos.push(nuevoPedido);
    io.emit('nuevo_pedido', nuevoPedido); // Avisa a Cocina al instante
    res.json({ ok: true, folio: nuevoPedido.id });
});

// Ruta API: Listar pedidos
app.get('/api/pedidos', (req, res) => res.json(pedidos));

// Ruta API: Cambiar estado (Cocina)
app.post('/api/estado', (req, res) => {
    const { id, estado } = req.body;
    pedidos = pedidos.map(p => p.id === id ? { ...p, estado } : p);
    io.emit('actualizar_pedido', { id, estado });
    res.json({ ok: true });
});

server.listen(3000, () => console.log("🚀 Lonchería Ariana Online en puerto 3000"));
