exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohort', function(table) {
    table.increments();
    table
      .string('name', 128)
      .unique()
      .notNullable();
    table.timestamp(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohort');
};
