drop table if exists experiment_person;
drop table if exists experiment_attachment;
drop table if exists experiment;
drop table if exists mission;
drop table if exists person;
drop table if exists platform_for_code;
drop table if exists for_code;
drop table if exists platform_seo_code;
drop table if exists seo_code;
drop table if exists platform;
drop table if exists role;
drop table if exists user;

create table user
(
    id         bigint auto_increment
        primary key,
    created_at datetime(6)  null,
    password   varchar(255) null,
    role       varchar(255) null,
    updated_at datetime(6)  null,
    username   varchar(255) null,
    constraint UK_sb8bbouer5wak8vyiiy4pf2bx
        unique (username)
);

INSERT INTO dev.user (id, created_at, password, role, updated_at, username)
VALUES (1, '2022-04-29 03:18:30.028000', '$2a$10$GqJ9mRc1r/4aE87gdYnXeuxKeGGlIdoIymaMWdZG34D.S7Acbg3ga', 'ROLE_USER',
        null, 'username');
INSERT INTO dev.user (id, created_at, password, role, updated_at, username)
VALUES (2, '2022-04-29 03:18:39.505000', '$2a$10$4AeqCHGdzMhiC5CDDSp1heX4y5g4Nnz84wU.nZ0T5edYvSGd/wJXq', 'ROLE_USER',
        null, 'random_user1');
INSERT INTO dev.user (id, created_at, password, role, updated_at, username)
VALUES (3, '2022-04-29 03:18:41.851000', '$2a$10$XYPdYJ5n1dKRwJAHwReHtO78hM.Td07uNrBoTSSocETrL9Ed8WbiO', 'ROLE_USER',
        null, 'random_user2');
INSERT INTO dev.user (id, created_at, password, role, updated_at, username)
VALUES (4, '2022-04-29 03:18:44.866000', '$2a$10$UE7.4lztYIlPb1/cZ0rixOU6/wfFs2QbOhUlHQK468YZ/Refuqz5S', 'ROLE_USER',
        null, 'random_user3');
INSERT INTO dev.user (id, created_at, password, role, updated_at, username)
VALUES (5, '2022-04-29 03:18:46.575000', '$2a$10$Ha0wW4wV.B7nC3V1LBvYpuyInHR30b38iB6bvkbRFaWtJ8TNn5L26', 'ROLE_USER',
        null, 'random_user4');
INSERT INTO dev.user (id, created_at, password, role, updated_at, username)
VALUES (6, '2022-04-29 03:18:48.538000', '$2a$10$ff0gU4Z2XXMRn4u.CVhSY.3ean26SUrXEbgy1h7FuSbASZGyPkqo.', 'ROLE_USER',
        null, 'random_user5');
INSERT INTO dev.user (id, created_at, password, role, updated_at, username)
VALUES (7, '2022-04-29 03:18:51.646000', '$2a$10$aeVxu6M9tLt0kAAjs63XKuPKdVvYE1Q5b20DzE3RystkolgjBxyJO', 'ROLE_ADMIN',
        null, 'admin');

create table role
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

INSERT INTO dev.role (id, name)
VALUES (1, 'Principal Investigator');
INSERT INTO dev.role (id, name)
VALUES (2, 'Researcher');
INSERT INTO dev.role (id, name)
VALUES (3, 'Flight Engineer');

create table for_code
(
    id   bigint auto_increment
        primary key,
    code varchar(255) null,
    name varchar(255) null
);

