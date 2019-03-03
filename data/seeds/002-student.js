exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('student')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('student').insert([
        { id: 1, name: 'Nate', cohort_id: 3 },
        { id: 2, name: 'Brandon', cohort_id: 3 },
        { id: 3, name: 'Alex', cohort_id: 3 },
        { id: 4, name: 'Jeff', cohort_id: 1 },
        { id: 5, name: 'Rachel', cohort_id: 1 },
        { id: 6, name: 'Joe', cohort_id: 2 },
        { id: 7, name: 'Ashley', cohort_id: 2 },
        { id: 8, name: 'Kelly', cohort_id: 1 },
        { id: 9, name: 'CJ', cohort_id: 3 }
      ]);
    });
};
