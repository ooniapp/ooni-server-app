exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table) {
    table.increments();
    table.string("name", 120).notNullable();
    table.string("email", 120);
    table.string("password", 200);
    table.text("photo");
    table.specificType("active", "smallint");
    table.string("push_token", 60);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
