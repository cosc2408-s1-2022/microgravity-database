// File to contain application wide type definitions.

export type User = {
  username: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date | null;
};

export enum UserRole {
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
  id: number;
  title: string;
  toa: string;
  leadInstitution: string;
  principalInvestigator: string;
  experimentAim: string;
  experimentObjective: string;
  experimentModuleDrawing: string;
  experimentPublications: string;
  mission: Mission;
  platform: Platform;
  forCode: ForCode;
  seoCode: SeoCode;
  people: ExperimentPerson[];
};

export type Mission = {
  id: string;
  name: string;
  launchDate: Date;
  launchDateString: string;
  startDate?: Date;
  startDateString?: string;
  endDate?: Date;
  endDateString?: string;
  platform: Platform;
};

export type Code = {
  id: number;
  code: string;
  name: string;
};

export type ForCode = Code;

export type SeoCode = Code;

export type Person = {
  id: number;
  firstName: string;
  familyName: string;
  city: string;
  state: string;
  country: string;
  affiliation: string;
};

export type Role = {
  id: number;
  name: string;
};

export type ExperimentPerson = {
  id: {
    experimentId: number;
    personId: number;
  };
  experiment: Experiment;
  person: Person;
  role: Role;
};

export type Platform = {
  id: number;
  name: string;
};

export type ExperimentPersonRequest = {
  personId: number;
  roleId: number;
};

export type SearchResponse = {
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  results: Experiment[];
};

export type SearchState = {
  searchString: string;
};
