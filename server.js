const express = require('express');
const postsRouter = require('./posts/posts-router.js');
//const cors = require('cors');

const server = express();

server.use(express.json());
//server.use(cors());

server.use('/api/posts', postsRouter); 


server.get('/', (req, res) => {
	res.send(`<h1>Welcome to my API</h1>`)
});


module.exports = server; 