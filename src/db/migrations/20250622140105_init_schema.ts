import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Enabled pgcrypto for UUID generation
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

  // Create users table
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.timestamps(true, true); // created_at, updated_at
  });

  // Create password_entries table
  await knex.schema.createTable("password_entries", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.string("username");
    table.string("password").notNullable();
    table.text("notes");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("password_entries");
  await knex.schema.dropTableIfExists("users");
}

