const db = require('../data/dbConfig');

module.exports = {
  get,
  getById,
  add,
  remove,
  update,
  getCohortStudents
};

function get() {
  return db('cohort');
}

function getById(id) {
  return db('cohort')
    .where({ id })
    .first();
}

function add(newCohort) {
  return db('cohort')
    .insert(newCohort)
    .then(ids => {
      return getById(ids[0]);
    });
}

function remove(id) {
  return db('cohort')
    .where({ id })
    .delete();
}

function update(id, changes) {
  return db('cohort')
    .where({ id })
    .update(changes);
}

function getCohortStudents(id) {
  return db('cohort')
    .select(
      'cohort.id',
      'cohort.cohortName',
      'student.name',
      'student.cohort_id'
    )
    .join('student')
    .where('student.cohort_id', '=', id)
    .groupBy('student.name');
}
