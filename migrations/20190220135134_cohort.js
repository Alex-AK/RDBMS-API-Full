exports.up = function(knex, Promise) {
  return knex.schema.createTable('student', function(table) {
    table.increments();

    table.string('name', 128).notNullable();
    table.timestamp(true, true);
    table
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohort')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('student');
};
