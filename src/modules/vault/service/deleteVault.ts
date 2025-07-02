import db from '@/db/knex';

type Props = {
    vaultId: string;
}

const deleteVaultById = async ({vaultId}: Props): Promise<number> => {
    const vault = await db('password_entries').where({ id: vaultId }).delete();
    console.info(`Vault deleted for user. Function: "deleteVaultById" Info: `, vaultId);
    return vault;
}

export { deleteVaultById };