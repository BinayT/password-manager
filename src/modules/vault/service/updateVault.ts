import { Vault } from "@/types/Vault";
import db from '@/db/knex';
import { getUpdatedTimeStamp } from "@/utils/getUpdatedTimeStamp";
import { logger } from "@/utils/logger";

const updateVault = async (vaultId: string, vault: Vault): Promise<void> => {

    if (Object.keys(vault).length === 0) {
        const error = new Error('No fields provided for update') as Error & { statusCode: number };
        error.statusCode = 400;
        throw error;
    }

    const [updatedVault] = await db('password_entries')
    .where({ id: vaultId })
    .update({
        ...vault,
        updated_at: getUpdatedTimeStamp(),
    })
    .returning('*');

    logger.info(`Vault updated for user. Function: "updateVault" VaultId:`, vaultId);
    
    return updatedVault;
}

export { updateVault };