// File to contain application wide type definitions.

export type UserAuth = string | null;

export type User = {
  id: number;
  username: string;
  role: UserRole;
  createdAt: Date;
  updatedAt?: Date;
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
  toa: Toa;
  leadInstitution: string;
  principalInvestigator: string;
  experimentAim: string;
  experimentObjective: string;
  experimentPublications: ExperimentPublication[];
  experimentAttachments: ExperimentAttachment[];
  deleted: boolean;
  approved: boolean;
  mission: Mission;
  platform: Platform;
  forCode: ForCode;
  seoCode: SeoCode;
  people: ExperimentPerson[];
  createdAt: Date;
  updatedAt?: Date;
};

export type Toa = {
  id: number;
  name: string;
};

export type ExperimentAttachment = {
  id: number;
  mediaType: 'image/jpeg' | 'image/png' | 'application/pdf';
  filename: string;
};

export type Mission = {
  id: number;
  name: string;
  platform: Platform;
  launchDate: Date;
  startDate?: Date;
  endDate?: Date;
  experimentCount: number;
  deleted: boolean;
  approved: boolean;
  experiments: Experiment[];
  createdAt: Date;
  updatedAt?: Date;
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
  personId?: number;
  roleId?: number;
};

export type ExperimentPersonRequestEntry = {
  id: number;
  data: ExperimentPersonRequest;
};

export type PeopleReducerState = { uid: number; data: ExperimentPersonRequestEntry[] };

export type Platform = {
  id: number;
  name: string;
  forCodes: ForCode[];
  seoCodes: SeoCode[];
};

export type Code = {
  id: number;
  code: number;
  name: string;
  experiments: Experiment[];
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
  role: Role;
  deleted: boolean;
  approved: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export type Page<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
};

export type ResultsResponse<T> = {
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  results: T[];
};

export type SearchResponse = ResultsResponse<Experiment | Mission | ForCode | SeoCode>;

export type SearchField = string | undefined;

export type SearchState = {
  string?: SearchField;
  resultType?: SearchField;
  platform?: SearchField;
  startDate?: SearchField;
  endDate?: SearchField;
  page?: number;
};

export type ExperimentResultsProps = {
  id: string | undefined;
  objective: string | undefined;
  title: string | undefined;
  people: ExperimentPerson[];
  mission: Mission;
};

export type MissionResultsProps = {
  id: string | undefined;
  name: string | undefined;
  launchDate: Date;
  startDate?: Date;
  endDate?: Date;
};

export type CaptchaResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  error_codes?: string[];
};

export type ExperimentPublication = {
  doi?: string;
  authors: ExperimentPublicationAuthor[];
  yearPublished?: string;
  title: string;
  journal?: string;
  volumeNumber?: string;
  issueNumber?: string;
  pagesUsed?: string;
  journalDatabase?: string;
  url?: string;
  accessDate?: string;
};

export type ExperimentPublicationAuthor = {
  firstName: string;
  lastName: string;
};

export type ExperimentPublicationEntry = {
  id: number;
  data: ExperimentPublication;
};

export type ExperimentPublicationResponse = {
  message: {
    title: string;
    'container-title': string;
    volume: string;
    issue: string;
    DOI: string;
    publisher: string;
    URL: string;
    page: string;
    created: {
      'date-time': string;
    };
    issued: {
      'date-parts': string;
    };
    yearPublished: Date;
    author: ExperimentPublicationsAuthorResponse[];
  };
};

export type ExperimentPublicationsAuthorResponse = {
  given: string;
  family: string;
};
