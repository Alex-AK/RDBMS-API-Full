const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true
};

const db = knex(knexConfig);

const server = express();
server.use(helmet());
server.use(express.json());

const port = 4000;
server.listen(port, () => {
  console.log(`**** Server running on ${port} ****`);
});
