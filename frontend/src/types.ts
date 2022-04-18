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
  EXPERIMENT = 'Experiment',
  MISSION = 'Mission',
}

export const isPlatform = (platform: string) => (Object.values(Platform) as string[]).includes(platform);

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
  platform: string;
  leadInstitution: string;
  principalInvestigator: string;
  toa: string;
  forCode?: ForCode;
  seoCode?: SeoCode;
  mission?: Mission;
};

export type Mission = {
  id: string;
  platform: string;
  launchDate: Date;
  startDate: Date;
  endDate: Date;
};

export type Code = {
  id: number;
  code: string;
  name: string;
};

export type ForCode = Code;

export type SeoCode = Code;

export type Researcher = {
  id: number;
  name: string;
};

export type People = {
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
  [key: string]: SearchField;
};

export const SearchStateKeys = ['string', 'platform', 'resultType', 'startDate', 'endDate'];
