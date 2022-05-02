drop table if exists experiment_person;
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
    city        varchar(255) null,
    country     varchar(255) null,
    family_name varchar(255) null,
    first_name  varchar(255) null,
    state       varchar(255) null
);

INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (1, 'RMIT', 'Melbourne', 'Australia', 'Iles', 'Gail', 'Victoria');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (2, 'RMIT HIVE', 'Melbourne', 'Australia', 'Florent', 'Nicholas', 'Victoria');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (3, 'RMIT HIVE', 'Melbourne', 'Australia', 'Kirby', 'James', 'Victoria');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (4, 'Baylor College of Medicine ', 'Copenhagen', 'Denmark', 'Norsk', 'Peter', 'Copenhagen');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (5, 'NL Agency', 'Amsterdam', 'Netherlands', 'Dieckmann', 'Matthias', 'North Holland');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (6, 'University of Hamburg', 'Hamburg', 'Germany', 'Dierks', 'Karsten', 'Northern Germany');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (7, 'Sorbonne University', 'Paris ', 'France', 'Driss-Ecole', 'Dominique', 'Île-de-France');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (8, 'University of Brest', 'Morlaix', 'France', 'Prieur', 'Daniel', 'Btitanny');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (9, 'University of Freiburg', 'Breisgau', 'Germany', 'Dold', 'Pit', 'Baden-Württemberg');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (10, 'Darmstadt University of Technology', 'Darmstadt', 'Germany', 'Scherer', 'Gerhard ', 'Southern Germany');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (11, 'Institute of Biology II (Botany), University of Freiburg', 'Breisgau', 'Germany', 'Palme', 'Klaus ',
        'Baden-Württemberg');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (12, 'ESTEC for HE Space Operations', 'Amsterdam', 'Netherlands', 'Demets', 'Rene', 'North Holland');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (13, 'University of Hamburg', 'Hamburh', 'Germany', 'Wunderlich', 'Rainer', 'Northern Germany');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (14, 'European Academy of Sciences and Arts', 'Homburg', 'Germany', 'Fecht', 'Hans-Jorg', 'Saarland');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (15, 'European College of Sport Science(ECSS)', 'Cologn', 'Germany', 'Schneider', 'Stefan',
        'North Rhine-Westphalia');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (16, 'Space Research Institute, USSR Academy of Sciences', 'Moscow', 'Russia', 'Vedernikov', 'Andrei',
        'Western Russia');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (17, 'Airbus Defence and Space', 'Aachen', 'Germany', 'Steimle', 'Christian', 'Western Germany');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (18, 'DISI and DEI Department', 'Bologna', 'Italy', 'Bartolini', 'Andrea', 'Emilia-Romagna region');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (19, 'University of Lyon', 'Lyon', 'France', 'Clement', 'Gilles', 'Auvergne-Rhône-Alpes');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (20, 'European Space Agency', 'Eriangen', 'Germany', 'Witt', 'Johannes', 'Bavaria');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (21, 'German Aerosapce Center', 'Aachen', 'Germany', 'Lohofer', 'George', 'Western Germany');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (22, 'Graz University of Technology', 'Styria', 'Austria', 'Pottlacher', 'George', 'Southern Austria');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (23, 'University of California', 'Los Angeles', 'USA', 'Horvath', 'Steve', 'California');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (24, 'CSIR-Central Salt and Marine Chemicals Research Institute', 'Bhavnagar', 'India', 'Raj', 'Savan',
        'Gujarat');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (25, 'School of Physics and Astronomy at the University of Edinburgh', 'London', 'England', 'Cockell', 'Charles',
        'South-East England');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (26, 'Integrative Neuroscience and Cognition Center', 'Paris', 'France', 'Mcintyre', 'Joe',
        'North-Central of France');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (27, 'University of Padova', 'Padua', 'Italy', 'Tagliabue', 'Mariaelena', 'Veneto');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (28, 'CNES', 'Toulouse', 'France', 'Mignot', 'Jean', 'Southern France');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (29, 'MEDES - Institute for Space Medicine and Physiology', 'Toulouse', 'France', 'Llodra-Perez', 'Anais',
        'Occitanie');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (30, 'NASA Engineering & Safety Center', 'Purdue', 'USA', 'Bauer', 'Frank', 'Indiana');
