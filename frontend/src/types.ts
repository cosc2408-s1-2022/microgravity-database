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

export enum Platform {
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
}

export const isResultType = (resultType: string | undefined) => {
  return resultType ? (Object.values(ResultType) as string[]).includes(resultType) : false;
};

export const isPlatform = (platform: string | undefined) => {
  return platform ? (Object.values(Platform) as string[]).includes(platform) : false;
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

export type Experiment = {
  id: string;
  title: string;
  experimentAim: string;
  experimentObjective: string;
  platform: string;
  leadInstitution: string;
  principalInvestigator: string;
  toa: string;
  forCode?: ForCode;
  seoCode?: SeoCode;
  mission: Mission;
  people: Person[];
};

export type Mission = {
  id: string;
  platform: string;
  name: string;
  launchDate: Date;
  startDate: Date;
  endDateString: string;
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
  results: Experiment[];
};

export type SearchField = string | undefined;

export type SearchState = {
  string: SearchField;
  resultType: SearchField;
  platform?: SearchField;
  startDate?: SearchField;
  endDate?: SearchField;
};
