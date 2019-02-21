const express = require('express');
const helmet = require('helmet');

const db = require('./cohort/cohort-model');

const server = express();
server.use(helmet());
server.use(express.json());

server.get('/api/cohort', (req, res) => {
  db.get()
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Unexpected error, please try again.', err })
    );
});

server.get('/api/cohort/:id', (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Unexpected error, please try again.', err })
    );
});

server.get('/api/students', (req, res) => {
  db('student')
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Unexpected error, please try again.', err })
    );
});

server.get('/api/cohort/:id/students', (req, res) => {
  const id = req.params.id;
  db.getCohortStudents(id)
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Unexpected error, please try again.', err })
    );
});

server.post('/api/cohort/', (req, res) => {
  // post needs name
  const newCohort = req.body;
  const { cohortName } = req.body;

  if (!cohortName) {
    res
      .status(500)
      .json({ Message: 'Missing required input, please and try again.' });
  }

  db.add(newCohort)
    .then(cohort => {
      res.status(200).json({ cohort });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Unexpected error, please try again.', err })
    );
});

server.put('/api/cohort/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const { cohortName } = req.body;

  if (!cohortName) {
    res
      .status(500)
      .json({ Message: 'Missing required input, please and try again.' });
  }

  db.update(id, changes)
    .then(() => {
      db.getById(id)
        .then(cohort => res.status(200).json({ cohort }))
        .catch(err => console.log(err));
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Unexpected error, please try again.', err })
    );
});

server.delete('/api/cohort/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(count => {
      if (count === 0) {
        res.status(404).json({ Error: 'Id not found' });
      } else {
        res
          .status(200)
          .json({ Message: `Item with id of ${id} was successfully deleted` });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Unexpected error, please try again.', err })
    );
});

const port = 4000;
server.listen(port, () => {
  console.log(`**** Server running on ${port} ****`);
});
