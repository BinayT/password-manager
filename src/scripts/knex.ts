import knexModule from 'knex';
const { knex } = knexModule;

import knexConfig from '../../knexfile.ts';


const [command, ...args] = process.argv.slice(2);
const db = knex(knexConfig.development);

const run = async () => {
  console.log('<<<<<<<<<<<<<<--------------------------------------------->>>>>>>>>>>>>>');
  if (command === 'migrate:latest') {
    await db.migrate.latest();
    console.log('✅ Migration complete');
  } else if (command === 'migrate:rollback') {
    await db.migrate.rollback();
    console.log('↩️ Rolled back');
  } else if (command === 'migrate:make') {
    const [name] = args;
    if (!name) throw new Error('Migration name required!');
    await db.migrate.make(name);
    console.log(`📄 Created migration "${name}"`);
  } else {
    console.log(`❌ Unknown command: ${command}`);
  }
  console.log('<<<<<<<<<<<<<<--------------------------------------------->>>>>>>>>>>>>>');
  await db.destroy();
};

run();
