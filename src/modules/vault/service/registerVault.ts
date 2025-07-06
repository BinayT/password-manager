import { Vault } from "@/types/Vault";
import db from '@/db/knex';
import { logger } from "@/utils/logger";

const registerVault = async (vault: Vault): Promise<void> => {
    const [newVault] = await db('password_entries').insert(vault).returning('*');
    logger.info(`Vault registered for user. Function: "registerVault" VaultId:`, newVault.id);
    return newVault;
}

export { registerVault };