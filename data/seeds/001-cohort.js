exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohort')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('cohort').insert([
        { id: 1, cohortName: 'Web14' },
        { id: 2, cohortName: 'Web15' },
        { id: 3, cohortName: 'Web16' }
      ]);
    });
};