INSERT INTO dev.person (id, affiliation, city, country, family_name, first_name, state)
VALUES (31, 'European Spacen Agency', 'Aachen', 'Germany', 'Armborst', 'Lukas', 'Western Germany');

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
    end_date         date         null,
    experiment_count bigint       null,
    launch_date      date         null,
    name             varchar(255) null,
    start_date       date         null,
    platform_id      bigint       null,
    constraint FKs5lqnraym2fvbxvrkttcnnhgh
        foreign key (platform_id) references platform (id)
);

INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (1, '2021-01-01', 1, '2021-01-01', 'ISS Increment 65', '2021-01-01', 1);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (2, '1995-01-01', 1, '1995-01-01', 'MIR Euromir 95', '1995-01-01', 1);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (3, '1998-01-01', 1, '1998-01-01', 'STS-95', '1998-01-01', 2);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (4, '1997-01-01', 1, '1997-01-01', 'STS-84', '1997-01-01', 2);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (5, '2007-01-01', 1, '2007-01-01', 'Foton-M3', '2007-01-01', 3);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (6, '2005-01-01', 1, '2005-01-01', 'Foton-M2', '2005-01-01', 3);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (7, '2015-01-01', 1, '2015-01-01', 'MASER 13', '2015-01-01', 4);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (8, '2009-01-01', 1, '2009-01-01', 'TEXUS 46', '2009-01-01', 4);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (9, '2020-01-01', 1, '2020-01-01', '73rd ESA Parabolic Flight Campaign', '2020-01-01', 5);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (10, '2007-01-01', 1, '2007-01-01', 'Drop Tower Bremen', '2007-01-01', 6);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (11, '2020-01-01', 1, '2020-01-01', 'ISS Increment 63', '2020-01-01', 1);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (12, '2015-01-01', 1, '2015-01-01', 'ISS Increment 63', '2015-01-01', 1);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (13, '2017-01-01', 1, '2017-01-01', 'ISS Increment 63', '2017-01-01', 1);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (14, '2020-01-01', 1, '2020-01-01', 'ISS Increment 63', '2020-01-01', 1);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (15, '2020-01-01', 1, '2020-01-01', 'ISS Increment 63', '2020-01-01', 1);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (16, '2020-01-01', 1, '2020-01-01', 'ISS Increment 63', '2020-01-01', 1);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (17, '2020-01-01', 1, '2020-01-01', 'ISS Increment 64', '2020-01-01', 1);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (18, '2018-01-01', 1, '2018-01-01', 'ISS Increment 64', '2018-01-01', 1);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (19, '2016-01-01', 1, '2016-01-01', 'ISS Increment 64', '2016-01-01', 1);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (20, '2014-01-01', 1, '2014-01-01', 'ISS Increment 61', '2014-01-01', 1);
INSERT INTO dev.mission (id, end_date, experiment_count, launch_date, name, start_date, platform_id)
VALUES (21, '2019-01-01', 1, '2019-01-01', 'ISS Increment 62', '2019-01-01', 1);

create table experiment
(
    id                        bigint auto_increment
        primary key,
    approved                  bit           not null,
    deleted                   bit           not null,
    experiment_aim            varchar(1023) null,
    experiment_module_drawing varchar(1023) null,
    experiment_objective      varchar(1023) null,
    experiment_publications   varchar(1023) null,
    lead_institution          varchar(255)  null,
    title                     varchar(255)  null,
    toa                       varchar(255)  null,
    for_code_id               bigint        not null,
    mission_id                bigint        not null,
    platform_id               bigint        not null,
    seo_code_id               bigint        not null,
    constraint FKfngj6llveh6hcski9mjnjr7ft
        foreign key (seo_code_id) references seo_code (id),
    constraint FKgygeesbjm6430vcp7oqbj6i56
        foreign key (mission_id) references mission (id),
    constraint FKmhtqqtjv2v0vr3dawwqsemmm0
        foreign key (platform_id) references platform (id),
    constraint FKqaiemh670d1hykcnsmr52di4l
        foreign key (for_code_id) references for_code (id)
);

INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (1, true, false,
        'To investigate the relationship between the environment condition and the formation of the agglomerates ',
        null, 'Develop a single mean field theory for the condesation phenomena of the magnetic particles', null,
        'RMIT', 'Self-agglomeration of a ferrofluid in microgravity', 'Pure basic Research', 2, 1, 1, 2);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (2, true, false, 'To investigate the relationship between the microgravity and renal fluids excretion in humans',
        null,
        'Increased urine output during the first periods of space flight has been reported in many astronauts and considered as an adaptive mechanism to cephalad fluid shift. During German-MIR-92 mission and D2-Spacelab mission the renal output of sodium and fluid',
        'DAMEC Research Center Copenhagen DENMARK', 'DAMEC Research Center Copenhagen DENMARK',
        'Influence of microgravity on renal fluid excretion in humans', 'Applied research', 6, 2, 1, 12);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (3, true, false,
        'To investigate the relationship between Dynamic Light Scattering and chaterization of biomolecules', null,
        'Crystal growth is in essence particle size increase as a function of time, and it is therefore important to investigate on inherent visco-elastic properties, or cluster sizes of such sample solutions. The crystallisation of biological   macromolecules in ',
        'ESA´s Technology and Research Program', 'ESA-ESTEC,  Dierks & Partner Systemtechnik',
        'Characterization of selected biomolecules by Dynamic Light Scattering in the course of the STS-95 mission preparation',
        'Strategic basic research', 2, 3, 2, 12);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (4, true, false,
        'To investigate the relationship between the polarity of lential root statocytes and the microgravity environment',
        null,
        'Previous space experiments have shown that the polarity of lentil root statocytes was modified in microgravity (Perbal G. and Driss-Ecole D, 1989). The nucleus was slightly displaced toward the cell center and the amyloplasts were located in the proximal ',
        'Université Pierre et Marie Curie Laboratoire CEMV', 'Université Pierre et Marie Curie Laboratoire CEMV',
        'The cytoskeleton of the Lentil root statocyte', 'Experimental development', 7, 4, 2, 2);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (5, false, false, 'To investigate the enhancements of newly developed hardware', null,
        'Perform space experiments during a short mission life (generally up to 2 weeks)',
        'The Russian Space Agency, Roskosmos', 'University of Brest', 'Highrad', 'Experimental development', 5, 5, 3,
        16);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (6, false, false, 'To investigate the relatinship between crystallisation of CdTe and related compounds.', null,
        'Cadmium telluride (CdTe) and related compounds are promising materials for radiation sensors and photorefractive devices. Their commercial use is still limited owing to the problems in growing them. This MAP project is a close collaboration of scientists ',
        'University of Freiburg', 'University of Freiburg', 'Crystallisation of CdTe and related compounds',
        'Experimental development', 2, 6, 3, 4);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (7, false, false,
        'To investigate the relationship between the direction of gravity vector and root growth of plants', null,
        'In the SPARC experiment a close look will be taken at these auxin-transporting proteins: AUX and PIN. It is envisaged that in the absence of gravity, the auxintransporting proteins will change their position. This process will be explored by exposing seed',
        'European Space Research and Technology Centre', 'ESA-ESTEC',
        'SPARC - Specialized Phospholipase A, and Re-localization in auxin-transporting Cells in micro-g',
        'Applied research', 2, 7, 4, 4);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (8, false, false,
        'To investigate the relationship between the modelling of thermo-physical property data of liquid metals and the solidification process',
        null,
        'To perform high precision viscosity, surface tension and specific heat capacity measurements of an industrial Fe-alloy.',
        'Institut für Mikro und Nanomaterialien Universität Ulm Abt. Werkstoffe der Elektrotechnik',
        'Institut für Mikro und Nanomaterialien Universität Ulm Abt. Werkstoffe der Elektrotechnik',
        'High precision thermo-physical property data of liquid metals for modeling of industrial solidification processes',
        'Experimental development', 2, 8, 4, 6);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (9, false, false,
        'To investigate the relationship between the impact of gravity on human cerebral perfusion and neurocognitive performance.  ',
        null,
        'Within this study we would like to investigate, that is a correlation between cerebrovascular auroregulation and neurocognitive performance during changed gravity conditions and  an effect of age on these mechanisms.',
        'Deutsche Sporthochschule Köln Institut für Bewegungs- und Neurowissenschaft Zentrum für integrative Physiologie im Weltraum',
        'Deutsche Sporthochschule Köln Institut für Bewegungs- und Neurowissenschaft Zentrum für integrative Physiologie im Weltraum',
        'Cerebrovascular autoregulation as a determinant for neurocognitive performance', 'Strategic basic research', 6,
        9, 5, 12);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (10, false, false,
        'To investigate the the relationship betweengas the force in the direction and the temperature gradient ', null,
        'The 61st ESA Parabolic Flight Campaign took place from 1 September to 12 September 2014 and was conducted from Bordeaux-Mérignac airport in France. While the first week was dedicated to the preparation of the experiments and the experiment integration int',
        'Université Libre de Bruxelles Microgravity Research Center',
        'Université Libre de Bruxelles Microgravity Research Center',
        'ICAPS-IPE - Interactions in Cosmic and Atmospheric Particle Systems - ICAPS Precursor Experiments',
        'Applied research', 4, 10, 6, 16);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (11, false, false,
        'To investigate the new external payload platform which capable of hosting multiple external payloads on the ISS (International Space Station).',
        null,
        'The Bartolomeo external payload facility will extend the infrastructure and capability of the ISS by 12 additional external sites fitting the expectations of the market. It enables the hosting of external payloads in low-Earth orbit, on-board the Internat',
        'European space laboratory Columbus.', 'Airbus Defence and Space Location Ottobrunn', 'Bartolomeo - Commercial',
        'Strategic basic research', 15, 11, 1, 9);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (12, false, false, 'To investigate the life of astronauts on board during mission', null,
        'ESA EPO Task List is a series of educational videos about life on the ISS. Different astronauts explain during their respective mission certain aspects of their stay on board. Often they are accompanied by ‘Paxi’ – ESA’s mascot for kids. They use Paxi as ',
        'ESA-ESTEC Directorate of Human Spaceflight and Exploration Education Office',
        'ESA-ESTEC Directorate of Human Spaceflight and Exploration Education Office', 'EPO Task List',
        'Pure basic Research', 13, 12, 1, 13);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (13, false, false,
        'To investigate the judgements of durations of the crewmembers during their stay on baord the ISS', null,
        'Judgments of durations in seconds, minutes, hours, and days will be recorded in crewmembers throughout their stay on board the ISS and compared with pre- and post-flight baselines. It is hypothesized that time duration is underestimated by astronauts in o',
        'Lyon Neuroscience Research Center INSERM U1028 - Impact Team', 'Lyon Neuroscience Research Center',
        'TIME - Time Perception in Microgravity', 'Strategic basic research', 16, 13, 1, 9);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (14, false, false,
        'To investigate the relationship between the robustness of improved technology and its capability to monitor gaseous compounds simultaneously',
        null,
        'Demonstrate the robustness of the improved technology at the ISS in a representative operational environment: ISS as a test bed for technologies for future exploration. Develop small European niches in the area of life support based on state of the art te',
        'European Space Agency', 'ESA-ESTEC', 'ANITA-2 - ANalyzing InTerferometer for ambient Air',
        'Experimental development', 10, 14, 1, 9);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (15, false, false,
        'To investigate the relationship between electrical resistivity of molten metals and dependence on the temperature',
        null,
        'ELECTRICAL RESISTIVITY project is dedicated to measuring electrical resistivity of molten metals. The aim of the project is to determine the resistivity dependence on the temperature. This dependence can then  be further used to indirectly determine therm',
        'Graz University of Technology Institute of Experimental Physics',
        'Graz University of Technology Institute of Experimental Physics',
        'RESISTIVITY - Electrical Resistivity Measurements of High Temperature Metallic Melts, Batch 2',
        'Applied research', 2, 15, 1, 4);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (16, false, false,
        'To investigate the relationship between DNA damage caused by low earth orbit radiation and age-related epigenetic changes in humans including the epigenetic clock',
        null,
        'he effect of long-term living in space on physical ageing, such as loss of bone density is well-documented. The effect on the innate process of ageing however, is not known. This important question has remained largely unanswered because until now, there ',
        'Public Health England (PHE) Cellular Biology',
        'Oslo University Hospital Department of Molecular Microbiologya, University of California Department of Human Genetics',
        'DNAmAGE - Effects of prolonged spaceflight on DNA methylation age', 'Experimental development', 6, 16, 1, 12);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (17, false, false,
        'To investigate the relationship of the effects of altered gravity on the rock/microbe/liquid system as a whole',
        null,
        'The interaction between microbes and rocks in a medium phase can be affected by reduced gravity in more than one way. The reduction of thermal convection in low-gravity, and its absence in microgravity, will minimize the natural stirring in liquids and ga',
        'UK Centre for Astrobiology University of Edinburgh', 'UK Centre for Astrobiology University of Edinburgh',
        'BioAsteroid', 'Experimental development', 6, 17, 1, 12);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (18, false, false,
        'To investigate the relationship between the microgravity environment of lower orbit and the coordiante frames of reference used in nervous system',
        null,
        'The purpose of this proposed research is to better understand how the CNS integrates information from different sensory modalities, encoded in different reference frames, in order to coordinate the hand with the visual environment. More specifically, we w',
        'French National Centre for Scientific Research', 'CNRS UMR 8119 Université Paris Descartes',
        'GRASP - Gravitational References for Sensorimotor Performance: Reaching and Grasping', 'Applied research', 11,
        18, 1, 12);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (19, false, false, 'To investigate  the foreseen behaviour of fluids under microgravity.', null,
        'The objectives of this experiment are to correct mathematical models of fluid sloshing provided by CFD tools;  To derive predictive models for future sloshing  under different operational conditions; To observe the fluid covering all the internal surface ',
        'CNES France', 'France''s space agency CNES User Support and Operation Centre CADMOS',
        'FLUIDICS: FLUId DynamICs in Space (CNES National Contribution)', 'Pure basic Research', 2, 19, 1, 4);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (20, false, false,
        'To inspire an interest in science, technology, engineering and math (STEM) subjects and in STEM careers among young people',
        null,
        'Amateur Radio on the International Space Station (ARISS) inspires students, worldwide, to pursue interests and careers in science, technology, engineering and math through amateur radio communications opportunities with the International Space Station (IS',
        'ARISS - Amateur Radio on the International Space Station',
        'ARISS - Amateur Radio on the International Space Station',
        'ARISS - Amateur Radio on the International Space Station', 'Strategic basic research', 13, 20, 1, 13);
INSERT INTO dev.experiment (id, approved, deleted, experiment_aim, experiment_module_drawing, experiment_objective,
                            experiment_publications, lead_institution, title, toa, for_code_id, mission_id, platform_id,
                            seo_code_id)
VALUES (21, false, false, 'To investigate the cybersecurity enhancement for future space mission ', null,
        'Cryptography ICE Cube is a compact experiment aimed at enhancing cybersecurity for future space missions. It is testing two related approaches to encryption for non rad-hardened systems to make encryption-based secure communication feasible for space miss',
        'European Space Agency', 'ESA-ESTEC', 'CryptIC - Cryptography ICE Cube#5', 'Applied research', 10, 21, 1, 9);

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
