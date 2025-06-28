import { Vault } from "@/types/Vault";
import db from '@/db/knex';

const registerVault = async (vault: Vault): Promise<void> => {
    const [newVault] = await db('password_entries').insert(vault).returning('*');
    return newVault;
}

export { registerVault };