// Dependencies
// const http = require('http');
const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();

app.use(express.static(`${__dirname}/static/`));
app.use(cors());

const server = createServer(app);
const io = new Server(server);

// CONSTANTS
const PORT = 8080;

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/static/index.html`);
});

app.get('/controls', (req, res) => {
    res.sendFile(`${__dirname}/static/controls.html`);
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('switchSides', () => {
        io.emit('switchSides', '');
    });

    socket.on('disconnect', () => {});
});

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
