export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export type PublicUser = Omit<User, 'password'>;

export type UpdateUserInput = Partial<Pick<User, 'username' | 'email' | 'password'>>;