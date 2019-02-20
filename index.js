const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/dev.sqlite3'
  },
  useNullAsDefault: true
};
const db = knex(knexConfig);

const server = express();
server.use(helmet());
server.use(express.json());

server.get('/api/cohort', (req, res) => {
  db('cohort')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => console.log(err));
});

server.get('/api/cohort/:id', (req, res) => {
  const id = req.params.id;
  db('cohort')
    .where({ id })
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => console.log(err));
});

server.post('/api/cohort/', (req, res) => {
  // post needs name
  const newCohort = req.body;
  const { name } = req.body;

  if (!name) {
    res
      .status(500)
      .json({ Message: 'Missing required input, please and try again.' });
  }

  db('cohort')
    .insert(newCohort)
    .then(id => {
      id = id[0];
      const addedCohort = { ...newCohort, id };
      res.status(200).json({ addedCohort });
    })
    .catch(err => console.log(err));
});

server.put('/api/cohort/:id', (req, res) => {
  const id = req.params.id;
  const updatedCohort = req.body;
  const { name } = req.body;

  if (!name) {
    res
      .status(500)
      .json({ Message: 'Missing required input, please and try again.' });
  }

  db('cohort')
    .where({ id })
    .update(updatedCohort)
    .then(id => {
      db('cohort')
        .where({ id })
        .then(cohort => res.status(200).json({ cohort }))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

server.delete('/api/cohort/:id', (req, res) => {
  const id = req.params.id;
  db('cohort')
    .where({ id: id })
    .delete()
    .then(count => {
      if (count === 0) {
        res.status(404).json({ Error: 'Id not found' });
      } else {
        res
          .status(200)
          .json({ Message: `Item with id of ${id} was successfully deleted` });
      }
    })
    .catch(err => console.log(err));
});

const port = 4000;
server.listen(port, () => {
  console.log(`**** Server running on ${port} ****`);
});
