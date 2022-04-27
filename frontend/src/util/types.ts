// File to contain application wide type definitions.

import { TextFieldProps } from '@mui/material';

export type UserAuth = string | null;

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

export type Role = {
  id: number;
  name: string;
};

export enum Platforms {
  SPACE_STATION = 'spaceStation',
  SPACE_SHUTTLE = 'spaceShuttle',
  RETRIEVABLE_CAPSULE = 'retrievableCapsule',
  SOUNDING_ROCKET = 'soundingRocket',
  PARABOLIC_FLIGHT = 'parabolicFlight',
  GROUND_BASED_FACILITY = 'groundBasedFacility',
}

export enum ResultType {
  EXPERIMENT = 'experiment',
  MISSION = 'mission',
  FOR_CODE = 'forCode',
  SEO_CODE = 'seoCode',
}

export const isResultType = (resultType: string | undefined) => {
  return resultType ? (Object.values(ResultType) as string[]).includes(resultType) : false;
};

export const isPlatform = (platform: string | undefined) => {
  return platform ? (Object.values(Platforms) as string[]).includes(platform) : false;
};

export type Code = {
  id: string;
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
  person: Researcher;
  role: string;
};

export type Researcher = {
  id: number;
  firstName: string;
  familyName: string;
  city: string;
  state: string;
  country: string;
  affiliation: string;
};

export type SearchResponse = {
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  results: Experiment[] | Mission[];
};

export type SearchField = string | undefined;

export type SearchState = {
  string?: SearchField;
  resultType?: SearchField;
  platform?: SearchField;
  startDate?: SearchField;
  endDate?: SearchField;
};

export type FormFieldProps<T extends string = string> = Omit<TextFieldProps, 'onChange'> & {
  onChange?: (value: string) => void;
  name: T;
  errors?: Record<string | T, string>;
};

export type ExperimentResultsProps = {
  id: string | undefined;
  objective: string | undefined;
  people: ExperimentPerson[];
  mission: Mission;
};

export type MissionResultsProps = {
  id: string | undefined;
  name: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
};

export type AuthenticationResponse = {
  // On success.
  jwt: string;
  user: User;

  // On failure.
  username: string;
  role: string;
  password: string;
};

export type Platform = {
  id: number;
  name: string;
};

export type Experiment = {
  id: string;
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

export type ExperimentPerson = {
  id: {
    experimentId: number;
    personId: number;
  };
  experiment: Experiment;
  person: Person;
  role: Role;
};

export type ExperimentPersonRequest = {
  personId: number;
  roleId: number;
};
