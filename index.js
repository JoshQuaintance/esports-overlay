// Dependencies
const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();

// Let express finds the htmls and css
app.use(express.static(`${__dirname}/static/`));
app.use(cors());

const server = createServer(app); // express.js server
const io = new Server(server); // socket.io

// CONSTANTS
const PORT = 8080;

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/static/index.html`);
});

app.get('/controls', (req, res) => {
    res.sendFile(`${__dirname}/static/controls.html`);
});

// Socket listener
io.on('connection', (socket) => {
    console.log('a user connected');

    // when a switchSide event was emmited from somewhere
    // most likely the controls, it will rebound it to
    // everyone else, then on the other side they will
    // also listen to the event and hopefully update the overlay
    socket.onAny((name, ...args) => {
        io.emit(name, args[0]);
    });
    // socket.on('switchSides', () => {

    // io.emit('switchSides', '');
    // });

    socket.on('disconnect', () => {});
});

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
