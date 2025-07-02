import db from '@/db/knex';
import { ForbiddenError } from '@/errors/forbiddenError';
import { NotFoundError } from '@/errors/notFoundError';
import { Vault } from '@/types/Vault';

type Props = {
    vaultId: string;
    userId: string;
}

const checkVaultOwnership = async ({vaultId, userId}: Props): Promise<Vault> => {
      const vault = await db('password_entries').where({ id: vaultId }).first();
      
      if(!vault) { 
        throw new NotFoundError('Vault not found !');
      }

      if(vault.user_id !== userId) {
        throw new ForbiddenError('Access Denied !');
      }
      console.info(`Vault data retrieved for user. Function: "checkVaultOwnership" Info: `, vault);

      return vault;
}

export { checkVaultOwnership };