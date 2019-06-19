
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.increments('id');
      table.string('description');
      table.date('date_achieved');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('famous_people', function(table){
      table.dropColumn('description');
      table.dropColumn('date_achieved');
    })])
};

