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

export type Experiment = {
  title: string;
  platform: string;
  leadInstitution: string;
  principalInvestigator: string;
  toa: string;
  forCode: ForCode;
  seoCode: SeoCode;
  mission: Mission;
};

export type Mission = {
  id: string;
  platform: string;
  launchDate: Date;
  startDate: Date;
  endDate: Date;
};

export type Code = {
  code: string;
  name: string;
};

export type ForCode = Code;

export type SeoCode = Code;

export type Researcher = {
  name: string;
};

export type People = {
  firstName: string;
  familyName: string;
  city: string;
  state: string;
  country: string;
  affiliation: string;
};
