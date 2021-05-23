exports.up = function(knex, Promise) {
  return knex.schema.createTable("photo", function(table) {
    table.increments();
    table.text('name');
    table.text('folder');
    table.text("url");
    table.boolean("isPosted")
    table
      .integer("users_id")
      .unsigned()
      .nullable();
    table.foreign("users_id").references("users.id");
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("photo");
};
