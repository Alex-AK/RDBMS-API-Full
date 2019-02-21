exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohort', function(table) {
    table.increments();
    table
      .string('cohortName', 128)
      .unique()
      .notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohort');
};
