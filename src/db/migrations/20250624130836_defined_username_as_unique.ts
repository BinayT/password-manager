import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", async () => {
        await knex.raw(`ALTER TABLE users ADD CONSTRAINT users_username_unique UNIQUE (username)`);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", async () => {
        await knex.raw(`ALTER TABLE users DROP CONSTRAINT users_username_unique;`);
    });
}

