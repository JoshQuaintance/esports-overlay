// Dependencies
// const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static(`${__dirname}/static/`));
app.use(cors());

// CONSTANTS
const PORT = 8080;

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/static/index.html`);
});

// const server = http.createServer(async (req, res) => {
//     const content = await fs.readFile(`${__dirname}/static/index.html`);

//     res.writeHead(200, {
//         'Content-Type': MIMES.html,
//     });

//     res.end(content);
// });

// server.listen(PORT, 'localhost', () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

app.listen(PORT);
