const express = require('express');
const projectRouter = require('./data/projectRouter');
const actionRouter = require('./data/actionRouter');
const server = express();
server.use(express.json());
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
  res.send(`It's working`);
})

const port = process.env.PORT || 5000;
server.listen(port, () => { console.log(`\n Listening on port ${port} \n`) })