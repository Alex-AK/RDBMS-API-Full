exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('student')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('student').insert([
        { id: 1, name: 'Nate', cohort_id: 3 },
        { id: 2, name: 'Brandon', cohort_id: 3 },
        { id: 3, name: 'Alex', cohort_id: 3 }
      ]);
    });
};
