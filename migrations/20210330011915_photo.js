exports.up = function(knex, Promise) {
  return knex.schema.createTable("photo", function(table) {
    table.increments();
    table.binary('image');
    table.text("url");
    table
      .integer("users_id")
      .unsigned()
      .nullable();
    table.foreign("users_id").references("users.id");
    table.specificType("active", "smallint").default(1);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("photo");
};
