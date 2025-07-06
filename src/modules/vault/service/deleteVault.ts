import db from '@/db/knex';
import { Vault } from '@/types/Vault';
import { logger } from '@/utils/logger';

type Props = {
    vaultId: string;
}

const deleteVaultById = async ({vaultId}: Props): Promise<Vault> => {
    const [vault] = await db('password_entries').where({ id: vaultId }).delete().returning('*');
    logger.info(`Vault deleted for user. Function: "deleteVaultById" VaultId:`, vaultId);
    return vault;
}

export { deleteVaultById };