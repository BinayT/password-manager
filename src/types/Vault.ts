interface Vault {
    id: string;
    title?: string;
    username?: string;
    password?: string;
    notes?: string;
    url?: string;
    created_at?: Date;
    updated_at?: Date;
}

export { Vault };