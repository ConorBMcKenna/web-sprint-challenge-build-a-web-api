const express = require('express');
const server = express();
const projectRoutes = require('./projects/projects-router.js')
const actionRoutes = require('./actions/actions-router.js')
const handleErrors = require('./actions/actions-middlware')

server.use(express.json())

server.get('/', (req, res)=>{
    res.send('Hello Universe')
})

server.use('/api/projects', projectRoutes)
server.use('/api/actions', actionRoutes)

server.use(handleErrors)




// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
