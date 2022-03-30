// File to contain application wide type definitions.

export type User = {
  username: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date | null;
};

export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
}

export type AuthenticationResponse = {
  // On success.
  jwt: string;
  user: User;

  // On failure.
  username: string;
  role: string;
  password: string;
};