INSERT INTO dev.for_code (id, code, name)
VALUES (1, '1', 'Mathematical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (2, '2', 'Physical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (3, '3', 'Chemical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (4, '4', 'Earth Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (5, '5', 'Environmental Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (6, '6', 'Biological Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (7, '7', 'Agricutural and Veterinary Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (8, '8', 'Information and Computing Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (9, '9', 'Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (10, '10', 'Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (11, '11', 'Medical and Health Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (12, '12', 'Built Environment and Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (13, '13', 'Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (14, '14', 'Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (15, '15', 'Commerce, Management, Tourism and Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (16, '16', 'Studies in Human Society');
INSERT INTO dev.for_code (id, code, name)
VALUES (17, '17', 'Psychology and Cognitive Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (18, '18', 'Law and Legal Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (19, '19', 'Studies in Creative Arts and Writing');
INSERT INTO dev.for_code (id, code, name)
VALUES (20, '20', 'Language, Communication and Culture');
INSERT INTO dev.for_code (id, code, name)
VALUES (21, '21', 'History and Archaeology');
INSERT INTO dev.for_code (id, code, name)
VALUES (22, '22', 'Philosophy and Religious Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (23, '50201', 'Aboriginal and Torres Strait Islander Environmental Knowledge');
INSERT INTO dev.for_code (id, code, name)
VALUES (24, '80601', 'Aboriginal and Torres Strait Islander Information and Knowledge Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (25, '80701', 'Aboriginal and Torres Strait Islander Knowledge Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (26, '110403', 'Traditional Aboriginal and Torres Strait');
INSERT INTO dev.for_code (id, code, name)
VALUES (27, '111701', 'Aboriginal and Torres Strait Islander Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (28, '130301', 'Aboriginal and Torres Strait Islander Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (29, '160501', 'Aboriginal and Torres Strait Islander Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (30, '169902', 'Studies of Aboriginal and Torres Strait Islander Society');
INSERT INTO dev.for_code (id, code, name)
VALUES (31, '190401', 'Aboriginal and Torres Strait Islander Performing Arts');
INSERT INTO dev.for_code (id, code, name)
VALUES (32, '200201', 'Aboriginal and Torres Strait Islander Cultural Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (33, '200319', 'Aboriginal and Torres Strait Islander Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (34, '200501', 'Aboriginal and Torres Strait Islander Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (35, '210101', 'Aboriginal and Torres Strait Islander Archaeology');
INSERT INTO dev.for_code (id, code, name)
VALUES (36, '210301', 'Aboriginal and Torres Strait Islander History');
INSERT INTO dev.for_code (id, code, name)
VALUES (37, '50208', 'Maori Environmental Knowledge');
INSERT INTO dev.for_code (id, code, name)
VALUES (38, '80613', 'Maori Information and Knowledge Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (39, '110405', 'Traditional Maori Medicine and Treatments');
INSERT INTO dev.for_code (id, code, name)
VALUES (40, '111713', 'Maori Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (41, '130104', 'Kura Kaupapa Maori (Maori Primary Education)');
INSERT INTO dev.for_code (id, code, name)
VALUES (42, '130107', 'Te Whariki (Maori Early Childhood Education)');
INSERT INTO dev.for_code (id, code, name)
VALUES (43, '130206', 'Kohanga Reo (Maori Language Curriculum and Pedagogy)');
INSERT INTO dev.for_code (id, code, name)
VALUES (44, '130310', 'Maori Education (excl. Early Childhood and Primary Education)');
INSERT INTO dev.for_code (id, code, name)
VALUES (45, '169904', 'Studies of Maori Society');
INSERT INTO dev.for_code (id, code, name)
VALUES (46, '170108', 'Kaupapa Maori Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (47, '180201', 'Nga Tikanga Maori (Maori Customary Law)');
INSERT INTO dev.for_code (id, code, name)
VALUES (48, '180202', 'Te Maori Whakahaere Rauemi (Maori Resource Law)');
INSERT INTO dev.for_code (id, code, name)
VALUES (49, '180203', 'Te Tiriti o Waitangi (The Treaty of Waitangi)');
INSERT INTO dev.for_code (id, code, name)
VALUES (50, '180204', 'Te Ture Whenua (Maori Land Law)');
INSERT INTO dev.for_code (id, code, name)
VALUES (51, '180299', 'Maori Law not elsewhere classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (52, '190405', 'Maori Performing Arts');
INSERT INTO dev.for_code (id, code, name)
VALUES (53, '200207', 'Maori Cultural Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (54, '200321', 'Te Reo Maori (Maori Language)');
INSERT INTO dev.for_code (id, code, name)
VALUES (55, '200504', 'Maori Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (56, '210109', 'Maori Archaeology');
INSERT INTO dev.for_code (id, code, name)
VALUES (57, '210309', 'Maori History');
INSERT INTO dev.for_code (id, code, name)
VALUES (58, '50210', 'Pacific Peoples Environmental Knowledge');
INSERT INTO dev.for_code (id, code, name)
VALUES (59, '80614', 'Pacific Peoples Information and Knowledge Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (60, '111715', 'Pacific Peoples Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (61, '130311', 'Pacific Peoples Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (62, '169905', 'Studies of Pacific Peoples'' Societies');
INSERT INTO dev.for_code (id, code, name)
VALUES (63, '190410', 'Pacific Peoples Performing Arts');
INSERT INTO dev.for_code (id, code, name)
VALUES (64, '200210', 'Pacific Cultural Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (65, '200320', 'Pacific Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (66, '200507', 'Pacific Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (67, '210106', 'Archaeology of New Guinea and Pacific Islands (excl. New Zealand)');
INSERT INTO dev.for_code (id, code, name)
VALUES (68, '210313', 'Pacific History (excl. New Zealand and Maori)');

create table seo_code
(
    id   bigint auto_increment
        primary key,
    code varchar(255) null,
    name varchar(255) null
);

INSERT INTO dev.seo_code (id, code, name)
VALUES (1, '81', 'Defence');
INSERT INTO dev.seo_code (id, code, name)
VALUES (2, '82', 'Plant Production and Plant Primary Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (3, '83', 'Animal Production and Animal Primary Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (4, '84', 'Mineral Resources (excl. Energy Resources)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (5, '85', 'Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (6, '86', 'Manufacturing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (7, '87', 'Construction');
INSERT INTO dev.seo_code (id, code, name)
VALUES (8, '88', 'Transport');
INSERT INTO dev.seo_code (id, code, name)
VALUES (9, '89', 'Information and Communication Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (10, '90', 'Commercial Services and Tourism');
INSERT INTO dev.seo_code (id, code, name)
VALUES (11, '91', 'Economic Framework');
INSERT INTO dev.seo_code (id, code, name)
VALUES (12, '92', 'Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (13, '93', 'Education and Training');
INSERT INTO dev.seo_code (id, code, name)
VALUES (14, '94', 'Law, Politics and Community Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (15, '95', 'Cultural Understanding');
INSERT INTO dev.seo_code (id, code, name)
VALUES (16, '96', 'Environment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (17, '97', 'Expanding Knowledge');

create table person
(
    id          bigint auto_increment
        primary key,
    affiliation varchar(255) null,
    approved    bit          not null,
    city        varchar(255) null,
    country     varchar(255) null,
    created_at  datetime(6)  null,
    deleted     bit          not null,
    family_name varchar(255) null,
    first_name  varchar(255) null,
    state       varchar(255) null,
    updated_at  datetime(6)  null
);

INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (1, 'RMIT', true, 'Melbourne', 'Australia', '2022-05-01 00:00:00', false, 'Iles', 'Gail', 'Victoria', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (2, 'RMIT HIVE', true, 'Melbourne', 'Australia', '2022-05-01 00:00:00', false, 'Florent', 'Nicholas', 'Victoria', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (3, 'RMIT HIVE', true, 'Melbourne', 'Australia', '2022-05-01 00:00:00', false, 'Kirby', 'James', 'Victoria', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (4, 'Baylor College of Medicine ', true, 'Copenhagen', 'Denmark', '2022-05-01 00:00:00', false, 'Norsk', 'Peter', 'Copenhagen', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (5, 'NL Agency', true, 'Amsterdam', 'Netherlands', '2022-05-01 00:00:00', false, 'Dieckmann', 'Matthias', 'North Holland', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (6, 'University of Hamburg', true, 'Hamburg', 'Germany', '2022-05-01 00:00:00', false, 'Dierks', 'Karsten', 'Northern Germany', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (7, 'Sorbonne University', true, 'Paris ', 'France', '2022-05-01 00:00:00', false, 'Driss-Ecole', 'Dominique', 'Île-de-France', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (8, 'University of Brest', true, 'Morlaix', 'France', '2022-05-01 00:00:00', false, 'Prieur', 'Daniel', 'Btitanny', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (9, 'University of Freiburg', true, 'Breisgau', 'Germany', '2022-05-01 00:00:00', false, 'Dold', 'Pit', 'Baden-Württemberg', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (10, 'Darmstadt University of Technology', true, 'Darmstadt', 'Germany', '2022-05-01 00:00:00', false, 'Scherer', 'Gerhard ', 'Southern Germany', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (11, 'Institute of Biology II (Botany), University of Freiburg', true, 'Breisgau', 'Germany', '2022-05-01 00:00:00', false, 'Palme', 'Klaus ', 'Baden-Württemberg', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (12, 'ESTEC for HE Space Operations', true, 'Amsterdam', 'Netherlands', '2022-05-01 00:00:00', false, 'Demets', 'Rene', 'North Holland', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (13, 'University of Hamburg', true, 'Hamburh', 'Germany', '2022-05-01 00:00:00', false, 'Wunderlich', 'Rainer', 'Northern Germany', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (14, 'European Academy of Sciences and Arts', true, 'Homburg', 'Germany', '2022-05-01 00:00:00', false, 'Fecht', 'Hans-Jorg', 'Saarland', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (15, 'European College of Sport Science(ECSS)', true, 'Cologn', 'Germany', '2022-05-01 00:00:00', false, 'Schneider', 'Stefan', 'North Rhine-Westphalia', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (16, 'Space Research Institute, USSR Academy of Sciences', true, 'Moscow', 'Russia', '2022-05-01 00:00:00', false, 'Vedernikov', 'Andrei', 'Western Russia', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (17, 'Airbus Defence and Space', true, 'Aachen', 'Germany', '2022-05-01 00:00:00', false, 'Steimle', 'Christian', 'Western Germany', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (18, 'DISI and DEI Department', true, 'Bologna', 'Italy', '2022-05-01 00:00:00', false, 'Bartolini', 'Andrea', 'Emilia-Romagna region', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (19, 'University of Lyon', true, 'Lyon', 'France', '2022-05-01 00:00:00', false, 'Clement', 'Gilles', 'Auvergne-Rhône-Alpes', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (20, 'European Space Agency', true, 'Eriangen', 'Germany', '2022-05-01 00:00:00', false, 'Witt', 'Johannes', 'Bavaria', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (21, 'German Aerosapce Center', true, 'Aachen', 'Germany', '2022-05-01 00:00:00', false, 'Lohofer', 'George', 'Western Germany', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (22, 'Graz University of Technology', true, 'Styria', 'Austria', '2022-05-01 00:00:00', false, 'Pottlacher', 'George', 'Southern Austria', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (23, 'University of California', true, 'Los Angeles', 'USA', '2022-05-01 00:00:00', false, 'Horvath', 'Steve', 'California', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (24, 'CSIR-Central Salt and Marine Chemicals Research Institute', true, 'Bhavnagar', 'India', '2022-05-01 00:00:00', false, 'Raj', 'Savan', 'Gujarat', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (25, 'School of Physics and Astronomy at the University of Edinburgh', true, 'London', 'England', '2022-05-01 00:00:00', false, 'Cockell', 'Charles', 'South-East England', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (26, 'Integrative Neuroscience and Cognition Center', true, 'Paris', 'France', '2022-05-01 00:00:00', false, 'Mcintyre', 'Joe', 'North-Central of France', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (27, 'University of Padova', true, 'Padua', 'Italy', '2022-05-01 00:00:00', false, 'Tagliabue', 'Mariaelena', 'Veneto', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (28, 'CNES', true, 'Toulouse', 'France', '2022-05-01 00:00:00', false, 'Mignot', 'Jean', 'Southern France', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (29, 'MEDES - Institute for Space Medicine and Physiology', true, 'Toulouse', 'France', '2022-05-01 00:00:00', false, 'Llodra-Perez', 'Anais', 'Occitanie', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (30, 'NASA Engineering & Safety Center', true, 'Purdue', 'USA', '2022-05-01 00:00:00', false, 'Bauer', 'Frank', 'Indiana', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, family_name, first_name, state, updated_at) VALUES (31, 'European Spacen Agency', true, 'Aachen', 'Germany', '2022-05-01 00:00:00', false, 'Armborst', 'Lukas', 'Western Germany', null);

create table platform
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

INSERT INTO dev.platform (id, name)
VALUES (1, 'spaceStation');
INSERT INTO dev.platform (id, name)
VALUES (2, 'spaceShuttle');
INSERT INTO dev.platform (id, name)
VALUES (3, 'retrievableCapsule');
INSERT INTO dev.platform (id, name)
VALUES (4, 'soundingRocket');
INSERT INTO dev.platform (id, name)
VALUES (5, 'parabolicFlight');
INSERT INTO dev.platform (id, name)
VALUES (6, 'groundBasedFacility');

create table mission
(
    id               bigint auto_increment
        primary key,
    approved         bit          not null,
    created_at       datetime(6)  null,
    deleted          bit          not null,
    end_date         date         null,
    experiment_count bigint       null,
    launch_date      date         null,
    name             varchar(255) null,
    start_date       date         null,
    updated_at       datetime(6)  null,
    platform_id      bigint       null,
    constraint FKs5lqnraym2fvbxvrkttcnnhgh
        foreign key (platform_id) references platform (id)
);

INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (1, true, '2022-04-01 00:00:00', false, '2021-01-01', 1, '2021-01-01', 'ISS Increment 65', '2021-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (2, true, '2022-04-01 00:00:00', false, '1995-01-01', 1, '1995-01-01', 'MIR Euromir 95', '1995-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (3, true, '2022-04-01 00:00:00', false, '1998-01-01', 1, '1998-01-01', 'STS-95', '1998-01-01', null, 2);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (4, true, '2022-04-01 00:00:00', false, '1997-01-01', 1, '1997-01-01', 'STS-84', '1997-01-01', null, 2);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (5, true, '2022-04-01 00:00:00', false, '2007-01-01', 1, '2007-01-01', 'Foton-M3', '2007-01-01', null, 3);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (6, true, '2022-04-01 00:00:00', false, '2005-01-01', 1, '2005-01-01', 'Foton-M2', '2005-01-01', null, 3);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (7, true, '2022-04-01 00:00:00', false, '2015-01-01', 1, '2015-01-01', 'MASER 13', '2015-01-01', null, 4);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (8, true, '2022-04-01 00:00:00', false, '2009-01-01', 1, '2009-01-01', 'TEXUS 46', '2009-01-01', null, 4);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (9, true, '2022-04-01 00:00:00', false, '2020-01-01', 1, '2020-01-01', '73rd ESA Parabolic Flight Campaign', '2020-01-01', null, 5);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (10, true, '2022-04-01 00:00:00', false, '2007-01-01', 1, '2007-01-01', 'Drop Tower Bremen', '2007-01-01', null, 6);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (11, true, '2022-04-01 00:00:00', false, '2020-01-01', 1, '2020-01-01', 'ISS Increment 63', '2020-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (12, true, '2022-04-01 00:00:00', false, '2015-01-01', 1, '2015-01-01', 'ISS Increment 64', '2015-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (13, true, '2022-04-01 00:00:00', false, '2017-01-01', 1, '2017-01-01', 'ISS Increment 66', '2017-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (14, true, '2022-04-01 00:00:00', false, '2020-01-01', 1, '2020-01-01', 'ISS Increment 67', '2020-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (15, true, '2022-04-01 00:00:00', false, '2020-01-01', 1, '2020-01-01', 'ISS Increment 68', '2020-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (16, true, '2022-04-01 00:00:00', false, '2020-01-01', 1, '2020-01-01', 'ISS Increment 69', '2020-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (17, true, '2022-04-01 00:00:00', false, '2020-01-01', 1, '2020-01-01', 'ISS Increment 70', '2020-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (18, true, '2022-04-01 00:00:00', false, '2018-01-01', 1, '2018-01-01', 'ISS Increment 71', '2018-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (19, true, '2022-04-01 00:00:00', false, '2016-01-01', 1, '2016-01-01', 'ISS Increment 72', '2016-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (20, true, '2022-04-01 00:00:00', false, '2014-01-01', 1, '2014-01-01', 'ISS Increment 73', '2014-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date, updated_at, platform_id) VALUES (21, true, '2022-04-01 00:00:00', false, '2019-01-01', 1, '2019-01-01', 'ISS Increment 74', '2019-01-01', null, 1);

create table experiment
(
    id                      bigint auto_increment
        primary key,
    approved                bit           not null,
    created_at              datetime(6)   null,
    deleted                 bit           not null,
    experiment_aim          varchar(1023) null,
    experiment_objective    varchar(1023) null,
    experiment_publications varchar(1023) null,
    lead_institution        varchar(255)  null,
    title                   varchar(255)  null,
    toa                     varchar(255)  null,
    updated_at              datetime(6)   null,
    for_code_id             bigint        not null,
    mission_id              bigint        not null,
    platform_id             bigint        not null,
    seo_code_id             bigint        not null,
    constraint FKfngj6llveh6hcski9mjnjr7ft
        foreign key (seo_code_id) references seo_code (id),
    constraint FKgygeesbjm6430vcp7oqbj6i56
        foreign key (mission_id) references mission (id),
    constraint FKmhtqqtjv2v0vr3dawwqsemmm0
        foreign key (platform_id) references platform (id),
    constraint FKqaiemh670d1hykcnsmr52di4l
        foreign key (for_code_id) references for_code (id)
);

INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (1, true, '2022-05-04 13:09:05', false, 'To investigate the relationship between the environment condition and the formation of the agglomerates ', 'Develop a single mean field theory for the condesation phenomena of the magnetic particles', null, 'RMIT', 'Self-agglomeration of a ferrofluid in microgravity', 'Pure basic Research', null, 2, 1, 1, 2);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (2, true, '2022-05-04 13:09:05', false, 'To investigate the relationship between the microgravity and renal fluids excretion in humans', 'Increased urine output during the first periods of space flight has been reported in many astronauts and considered as an adaptive mechanism to cephalad fluid shift. During German-MIR-92 mission and D2-Spacelab mission the renal output of sodium and fluid', 'DAMEC Research Center Copenhagen DENMARK', 'DAMEC Research Center Copenhagen DENMARK', 'Influence of microgravity on renal fluid excretion in humans', 'Applied research', null, 6, 2, 1, 12);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (3, true, '2022-05-04 13:09:05', false, 'To investigate the relationship between Dynamic Light Scattering and chaterization of biomolecules', 'Crystal growth is in essence particle size increase as a function of time, and it is therefore important to investigate on inherent visco-elastic properties, or cluster sizes of such sample solutions. The crystallisation of biological   macromolecules in ', 'ESA''s Technology and Research Program', 'ESA-ESTEC,  Dierks & Partner Systemtechnik', 'Characterization of selected biomolecules by Dynamic Light Scattering in the course of the STS-95 mission preparation', 'Strategic basic research', null, 2, 3, 2, 12);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (4, true, '2022-05-04 13:09:05', false, 'To investigate the relationship between the polarity of lential root statocytes and the microgravity environment', 'Previous space experiments have shown that the polarity of lentil root statocytes was modified in microgravity (Perbal G. and Driss-Ecole D, 1989). The nucleus was slightly displaced toward the cell center and the amyloplasts were located in the proximal ', 'Université Pierre et Marie Curie Laboratoire CEMV', 'Université Pierre et Marie Curie Laboratoire CEMV', 'The cytoskeleton of the Lentil root statocyte', 'Experimental development', null, 7, 4, 2, 2);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (5, false, '2022-05-04 13:09:05', false, 'To investigate the enhancements of newly developed hardware', 'Perform space experiments during a short mission life (generally up to 2 weeks)', 'The Russian Space Agency, Roskosmos', 'University of Brest', 'Highrad', 'Experimental development', null, 5, 5, 3, 16);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (6, false, '2022-05-04 13:09:05', false, 'To investigate the relatinship between crystallisation of CdTe and related compounds.', 'Cadmium telluride (CdTe) and related compounds are promising materials for radiation sensors and photorefractive devices. Their commercial use is still limited owing to the problems in growing them. This MAP project is a close collaboration of scientists ', 'University of Freiburg', 'University of Freiburg', 'Crystallisation of CdTe and related compounds', 'Experimental development', null, 2, 6, 3, 4);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (7, false, '2022-05-04 13:09:05', false, 'To investigate the relationship between the direction of gravity vector and root growth of plants', 'In the SPARC experiment a close look will be taken at these auxin-transporting proteins: AUX and PIN. It is envisaged that in the absence of gravity, the auxintransporting proteins will change their position. This process will be explored by exposing seed', 'European Space Research and Technology Centre', 'ESA-ESTEC', 'SPARC - Specialized Phospholipase A, and Re-localization in auxin-transporting Cells in micro-g', 'Applied research', null, 2, 7, 4, 4);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (8, false, '2022-05-04 13:09:05', false, 'To investigate the relationship between the modelling of thermo-physical property data of liquid metals and the solidification process', 'To perform high precision viscosity, surface tension and specific heat capacity measurements of an industrial Fe-alloy.', 'Institut für Mikro und Nanomaterialien Universität Ulm Abt. Werkstoffe der Elektrotechnik', 'Institut für Mikro und Nanomaterialien Universität Ulm Abt. Werkstoffe der Elektrotechnik', 'High precision thermo-physical property data of liquid metals for modeling of industrial solidification processes', 'Experimental development', null, 2, 8, 4, 6);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (9, false, '2022-05-04 13:09:05', false, 'To investigate the relationship between the impact of gravity on human cerebral perfusion and neurocognitive performance.  ', 'Within this study we would like to investigate, that is a correlation between cerebrovascular auroregulation and neurocognitive performance during changed gravity conditions and  an effect of age on these mechanisms.', 'Deutsche Sporthochschule Köln Institut für Bewegungs- und Neurowissenschaft Zentrum für integrative Physiologie im Weltraum', 'Deutsche Sporthochschule Köln Institut für Bewegungs- und Neurowissenschaft Zentrum für integrative Physiologie im Weltraum', 'Cerebrovascular autoregulation as a determinant for neurocognitive performance', 'Strategic basic research', null, 6, 9, 5, 12);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (10, false, '2022-05-04 13:09:05', false, 'To investigate the the relationship betweengas the force in the direction and the temperature gradient ', 'The 61st ESA Parabolic Flight Campaign took place from 1 September to 12 September 2014 and was conducted from Bordeaux-Mérignac airport in France. While the first week was dedicated to the preparation of the experiments and the experiment integration int', 'Université Libre de Bruxelles Microgravity Research Center', 'Université Libre de Bruxelles Microgravity Research Center', 'ICAPS-IPE - Interactions in Cosmic and Atmospheric Particle Systems - ICAPS Precursor Experiments', 'Applied research', null, 4, 10, 6, 16);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (11, false, '2022-05-04 13:09:05', false, 'To investigate the new external payload platform which capable of hosting multiple external payloads on the ISS (International Space Station).', 'The Bartolomeo external payload facility will extend the infrastructure and capability of the ISS by 12 additional external sites fitting the expectations of the market. It enables the hosting of external payloads in low-Earth orbit, on-board the Internat', 'European space laboratory Columbus.', 'Airbus Defence and Space Location Ottobrunn', 'Bartolomeo - Commercial', 'Strategic basic research', null, 15, 11, 1, 9);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (12, false, '2022-05-04 13:09:05', false, 'To investigate the life of astronauts on board during mission', 'ESA EPO Task List is a series of educational videos about life on the ISS. Different astronauts explain during their respective mission certain aspects of their stay on board. Often they are accompanied by ''Paxi'' - ESA''s mascot for kids. They use Paxi as ', 'ESA-ESTEC Directorate of Human Spaceflight and Exploration Education Office', 'ESA-ESTEC Directorate of Human Spaceflight and Exploration Education Office', 'EPO Task List', 'Pure basic Research', null, 13, 12, 1, 13);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (13, false, '2022-05-04 13:09:05', false, 'To investigate the judgements of durations of the crewmembers during their stay on baord the ISS', 'Judgments of durations in seconds, minutes, hours, and days will be recorded in crewmembers throughout their stay on board the ISS and compared with pre- and post-flight baselines. It is hypothesized that time duration is underestimated by astronauts in o', 'Lyon Neuroscience Research Center INSERM U1028 - Impact Team', 'Lyon Neuroscience Research Center', 'TIME - Time Perception in Microgravity', 'Strategic basic research', null, 16, 13, 1, 9);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (14, false, '2022-05-04 13:09:05', false, 'To investigate the relationship between the robustness of improved technology and its capability to monitor gaseous compounds simultaneously', 'Demonstrate the robustness of the improved technology at the ISS in a representative operational environment: ISS as a test bed for technologies for future exploration. Develop small European niches in the area of life support based on state of the art te', 'European Space Agency', 'ESA-ESTEC', 'ANITA-2 - ANalyzing InTerferometer for ambient Air', 'Experimental development', null, 10, 14, 1, 9);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (15, false, '2022-05-04 13:09:05', false, 'To investigate the relationship between electrical resistivity of molten metals and dependence on the temperature', 'ELECTRICAL RESISTIVITY project is dedicated to measuring electrical resistivity of molten metals. The aim of the project is to determine the resistivity dependence on the temperature. This dependence can then  be further used to indirectly determine therm', 'Graz University of Technology Institute of Experimental Physics', 'Graz University of Technology Institute of Experimental Physics', 'RESISTIVITY - Electrical Resistivity Measurements of High Temperature Metallic Melts, Batch 2', 'Applied research', null, 2, 15, 1, 4);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (16, false, '2022-05-04 13:09:05', false, 'To investigate the relationship between DNA damage caused by low earth orbit radiation and age-related epigenetic changes in humans including the epigenetic clock', 'he effect of long-term living in space on physical ageing, such as loss of bone density is well-documented. The effect on the innate process of ageing however, is not known. This important question has remained largely unanswered because until now, there ', 'Public Health England (PHE) Cellular Biology', 'Oslo University Hospital Department of Molecular Microbiologya, University of California Department of Human Genetics', 'DNAmAGE - Effects of prolonged spaceflight on DNA methylation age', 'Experimental development', null, 6, 16, 1, 12);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (17, false, '2022-05-04 13:09:05', false, 'To investigate the relationship of the effects of altered gravity on the rock/microbe/liquid system as a whole', 'The interaction between microbes and rocks in a medium phase can be affected by reduced gravity in more than one way. The reduction of thermal convection in low-gravity, and its absence in microgravity, will minimize the natural stirring in liquids and ga', 'UK Centre for Astrobiology University of Edinburgh', 'UK Centre for Astrobiology University of Edinburgh', 'BioAsteroid', 'Experimental development', null, 6, 17, 1, 12);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (18, false, '2022-05-04 13:09:05', false, 'To investigate the relationship between the microgravity environment of lower orbit and the coordiante frames of reference used in nervous system', 'The purpose of this proposed research is to better understand how the CNS integrates information from different sensory modalities, encoded in different reference frames, in order to coordinate the hand with the visual environment. More specifically, we w', 'French National Centre for Scientific Research', 'CNRS UMR 8119 Université Paris Descartes', 'GRASP - Gravitational References for Sensorimotor Performance: Reaching and Grasping', 'Applied research', null, 11, 18, 1, 12);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (19, false, '2022-05-04 13:09:05', false, 'To investigate  the foreseen behaviour of fluids under microgravity.', 'The objectives of this experiment are to correct mathematical models of fluid sloshing provided by CFD tools;  To derive predictive models for future sloshing  under different operational conditions; To observe the fluid covering all the internal surface ', 'CNES France', 'France''s space agency CNES User Support and Operation Centre CADMOS', 'FLUIDICS: FLUId DynamICs in Space (CNES National Contribution)', 'Pure basic Research', null, 2, 19, 1, 4);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (20, false, '2022-05-04 13:09:05', false, 'To inspire an interest in science, technology, engineering and math (STEM) subjects and in STEM careers among young people', 'Amateur Radio on the International Space Station (ARISS) inspires students, worldwide, to pursue interests and careers in science, technology, engineering and math through amateur radio communications opportunities with the International Space Station (IS', 'ARISS - Amateur Radio on the International Space Station', 'ARISS - Amateur Radio on the International Space Station', 'ARISS - Amateur Radio on the International Space Station', 'Strategic basic research', null, 13, 20, 1, 13);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_aim, experiment_objective, experiment_publications, lead_institution, title, toa, updated_at, for_code_id, mission_id, platform_id, seo_code_id) VALUES (21, false, '2022-05-04 13:09:05', false, 'To investigate the cybersecurity enhancement for future space mission ', 'Cryptography ICE Cube is a compact experiment aimed at enhancing cybersecurity for future space missions. It is testing two related approaches to encryption for non rad-hardened systems to make encryption-based secure communication feasible for space miss', 'European Space Agency', 'ESA-ESTEC', 'CryptIC - Cryptography ICE Cube#5', 'Applied research', null, 10, 21, 1, 9);

create table experiment_attachment
(
    id            bigint auto_increment
        primary key,
    filename      varchar(1023) null,
    media_type    varchar(255)  null,
    experiment_id bigint        null,
    constraint FKg0a4dpinmvuixjko8t50rshjm
        foreign key (experiment_id) references experiment (id)
);

create table experiment_person
(
    experiment_id bigint not null,
    person_id     bigint not null,
    role_id       bigint null,
    primary key (experiment_id, person_id),
    constraint FK22amr4tudoeix5kh7j2u9cdvd
        foreign key (person_id) references person (id),
    constraint FK38p8441ocbcmppb87jom0eg7v
        foreign key (role_id) references role (id),
    constraint FKp75ow4vyureku5uecryhv9k1s
        foreign key (experiment_id) references experiment (id)
);

INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (1, 1, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (2, 4, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (3, 5, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (3, 6, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (5, 8, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (6, 9, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (7, 10, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (8, 13, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (8, 14, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (9, 15, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (11, 17, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (12, 18, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (13, 19, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (14, 20, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (15, 21, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (16, 23, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (17, 25, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (18, 26, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (19, 28, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (20, 30, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (21, 31, 1);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (1, 2, 2);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (1, 3, 2);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (4, 7, 2);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (7, 11, 2);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (7, 12, 2);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (10, 16, 2);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (15, 22, 2);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (16, 24, 2);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (18, 27, 2);
INSERT INTO dev.experiment_person (experiment_id, person_id, role_id)
VALUES (19, 29, 2);

create table platform_for_code
(
    platform_id bigint not null,
    for_code_id bigint not null,
    constraint FK6vkhaa3u1pebex05oaq42nrcs
        foreign key (for_code_id) references for_code (id),
    constraint FK8j2978xvl3kosrtsp46ghuucs
        foreign key (platform_id) references platform (id)
);

INSERT INTO dev.platform_for_code (platform_id, for_code_id)
VALUES (1, 2);
INSERT INTO dev.platform_for_code (platform_id, for_code_id)
VALUES (1, 6);
INSERT INTO dev.platform_for_code (platform_id, for_code_id)
VALUES (2, 2);
INSERT INTO dev.platform_for_code (platform_id, for_code_id)
VALUES (2, 7);
INSERT INTO dev.platform_for_code (platform_id, for_code_id)
VALUES (3, 5);
INSERT INTO dev.platform_for_code (platform_id, for_code_id)
VALUES (3, 2);
INSERT INTO dev.platform_for_code (platform_id, for_code_id)
VALUES (4, 2);
INSERT INTO dev.platform_for_code (platform_id, for_code_id)
VALUES (4, 2);
INSERT INTO dev.platform_for_code (platform_id, for_code_id)
VALUES (5, 6);
INSERT INTO dev.platform_for_code (platform_id, for_code_id)
VALUES (6, 4);

create table platform_seo_code
(
    seo_code_id bigint not null,
    platform_id bigint not null,
    constraint FKo09o7de35pc1xm4obfe7o19r7
        foreign key (platform_id) references seo_code (id),
    constraint FKqyqyuerdsq7en49gy09l3s6na
        foreign key (seo_code_id) references platform (id)
);

INSERT INTO dev.platform_seo_code (seo_code_id, platform_id)
VALUES (1, 2);
INSERT INTO dev.platform_seo_code (seo_code_id, platform_id)
VALUES (1, 12);
INSERT INTO dev.platform_seo_code (seo_code_id, platform_id)
VALUES (2, 12);
INSERT INTO dev.platform_seo_code (seo_code_id, platform_id)
VALUES (2, 2);
INSERT INTO dev.platform_seo_code (seo_code_id, platform_id)
VALUES (3, 16);
INSERT INTO dev.platform_seo_code (seo_code_id, platform_id)
VALUES (3, 4);
INSERT INTO dev.platform_seo_code (seo_code_id, platform_id)
VALUES (4, 4);
INSERT INTO dev.platform_seo_code (seo_code_id, platform_id)
VALUES (4, 6);
INSERT INTO dev.platform_seo_code (seo_code_id, platform_id)
VALUES (5, 12);
INSERT INTO dev.platform_seo_code (seo_code_id, platform_id)
VALUES (6, 16);
