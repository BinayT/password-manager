import db from '@/db/knex';

const getVault = async (user_id: string, id: string): Promise<void> => {
      const vault = await db('password_entries').where({ id, user_id }).first();
    
      if (!vault) {
        const error = new Error('Vault not found') as Error & { statusCode: number };
        error.statusCode = 404;
        throw error;
      }
    
      console.info(`Vault data retrieved for user. Info: `, vault);
      return vault;
    
}

export { getVault };