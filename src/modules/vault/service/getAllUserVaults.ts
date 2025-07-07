import db from '@/db/knex';

import { Vault } from '@/types/Vault';

import { logger } from '@/utils/logger';

type Props = {
    userId: string;
}

const getAllUserVaults = async ({userId}: Props): Promise<Vault[]> => {
      const user_vaults = await db('password_entries').where({ user_id: userId }).select("id", "title", "email");

      logger.info(`User retrieved all password entries. Function: "getAllVaultsOfUser" Id: ${userId}`); 

      return user_vaults;
}

export { getAllUserVaults };