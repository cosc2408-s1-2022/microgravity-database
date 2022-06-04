// File to contain application wide type definitions.

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

export type AuthenticationResponse = {
  // On success.
  jwt: string;
  user: User;

  // On failure.
  username: string;
  role: string;
  password: string;
};

export type Role = {
  id: number;
  name: string;
};

export type Code = {
  id: number;
  code: number;
  name: string;
  experiments: Experiment[];
};

export type ForCode = Code;

export type SeoCode = Code;

export type Activity = {
  id: number;
  name: 'Scientific Research' | 'Industry' | 'Human Spaceflight';
};

export type ExperimentAttributeField = {
  id: number;
  name: string;
};

export type Subsystem = ExperimentAttributeField;

export type Area = ExperimentAttributeField;

export type TestSubjectType = ExperimentAttributeField;

export type Person = {
  id: number;
  firstName: string;
  familyName: string;
  city: string;
  state: string;
  country: string;
  affiliation: string;
  email?: string;
  phone?: string;
  role: Role;
  approved: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export type Platform = {
  id: number;
  name: string;
  forCodes: ForCode[];
  seoCodes: SeoCode[];
};

export enum Platforms {
  SPACE_STATION = 'spaceStation',
  SPACE_SHUTTLE = 'spaceShuttle',
  RETRIEVABLE_CAPSULE = 'retrievableCapsule',
  SOUNDING_ROCKET = 'soundingRocket',
  PARABOLIC_FLIGHT = 'parabolicFlight',
  GROUND_BASED_FACILITY = 'groundBasedFacility',
}

export const isPlatform = (platform: string | undefined) => {
  return platform ? (Object.values(Platforms) as string[]).includes(platform) : false;
};

export type Mission = {
  id: number;
  name: string;
  platform: Platform;
  launchDate: Date;
  startDate?: Date;
  endDate?: Date;
  experimentCount: number;
  experiments: Experiment[];
  approved: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export type Toa = {
  id: number;
  name: string;
};

export type Experiment = {
  id: number;
  title: string;
  leadInstitution: string;
  mission: Mission;
  platform: Platform;
  experimentObjectives?: string;
  people: ExperimentPerson[];
  publications: Publication[];
  attachments: Attachment[];
  activity: Activity;
  toa?: Toa;
  forCode?: ForCode;
  seoCode?: SeoCode;
  subsystem?: Subsystem;
  spacecraft?: string;
  payload?: string;
  testSubjectCount?: number;
  area?: Area;
  testSubjectType?: TestSubjectType;
  approved: boolean;
  deleted: boolean;
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

export type Publication = {
  doi?: string;
  authors: Author[];
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

export type Author = {
  firstName: string;
  lastName: string;
};

export type PublicationAPIResponse = {
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
    author: AuthorAPIResponse[];
  };
};

export type AuthorAPIResponse = {
  given: string;
  family: string;
};

export type ExperimentPublicationEntry = {
  id: number;
  data: Publication;
};

export type PublicationsReducerState = { uid: number; data: ExperimentPublicationEntry[] };

export type Attachment = {
  id: number;
  mediaType: 'image/jpeg' | 'image/png' | 'application/pdf';
  filename: string;
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

export enum ResultType {
  EXPERIMENT = 'experiment',
  MISSION = 'mission',
  FOR_CODE = 'forCode',
  SEO_CODE = 'seoCode',
}

export const isResultType = (resultType: string | undefined) => {
  return resultType ? (Object.values(ResultType) as string[]).includes(resultType) : false;
};

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
  experimentCount: number;
  platform: Platform;
};

export type CaptchaResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  error_codes?: string[];
};
