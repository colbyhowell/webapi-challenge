const express = require('express');
const helmet = require('helmet');
const projectsRouter = require('./projects/projectsRouter')
const actionsRouter = require('./actions/actionsRouter')
const cors = require('cors')

const server = express();

server.use(helmet());
server.use(cors())
server.use(express.json());

server.use("/api/projects", projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('/', (req, res) => {
    res.send("Hello There!")
});

module.exports = server;
