drop table if exists dev.platform_seo_code;
drop table if exists dev.platform_for_code;
drop table if exists dev.experiment_person;
drop table if exists dev.publication_author;
drop table if exists dev.author;
drop table if exists dev.publication;
drop table if exists dev.attachment;
drop table if exists dev.experiment;
drop table if exists dev.mission;
drop table if exists dev.platform;
drop table if exists dev.role;
drop table if exists dev.person;
drop table if exists dev.test_subject_type;
drop table if exists dev.area;
drop table if exists dev.subsystem;
drop table if exists dev.seo_code;
drop table if exists dev.for_code;
drop table if exists dev.toa;
drop table if exists dev.activity;
drop table if exists dev.user;

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

create table activity
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

INSERT INTO dev.activity (id, name)
VALUES (1, 'Scientific Research');
INSERT INTO dev.activity (id, name)
VALUES (2, 'Industry');
INSERT INTO dev.activity (id, name)
VALUES (3, 'Human Spaceflight');

create table toa
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

INSERT INTO dev.toa (id, name)
VALUES (1, 'Pure Basic Research');
INSERT INTO dev.toa (id, name)
VALUES (2, 'Strategic Basic Research');
INSERT INTO dev.toa (id, name)
VALUES (3, 'Applied Research');
INSERT INTO dev.toa (id, name)
VALUES (4, 'Experimental Development');

create table for_code
(
    id   bigint auto_increment
        primary key,
    code varchar(255) null,
    name varchar(255) null
);

INSERT INTO dev.for_code (id, code, name)
VALUES (1, '30', 'Agricultural, Veterinary And Food Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (2, '31', 'Biological Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (3, '32', 'Biomedical And Clinical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (4, '33', 'Built Environment And Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (5, '34', 'Chemical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (6, '35', 'Commerce, Management, Tourism And Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (7, '36', 'Creative Arts And Writing');
INSERT INTO dev.for_code (id, code, name)
VALUES (8, '37', 'Earth Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (9, '38', 'Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (10, '39', 'Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (11, '40', 'Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (12, '41', 'Environmental Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (13, '42', 'Health Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (14, '43', 'History, Heritage And Archaeology');
INSERT INTO dev.for_code (id, code, name)
VALUES (15, '44', 'Human Society');
INSERT INTO dev.for_code (id, code, name)
VALUES (16, '45', 'Indigenous Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (17, '46', 'Information And Computing Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (18, '47', 'Language, Communication And Culture');
INSERT INTO dev.for_code (id, code, name)
VALUES (19, '48', 'Law And Legal Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (20, '49', 'Mathematical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (21, '50', 'Philosophy And Religious Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (22, '51', 'Physical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (23, '52', 'Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (24, '3001', 'Agricultural Biotechnology');
INSERT INTO dev.for_code (id, code, name)
VALUES (25, '3002', 'Agriculture, Land And Farm Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (26, '3003', 'Animal Production');
INSERT INTO dev.for_code (id, code, name)
VALUES (27, '3004', 'Crop And Pasture Production');
INSERT INTO dev.for_code (id, code, name)
VALUES (28, '3005', 'Fisheries Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (29, '3006', 'Food Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (30, '3007', 'Forestry Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (31, '3008', 'Horticultural Production');
INSERT INTO dev.for_code (id, code, name)
VALUES (32, '3009', 'Veterinary Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (33, '3099', 'Other Agricultural, Veterinary And Food Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (34, '3101', 'Biochemistry And Cell Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (35, '3102', 'Bioinformatics And Computational Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (36, '3103', 'Ecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (37, '3104', 'Evolutionary Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (38, '3105', 'Genetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (39, '3106', 'Industrial Biotechnology');
INSERT INTO dev.for_code (id, code, name)
VALUES (40, '3107', 'Microbiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (41, '3108', 'Plant Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (42, '3109', 'Zoology');
INSERT INTO dev.for_code (id, code, name)
VALUES (43, '3199', 'Other Biological Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (44, '3201', 'Cardiovascular Medicine And Haematology');
INSERT INTO dev.for_code (id, code, name)
VALUES (45, '3202', 'Clinical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (46, '3203', 'Dentistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (47, '3204', 'Immunology');
INSERT INTO dev.for_code (id, code, name)
VALUES (48, '3205', 'Medical Biochemistry And Metabolomics');
INSERT INTO dev.for_code (id, code, name)
VALUES (49, '3206', 'Medical Biotechnology');
INSERT INTO dev.for_code (id, code, name)
VALUES (50, '3207', 'Medical Microbiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (51, '3208', 'Medical Physiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (52, '3209', 'Neurosciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (53, '3210', 'Nutrition And Dietetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (54, '3211', 'Oncology And Carcinogenesis');
INSERT INTO dev.for_code (id, code, name)
VALUES (55, '3212', 'Ophthalmology And Optometry');
INSERT INTO dev.for_code (id, code, name)
VALUES (56, '3213', 'Paediatrics');
INSERT INTO dev.for_code (id, code, name)
VALUES (57, '3214', 'Pharmacology And Pharmaceutical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (58, '3215', 'Reproductive Medicine');
INSERT INTO dev.for_code (id, code, name)
VALUES (59, '3299', 'Other Biomedical And Clinical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (60, '3301', 'Architecture');
INSERT INTO dev.for_code (id, code, name)
VALUES (61, '3302', 'Building');
INSERT INTO dev.for_code (id, code, name)
VALUES (62, '3303', 'Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (63, '3304', 'Urban And Regional Planning');
INSERT INTO dev.for_code (id, code, name)
VALUES (64, '3399', 'Other Built Environment And Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (65, '3401', 'Analytical Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (66, '3402', 'Inorganic Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (67, '3403', 'Macromolecular And Materials Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (68, '3404', 'Medicinal And Biomolecular Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (69, '3405', 'Organic Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (70, '3406', 'Physical Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (71, '3407', 'Theoretical And Computational Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (72, '3499', 'Other Chemical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (73, '3501', 'Accounting, Auditing And Accountability');
INSERT INTO dev.for_code (id, code, name)
VALUES (74, '3502', 'Banking, Finance And Investment');
INSERT INTO dev.for_code (id, code, name)
VALUES (75, '3503', 'Business Systems In Context');
INSERT INTO dev.for_code (id, code, name)
VALUES (76, '3504', 'Commercial Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (77, '3505', 'Human Resources And Industrial Relations');
INSERT INTO dev.for_code (id, code, name)
VALUES (78, '3506', 'Marketing');
INSERT INTO dev.for_code (id, code, name)
VALUES (79, '3507', 'Strategy, Management And Organisational Behaviour');
INSERT INTO dev.for_code (id, code, name)
VALUES (80, '3508', 'Tourism');
INSERT INTO dev.for_code (id, code, name)
VALUES (81, '3509', 'Transportation, Logistics And Supply Chains');
INSERT INTO dev.for_code (id, code, name)
VALUES (82, '3599', 'Other Commerce, Management, Tourism And Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (83, '3601', 'Art History, Theory And Criticism');
INSERT INTO dev.for_code (id, code, name)
VALUES (84, '3602', 'Creative And Professional Writing');
INSERT INTO dev.for_code (id, code, name)
VALUES (85, '3603', 'Music');
INSERT INTO dev.for_code (id, code, name)
VALUES (86, '3604', 'Performing Arts');
INSERT INTO dev.for_code (id, code, name)
VALUES (87, '3605', 'Screen And Digital Media');
INSERT INTO dev.for_code (id, code, name)
VALUES (88, '3606', 'Visual Arts');
INSERT INTO dev.for_code (id, code, name)
VALUES (89, '3699', 'Other Creative Arts And Writing');
INSERT INTO dev.for_code (id, code, name)
VALUES (90, '3701', 'Atmospheric Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (91, '3702', 'Climate Change Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (92, '3703', 'Geochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (93, '3704', 'Geoinformatics');
INSERT INTO dev.for_code (id, code, name)
VALUES (94, '3705', 'Geology');
INSERT INTO dev.for_code (id, code, name)
VALUES (95, '3706', 'Geophysics');
INSERT INTO dev.for_code (id, code, name)
VALUES (96, '3707', 'Hydrology');
INSERT INTO dev.for_code (id, code, name)
VALUES (97, '3708', 'Oceanography');
INSERT INTO dev.for_code (id, code, name)
VALUES (98, '3709', 'Physical Geography And Environmental Geoscience');
INSERT INTO dev.for_code (id, code, name)
VALUES (99, '3799', 'Other Earth Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (100, '3801', 'Applied Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (101, '3802', 'Econometrics');
INSERT INTO dev.for_code (id, code, name)
VALUES (102, '3803', 'Economic Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (103, '3899', 'Other Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (104, '3901', 'Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (105, '3902', 'Education Policy, Sociology And Philosophy');
INSERT INTO dev.for_code (id, code, name)
VALUES (106, '3903', 'Education Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (107, '3904', 'Specialist Studies In Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (108, '3999', 'Other Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (109, '4001', 'Aerospace Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (110, '4002', 'Automotive Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (111, '4003', 'Biomedical Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (112, '4004', 'Chemical Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (113, '4005', 'Civil Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (114, '4006', 'Communications Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (115, '4007', 'Control Engineering, Mechatronics And Robotics');
INSERT INTO dev.for_code (id, code, name)
VALUES (116, '4008', 'Electrical Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (117, '4009', 'Electronics, Sensors And Digital Hardware');
INSERT INTO dev.for_code (id, code, name)
VALUES (118, '4010', 'Engineering Practice And Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (119, '4011', 'Environmental Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (120, '4012', 'Fluid Mechanics And Thermal Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (121, '4013', 'Geomatic Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (122, '4014', 'Manufacturing Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (123, '4015', 'Maritime Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (124, '4016', 'Materials Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (125, '4017', 'Mechanical Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (126, '4018', 'Nanotechnology');
INSERT INTO dev.for_code (id, code, name)
VALUES (127, '4019', 'Resources Engineering And Extractive Metallurgy');
INSERT INTO dev.for_code (id, code, name)
VALUES (128, '4099', 'Other Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (129, '4101', 'Climate Change Impacts And Adaptation');
INSERT INTO dev.for_code (id, code, name)
VALUES (130, '4102', 'Ecological Applications');
INSERT INTO dev.for_code (id, code, name)
VALUES (131, '4103', 'Environmental Biotechnology');
INSERT INTO dev.for_code (id, code, name)
VALUES (132, '4104', 'Environmental Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (133, '4105', 'Pollution And Contamination');
INSERT INTO dev.for_code (id, code, name)
VALUES (134, '4106', 'Soil Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (135, '4199', 'Other Environmental Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (136, '4201', 'Allied Health And Rehabilitation Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (137, '4202', 'Epidemiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (138, '4203', 'Health Services And Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (139, '4204', 'Midwifery');
INSERT INTO dev.for_code (id, code, name)
VALUES (140, '4205', 'Nursing');
INSERT INTO dev.for_code (id, code, name)
VALUES (141, '4206', 'Public Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (142, '4207', 'Sports Science And Exercise');
INSERT INTO dev.for_code (id, code, name)
VALUES (143, '4208', 'Traditional, Complementary And Integrative Medicine');
INSERT INTO dev.for_code (id, code, name)
VALUES (144, '4299', 'Other Health Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (145, '4301', 'Archaeology');
INSERT INTO dev.for_code (id, code, name)
VALUES (146, '4302', 'Heritage, Archive And Museum Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (147, '4303', 'Historical Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (148, '4399', 'Other History, Heritage And Archaeology');
INSERT INTO dev.for_code (id, code, name)
VALUES (149, '4401', 'Anthropology');
INSERT INTO dev.for_code (id, code, name)
VALUES (150, '4402', 'Criminology');
INSERT INTO dev.for_code (id, code, name)
VALUES (151, '4403', 'Demography');
INSERT INTO dev.for_code (id, code, name)
VALUES (152, '4404', 'Development Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (153, '4405', 'Gender Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (154, '4406', 'Human Geography');
INSERT INTO dev.for_code (id, code, name)
VALUES (155, '4407', 'Policy And Administration');
INSERT INTO dev.for_code (id, code, name)
VALUES (156, '4408', 'Political Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (157, '4409', 'Social Work');
INSERT INTO dev.for_code (id, code, name)
VALUES (158, '4410', 'Sociology');
INSERT INTO dev.for_code (id, code, name)
VALUES (159, '4499', 'Other Human Society');
INSERT INTO dev.for_code (id, code, name)
VALUES (160, '4501', 'Aboriginal And Torres Strait Islander Culture, Language And History');
INSERT INTO dev.for_code (id, code, name)
VALUES (161, '4502', 'Aboriginal And Torres Strait Islander Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (162, '4503', 'Aboriginal And Torres Strait Islander Environmental Knowledges And Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (163, '4504', 'Aboriginal And Torres Strait Islander Health And Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (164, '4505', 'Aboriginal And Torres Strait Islander Peoples, Society And Community');
INSERT INTO dev.for_code (id, code, name)
VALUES (165, '4506', 'Aboriginal And Torres Strait Islander Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (166, '4507', 'Te Ahurea, Reo Me Te Hītori O Te Māori (Māori Culture, Language And History)');
INSERT INTO dev.for_code (id, code, name)
VALUES (167, '4508', 'Mātauranga Māori (Māori Education)');
INSERT INTO dev.for_code (id, code, name)
VALUES (168, '4509', 'Ngā Mātauranga Taiao O Te Māori (Māori Environmental Knowledges)');
INSERT INTO dev.for_code (id, code, name)
VALUES (169, '4510', 'Te Hauora Me Te Oranga O Te Māori (Māori Health And Wellbeing)');
INSERT INTO dev.for_code (id, code, name)
VALUES (170, '4511', 'Ngā Tāngata, Te Porihanga Me Ngā Hapori O Te Māori (Māori Peoples, Society And Community)');
INSERT INTO dev.for_code (id, code, name)
VALUES (171, '4512', 'Ngā Pūtaiao Māori (Māori Sciences)');
INSERT INTO dev.for_code (id, code, name)
VALUES (172, '4513', 'Pacific Peoples Culture, Language And History');
INSERT INTO dev.for_code (id, code, name)
VALUES (173, '4514', 'Pacific Peoples Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (174, '4515', 'Pacific Peoples Environmental Knowledges');
INSERT INTO dev.for_code (id, code, name)
VALUES (175, '4516', 'Pacific Peoples Health And Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (176, '4517', 'Pacific Peoples Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (177, '4517', 'Pacific Peoples Society And Community');
INSERT INTO dev.for_code (id, code, name)
VALUES (178, '4518', 'Pacific Peoples Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (179, '4518', 'Pacific Peoples Society And Community');
INSERT INTO dev.for_code (id, code, name)
VALUES (180, '4519', 'Other Indigenous Data, Methodologies And Global Indigenous Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (181, '4599', 'Other Indigenous Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (182, '4601', 'Applied Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (183, '4602', 'Artificial Intelligence');
INSERT INTO dev.for_code (id, code, name)
VALUES (184, '4603', 'Computer Vision And Multimedia Computation');
INSERT INTO dev.for_code (id, code, name)
VALUES (185, '4604', 'Cybersecurity And Privacy');
INSERT INTO dev.for_code (id, code, name)
VALUES (186, '4605', 'Data Management And Data Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (187, '4606', 'Distributed Computing And Systems Software');
INSERT INTO dev.for_code (id, code, name)
VALUES (188, '4607', 'Graphics, Augmented Reality And Games');
INSERT INTO dev.for_code (id, code, name)
VALUES (189, '4608', 'Human-Centred Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (190, '4609', 'Information Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (191, '4610', 'Library And Information Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (192, '4610', 'Library And Information Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (193, '4611', 'Machine Learning');
INSERT INTO dev.for_code (id, code, name)
VALUES (194, '4612', 'Software Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (195, '4613', 'Theory Of Computation');
INSERT INTO dev.for_code (id, code, name)
VALUES (196, '4699', 'Other Information And Computing Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (197, '4701', 'Communication And Media Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (198, '4702', 'Cultural Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (199, '4703', 'Language Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (200, '4704', 'Linguistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (201, '4705', 'Literary Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (202, '4799', 'Other Language, Communication And Culture');
INSERT INTO dev.for_code (id, code, name)
VALUES (203, '4801', 'Commercial Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (204, '4802', 'Environmental And Resources Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (205, '4803', 'International And Comparative Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (206, '4804', 'Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (207, '4804', 'Law In Context');
INSERT INTO dev.for_code (id, code, name)
VALUES (208, '4805', 'Legal Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (209, '4806', 'Private Law And Civil Obligations');
INSERT INTO dev.for_code (id, code, name)
VALUES (210, '4807', 'Public Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (211, '4899', 'Other Law And Legal Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (212, '4901', 'Applied Mathematics');
INSERT INTO dev.for_code (id, code, name)
VALUES (213, '4902', 'Mathematical Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (214, '4903', 'Numerical And Computational Mathematics');
INSERT INTO dev.for_code (id, code, name)
VALUES (215, '4904', 'Pure Mathematics');
INSERT INTO dev.for_code (id, code, name)
VALUES (216, '4905', 'Statistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (217, '4999', 'Other Mathematical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (218, '5001', 'Applied Ethics');
INSERT INTO dev.for_code (id, code, name)
VALUES (219, '5002', 'History And Philosophy Of Specific Fields');
INSERT INTO dev.for_code (id, code, name)
VALUES (220, '5003', 'Philosophy');
INSERT INTO dev.for_code (id, code, name)
VALUES (221, '5004', 'Religious Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (222, '5005', 'Theology');
INSERT INTO dev.for_code (id, code, name)
VALUES (223, '5099', 'Other Philosophy And Religious Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (224, '5101', 'Astronomical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (225, '5102', 'Atomic, Molecular And Optical Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (226, '5103', 'Classical Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (227, '5104', 'Condensed Matter Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (228, '5105', 'Medical And Biological Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (229, '5106', 'Nuclear And Plasma Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (230, '5107', 'Particle And High Energy Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (231, '5108', 'Quantum Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (232, '5109', 'Space Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (233, '5110', 'Synchrotrons And Accelerators');
INSERT INTO dev.for_code (id, code, name)
VALUES (234, '5199', 'Other Physical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (235, '5201', 'Applied And Developmental Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (236, '5202', 'Biological Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (237, '5203', 'Clinical And Health Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (238, '5204', 'Cognitive And Computational Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (239, '5205', 'Social And Personality Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (240, '5299', 'Other Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (241, '300101', 'Agricultural Biotechnology Diagnostics (Incl. Biosensors)');
INSERT INTO dev.for_code (id, code, name)
VALUES (242, '300102', 'Agricultural Marine Biotechnology');
INSERT INTO dev.for_code (id, code, name)
VALUES (243, '300103', 'Agricultural Molecular Engineering Of Nucleic Acids And Proteins');
INSERT INTO dev.for_code (id, code, name)
VALUES (244, '300104', 'Genetically Modified Animals');
INSERT INTO dev.for_code (id, code, name)
VALUES (245, '300105', 'Genetically Modified Field Crops And Pasture');
INSERT INTO dev.for_code (id, code, name)
VALUES (246, '300106', 'Genetically Modified Horticulture Plants');
INSERT INTO dev.for_code (id, code, name)
VALUES (247, '300107', 'Genetically Modified Trees');
INSERT INTO dev.for_code (id, code, name)
VALUES (248, '300108', 'Livestock Cloning');
INSERT INTO dev.for_code (id, code, name)
VALUES (249, '300109', 'Non-Genetically Modified Uses Of Biotechnology');
INSERT INTO dev.for_code (id, code, name)
VALUES (250, '300110', 'Transgenesis');
INSERT INTO dev.for_code (id, code, name)
VALUES (251, '300199', 'Agricultural Biotechnology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (252, '300201', 'Agricultural Hydrology');
INSERT INTO dev.for_code (id, code, name)
VALUES (253, '300202', 'Agricultural Land Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (254, '300203', 'Agricultural Land Planning');
INSERT INTO dev.for_code (id, code, name)
VALUES (255, '300204', 'Agricultural Management Of Nutrients');
INSERT INTO dev.for_code (id, code, name)
VALUES (256, '300205', 'Agricultural Production Systems Simulation');
INSERT INTO dev.for_code (id, code, name)
VALUES (257, '300206', 'Agricultural Spatial Analysis And Modelling');
INSERT INTO dev.for_code (id, code, name)
VALUES (258, '300207', 'Agricultural Systems Analysis And Modelling');
INSERT INTO dev.for_code (id, code, name)
VALUES (259, '300208', 'Farm Management, Rural Management And Agribusiness');
INSERT INTO dev.for_code (id, code, name)
VALUES (260, '300209', 'Germplasm Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (261, '300210', 'Sustainable Agricultural Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (262, '300299', 'Agriculture, Land And Farm Management Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (263, '300301', 'Animal Growth And Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (264, '300302', 'Animal Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (265, '300303', 'Animal Nutrition');
INSERT INTO dev.for_code (id, code, name)
VALUES (266, '300304', 'Animal Protection (Incl. Pests And Pathogens)');
INSERT INTO dev.for_code (id, code, name)
VALUES (267, '300305', 'Animal Reproduction And Breeding');
INSERT INTO dev.for_code (id, code, name)
VALUES (268, '300306', 'Animal Welfare');
INSERT INTO dev.for_code (id, code, name)
VALUES (269, '300307', 'Environmental Studies In Animal Production');
INSERT INTO dev.for_code (id, code, name)
VALUES (270, '300399', 'Animal Production Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (271, '300401', 'Agrochemicals And Biocides (Incl. Application)');
INSERT INTO dev.for_code (id, code, name)
VALUES (272, '300402', 'Agro-Ecosystem Function And Prediction');
INSERT INTO dev.for_code (id, code, name)
VALUES (273, '300403', 'Agronomy');
INSERT INTO dev.for_code (id, code, name)
VALUES (274, '300404', 'Crop And Pasture Biochemistry And Physiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (275, '300405', 'Crop And Pasture Biomass And Bioproducts');
INSERT INTO dev.for_code (id, code, name)
VALUES (276, '300406', 'Crop And Pasture Improvement (Incl. Selection And Breeding)');
INSERT INTO dev.for_code (id, code, name)
VALUES (277, '300407', 'Crop And Pasture Nutrition');
INSERT INTO dev.for_code (id, code, name)
VALUES (278, '300408', 'Crop And Pasture Post Harvest Technologies (Incl. Transportation And Storage)');
INSERT INTO dev.for_code (id, code, name)
VALUES (279, '300409', 'Crop And Pasture Protection (Incl. Pests, Diseases And Weeds)');
INSERT INTO dev.for_code (id, code, name)
VALUES (280, '300410', 'Crop And Pasture Waste Water Use');
INSERT INTO dev.for_code (id, code, name)
VALUES (281, '300411', 'Fertilisers (Incl. Application)');
INSERT INTO dev.for_code (id, code, name)
VALUES (282, '300412', 'Organic And Low Chemical Input Crop Production');
INSERT INTO dev.for_code (id, code, name)
VALUES (283, '300413', 'Pollination Biology And Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (284, '300499', 'Crop And Pasture Production Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (285, '300501', 'Aquaculture');
INSERT INTO dev.for_code (id, code, name)
VALUES (286, '300502', 'Aquaculture And Fisheries Stock Assessment');
INSERT INTO dev.for_code (id, code, name)
VALUES (287, '300503', 'Fish Pests And Diseases');
INSERT INTO dev.for_code (id, code, name)
VALUES (288, '300504', 'Fish Physiology And Genetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (289, '300505', 'Fisheries Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (290, '300506', 'Post-Harvest Fisheries Technologies (Incl. Transportation)');
INSERT INTO dev.for_code (id, code, name)
VALUES (291, '300599', 'Fisheries Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (292, '300601', 'Beverage Chemistry And Beverage Sensory Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (293, '300602', 'Food Chemistry And Food Sensory Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (294, '300603', 'Food Nutritional Balance');
INSERT INTO dev.for_code (id, code, name)
VALUES (295, '300604', 'Food Packaging, Preservation And Processing');
INSERT INTO dev.for_code (id, code, name)
VALUES (296, '300605', 'Food Safety, Traceability, Certification And Authenticity');
INSERT INTO dev.for_code (id, code, name)
VALUES (297, '300606', 'Food Sustainability');
INSERT INTO dev.for_code (id, code, name)
VALUES (298, '300607', 'Food Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (299, '300699', 'Food Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (300, '300701', 'Agroforestry');
INSERT INTO dev.for_code (id, code, name)
VALUES (301, '300702', 'Forest Biodiversity');
INSERT INTO dev.for_code (id, code, name)
VALUES (302, '300703', 'Forest Ecosystems');
INSERT INTO dev.for_code (id, code, name)
VALUES (303, '300704', 'Forest Health And Pathology');
INSERT INTO dev.for_code (id, code, name)
VALUES (304, '300705', 'Forestry Biomass And Bioproducts');
INSERT INTO dev.for_code (id, code, name)
VALUES (305, '300706', 'Forestry Fire Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (306, '300707', 'Forestry Management And Environment');
INSERT INTO dev.for_code (id, code, name)
VALUES (307, '300708', 'Forestry Product Quality Assessment');
INSERT INTO dev.for_code (id, code, name)
VALUES (308, '300709', 'Tree Improvement (Incl. Selection And Breeding)');
INSERT INTO dev.for_code (id, code, name)
VALUES (309, '300710', 'Tree Nutrition And Physiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (310, '300711', 'Wood Fibre Processing');
INSERT INTO dev.for_code (id, code, name)
VALUES (311, '300712', 'Wood Processing');
INSERT INTO dev.for_code (id, code, name)
VALUES (312, '300799', 'Forestry Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (313, '300801', 'Field Organic And Low Chemical Input Horticulture');
INSERT INTO dev.for_code (id, code, name)
VALUES (314, '300802', 'Horticultural Crop Growth And Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (315, '300803', 'Horticultural Crop Improvement (Incl. Selection And Breeding)');
INSERT INTO dev.for_code (id, code, name)
VALUES (316, '300804', 'Horticultural Crop Protection (Incl. Pests, Diseases And Weeds)');
INSERT INTO dev.for_code (id, code, name)
VALUES (317, '300805', 'Oenology And Viticulture');
INSERT INTO dev.for_code (id, code, name)
VALUES (318, '300806', 'Post Harvest Horticultural Technologies (Incl. Transportation And Storage)');
INSERT INTO dev.for_code (id, code, name)
VALUES (319, '300899', 'Horticultural Production Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (320, '300901', 'Veterinary Anaesthesiology And Intensive Care');
INSERT INTO dev.for_code (id, code, name)
VALUES (321, '300902', 'Veterinary Anatomy And Physiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (322, '300903', 'Veterinary Bacteriology');
INSERT INTO dev.for_code (id, code, name)
VALUES (323, '300904', 'Veterinary Diagnosis And Diagnostics');
INSERT INTO dev.for_code (id, code, name)
VALUES (324, '300905', 'Veterinary Epidemiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (325, '300906', 'Veterinary Immunology');
INSERT INTO dev.for_code (id, code, name)
VALUES (326, '300907', 'Veterinary Medicine (Excl. Urology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (327, '300908', 'Veterinary Mycology');
INSERT INTO dev.for_code (id, code, name)
VALUES (328, '300909', 'Veterinary Parasitology');
INSERT INTO dev.for_code (id, code, name)
VALUES (329, '300910', 'Veterinary Pathology');
INSERT INTO dev.for_code (id, code, name)
VALUES (330, '300911', 'Veterinary Pharmacology');
INSERT INTO dev.for_code (id, code, name)
VALUES (331, '300912', 'Veterinary Surgery');
INSERT INTO dev.for_code (id, code, name)
VALUES (332, '300913', 'Veterinary Urology');
INSERT INTO dev.for_code (id, code, name)
VALUES (333, '300914', 'Veterinary Virology');
INSERT INTO dev.for_code (id, code, name)
VALUES (334, '300999', 'Veterinary Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (335, '309999', 'Other Agricultural, Veterinary And Food Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (336, '310101', 'Analytical Biochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (337, '310102', 'Cell Development, Proliferation And Death');
INSERT INTO dev.for_code (id, code, name)
VALUES (338, '310103', 'Cell Metabolism');
INSERT INTO dev.for_code (id, code, name)
VALUES (339, '310104', 'Cell Neurochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (340, '310105', 'Cellular Interactions (Incl. Adhesion, Matrix, Cell Wall)');
INSERT INTO dev.for_code (id, code, name)
VALUES (341, '310106', 'Enzymes');
INSERT INTO dev.for_code (id, code, name)
VALUES (342, '310107', 'Glycobiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (343, '310108', 'Protein Trafficking');
INSERT INTO dev.for_code (id, code, name)
VALUES (344, '310109', 'Proteomics And Intermolecular Interactions (Excl. Medical Proteomics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (345, '310110', 'Receptors And Membrane Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (346, '310111', 'Signal Transduction');
INSERT INTO dev.for_code (id, code, name)
VALUES (347, '310112', 'Structural Biology (Incl. Macromolecular Modelling)');
INSERT INTO dev.for_code (id, code, name)
VALUES (348, '310113', 'Synthetic Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (349, '310114', 'Systems Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (350, '310199', 'Biochemistry And Cell Biology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (351, '310201', 'Bioinformatic Methods Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (352, '310202', 'Biological Network Analysis');
INSERT INTO dev.for_code (id, code, name)
VALUES (353, '310203', 'Computational Ecology And Phylogenetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (354, '310204', 'Genomics And Transcriptomics');
INSERT INTO dev.for_code (id, code, name)
VALUES (355, '310205', 'Proteomics And Metabolomics');
INSERT INTO dev.for_code (id, code, name)
VALUES (356, '310206', 'Sequence Analysis');
INSERT INTO dev.for_code (id, code, name)
VALUES (357, '310207', 'Statistical And Quantitative Genetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (358, '310208', 'Translational And Applied Bioinformatics');
INSERT INTO dev.for_code (id, code, name)
VALUES (359, '310299', 'Bioinformatics And Computational Biology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (360, '310301', 'Behavioural Ecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (361, '310302', 'Community Ecology (Excl. Invasive Species Ecology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (362, '310303', 'Ecological Physiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (363, '310304', 'Freshwater Ecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (364, '310305', 'Marine And Estuarine Ecology (Incl. Marine Ichthyology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (365, '310306', 'Palaeoecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (366, '310307', 'Population Ecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (367, '310308', 'Terrestrial Ecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (368, '310399', 'Ecology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (369, '310401', 'Animal Systematics And Taxonomy');
INSERT INTO dev.for_code (id, code, name)
VALUES (370, '310402', 'Biogeography And Phylogeography');
INSERT INTO dev.for_code (id, code, name)
VALUES (371, '310403', 'Biological Adaptation');
INSERT INTO dev.for_code (id, code, name)
VALUES (372, '310404', 'Evolution Of Developmental Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (373, '310405', 'Evolutionary Ecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (374, '310406', 'Evolutionary Impacts Of Climate Change');
INSERT INTO dev.for_code (id, code, name)
VALUES (375, '310407', 'Host-Parasite Interactions');
INSERT INTO dev.for_code (id, code, name)
VALUES (376, '310408', 'Life Histories');
INSERT INTO dev.for_code (id, code, name)
VALUES (377, '310409', 'Microbial Taxonomy');
INSERT INTO dev.for_code (id, code, name)
VALUES (378, '310410', 'Phylogeny And Comparative Analysis');
INSERT INTO dev.for_code (id, code, name)
VALUES (379, '310411', 'Plant And Fungus Systematics And Taxonomy');
INSERT INTO dev.for_code (id, code, name)
VALUES (380, '310412', 'Speciation And Extinction');
INSERT INTO dev.for_code (id, code, name)
VALUES (381, '310499', 'Evolutionary Biology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (382, '310501', 'Anthropological Genetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (383, '310502', 'Cell And Nuclear Division');
INSERT INTO dev.for_code (id, code, name)
VALUES (384, '310503', 'Developmental Genetics (Incl. Sex Determination)');
INSERT INTO dev.for_code (id, code, name)
VALUES (385, '310504', 'Epigenetics (Incl. Genome Methylation And Epigenomics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (386, '310505', 'Gene Expression (Incl. Microarray And Other Genome-Wide Approaches)');
INSERT INTO dev.for_code (id, code, name)
VALUES (387, '310506', 'Gene Mapping');
INSERT INTO dev.for_code (id, code, name)
VALUES (388, '310507', 'Genetic Immunology');
INSERT INTO dev.for_code (id, code, name)
VALUES (389, '310508', 'Genome Structure And Regulation');
INSERT INTO dev.for_code (id, code, name)
VALUES (390, '310509', 'Genomics');
INSERT INTO dev.for_code (id, code, name)
VALUES (391, '310510', 'Molecular Evolution');
INSERT INTO dev.for_code (id, code, name)
VALUES (392, '310511', 'Neurogenetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (393, '310599', 'Genetics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (394, '310601', 'Biocatalysis And Enzyme Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (395, '310602', 'Bioprocessing, Bioproduction And Bioproducts');
INSERT INTO dev.for_code (id, code, name)
VALUES (396, '310603', 'Fermentation');
INSERT INTO dev.for_code (id, code, name)
VALUES (397, '310604', 'Industrial Biotechnology Diagnostics (Incl. Biosensors)');
INSERT INTO dev.for_code (id, code, name)
VALUES (398, '310605', 'Industrial Microbiology (Incl. Biofeedstocks)');
INSERT INTO dev.for_code (id, code, name)
VALUES (399, '310606', 'Industrial Molecular Engineering Of Nucleic Acids And Proteins');
INSERT INTO dev.for_code (id, code, name)
VALUES (400, '310607', 'Nanobiotechnology');
INSERT INTO dev.for_code (id, code, name)
VALUES (401, '310699', 'Industrial Biotechnology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (402, '310701', 'Bacteriology');
INSERT INTO dev.for_code (id, code, name)
VALUES (403, '310702', 'Infectious Agents');
INSERT INTO dev.for_code (id, code, name)
VALUES (404, '310703', 'Microbial Ecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (405, '310704', 'Microbial Genetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (406, '310705', 'Mycology');
INSERT INTO dev.for_code (id, code, name)
VALUES (407, '310706', 'Virology');
INSERT INTO dev.for_code (id, code, name)
VALUES (408, '310799', 'Microbiology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (409, '310801', 'Phycology (Incl. Marine Grasses)');
INSERT INTO dev.for_code (id, code, name)
VALUES (410, '310802', 'Plant Biochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (411, '310803', 'Plant Cell And Molecular Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (412, '310804', 'Plant Developmental And Reproductive Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (413, '310805', 'Plant Pathology');
INSERT INTO dev.for_code (id, code, name)
VALUES (414, '310806', 'Plant Physiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (415, '310899', 'Plant Biology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (416, '310901', 'Animal Behaviour');
INSERT INTO dev.for_code (id, code, name)
VALUES (417, '310902', 'Animal Cell And Molecular Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (418, '310903', 'Animal Developmental And Reproductive Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (419, '310904', 'Animal Diet And Nutrition');
INSERT INTO dev.for_code (id, code, name)
VALUES (420, '310905', 'Animal Immunology');
INSERT INTO dev.for_code (id, code, name)
VALUES (421, '310906', 'Animal Neurobiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (422, '310907', 'Animal Physiological Ecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (423, '310908', 'Animal Physiology - Biophysics');
INSERT INTO dev.for_code (id, code, name)
VALUES (424, '310909', 'Animal Physiology - Cell');
INSERT INTO dev.for_code (id, code, name)
VALUES (425, '310910', 'Animal Physiology - Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (426, '310911', 'Animal Structure And Function');
INSERT INTO dev.for_code (id, code, name)
VALUES (427, '310912', 'Comparative Physiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (428, '310913', 'Invertebrate Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (429, '310914', 'Vertebrate Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (430, '310999', 'Zoology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (431, '319901', 'Forensic Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (432, '319902', 'Global Change Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (433, '319999', 'Other Biological Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (434, '320101', 'Cardiology (Incl. Cardiovascular Diseases)');
INSERT INTO dev.for_code (id, code, name)
VALUES (435, '320102', 'Haematology');
INSERT INTO dev.for_code (id, code, name)
VALUES (436, '320103', 'Respiratory Diseases');
INSERT INTO dev.for_code (id, code, name)
VALUES (437, '320199', 'Cardiovascular Medicine And Haematology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (438, '320201', 'Anaesthesiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (439, '320202', 'Clinical Chemistry (Incl. Diagnostics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (440, '320203', 'Clinical Microbiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (441, '320204', 'Clinimetrics');
INSERT INTO dev.for_code (id, code, name)
VALUES (442, '320205', 'Dermatology');
INSERT INTO dev.for_code (id, code, name)
VALUES (443, '320206', 'Diagnostic Radiography');
INSERT INTO dev.for_code (id, code, name)
VALUES (444, '320207', 'Emergency Medicine');
INSERT INTO dev.for_code (id, code, name)
VALUES (445, '320208', 'Endocrinology');
INSERT INTO dev.for_code (id, code, name)
VALUES (446, '320209', 'Gastroenterology And Hepatology');
INSERT INTO dev.for_code (id, code, name)
VALUES (447, '320210', 'Geriatrics And Gerontology');
INSERT INTO dev.for_code (id, code, name)
VALUES (448, '320211', 'Infectious Diseases');
INSERT INTO dev.for_code (id, code, name)
VALUES (449, '320212', 'Intensive Care');
INSERT INTO dev.for_code (id, code, name)
VALUES (450, '320213', 'Medical Genetics (Excl. Cancer Genetics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (451, '320214', 'Nephrology And Urology');
INSERT INTO dev.for_code (id, code, name)
VALUES (452, '320215', 'Nuclear Medicine');
INSERT INTO dev.for_code (id, code, name)
VALUES (453, '320216', 'Orthopaedics');
INSERT INTO dev.for_code (id, code, name)
VALUES (454, '320217', 'Otorhinolaryngology');
INSERT INTO dev.for_code (id, code, name)
VALUES (455, '320218', 'Pain');
INSERT INTO dev.for_code (id, code, name)
VALUES (456, '320219', 'Paramedicine');
INSERT INTO dev.for_code (id, code, name)
VALUES (457, '320220', 'Pathology (Excl. Oral Pathology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (458, '320221', 'Psychiatry (Incl. Psychotherapy)');
INSERT INTO dev.for_code (id, code, name)
VALUES (459, '320222', 'Radiology And Organ Imaging');
INSERT INTO dev.for_code (id, code, name)
VALUES (460, '320223', 'Rheumatology And Arthritis');
INSERT INTO dev.for_code (id, code, name)
VALUES (461, '320224', 'Rural Clinical Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (462, '320225', 'Sports Medicine');
INSERT INTO dev.for_code (id, code, name)
VALUES (463, '320226', 'Surgery');
INSERT INTO dev.for_code (id, code, name)
VALUES (464, '320227', 'Venereology');
INSERT INTO dev.for_code (id, code, name)
VALUES (465, '320299', 'Clinical Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (466, '320301', 'Craniofacial Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (467, '320302', 'Dental Materials And Equipment');
INSERT INTO dev.for_code (id, code, name)
VALUES (468, '320303', 'Dental Therapeutics, Pharmacology And Toxicology ');
INSERT INTO dev.for_code (id, code, name)
VALUES (469, '320304', 'Endodontics');
INSERT INTO dev.for_code (id, code, name)
VALUES (470, '320305', 'Oral And Maxillofacial Surgery');
INSERT INTO dev.for_code (id, code, name)
VALUES (471, '320306', 'Oral Implantology');
INSERT INTO dev.for_code (id, code, name)
VALUES (472, '320307', 'Oral Medicine And Pathology');
INSERT INTO dev.for_code (id, code, name)
VALUES (473, '320308', 'Orthodontics And Dentofacial Orthopaedics');
INSERT INTO dev.for_code (id, code, name)
VALUES (474, '320309', 'Paedodontics');
INSERT INTO dev.for_code (id, code, name)
VALUES (475, '320310', 'Periodontics');
INSERT INTO dev.for_code (id, code, name)
VALUES (476, '320311', 'Prosthodontics');
INSERT INTO dev.for_code (id, code, name)
VALUES (477, '320312', 'Special Needs Dentistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (478, '320399', 'Dentistry Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (479, '320401', 'Allergy');
INSERT INTO dev.for_code (id, code, name)
VALUES (480, '320402', 'Applied Immunology (Incl. Antibody Engineering, Xenotransplantation And T-Cell Therapies)');
INSERT INTO dev.for_code (id, code, name)
VALUES (481, '320403', 'Autoimmunity');
INSERT INTO dev.for_code (id, code, name)
VALUES (482, '320404', 'Cellular Immunology');
INSERT INTO dev.for_code (id, code, name)
VALUES (483, '320405', 'Humoural Immunology And Immunochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (484, '320406', 'Immunogenetics (Incl. Genetic Immunology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (485, '320407', 'Innate Immunity');
INSERT INTO dev.for_code (id, code, name)
VALUES (486, '320408', 'Transplantation Immunology');
INSERT INTO dev.for_code (id, code, name)
VALUES (487, '320409', 'Tumour Immunology');
INSERT INTO dev.for_code (id, code, name)
VALUES (488, '320499', 'Immunology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (489, '320501', 'Medical Biochemistry - Amino Acids And Metabolites');
INSERT INTO dev.for_code (id, code, name)
VALUES (490, '320502', 'Medical Biochemistry - Carbohydrates');
INSERT INTO dev.for_code (id, code, name)
VALUES (491, '320503', 'Medical Biochemistry - Inorganic Elements And Compounds');
INSERT INTO dev.for_code (id, code, name)
VALUES (492, '320504', 'Medical Biochemistry - Lipids');
INSERT INTO dev.for_code (id, code, name)
VALUES (493, '320505', 'Medical Biochemistry - Nucleic Acids');
INSERT INTO dev.for_code (id, code, name)
VALUES (494, '320506', 'Medical Biochemistry - Proteins And Peptides (Incl. Medical Proteomics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (495, '320507', 'Metabolic Medicine');
INSERT INTO dev.for_code (id, code, name)
VALUES (496, '320599', 'Medical Biochemistry And Metabolomics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (497, '320601', 'Gene And Molecular Therapy');
INSERT INTO dev.for_code (id, code, name)
VALUES (498, '320602', 'Medical Biotechnology Diagnostics (Incl. Biosensors)');
INSERT INTO dev.for_code (id, code, name)
VALUES (499, '320603', 'Medical Molecular Engineering Of Nucleic Acids And Proteins');
INSERT INTO dev.for_code (id, code, name)
VALUES (500, '320604', 'Nanomedicine');
INSERT INTO dev.for_code (id, code, name)
VALUES (501, '320605', 'Nanotoxicology, Health And Safety');
INSERT INTO dev.for_code (id, code, name)
VALUES (502, '320606', 'Regenerative Medicine (Incl. Stem Cells)');
INSERT INTO dev.for_code (id, code, name)
VALUES (503, '320699', 'Medical Biotechnology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (504, '320701', 'Medical Bacteriology');
INSERT INTO dev.for_code (id, code, name)
VALUES (505, '320702', 'Medical Infection Agents (Incl. Prions)');
INSERT INTO dev.for_code (id, code, name)
VALUES (506, '320703', 'Medical Mycology');
INSERT INTO dev.for_code (id, code, name)
VALUES (507, '320704', 'Medical Parasitology');
INSERT INTO dev.for_code (id, code, name)
VALUES (508, '320705', 'Medical Virology');
INSERT INTO dev.for_code (id, code, name)
VALUES (509, '320799', 'Medical Microbiology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (510, '320801', 'Cell Physiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (511, '320802', 'Human Biophysics');
INSERT INTO dev.for_code (id, code, name)
VALUES (512, '320803', 'Systems Physiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (513, '320899', 'Medical Physiology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (514, '320901', 'Autonomic Nervous System');
INSERT INTO dev.for_code (id, code, name)
VALUES (515, '320902', 'Cellular Nervous System');
INSERT INTO dev.for_code (id, code, name)
VALUES (516, '320903', 'Central Nervous System');
INSERT INTO dev.for_code (id, code, name)
VALUES (517, '320904', 'Computational Neuroscience (Incl. Mathematical Neuroscience And Theoretical Neuroscience)');
INSERT INTO dev.for_code (id, code, name)
VALUES (518, '320905', 'Neurology And Neuromuscular Diseases');
INSERT INTO dev.for_code (id, code, name)
VALUES (519, '320906', 'Peripheral Nervous System');
INSERT INTO dev.for_code (id, code, name)
VALUES (520, '320907', 'Sensory Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (521, '320999', 'Neurosciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (522, '321001', 'Clinical Nutrition');
INSERT INTO dev.for_code (id, code, name)
VALUES (523, '321002', 'Food Properties (Incl. Characteristics And Health Benefits)');
INSERT INTO dev.for_code (id, code, name)
VALUES (524, '321003', 'Nutrigenomics And Personalised Nutrition');
INSERT INTO dev.for_code (id, code, name)
VALUES (525, '321004', 'Nutritional Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (526, '321005', 'Public Health Nutrition');
INSERT INTO dev.for_code (id, code, name)
VALUES (527, '321006', 'Sport And Exercise Nutrition');
INSERT INTO dev.for_code (id, code, name)
VALUES (528, '321099', 'Nutrition And Dietetics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (529, '321101', 'Cancer Cell Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (530, '321102', 'Cancer Diagnosis');
INSERT INTO dev.for_code (id, code, name)
VALUES (531, '321103', 'Cancer Genetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (532, '321104', 'Cancer Therapy (Excl. Chemotherapy And Radiation Therapy)');
INSERT INTO dev.for_code (id, code, name)
VALUES (533, '321105', 'Chemotherapy');
INSERT INTO dev.for_code (id, code, name)
VALUES (534, '321106', 'Haematological Tumours');
INSERT INTO dev.for_code (id, code, name)
VALUES (535, '321107', 'Liquid Biopsies');
INSERT INTO dev.for_code (id, code, name)
VALUES (536, '321108', 'Molecular Targets');
INSERT INTO dev.for_code (id, code, name)
VALUES (537, '321109', 'Predictive And Prognostic Markers');
INSERT INTO dev.for_code (id, code, name)
VALUES (538, '321110', 'Radiation Therapy');
INSERT INTO dev.for_code (id, code, name)
VALUES (539, '321111', 'Solid Tumours');
INSERT INTO dev.for_code (id, code, name)
VALUES (540, '321199', 'Oncology And Carcinogenesis Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (541, '321201', 'Ophthalmology');
INSERT INTO dev.for_code (id, code, name)
VALUES (542, '321202', 'Optical Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (543, '321203', 'Optometry');
INSERT INTO dev.for_code (id, code, name)
VALUES (544, '321204', 'Vision Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (545, '321299', 'Ophthalmology And Optometry Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (546, '321301', 'Adolescent Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (547, '321302', 'Infant And Child Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (548, '321303', 'Neonatology');
INSERT INTO dev.for_code (id, code, name)
VALUES (549, '321399', 'Paediatrics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (550, '321401', 'Basic Pharmacology');
INSERT INTO dev.for_code (id, code, name)
VALUES (551, '321402', 'Clinical Pharmacology And Therapeutics');
INSERT INTO dev.for_code (id, code, name)
VALUES (552, '321403', 'Clinical Pharmacy And Pharmacy Practice');
INSERT INTO dev.for_code (id, code, name)
VALUES (553, '321404', 'Pharmaceutical Delivery Technologies');
INSERT INTO dev.for_code (id, code, name)
VALUES (554, '321405', 'Pharmaceutical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (555, '321406', 'Pharmacogenomics');
INSERT INTO dev.for_code (id, code, name)
VALUES (556, '321407', 'Toxicology (Incl. Clinical Toxicology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (557, '321499', 'Pharmacology And Pharmaceutical Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (558, '321501', 'Foetal Development And Medicine');
INSERT INTO dev.for_code (id, code, name)
VALUES (559, '321502', 'Obstetrics And Gynaecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (560, '321503', 'Reproduction');
INSERT INTO dev.for_code (id, code, name)
VALUES (561, '321599', 'Reproductive Medicine Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (562, '329999', 'Other Biomedical And Clinical Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (563, '330101', 'Architectural Computing And Visualisation Methods');
INSERT INTO dev.for_code (id, code, name)
VALUES (564, '330102', 'Architectural Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (565, '330103', 'Architectural Heritage And Conservation');
INSERT INTO dev.for_code (id, code, name)
VALUES (566, '330104', 'Architectural History, Theory And Criticism');
INSERT INTO dev.for_code (id, code, name)
VALUES (567, '330105', 'Architectural Science And Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (568, '330106', 'Architecture For Disaster Relief');
INSERT INTO dev.for_code (id, code, name)
VALUES (569, '330107', 'Architecture Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (570, '330108', 'Interior Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (571, '330109', 'Landscape Architecture');
INSERT INTO dev.for_code (id, code, name)
VALUES (572, '330110', 'Sustainable Architecture');
INSERT INTO dev.for_code (id, code, name)
VALUES (573, '330199', 'Architecture Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (574, '330201', 'Automation And Technology In Building And Construction');
INSERT INTO dev.for_code (id, code, name)
VALUES (575, '330202', 'Building Construction Management And Project Planning');
INSERT INTO dev.for_code (id, code, name)
VALUES (576, '330203', 'Building Industry Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (577, '330204', 'Building Information Modelling And Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (578, '330205', 'Building Organisational Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (579, '330206', 'Building Science, Technologies And Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (580, '330207', 'Quantity Surveying');
INSERT INTO dev.for_code (id, code, name)
VALUES (581, '330299', 'Building Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (582, '330301', 'Data Visualisation And Computational (Incl. Parametric And Generative) Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (583, '330302', 'Design Anthropology');
INSERT INTO dev.for_code (id, code, name)
VALUES (584, '330303', 'Design For Disaster Relief');
INSERT INTO dev.for_code (id, code, name)
VALUES (585, '330304', 'Design History, Theory And Criticism');
INSERT INTO dev.for_code (id, code, name)
VALUES (586, '330305', 'Design Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (587, '330306', 'Design Practice And Methods');
INSERT INTO dev.for_code (id, code, name)
VALUES (588, '330307', 'Ergonomics Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (589, '330308', 'Fire Safety Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (590, '330309', 'Industrial And Product Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (591, '330310', 'Interaction And Experience Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (592, '330311', 'Models And Simulations Of Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (593, '330312', 'Service Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (594, '330313', 'Social Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (595, '330314', 'Sustainable Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (596, '330315', 'Textile And Fashion Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (597, '330316', 'Visual Communication Design (Incl. Graphic Design)');
INSERT INTO dev.for_code (id, code, name)
VALUES (598, '330399', 'Design Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (599, '330401', 'Community Planning');
INSERT INTO dev.for_code (id, code, name)
VALUES (600, '330402', 'History And Theory Of The Built Environment (Excl. Architecture)');
INSERT INTO dev.for_code (id, code, name)
VALUES (601, '330403', 'Housing Markets, Development And Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (602, '330404', 'Land Use And Environmental Planning');
INSERT INTO dev.for_code (id, code, name)
VALUES (603, '330405', 'Public Participation And Community Engagement');
INSERT INTO dev.for_code (id, code, name)
VALUES (604, '330406', 'Regional Analysis And Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (605, '330407', 'Regulatory Planning And Development Assessment');
INSERT INTO dev.for_code (id, code, name)
VALUES (606, '330408', 'Strategic, Metropolitan And Regional Planning');
INSERT INTO dev.for_code (id, code, name)
VALUES (607, '330409', 'Transport Planning');
INSERT INTO dev.for_code (id, code, name)
VALUES (608, '330410', 'Urban Analysis And Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (609, '330411', 'Urban Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (610, '330412', 'Urban Informatics');
INSERT INTO dev.for_code (id, code, name)
VALUES (611, '330413', 'Urban Planning And Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (612, '330499', 'Urban And Regional Planning Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (613, '339999', 'Other Built Environment And Design Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (614, '340101', 'Analytical Spectrometry');
INSERT INTO dev.for_code (id, code, name)
VALUES (615, '340102', 'Bioassays');
INSERT INTO dev.for_code (id, code, name)
VALUES (616, '340103', 'Electroanalytical Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (617, '340104', 'Flow Analysis');
INSERT INTO dev.for_code (id, code, name)
VALUES (618, '340105', 'Instrumental Methods (Excl. Immunological And Bioassay Methods)');
INSERT INTO dev.for_code (id, code, name)
VALUES (619, '340106', 'Metabolomic Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (620, '340107', 'Quality Assurance, Chemometrics, Traceability And Metrological Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (621, '340108', 'Sensor Technology (Incl. Chemical Aspects)');
INSERT INTO dev.for_code (id, code, name)
VALUES (622, '340109', 'Separation Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (623, '340199', 'Analytical Chemistry Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (624, '340201', 'Bioinorganic Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (625, '340202', 'Crystallography');
INSERT INTO dev.for_code (id, code, name)
VALUES (626, '340203', 'F-Block Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (627, '340204', 'Inorganic Green Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (628, '340205', 'Main Group Metal Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (629, '340206', 'Metal Cluster Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (630, '340207', 'Metal Organic Frameworks');
INSERT INTO dev.for_code (id, code, name)
VALUES (631, '340208', 'Non-Metal Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (632, '340209', 'Organometallic Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (633, '340210', 'Solid State Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (634, '340211', 'Transition Metal Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (635, '340299', 'Inorganic Chemistry Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (636, '340301', 'Inorganic Materials (Incl. Nanomaterials)');
INSERT INTO dev.for_code (id, code, name)
VALUES (637, '340302', 'Macromolecular Materials');
INSERT INTO dev.for_code (id, code, name)
VALUES (638, '340303', 'Nanochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (639, '340304', 'Optical Properties Of Materials');
INSERT INTO dev.for_code (id, code, name)
VALUES (640, '340305', 'Physical Properties Of Materials');
INSERT INTO dev.for_code (id, code, name)
VALUES (641, '340306', 'Polymerisation Mechanisms');
INSERT INTO dev.for_code (id, code, name)
VALUES (642, '340307', 'Structure And Dynamics Of Materials');
INSERT INTO dev.for_code (id, code, name)
VALUES (643, '340308', 'Supramolecular Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (644, '340309', 'Theory And Design Of Materials');
INSERT INTO dev.for_code (id, code, name)
VALUES (645, '340399', 'Macromolecular And Materials Chemistry Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (646, '340401', 'Biologically Active Molecules');
INSERT INTO dev.for_code (id, code, name)
VALUES (647, '340402', 'Biomolecular Modelling And Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (648, '340403', 'Characterisation Of Biological Macromolecules');
INSERT INTO dev.for_code (id, code, name)
VALUES (649, '340404', 'Cheminformatics And Quantitative Structure-Activity Relationships');
INSERT INTO dev.for_code (id, code, name)
VALUES (650, '340405', 'Glycoconjugates');
INSERT INTO dev.for_code (id, code, name)
VALUES (651, '340406', 'Molecular Medicine');
INSERT INTO dev.for_code (id, code, name)
VALUES (652, '340407', 'Proteins And Peptides');
INSERT INTO dev.for_code (id, code, name)
VALUES (653, '340499', 'Medicinal And Biomolecular Chemistry Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (654, '340501', 'Free Radical Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (655, '340502', 'Natural Products And Bioactive Compounds');
INSERT INTO dev.for_code (id, code, name)
VALUES (656, '340503', 'Organic Chemical Synthesis');
INSERT INTO dev.for_code (id, code, name)
VALUES (657, '340504', 'Organic Green Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (658, '340505', 'Physical Organic Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (659, '340599', 'Organic Chemistry Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (660, '340601', 'Catalysis And Mechanisms Of Reactions');
INSERT INTO dev.for_code (id, code, name)
VALUES (661, '340602', 'Chemical Thermodynamics And Energetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (662, '340603', 'Colloid And Surface Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (663, '340604', 'Electrochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (664, '340605', 'Molecular Imaging (Incl. Electron Microscopy And Neutron Diffraction)');
INSERT INTO dev.for_code (id, code, name)
VALUES (665, '340606', 'Photochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (666, '340607', 'Reaction Kinetics And Dynamics');
INSERT INTO dev.for_code (id, code, name)
VALUES (667, '340608', 'Solution Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (668, '340609', 'Transport Properties And Non-Equilibrium Processes');
INSERT INTO dev.for_code (id, code, name)
VALUES (669, '340699', 'Physical Chemistry Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (670, '340701', 'Computational Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (671, '340702', 'Radiation And Matter');
INSERT INTO dev.for_code (id, code, name)
VALUES (672, '340703', 'Statistical Mechanics In Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (673, '340704', 'Theoretical Quantum Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (674, '340799', 'Theoretical And Computational Chemistry Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (675, '349901', 'Forensic Chemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (676, '349999', 'Other Chemical Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (677, '350101', 'Accounting Theory And Standards');
INSERT INTO dev.for_code (id, code, name)
VALUES (678, '350102', 'Auditing And Accountability');
INSERT INTO dev.for_code (id, code, name)
VALUES (679, '350103', 'Financial Accounting');
INSERT INTO dev.for_code (id, code, name)
VALUES (680, '350104', 'International Accounting');
INSERT INTO dev.for_code (id, code, name)
VALUES (681, '350105', 'Management Accounting');
INSERT INTO dev.for_code (id, code, name)
VALUES (682, '350106', 'Not-For-Profit Accounting And Accountability');
INSERT INTO dev.for_code (id, code, name)
VALUES (683, '350107', 'Sustainability Accounting And Reporting');
INSERT INTO dev.for_code (id, code, name)
VALUES (684, '350108', 'Taxation Accounting');
INSERT INTO dev.for_code (id, code, name)
VALUES (685, '350199', 'Accounting, Auditing And Accountability Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (686, '350201', 'Environment And Climate Finance');
INSERT INTO dev.for_code (id, code, name)
VALUES (687, '350202', 'Finance');
INSERT INTO dev.for_code (id, code, name)
VALUES (688, '350203', 'Financial Econometrics');
INSERT INTO dev.for_code (id, code, name)
VALUES (689, '350204', 'Financial Institutions (Incl. Banking)');
INSERT INTO dev.for_code (id, code, name)
VALUES (690, '350205', 'Household Finance And Financial Literacy');
INSERT INTO dev.for_code (id, code, name)
VALUES (691, '350206', 'Insurance Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (692, '350207', 'International Finance');
INSERT INTO dev.for_code (id, code, name)
VALUES (693, '350208', 'Investment And Risk Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (694, '350209', 'Not-For-Profit Finance And Risk');
INSERT INTO dev.for_code (id, code, name)
VALUES (695, '350299', 'Banking, Finance And Investment Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (696, '350301', 'Business Analytics');
INSERT INTO dev.for_code (id, code, name)
VALUES (697, '350302', 'Business Information Management (Incl. Records, Knowledge And Intelligence)');
INSERT INTO dev.for_code (id, code, name)
VALUES (698, '350303', 'Business Information Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (699, '350304', 'Business Systems In Context');
INSERT INTO dev.for_code (id, code, name)
VALUES (700, '350305', 'Forensic Intelligence');
INSERT INTO dev.for_code (id, code, name)
VALUES (701, '350306', 'Forensic Science And Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (702, '350307', 'Technology Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (703, '350399', 'Business Systems In Context Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (704, '350401', 'Food And Hospitality Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (705, '350402', 'Hospitality Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (706, '350403', 'Real Estate And Valuation Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (707, '350404', 'Retail');
INSERT INTO dev.for_code (id, code, name)
VALUES (708, '350405', 'Sport And Leisure Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (709, '350499', 'Commercial Services Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (710, '350501', 'Business And Labour History');
INSERT INTO dev.for_code (id, code, name)
VALUES (711, '350502', 'Employment Equity And Diversity');
INSERT INTO dev.for_code (id, code, name)
VALUES (712, '350503', 'Human Resources Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (713, '350504', 'Industrial And Employee Relations');
INSERT INTO dev.for_code (id, code, name)
VALUES (714, '350505', 'Occupational And Workplace Health And Safety');
INSERT INTO dev.for_code (id, code, name)
VALUES (715, '350506', 'Workforce Planning');
INSERT INTO dev.for_code (id, code, name)
VALUES (716, '350507', 'Workplace Wellbeing And Quality Of Working Life');
INSERT INTO dev.for_code (id, code, name)
VALUES (717, '350599', 'Human Resources And Industrial Relations Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (718, '350601', 'Consumer Behaviour');
INSERT INTO dev.for_code (id, code, name)
VALUES (719, '350602', 'Consumer-Oriented Product Or Service Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (720, '350603', 'Industrial Marketing');
INSERT INTO dev.for_code (id, code, name)
VALUES (721, '350604', 'Marketing Communications');
INSERT INTO dev.for_code (id, code, name)
VALUES (722, '350605', 'Marketing Management (Incl. Strategy And Customer Relations)');
INSERT INTO dev.for_code (id, code, name)
VALUES (723, '350606', 'Marketing Research Methodology');
INSERT INTO dev.for_code (id, code, name)
VALUES (724, '350607', 'Marketing Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (725, '350608', 'Marketing Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (726, '350609', 'Not-For-Profit Marketing');
INSERT INTO dev.for_code (id, code, name)
VALUES (727, '350610', 'Pricing (Incl. Consumer Value Estimation)');
INSERT INTO dev.for_code (id, code, name)
VALUES (728, '350611', 'Service Marketing');
INSERT INTO dev.for_code (id, code, name)
VALUES (729, '350612', 'Social Marketing');
INSERT INTO dev.for_code (id, code, name)
VALUES (730, '350699', 'Marketing Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (731, '350701', 'Corporate Governance');
INSERT INTO dev.for_code (id, code, name)
VALUES (732, '350702', 'Corporate Social Responsibility');
INSERT INTO dev.for_code (id, code, name)
VALUES (733, '350703', 'Disaster And Emergency Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (734, '350704', 'Entrepreneurship');
INSERT INTO dev.for_code (id, code, name)
VALUES (735, '350705', 'Innovation Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (736, '350706', 'International Business');
INSERT INTO dev.for_code (id, code, name)
VALUES (737, '350707', 'Leadership');
INSERT INTO dev.for_code (id, code, name)
VALUES (738, '350708', 'Not-For-Profit Business And Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (739, '350709', 'Organisation And Management Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (740, '350710', 'Organisational Behaviour');
INSERT INTO dev.for_code (id, code, name)
VALUES (741, '350711', 'Organisational Planning And Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (742, '350712', 'Production And Operations Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (743, '350713', 'Project Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (744, '350714', 'Public Sector Organisation And Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (745, '350715', 'Quality Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (746, '350716', 'Small Business Organisation And Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (747, '350717', 'Stakeholder Engagement');
INSERT INTO dev.for_code (id, code, name)
VALUES (748, '350718', 'Strategy');
INSERT INTO dev.for_code (id, code, name)
VALUES (749, '350799', 'Strategy, Management And Organisational Behaviour Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (750, '350801', 'Impacts Of Tourism');
INSERT INTO dev.for_code (id, code, name)
VALUES (751, '350802', 'Tourism Forecasting');
INSERT INTO dev.for_code (id, code, name)
VALUES (752, '350803', 'Tourism Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (753, '350804', 'Tourism Marketing');
INSERT INTO dev.for_code (id, code, name)
VALUES (754, '350805', 'Tourism Resource Appraisal');
INSERT INTO dev.for_code (id, code, name)
VALUES (755, '350806', 'Tourist Behaviour And Visitor Experience');
INSERT INTO dev.for_code (id, code, name)
VALUES (756, '350899', 'Tourism Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (757, '350901', 'Air Transportation And Freight Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (758, '350902', 'Intelligent Mobility');
INSERT INTO dev.for_code (id, code, name)
VALUES (759, '350903', 'Logistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (760, '350904', 'Maritime Transportation And Freight Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (761, '350905', 'Passenger Needs');
INSERT INTO dev.for_code (id, code, name)
VALUES (762, '350906', 'Public Transport');
INSERT INTO dev.for_code (id, code, name)
VALUES (763, '350907', 'Rail Transportation And Freight Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (764, '350908', 'Road Transportation And Freight Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (765, '350909', 'Supply Chains');
INSERT INTO dev.for_code (id, code, name)
VALUES (766, '350999', 'Transportation, Logistics And Supply Chains Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (767, '359999', 'Other Commerce, Management, Tourism And Services Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (768, '360101', 'Art Criticism');
INSERT INTO dev.for_code (id, code, name)
VALUES (769, '360102', 'Art History');
INSERT INTO dev.for_code (id, code, name)
VALUES (770, '360103', 'Art Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (771, '360104', 'Visual Cultures');
INSERT INTO dev.for_code (id, code, name)
VALUES (772, '360199', 'Art History, Theory And Criticism Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (773, '360201', 'Creative Writing (Incl. Scriptwriting)');
INSERT INTO dev.for_code (id, code, name)
VALUES (774, '360202', 'Digital Writing');
INSERT INTO dev.for_code (id, code, name)
VALUES (775, '360203', 'Professional Writing And Journalism Practice');
INSERT INTO dev.for_code (id, code, name)
VALUES (776, '360204', 'Site-Based Writing');
INSERT INTO dev.for_code (id, code, name)
VALUES (777, '360205', 'Technical Writing');
INSERT INTO dev.for_code (id, code, name)
VALUES (778, '360299', 'Creative And Professional Writing Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (779, '360301', 'Music Cognition');
INSERT INTO dev.for_code (id, code, name)
VALUES (780, '360302', 'Music Composition And Improvisation');
INSERT INTO dev.for_code (id, code, name)
VALUES (781, '360303', 'Music Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (782, '360304', 'Music Performance');
INSERT INTO dev.for_code (id, code, name)
VALUES (783, '360305', 'Music Technology And Recording');
INSERT INTO dev.for_code (id, code, name)
VALUES (784, '360306', 'Musicology And Ethnomusicology');
INSERT INTO dev.for_code (id, code, name)
VALUES (785, '360399', 'Music Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (786, '360401', 'Applied Theatre');
INSERT INTO dev.for_code (id, code, name)
VALUES (787, '360402', 'Dance And Dance Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (788, '360403', 'Drama, Theatre And Performance Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (789, '360499', 'Performing Arts Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (790, '360501', 'Cinema Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (791, '360502', 'Computer Gaming And Animation');
INSERT INTO dev.for_code (id, code, name)
VALUES (792, '360503', 'Digital And Electronic Media Art');
INSERT INTO dev.for_code (id, code, name)
VALUES (793, '360504', 'Interactive Media');
INSERT INTO dev.for_code (id, code, name)
VALUES (794, '360505', 'Screen Media');
INSERT INTO dev.for_code (id, code, name)
VALUES (795, '360506', 'Visual Effects');
INSERT INTO dev.for_code (id, code, name)
VALUES (796, '360599', 'Screen And Digital Media Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (797, '360601', 'Crafts');
INSERT INTO dev.for_code (id, code, name)
VALUES (798, '360602', 'Fine Arts');
INSERT INTO dev.for_code (id, code, name)
VALUES (799, '360603', 'Performance Art');
INSERT INTO dev.for_code (id, code, name)
VALUES (800, '360604', 'Photography, Video And Lens-Based Practice');
INSERT INTO dev.for_code (id, code, name)
VALUES (801, '360699', 'Visual Arts Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (802, '369999', 'Other Creative Arts And Writing Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (803, '370101', 'Adverse Weather Events');
INSERT INTO dev.for_code (id, code, name)
VALUES (804, '370102', 'Air Pollution Processes And Air Quality Measurement');
INSERT INTO dev.for_code (id, code, name)
VALUES (805, '370103', 'Atmospheric Aerosols');
INSERT INTO dev.for_code (id, code, name)
VALUES (806, '370104', 'Atmospheric Composition, Chemistry And Processes');
INSERT INTO dev.for_code (id, code, name)
VALUES (807, '370105', 'Atmospheric Dynamics');
INSERT INTO dev.for_code (id, code, name)
VALUES (808, '370106', 'Atmospheric Radiation');
INSERT INTO dev.for_code (id, code, name)
VALUES (809, '370107', 'Cloud Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (810, '370108', 'Meteorology');
INSERT INTO dev.for_code (id, code, name)
VALUES (811, '370109', 'Tropospheric And Stratospheric Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (812, '370199', 'Atmospheric Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (813, '370201', 'Climate Change Processes');
INSERT INTO dev.for_code (id, code, name)
VALUES (814, '370202', 'Climatology');
INSERT INTO dev.for_code (id, code, name)
VALUES (815, '370203', 'Greenhouse Gas Inventories And Fluxes');
INSERT INTO dev.for_code (id, code, name)
VALUES (816, '370299', 'Climate Change Science Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (817, '370301', 'Exploration Geochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (818, '370302', 'Inorganic Geochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (819, '370303', 'Isotope Geochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (820, '370304', 'Organic Geochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (821, '370399', 'Geochemistry Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (822, '370401', 'Computational Modelling And Simulation In Earth Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (823, '370402', 'Earth And Space Science Informatics');
INSERT INTO dev.for_code (id, code, name)
VALUES (824, '370403', 'Geoscience Data Visualisation');
INSERT INTO dev.for_code (id, code, name)
VALUES (825, '370499', 'Geoinformatics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (826, '370501', 'Biomineralisation');
INSERT INTO dev.for_code (id, code, name)
VALUES (827, '370502', 'Geochronology');
INSERT INTO dev.for_code (id, code, name)
VALUES (828, '370503', 'Igneous And Metamorphic Petrology');
INSERT INTO dev.for_code (id, code, name)
VALUES (829, '370504', 'Marine Geoscience');
INSERT INTO dev.for_code (id, code, name)
VALUES (830, '370505', 'Mineralogy And Crystallography');
INSERT INTO dev.for_code (id, code, name)
VALUES (831, '370506', 'Palaeontology (Incl. Palynology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (832, '370507', 'Planetary Geology');
INSERT INTO dev.for_code (id, code, name)
VALUES (833, '370508', 'Resource Geoscience');
INSERT INTO dev.for_code (id, code, name)
VALUES (834, '370509', 'Sedimentology');
INSERT INTO dev.for_code (id, code, name)
VALUES (835, '370510', 'Stratigraphy (Incl. Biostratigraphy, Sequence Stratigraphy And Basin Analysis)');
INSERT INTO dev.for_code (id, code, name)
VALUES (836, '370511', 'Structural Geology And Tectonics');
INSERT INTO dev.for_code (id, code, name)
VALUES (837, '370512', 'Volcanology');
INSERT INTO dev.for_code (id, code, name)
VALUES (838, '370599', 'Geology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (839, '370601', 'Applied Geophysics');
INSERT INTO dev.for_code (id, code, name)
VALUES (840, '370602', 'Electrical And Electromagnetic Methods In Geophysics');
INSERT INTO dev.for_code (id, code, name)
VALUES (841, '370603', 'Geodesy');
INSERT INTO dev.for_code (id, code, name)
VALUES (842, '370604', 'Geodynamics');
INSERT INTO dev.for_code (id, code, name)
VALUES (843, '370605', 'Geothermics And Radiometrics');
INSERT INTO dev.for_code (id, code, name)
VALUES (844, '370606', 'Gravimetrics');
INSERT INTO dev.for_code (id, code, name)
VALUES (845, '370607', 'Magnetism And Palaeomagnetism');
INSERT INTO dev.for_code (id, code, name)
VALUES (846, '370608', 'Petrophysics And Rock Mechanics');
INSERT INTO dev.for_code (id, code, name)
VALUES (847, '370609', 'Seismology And Seismic Exploration');
INSERT INTO dev.for_code (id, code, name)
VALUES (848, '370699', 'Geophysics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (849, '370701', 'Contaminant Hydrology');
INSERT INTO dev.for_code (id, code, name)
VALUES (850, '370702', 'Ecohydrology');
INSERT INTO dev.for_code (id, code, name)
VALUES (851, '370703', 'Groundwater Hydrology');
INSERT INTO dev.for_code (id, code, name)
VALUES (852, '370704', 'Surface Water Hydrology');
INSERT INTO dev.for_code (id, code, name)
VALUES (853, '370705', 'Urban Hydrology');
INSERT INTO dev.for_code (id, code, name)
VALUES (854, '370799', 'Hydrology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (855, '370801', 'Biological Oceanography');
INSERT INTO dev.for_code (id, code, name)
VALUES (856, '370802', 'Chemical Oceanography');
INSERT INTO dev.for_code (id, code, name)
VALUES (857, '370803', 'Physical Oceanography');
INSERT INTO dev.for_code (id, code, name)
VALUES (858, '370899', 'Oceanography Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (859, '370901', 'Geomorphology And Earth Surface Processes');
INSERT INTO dev.for_code (id, code, name)
VALUES (860, '370902', 'Glaciology');
INSERT INTO dev.for_code (id, code, name)
VALUES (861, '370903', 'Natural Hazards');
INSERT INTO dev.for_code (id, code, name)
VALUES (862, '370904', 'Palaeoclimatology');
INSERT INTO dev.for_code (id, code, name)
VALUES (863, '370905', 'Quaternary Environments');
INSERT INTO dev.for_code (id, code, name)
VALUES (864, '370906', 'Regolith And Landscape Evolution');
INSERT INTO dev.for_code (id, code, name)
VALUES (865, '370999', 'Physical Geography And Environmental Geoscience Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (866, '379901', 'Earth System Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (867, '379999', 'Other Earth Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (868, '380101', 'Agricultural Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (869, '380102', 'Behavioural Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (870, '380103', 'Economic History');
INSERT INTO dev.for_code (id, code, name)
VALUES (871, '380104', 'Economics Of Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (872, '380105', 'Environment And Resource Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (873, '380106', 'Experimental Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (874, '380107', 'Financial Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (875, '380108', 'Health Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (876, '380109', 'Industry Economics And Industrial Organisation');
INSERT INTO dev.for_code (id, code, name)
VALUES (877, '380110', 'International Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (878, '380111', 'Labour Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (879, '380112', 'Macroeconomics (Incl. Monetary And Fiscal Theory)');
INSERT INTO dev.for_code (id, code, name)
VALUES (880, '380113', 'Public Economics - Public Choice');
INSERT INTO dev.for_code (id, code, name)
VALUES (881, '380114', 'Public Economics - Publicly Provided Goods');
INSERT INTO dev.for_code (id, code, name)
VALUES (882, '380115', 'Public Economics - Taxation And Revenue');
INSERT INTO dev.for_code (id, code, name)
VALUES (883, '380116', 'Tourism Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (884, '380117', 'Transport Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (885, '380118', 'Urban And Regional Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (886, '380119', 'Welfare Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (887, '380199', 'Applied Economics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (888, '380201', 'Cross-Sectional Analysis');
INSERT INTO dev.for_code (id, code, name)
VALUES (889, '380202', 'Econometric And Statistical Methods');
INSERT INTO dev.for_code (id, code, name)
VALUES (890, '380203', 'Economic Models And Forecasting');
INSERT INTO dev.for_code (id, code, name)
VALUES (891, '380204', 'Panel Data Analysis');
INSERT INTO dev.for_code (id, code, name)
VALUES (892, '380205', 'Time-Series Analysis');
INSERT INTO dev.for_code (id, code, name)
VALUES (893, '380299', 'Econometrics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (894, '380301', 'History Of Economic Thought');
INSERT INTO dev.for_code (id, code, name)
VALUES (895, '380302', 'Macroeconomic Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (896, '380303', 'Mathematical Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (897, '380304', 'Microeconomic Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (898, '380399', 'Economic Theory Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (899, '389901', 'Comparative Economic Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (900, '389902', 'Ecological Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (901, '389903', 'Heterodox Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (902, '389999', 'Other Economics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (903, '390101', 'Creative Arts, Media And Communication Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (904, '390102', 'Curriculum And Pedagogy Theory And Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (905, '390103', 'Economics, Business And Management Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (906, '390104', 'English And Literacy Curriculum And Pedagogy (Excl. Lote, Esl And Tesol)');
INSERT INTO dev.for_code (id, code, name)
VALUES (907, '390105', 'Environmental Education Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (908, '390106', 'Geography Education Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (909, '390107',
        'Humanities And Social Sciences Curriculum And Pedagogy (Excl. Economics, Business And Management)');
INSERT INTO dev.for_code (id, code, name)
VALUES (910, '390108', 'Lote, Esl And Tesol Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (911, '390109', 'Mathematics And Numeracy Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (912, '390110', 'Medicine, Nursing And Health Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (913, '390111', 'Physical Education And Development Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (914, '390112', 'Religion Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (915, '390113', 'Science, Technology And Engineering Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (916, '390114', 'Vocational Education And Training Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (917, '390115', 'Work Integrated Learning (Incl. Internships)');
INSERT INTO dev.for_code (id, code, name)
VALUES (918, '390199', 'Curriculum And Pedagogy Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (919, '390201', 'Education Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (920, '390202', 'History And Philosophy Of Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (921, '390203', 'Sociology Of Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (922, '390299', 'Education Policy, Sociology And Philosophy Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (923, '390301', 'Continuing And Community Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (924, '390302', 'Early Childhood Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (925, '390303', 'Higher Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (926, '390304', 'Primary Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (927, '390305', 'Professional Education And Training');
INSERT INTO dev.for_code (id, code, name)
VALUES (928, '390306', 'Secondary Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (929, '390307', 'Teacher Education And Professional Development Of Educators');
INSERT INTO dev.for_code (id, code, name)
VALUES (930, '390308', 'Technical, Further And Workplace Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (931, '390399', 'Education Systems Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (932, '390401', 'Comparative And Cross-Cultural Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (933, '390402', 'Education Assessment And Evaluation');
INSERT INTO dev.for_code (id, code, name)
VALUES (934, '390403', 'Educational Administration, Management And Leadership');
INSERT INTO dev.for_code (id, code, name)
VALUES (935, '390404', 'Educational Counselling');
INSERT INTO dev.for_code (id, code, name)
VALUES (936, '390405', 'Educational Technology And Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (937, '390406', 'Gender, Sexuality And Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (938, '390407', 'Inclusive Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (939, '390408', 'Learning Analytics');
INSERT INTO dev.for_code (id, code, name)
VALUES (940, '390409', 'Learning Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (941, '390410',
        'Multicultural Education (Excl. Aboriginal And Torres Strait Islander, Māori And Pacific Peoples)');
INSERT INTO dev.for_code (id, code, name)
VALUES (942, '390411', 'Special Education And Disability');
INSERT INTO dev.for_code (id, code, name)
VALUES (943, '390412', 'Teacher And Student Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (944, '390499', 'Specialist Studies In Education Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (945, '399999', 'Other Education Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (946, '400101', 'Aerospace Materials');
INSERT INTO dev.for_code (id, code, name)
VALUES (947, '400102', 'Aerospace Structures');
INSERT INTO dev.for_code (id, code, name)
VALUES (948, '400103', 'Aircraft Performance And Flight Control Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (949, '400104', 'Avionics');
INSERT INTO dev.for_code (id, code, name)
VALUES (950, '400105', 'Flight Dynamics');
INSERT INTO dev.for_code (id, code, name)
VALUES (951, '400106', 'Hypersonic Propulsion And Hypersonic Aerothermodynamics');
INSERT INTO dev.for_code (id, code, name)
VALUES (952, '400107', 'Satellite, Space Vehicle And Missile Design And Testing');
INSERT INTO dev.for_code (id, code, name)
VALUES (953, '400199', 'Aerospace Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (954, '400201', 'Automotive Combustion And Fuel Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (955, '400202', 'Automotive Engineering Materials');
INSERT INTO dev.for_code (id, code, name)
VALUES (956, '400203', 'Automotive Mechatronics And Autonomous Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (957, '400204', 'Automotive Safety Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (958, '400205', 'Hybrid And Electric Vehicles And Powertrains');
INSERT INTO dev.for_code (id, code, name)
VALUES (959, '400299', 'Automotive Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (960, '400301', 'Biofabrication');
INSERT INTO dev.for_code (id, code, name)
VALUES (961, '400302', 'Biomaterials');
INSERT INTO dev.for_code (id, code, name)
VALUES (962, '400303', 'Biomechanical Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (963, '400304', 'Biomedical Imaging');
INSERT INTO dev.for_code (id, code, name)
VALUES (964, '400305', 'Biomedical Instrumentation');
INSERT INTO dev.for_code (id, code, name)
VALUES (965, '400306', 'Computational Physiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (966, '400307', 'Mechanobiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (967, '400308', 'Medical Devices');
INSERT INTO dev.for_code (id, code, name)
VALUES (968, '400309', 'Neural Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (969, '400310', 'Rehabilitation Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (970, '400311', 'Tissue Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (971, '400399', 'Biomedical Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (972, '400401', 'Carbon Capture Engineering (Excl. Sequestration)');
INSERT INTO dev.for_code (id, code, name)
VALUES (973, '400402', 'Chemical And Thermal Processes In Energy And Combustion');
INSERT INTO dev.for_code (id, code, name)
VALUES (974, '400403', 'Chemical Engineering Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (975, '400404', 'Electrochemical Energy Storage And Conversion');
INSERT INTO dev.for_code (id, code, name)
VALUES (976, '400405', 'Food Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (977, '400406', 'Powder And Particle Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (978, '400407', 'Process Control And Simulation');
INSERT INTO dev.for_code (id, code, name)
VALUES (979, '400408', 'Reaction Engineering (Excl. Nuclear Reactions)');
INSERT INTO dev.for_code (id, code, name)
VALUES (980, '400409', 'Separation Technologies');
INSERT INTO dev.for_code (id, code, name)
VALUES (981, '400410', 'Wastewater Treatment Processes');
INSERT INTO dev.for_code (id, code, name)
VALUES (982, '400411', 'Water Treatment Processes');
INSERT INTO dev.for_code (id, code, name)
VALUES (983, '400499', 'Chemical Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (984, '400501', 'Architectural Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (985, '400502', 'Civil Geotechnical Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (986, '400503', 'Complex Civil Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (987, '400504', 'Construction Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (988, '400505', 'Construction Materials');
INSERT INTO dev.for_code (id, code, name)
VALUES (989, '400506', 'Earthquake Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (990, '400507', 'Fire Safety Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (991, '400508', 'Infrastructure Engineering And Asset Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (992, '400509', 'Structural Dynamics');
INSERT INTO dev.for_code (id, code, name)
VALUES (993, '400510', 'Structural Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (994, '400511', 'Timber Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (995, '400512', 'Transport Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (996, '400513', 'Water Resources Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (997, '400599', 'Civil Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (998, '400601', 'Antennas And Propagation');
INSERT INTO dev.for_code (id, code, name)
VALUES (999, '400602', 'Data Communications');
INSERT INTO dev.for_code (id, code, name)
VALUES (1000, '400603', 'Molecular, Biological, And Multi-Scale Communications');
INSERT INTO dev.for_code (id, code, name)
VALUES (1001, '400604', 'Network Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1002, '400605', 'Optical Fibre Communication Systems And Technologies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1003, '400606', 'Satellite Communications');
INSERT INTO dev.for_code (id, code, name)
VALUES (1004, '400607', 'Signal Processing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1005, '400608', 'Wireless Communication Systems And Technologies (Incl. Microwave And Millimetrewave)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1006, '400699', 'Communications Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1007, '400701', 'Assistive Robots And Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1008, '400702', 'Automation Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1009, '400703', 'Autonomous Vehicle Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1010, '400704', 'Biomechatronics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1011, '400705', 'Control Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1012, '400706', 'Field Robotics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1013, '400707', 'Manufacturing Robotics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1014, '400708', 'Mechatronics Hardware Design And Architecture');
INSERT INTO dev.for_code (id, code, name)
VALUES (1015, '400709', 'Medical Robotics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1016, '400710', 'Micro-Manipulation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1017, '400711', 'Simulation, Modelling, And Programming Of Mechatronics Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1018, '400799', 'Control Engineering, Mechatronics And Robotics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1019, '400801', 'Circuits And Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1020, '400802', 'Electrical Circuits And Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1021, '400803', 'Electrical Energy Generation (Incl. Renewables, Excl. Photovoltaics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1022, '400804', 'Electrical Energy Storage');
INSERT INTO dev.for_code (id, code, name)
VALUES (1023, '400805', 'Electrical Energy Transmission, Networks And Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1024, '400806', 'Electrical Machines And Drives');
INSERT INTO dev.for_code (id, code, name)
VALUES (1025, '400807', 'Engineering Electromagnetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1026, '400808', 'Photovoltaic Power Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1027, '400899', 'Electrical Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1028, '400901', 'Analog Electronics And Interfaces');
INSERT INTO dev.for_code (id, code, name)
VALUES (1029, '400902', 'Digital Electronic Devices');
INSERT INTO dev.for_code (id, code, name)
VALUES (1030, '400903', 'Digital Processor Architectures');
INSERT INTO dev.for_code (id, code, name)
VALUES (1031, '400904', 'Electronic Device And System Performance Evaluation, Testing And Simulation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1032, '400905', 'Electronic Instrumentation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1033, '400906', 'Electronic Sensors');
INSERT INTO dev.for_code (id, code, name)
VALUES (1034, '400907', 'Industrial Electronics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1035, '400908', 'Microelectronics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1036, '400909', 'Photonic And Electro-Optical Devices, Sensors And Systems (Excl. Communications)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1037, '400910', 'Photovoltaic Devices (Solar Cells)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1038, '400911', 'Power Electronics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1039, '400912', 'Quantum Engineering Systems (Incl. Computing And Communications)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1040, '400913', 'Radio Frequency Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1041, '400999', 'Electronics, Sensors And Digital Hardware Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1042, '401001', 'Engineering Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (1043, '401002', 'Engineering Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1044, '401003', 'Engineering Practice');
INSERT INTO dev.for_code (id, code, name)
VALUES (1045, '401004', 'Humanitarian Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1046, '401005', 'Risk Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1047, '401006', 'Systems Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1048, '401099', 'Engineering Practice And Education Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1049, '401101', 'Air Pollution Modelling And Control');
INSERT INTO dev.for_code (id, code, name)
VALUES (1050, '401102', 'Environmentally Sustainable Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1051, '401103', 'Global And Planetary Environmental Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1052, '401104', 'Health And Ecological Risk Assessment');
INSERT INTO dev.for_code (id, code, name)
VALUES (1053, '401105', 'Life Cycle Assessment And Industrial Ecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1054, '401106', 'Waste Management, Reduction, Reuse And Recycling');
INSERT INTO dev.for_code (id, code, name)
VALUES (1055, '401199', 'Environmental Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1056, '401201', 'Aerodynamics (Excl. Hypersonic Aerodynamics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1057, '401202', 'Bio-Fluids');
INSERT INTO dev.for_code (id, code, name)
VALUES (1058, '401203', 'Biomedical Fluid Mechanics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1059, '401204',
        'Computational Methods In Fluid Flow, Heat And Mass Transfer (Incl. Computational Fluid Dynamics) ');
INSERT INTO dev.for_code (id, code, name)
VALUES (1060, '401205', 'Experimental Methods In Fluid Flow, Heat And Mass Transfer ');
INSERT INTO dev.for_code (id, code, name)
VALUES (1061, '401206', 'Fluid-Structure Interaction And Aeroacoustics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1062, '401207', 'Fundamental And Theoretical Fluid Dynamics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1063, '401208', 'Geophysical And Environmental Fluid Flows');
INSERT INTO dev.for_code (id, code, name)
VALUES (1064, '401209', 'Hydrodynamics And Hydraulic Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1065, '401210', 'Microfluidics And Nanofluidics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1066, '401211', 'Multiphysics Flows (Incl. Multiphase And Reacting Flows)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1067, '401212', 'Non-Newtonian Fluid Flows (Incl. Rheology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1068, '401213', 'Turbulent Flows');
INSERT INTO dev.for_code (id, code, name)
VALUES (1069, '401299', 'Fluid Mechanics And Thermal Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1070, '401301', 'Cartography And Digital Mapping');
INSERT INTO dev.for_code (id, code, name)
VALUES (1071, '401302', 'Geospatial Information Systems And Geospatial Data Modelling');
INSERT INTO dev.for_code (id, code, name)
VALUES (1072, '401303', 'Navigation And Position Fixing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1073, '401304', 'Photogrammetry And Remote Sensing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1074, '401305', 'Satellite-Based Positioning');
INSERT INTO dev.for_code (id, code, name)
VALUES (1075, '401306', 'Surveying (Incl. Hydrographic Surveying)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1076, '401399', 'Geomatic Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1077, '401401', 'Additive Manufacturing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1078, '401402', 'Cad/Cam Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1079, '401403', 'Flexible Manufacturing Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1080, '401404', 'Industrial Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1081, '401405', 'Machine Tools');
INSERT INTO dev.for_code (id, code, name)
VALUES (1082, '401406', 'Machining');
INSERT INTO dev.for_code (id, code, name)
VALUES (1083, '401407', 'Manufacturing Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1084, '401408', 'Manufacturing Processes And Technologies (Excl. Textiles)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1085, '401409', 'Manufacturing Safety And Quality');
INSERT INTO dev.for_code (id, code, name)
VALUES (1086, '401410', 'Microtechnology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1087, '401411', 'Packaging, Storage And Transportation (Excl. Food And Agricultural Products)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1088, '401412', 'Precision Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1089, '401413', 'Textile Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1090, '401499', 'Manufacturing Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1091, '401501', 'Marine Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1092, '401502', 'Naval Architecture');
INSERT INTO dev.for_code (id, code, name)
VALUES (1093, '401503', 'Ocean Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1094, '401504', 'Ship And Platform Structures (Incl. Maritime Hydrodynamics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1095, '401505', 'Special Vehicles');
INSERT INTO dev.for_code (id, code, name)
VALUES (1096, '401599', 'Maritime Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1097, '401601', 'Ceramics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1098, '401602', 'Composite And Hybrid Materials');
INSERT INTO dev.for_code (id, code, name)
VALUES (1099, '401603', 'Compound Semiconductors');
INSERT INTO dev.for_code (id, code, name)
VALUES (1100, '401604', 'Elemental Semiconductors');
INSERT INTO dev.for_code (id, code, name)
VALUES (1101, '401605', 'Functional Materials');
INSERT INTO dev.for_code (id, code, name)
VALUES (1102, '401606', 'Glass');
INSERT INTO dev.for_code (id, code, name)
VALUES (1103, '401607', 'Metals And Alloy Materials');
INSERT INTO dev.for_code (id, code, name)
VALUES (1104, '401608', 'Organic Semiconductors');
INSERT INTO dev.for_code (id, code, name)
VALUES (1105, '401609', 'Polymers And Plastics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1106, '401610', 'Timber, Pulp And Paper');
INSERT INTO dev.for_code (id, code, name)
VALUES (1107, '401611', 'Wearable Materials');
INSERT INTO dev.for_code (id, code, name)
VALUES (1108, '401699', 'Materials Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1109, '401701', 'Acoustics And Noise Control (Excl. Architectural Acoustics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1110, '401702', 'Dynamics, Vibration And Vibration Control');
INSERT INTO dev.for_code (id, code, name)
VALUES (1111, '401703', 'Energy Generation, Conversion And Storage (Excl. Chemical And Electrical)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1112, '401704', 'Mechanical Engineering Asset Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1113, '401705', 'Microelectromechanical Systems (Mems)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1114, '401706', 'Numerical Modelling And Mechanical Characterisation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1115, '401707', 'Solid Mechanics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1116, '401708', 'Tribology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1117, '401799', 'Mechanical Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1118, '401801', 'Micro- And Nanosystems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1119, '401802', 'Molecular And Organic Electronics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1120, '401803', 'Nanoelectromechanical Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1121, '401804', 'Nanoelectronics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1122, '401805', 'Nanofabrication, Growth And Self Assembly');
INSERT INTO dev.for_code (id, code, name)
VALUES (1123, '401806', 'Nanomanufacturing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1124, '401807', 'Nanomaterials');
INSERT INTO dev.for_code (id, code, name)
VALUES (1125, '401808', 'Nanometrology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1126, '401809', 'Nanophotonics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1127, '401810', 'Nanoscale Characterisation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1128, '401899', 'Nanotechnology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1129, '401901', 'Electrometallurgy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1130, '401902', 'Geomechanics And Resources Geotechnical Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1131, '401903', 'Hydrometallurgy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1132, '401904', 'Mineral Processing/Beneficiation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1133, '401905', 'Mining Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1134, '401906', 'Nuclear Engineering (Incl. Fuel Enrichment And Waste Processing And Storage)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1135, '401907', 'Petroleum And Reservoir Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1136, '401908', 'Pyrometallurgy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1137, '401999', 'Resources Engineering And Extractive Metallurgy Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1138, '409901', 'Agricultural Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1139, '409902', 'Engineering Instrumentation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1140, '409903', 'Granular Mechanics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1141, '409999', 'Other Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1142, '410101', 'Carbon Sequestration Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (1143, '410102', 'Ecological Impacts Of Climate Change And Ecological Adaptation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1144, '410103', 'Human Impacts Of Climate Change And Human Adaptation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1145, '410199', 'Climate Change Impacts And Adaptation Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1146, '410201', 'Bioavailability And Ecotoxicology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1147, '410202', 'Biosecurity Science And Invasive Species Ecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1148, '410203', 'Ecosystem Function');
INSERT INTO dev.for_code (id, code, name)
VALUES (1149, '410204', 'Ecosystem Services (Incl. Pollination)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1150, '410205', 'Fire Ecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1151, '410206', 'Landscape Ecology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1152, '410299', 'Ecological Applications Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1153, '410301', 'Biodiscovery');
INSERT INTO dev.for_code (id, code, name)
VALUES (1154, '410302', 'Biological Control');
INSERT INTO dev.for_code (id, code, name)
VALUES (1155, '410303', 'Bioremediation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1156, '410304', 'Environmental Biotechnology Diagnostics (Incl. Biosensors)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1157, '410305', 'Environmental Marine Biotechnology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1158, '410306', 'Environmental Nanotechnology And Nanometrology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1159, '410399', 'Environmental Biotechnology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1160, '410401', 'Conservation And Biodiversity');
INSERT INTO dev.for_code (id, code, name)
VALUES (1161, '410402', 'Environmental Assessment And Monitoring');
INSERT INTO dev.for_code (id, code, name)
VALUES (1162, '410403', 'Environmental Education And Extension');
INSERT INTO dev.for_code (id, code, name)
VALUES (1163, '410404', 'Environmental Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1164, '410405', 'Environmental Rehabilitation And Restoration');
INSERT INTO dev.for_code (id, code, name)
VALUES (1165, '410406', 'Natural Resource Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1166, '410407', 'Wildlife And Habitat Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1167, '410499', 'Environmental Management Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1168, '410501', 'Environmental Biogeochemistry');
INSERT INTO dev.for_code (id, code, name)
VALUES (1169, '410502', 'Noise And Wave Pollution Processes And Measurement');
INSERT INTO dev.for_code (id, code, name)
VALUES (1170, '410503', 'Groundwater Quality Processes And Contaminated Land Assessment');
INSERT INTO dev.for_code (id, code, name)
VALUES (1171, '410504', 'Surface Water Quality Processes And Contaminated Sediment Assessment');
INSERT INTO dev.for_code (id, code, name)
VALUES (1172, '410599', 'Pollution And Contamination Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1173, '410601', 'Land Capability And Soil Productivity');
INSERT INTO dev.for_code (id, code, name)
VALUES (1174, '410602', 'Pedology And Pedometrics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1175, '410603', 'Soil Biology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1176, '410604', 'Soil Chemistry And Soil Carbon Sequestration (Excl. Carbon Sequestration Science)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1177, '410605', 'Soil Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1178, '410699', 'Soil Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1179, '419999', 'Other Environmental Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1180, '420101', 'Arts Therapy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1181, '420102', 'Audiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1182, '420103', 'Music Therapy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1183, '420104', 'Occupational Therapy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1184, '420105', 'Orthoptics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1185, '420106', 'Physiotherapy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1186, '420107', 'Podiatry');
INSERT INTO dev.for_code (id, code, name)
VALUES (1187, '420108', 'Prosthetics And Orthotics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1188, '420109', 'Rehabilitation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1189, '420110', 'Speech Pathology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1190, '420199', 'Allied Health And Rehabilitation Science Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1191, '420201', 'Behavioural Epidemiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1192, '420202', 'Disease Surveillance');
INSERT INTO dev.for_code (id, code, name)
VALUES (1193, '420203', 'Environmental Epidemiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1194, '420204', 'Epidemiological Methods');
INSERT INTO dev.for_code (id, code, name)
VALUES (1195, '420205', 'Epidemiological Modelling');
INSERT INTO dev.for_code (id, code, name)
VALUES (1196, '420206', 'Forensic Epidemiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1197, '420207', 'Major Global Burdens Of Disease');
INSERT INTO dev.for_code (id, code, name)
VALUES (1198, '420208', 'Nutritional Epidemiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1199, '420209', 'Occupational Epidemiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1200, '420210', 'Social Epidemiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1201, '420299', 'Epidemiology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1202, '420301', 'Aged Health Care');
INSERT INTO dev.for_code (id, code, name)
VALUES (1203, '420302', 'Digital Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1204, '420303', 'Family Care');
INSERT INTO dev.for_code (id, code, name)
VALUES (1205, '420304', 'General Practice');
INSERT INTO dev.for_code (id, code, name)
VALUES (1206, '420305', 'Health And Community Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (1207, '420306', 'Health Care Administration');
INSERT INTO dev.for_code (id, code, name)
VALUES (1208, '420307', 'Health Counselling');
INSERT INTO dev.for_code (id, code, name)
VALUES (1209, '420308', 'Health Informatics And Information Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1210, '420309', 'Health Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1211, '420310', 'Health Surveillance');
INSERT INTO dev.for_code (id, code, name)
VALUES (1212, '420311', 'Health Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1213, '420312', 'Implementation Science And Evaluation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1214, '420313', 'Mental Health Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (1215, '420314', 'Multimorbidity');
INSERT INTO dev.for_code (id, code, name)
VALUES (1216, '420315', 'One Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1217, '420316', 'Palliative Care');
INSERT INTO dev.for_code (id, code, name)
VALUES (1218, '420317', 'Patient Safety');
INSERT INTO dev.for_code (id, code, name)
VALUES (1219, '420318', 'People With Disability');
INSERT INTO dev.for_code (id, code, name)
VALUES (1220, '420319', 'Primary Health Care');
INSERT INTO dev.for_code (id, code, name)
VALUES (1221, '420320', 'Residential Client Care');
INSERT INTO dev.for_code (id, code, name)
VALUES (1222, '420321', 'Rural And Remote Health Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (1223, '420399', 'Health Services And Systems Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1224, '420401', 'Clinical Midwifery');
INSERT INTO dev.for_code (id, code, name)
VALUES (1225, '420402', 'Models Of Care And Place Of Birth');
INSERT INTO dev.for_code (id, code, name)
VALUES (1226, '420403', 'Psychosocial Aspects Of Childbirth And Perinatal Mental Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1227, '420499', 'Midwifery Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1228, '420501', 'Acute Care');
INSERT INTO dev.for_code (id, code, name)
VALUES (1229, '420502', 'Aged Care Nursing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1230, '420503', 'Community And Primary Care');
INSERT INTO dev.for_code (id, code, name)
VALUES (1231, '420504', 'Mental Health Nursing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1232, '420505', 'Nursing Workforce');
INSERT INTO dev.for_code (id, code, name)
VALUES (1233, '420506', 'Sub-Acute Care');
INSERT INTO dev.for_code (id, code, name)
VALUES (1234, '420599', 'Nursing Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1235, '420601', 'Community Child Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1236, '420602', 'Health Equity');
INSERT INTO dev.for_code (id, code, name)
VALUES (1237, '420603', 'Health Promotion');
INSERT INTO dev.for_code (id, code, name)
VALUES (1238, '420604', 'Injury Prevention');
INSERT INTO dev.for_code (id, code, name)
VALUES (1239, '420605', 'Preventative Health Care');
INSERT INTO dev.for_code (id, code, name)
VALUES (1240, '420606', 'Social Determinants Of Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1241, '420699', 'Public Health Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1242, '420701', 'Biomechanics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1243, '420702', 'Exercise Physiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1244, '420703', 'Motor Control');
INSERT INTO dev.for_code (id, code, name)
VALUES (1245, '420799', 'Sports Science And Exercise Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1246, '420801', 'Chiropractic');
INSERT INTO dev.for_code (id, code, name)
VALUES (1247, '420802', 'Naturopathy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1248, '420803', 'Traditional Chinese Medicine And Treatments');
INSERT INTO dev.for_code (id, code, name)
VALUES (1249, '420899', 'Traditional, Complementary And Integrative Medicine Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1250, '429999', 'Other Health Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1251, '430101', 'Archaeological Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (1252, '430102', 'Archaeology Of Asia, Africa And The Americas ');
INSERT INTO dev.for_code (id, code, name)
VALUES (1253, '430103', 'Archaeology Of Australia (Excl. Aboriginal And Torres Strait Islander)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1254, '430104', 'Archaeology Of Europe, The Mediterranean And The Levant');
INSERT INTO dev.for_code (id, code, name)
VALUES (1255, '430105', 'Archaeology Of New Zealand (Excl. Māori)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1256, '430106', 'Digital Archaeology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1257, '430107', 'Historical Archaeology (Incl. Industrial Archaeology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1258, '430108', 'Maritime Archaeology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1259, '430199', 'Archaeology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1260, '430201', 'Archival, Repository And Related Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1261, '430202', 'Critical Heritage, Museum And Archive Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1262, '430203', 'Cultural Heritage Management (Incl. World Heritage)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1263, '430204', 'Digital Heritage');
INSERT INTO dev.for_code (id, code, name)
VALUES (1264, '430205', 'Heritage And Cultural Conservation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1265, '430206', 'Heritage Collections And Interpretations');
INSERT INTO dev.for_code (id, code, name)
VALUES (1266, '430207', 'Heritage Tourism, Visitor And Audience Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1267, '430208', 'Intangible Heritage');
INSERT INTO dev.for_code (id, code, name)
VALUES (1268, '430209', 'Materials Conservation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1269, '430299', 'Heritage, Archive And Museum Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1270, '430301', 'Asian History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1271, '430302', 'Australian History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1272, '430303', 'Biography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1273, '430304', 'British History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1274, '430305', 'Classical Greek And Roman History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1275, '430306', 'Digital History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1276, '430307', 'Environmental History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1277, '430308', 'European History (Excl. British, Classical Greek And Roman)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1278, '430309', 'Gender History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1279, '430310', 'Global And World History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1280, '430311', 'Historical Studies Of Crime');
INSERT INTO dev.for_code (id, code, name)
VALUES (1281, '430312', 'Histories Of Race');
INSERT INTO dev.for_code (id, code, name)
VALUES (1282, '430313', 'History Of Empires, Imperialism And Colonialism');
INSERT INTO dev.for_code (id, code, name)
VALUES (1283, '430314', 'History Of Religion');
INSERT INTO dev.for_code (id, code, name)
VALUES (1284, '430315', 'History Of The Pacific');
INSERT INTO dev.for_code (id, code, name)
VALUES (1285, '430316', 'International History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1286, '430317', 'Latin And South American History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1287, '430318', 'Middle Eastern And North African History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1288, '430319', 'Migration History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1289, '430320', 'New Zealand History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1290, '430321', 'North American History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1291, '430322', 'Sub-Saharan African History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1292, '430323', 'Transnational History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1293, '430399', 'Historical Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1294, '439999', 'Other History, Heritage And Archaeology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1295, '440101', 'Anthropology Of Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (1296, '440102', 'Anthropology Of Gender And Sexuality');
INSERT INTO dev.for_code (id, code, name)
VALUES (1297, '440103', 'Biological (Physical) Anthropology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1298, '440104', 'Environmental Anthropology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1299, '440105', 'Linguistic Anthropology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1300, '440106', 'Medical Anthropology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1301, '440107', 'Social And Cultural Anthropology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1302, '440199', 'Anthropology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1303, '440201', 'Causes And Prevention Of Crime');
INSERT INTO dev.for_code (id, code, name)
VALUES (1304, '440202', 'Correctional Theory, Offender Treatment And Rehabilitation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1305, '440203', 'Courts And Sentencing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1306, '440204', 'Crime And Social Justice');
INSERT INTO dev.for_code (id, code, name)
VALUES (1307, '440205', 'Criminological Theories');
INSERT INTO dev.for_code (id, code, name)
VALUES (1308, '440206', 'Critical Approaches To Crime');
INSERT INTO dev.for_code (id, code, name)
VALUES (1309, '440207', 'Cybercrime');
INSERT INTO dev.for_code (id, code, name)
VALUES (1310, '440208', 'Environmental Crime');
INSERT INTO dev.for_code (id, code, name)
VALUES (1311, '440209', 'Gender And Crime');
INSERT INTO dev.for_code (id, code, name)
VALUES (1312, '440210', 'Organised Crime');
INSERT INTO dev.for_code (id, code, name)
VALUES (1313, '440211', 'Police Administration, Procedures And Practice ');
INSERT INTO dev.for_code (id, code, name)
VALUES (1314, '440212', 'Private Policing And Security Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (1315, '440213', 'Race/Ethnicity And Crime');
INSERT INTO dev.for_code (id, code, name)
VALUES (1316, '440214', 'Sociological Studies Of Crime');
INSERT INTO dev.for_code (id, code, name)
VALUES (1317, '440215', 'State Crime');
INSERT INTO dev.for_code (id, code, name)
VALUES (1318, '440216', 'Technology, Crime And Surveillance');
INSERT INTO dev.for_code (id, code, name)
VALUES (1319, '440217', 'Terrorism');
INSERT INTO dev.for_code (id, code, name)
VALUES (1320, '440218', 'Victims');
INSERT INTO dev.for_code (id, code, name)
VALUES (1321, '440219', 'White Collar Crime');
INSERT INTO dev.for_code (id, code, name)
VALUES (1322, '440299', 'Criminology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1323, '440301', 'Family And Household Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1324, '440302', 'Fertility');
INSERT INTO dev.for_code (id, code, name)
VALUES (1325, '440303', 'Migration');
INSERT INTO dev.for_code (id, code, name)
VALUES (1326, '440304', 'Mortality');
INSERT INTO dev.for_code (id, code, name)
VALUES (1327, '440305', 'Population Trends And Policies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1328, '440399', 'Demography Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1329, '440401', 'Development Cooperation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1330, '440402', 'Humanitarian Disasters, Conflict And Peacebuilding');
INSERT INTO dev.for_code (id, code, name)
VALUES (1331, '440403', 'Labour, Migration And Development ');
INSERT INTO dev.for_code (id, code, name)
VALUES (1332, '440404', 'Political Economy And Social Change');
INSERT INTO dev.for_code (id, code, name)
VALUES (1333, '440405', 'Poverty, Inclusivity And Wellbeing ');
INSERT INTO dev.for_code (id, code, name)
VALUES (1334, '440406', 'Rural Community Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (1335, '440407', 'Socio-Economic Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (1336, '440408', 'Urban Community Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (1337, '440499', 'Development Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1338, '440501', 'Feminist And Queer Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (1339, '440502', 'Feminist Methodologies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1340, '440503', 'Feminist Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (1341, '440504', 'Gender Relations');
INSERT INTO dev.for_code (id, code, name)
VALUES (1342, '440505', 'Intersectional Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1343, '440506', 'Sexualities');
INSERT INTO dev.for_code (id, code, name)
VALUES (1344, '440507', 'Studies Of Men And Masculinities');
INSERT INTO dev.for_code (id, code, name)
VALUES (1345, '440508', 'Transgender Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1346, '440509', 'Women''S Studies (Incl. Girls'' Studies)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1347, '440599', 'Gender Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1348, '440601', 'Cultural Geography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1349, '440602', 'Development Geography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1350, '440603', 'Economic Geography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1351, '440604', 'Environmental Geography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1352, '440605', 'Health Geography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1353, '440606', 'Political Geography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1354, '440607', 'Population Geography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1355, '440608', 'Recreation, Leisure And Tourism Geography ');
INSERT INTO dev.for_code (id, code, name)
VALUES (1356, '440609', 'Rural And Regional Geography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1357, '440610', 'Social Geography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1358, '440611', 'Transport Geography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1359, '440612', 'Urban Geography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1360, '440699', 'Human Geography Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1361, '440701', 'Communications And Media Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1362, '440702', 'Crime Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1363, '440703', 'Economic Development Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1364, '440704', 'Environment Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1365, '440705', 'Gender, Policy And Administration');
INSERT INTO dev.for_code (id, code, name)
VALUES (1366, '440706', 'Health Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1367, '440707', 'Housing Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1368, '440708', 'Public Administration');
INSERT INTO dev.for_code (id, code, name)
VALUES (1369, '440709', 'Public Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1370, '440710', 'Research, Science And Technology Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1371, '440711', 'Risk Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1372, '440712', 'Social Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1373, '440713', 'Tourism Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1374, '440714', 'Urban Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1375, '440799', 'Policy And Administration Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1376, '440801', 'Australian Government And Politics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1377, '440802', 'Citizenship');
INSERT INTO dev.for_code (id, code, name)
VALUES (1378, '440803', 'Comparative Government And Politics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1379, '440804', 'Defence Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1380, '440805', 'Environmental Politics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1381, '440806', 'Gender And Politics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1382, '440807', 'Government And Politics Of Asia And The Pacific');
INSERT INTO dev.for_code (id, code, name)
VALUES (1383, '440808', 'International Relations');
INSERT INTO dev.for_code (id, code, name)
VALUES (1384, '440809', 'New Zealand Government And Politics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1385, '440810', 'Peace Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1386, '440811', 'Political Theory And Political Philosophy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1387, '440899', 'Political Science Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1388, '440901', 'Clinical Social Work Practice');
INSERT INTO dev.for_code (id, code, name)
VALUES (1389, '440902', 'Counselling, Wellbeing And Community Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (1390, '440903', 'Social Program Evaluation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1391, '440999', 'Social Work Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1392, '441001', 'Applied Sociology, Program Evaluation And Social Impact Assessment');
INSERT INTO dev.for_code (id, code, name)
VALUES (1393, '441002', 'Environmental Sociology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1394, '441003', 'Rural Sociology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1395, '441004', 'Social Change');
INSERT INTO dev.for_code (id, code, name)
VALUES (1396, '441005', 'Social Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (1397, '441006', 'Sociological Methodology And Research Methods');
INSERT INTO dev.for_code (id, code, name)
VALUES (1398, '441007', 'Sociology And Social Studies Of Science And Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1399, '441008', 'Sociology Of Culture');
INSERT INTO dev.for_code (id, code, name)
VALUES (1400, '441009', 'Sociology Of Family And Relationships');
INSERT INTO dev.for_code (id, code, name)
VALUES (1401, '441010', 'Sociology Of Gender');
INSERT INTO dev.for_code (id, code, name)
VALUES (1402, '441011', 'Sociology Of Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1403, '441012', 'Sociology Of Inequalities');
INSERT INTO dev.for_code (id, code, name)
VALUES (1404, '441013', 'Sociology Of Migration, Ethnicity And Multiculturalism');
INSERT INTO dev.for_code (id, code, name)
VALUES (1405, '441014', 'Sociology Of Religion');
INSERT INTO dev.for_code (id, code, name)
VALUES (1406, '441015', 'Sociology Of The Life Course');
INSERT INTO dev.for_code (id, code, name)
VALUES (1407, '441016', 'Urban Sociology And Community Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1408, '441099', 'Sociology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1409, '449901', 'Studies Of Asian Society');
INSERT INTO dev.for_code (id, code, name)
VALUES (1410, '449999', 'Other Human Society Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1411, '450101', 'Aboriginal And Torres Strait Islander Archaeology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1412, '450102', 'Aboriginal And Torres Strait Islander Artefacts');
INSERT INTO dev.for_code (id, code, name)
VALUES (1413, '450103', 'Aboriginal And Torres Strait Islander Cultural History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1414, '450104', 'Aboriginal And Torres Strait Islander Culture');
INSERT INTO dev.for_code (id, code, name)
VALUES (1415, '450105', 'Aboriginal And Torres Strait Islander Curatorial, Archives And Museum Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1416, '450106', 'Aboriginal And Torres Strait Islander Ethics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1417, '450107', 'Aboriginal And Torres Strait Islander History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1418, '450108', 'Aboriginal And Torres Strait Islander Linguistics And Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1419, '450109', 'Aboriginal And Torres Strait Islander Literature, Journalism And Professional Writing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1420, '450110', 'Aboriginal And Torres Strait Islander Media, Film, Animation And Photography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1421, '450111', 'Aboriginal And Torres Strait Islander Music And Performing Arts');
INSERT INTO dev.for_code (id, code, name)
VALUES (1422, '450112', 'Aboriginal And Torres Strait Islander Philosophy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1423, '450113', 'Aboriginal And Torres Strait Islander Religion And Religious Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1424, '450114', 'Aboriginal And Torres Strait Islander Repatriation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1425, '450115', 'Aboriginal And Torres Strait Islander Research Methods');
INSERT INTO dev.for_code (id, code, name)
VALUES (1426, '450116', 'Aboriginal And Torres Strait Islander Visual Arts And Crafts');
INSERT INTO dev.for_code (id, code, name)
VALUES (1427, '450117', 'Aboriginal And Torres Strait Islander Ways Of Knowing, Being And Doing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1428, '450118', 'Conservation Of Aboriginal And Torres Strait Islander Heritage');
INSERT INTO dev.for_code (id, code, name)
VALUES (1429, '450199', 'Aboriginal And Torres Strait Islander Culture, Language And History Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1430, '450201', 'Aboriginal And Torres Strait Islander Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1431, '450202', 'Aboriginal And Torres Strait Islander Early Childhood Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1432, '450203', 'Aboriginal And Torres Strait Islander Educational Methods');
INSERT INTO dev.for_code (id, code, name)
VALUES (1433, '450204', 'Aboriginal And Torres Strait Islander Technical, Further, Continuing And Community Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1434, '450205', 'Aboriginal And Torres Strait Islander Higher Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1435, '450206', 'Aboriginal And Torres Strait Islander Language Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1436, '450207', 'Aboriginal And Torres Strait Islander Men’S Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1437, '450208', 'Aboriginal And Torres Strait Islander Primary Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1438, '450209', 'Aboriginal And Torres Strait Islander Secondary Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1439, '450210', 'Aboriginal And Torres Strait Islander Student Engagement And Teaching');
INSERT INTO dev.for_code (id, code, name)
VALUES (1440, '450211', 'Aboriginal And Torres Strait Islander Women’S Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1441, '450212',
        'Cultural Responsiveness And Working With Aboriginal And Torres Strait Islander Communities Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1442, '450213',
        'Embedding Aboriginal And Torres Strait Islander Knowledges, Histories, Culture, Country, Perspectives And Ethics In Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1443, '450299', 'Aboriginal And Torres Strait Islander Education Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1444, '450301', 'Aboriginal And Torres Strait Islander Agriculture And Forestry');
INSERT INTO dev.for_code (id, code, name)
VALUES (1445, '450302', 'Aboriginal And Torres Strait Islander Earth Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (1446, '450303', 'Aboriginal And Torres Strait Islander Environmental Conservation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1447, '450304', 'Aboriginal And Torres Strait Islander Environmental Knowledges');
INSERT INTO dev.for_code (id, code, name)
VALUES (1448, '450305', 'Aboriginal And Torres Strait Islander Fisheries And Customary Fisheries');
INSERT INTO dev.for_code (id, code, name)
VALUES (1449, '450306', 'Aboriginal And Torres Strait Islander Land And Water Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1450, '450307', 'Aboriginal And Torres Strait Islander Marine Environment Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (1451, '450399',
        'Aboriginal And Torres Strait Islander Environmental Knowledges And Management Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1452, '450401', 'Aboriginal And Torres Strait Islander And Disability');
INSERT INTO dev.for_code (id, code, name)
VALUES (1453, '450402', 'Aboriginal And Torres Strait Islander Biomedical And Clinical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (1454, '450403', 'Aboriginal And Torres Strait Islander Child Health And Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1455, '450404', 'Aboriginal And Torres Strait Islander Cultural Determinants Of Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1456, '450405', 'Aboriginal And Torres Strait Islander Diet And Nutrition');
INSERT INTO dev.for_code (id, code, name)
VALUES (1457, '450406', 'Aboriginal And Torres Strait Islander Epidemiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1458, '450407', 'Aboriginal And Torres Strait Islander Health Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1459, '450408', 'Aboriginal And Torres Strait Islander Health Promotion');
INSERT INTO dev.for_code (id, code, name)
VALUES (1460, '450409', 'Aboriginal And Torres Strait Islander Health Services');
INSERT INTO dev.for_code (id, code, name)
VALUES (1461, '450410', 'Aboriginal And Torres Strait Islander Lifecourse');
INSERT INTO dev.for_code (id, code, name)
VALUES (1462, '450411', 'Aboriginal And Torres Strait Islander Medicine And Treatments');
INSERT INTO dev.for_code (id, code, name)
VALUES (1463, '450412', 'Aboriginal And Torres Strait Islander Men’S Health And Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1464, '450413', 'Aboriginal And Torres Strait Islander Midwifery And Paediatrics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1465, '450414', 'Aboriginal And Torres Strait Islander Mothers And Babies Health And Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1466, '450415', 'Aboriginal And Torres Strait Islander Nursing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1467, '450416', 'Aboriginal And Torres Strait Islander Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1468, '450417', 'Aboriginal And Torres Strait Islander Public Health And Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1469, '450418', 'Aboriginal And Torres Strait Islander Remote Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1470, '450419', 'Aboriginal And Torres Strait Islander Social Determinants Of Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1471, '450420', 'Aboriginal And Torres Strait Islander Social, Emotional, Cultural And Spiritual Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1472, '450421', 'Aboriginal And Torres Strait Islander Sport And Physical Activity');
INSERT INTO dev.for_code (id, code, name)
VALUES (1473, '450422', 'Aboriginal And Torres Strait Islander Theory Of Change Models For Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1474, '450423', 'Aboriginal And Torres Strait Islander Youth And Family Social And Emotional Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1475, '450499', 'Aboriginal And Torres Strait Islander Health And Wellbeing Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1476, '450501', 'Aboriginal And Torres Strait Islander Accounting');
INSERT INTO dev.for_code (id, code, name)
VALUES (1477, '450502', 'Aboriginal And Torres Strait Islander Anthropology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1478, '450503', 'Aboriginal And Torres Strait Islander Architecture');
INSERT INTO dev.for_code (id, code, name)
VALUES (1479, '450504', 'Aboriginal And Torres Strait Islander Commerce');
INSERT INTO dev.for_code (id, code, name)
VALUES (1480, '450505', 'Aboriginal And Torres Strait Islander Community And Regional Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (1481, '450506', 'Aboriginal And Torres Strait Islander Community Governance And Decision Making');
INSERT INTO dev.for_code (id, code, name)
VALUES (1482, '450507', 'Aboriginal And Torres Strait Islander Community-Based Research');
INSERT INTO dev.for_code (id, code, name)
VALUES (1483, '450508', 'Aboriginal And Torres Strait Islander Criminology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1484, '450509', 'Aboriginal And Torres Strait Islander Customary Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1485, '450510', 'Aboriginal And Torres Strait Islander Design Practice And Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1486, '450511', 'Aboriginal And Torres Strait Islander Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1487, '450512', 'Aboriginal And Torres Strait Islander Finance');
INSERT INTO dev.for_code (id, code, name)
VALUES (1488, '450513', 'Aboriginal And Torres Strait Islander Human Geography And Demography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1489, '450514', 'Aboriginal And Torres Strait Islander Legislation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1490, '450515', 'Aboriginal And Torres Strait Islander Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1491, '450516', 'Aboriginal And Torres Strait Islander Marketing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1492, '450517', 'Aboriginal And Torres Strait Islander Not-For-Profit Social Enterprises');
INSERT INTO dev.for_code (id, code, name)
VALUES (1493, '450518', 'Aboriginal And Torres Strait Islander Peoples And The Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1494, '450519', 'Aboriginal And Torres Strait Islander Perspectives');
INSERT INTO dev.for_code (id, code, name)
VALUES (1495, '450520', 'Aboriginal And Torres Strait Islander Political Participation And Representation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1496, '450521', 'Aboriginal And Torres Strait Islander Politics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1497, '450522', 'Aboriginal And Torres Strait Islander Social Impact And Program Evaluation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1498, '450523', 'Aboriginal And Torres Strait Islander Social Work And Social Justice');
INSERT INTO dev.for_code (id, code, name)
VALUES (1499, '450524', 'Aboriginal And Torres Strait Islander Sociological Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1500, '450525', 'Aboriginal And Torres Strait Islander Sociology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1501, '450526', 'Aboriginal And Torres Strait Islander Tourism');
INSERT INTO dev.for_code (id, code, name)
VALUES (1502, '450527', 'Aboriginal And Torres Strait Islander Urban And Regional Planning');
INSERT INTO dev.for_code (id, code, name)
VALUES (1503, '450599',
        'Aboriginal And Torres Strait Islander Peoples, Society And Community Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1504, '450601', 'Aboriginal And Torres Strait Islander Astronomy And Cosmology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1505, '450602', 'Aboriginal And Torres Strait Islander Biological Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (1506, '450603', 'Aboriginal And Torres Strait Islander Computing Technology Use And Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (1507, '450604', 'Aboriginal And Torres Strait Islander Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1508, '450605', 'Aboriginal And Torres Strait Islander Genomics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1509, '450606', 'Aboriginal And Torres Strait Islander Information And Knowledge Management Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1510, '450607', 'Aboriginal And Torres Strait Islander Innovation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1511, '450608', 'Aboriginal And Torres Strait Islander Knowledge Management Methods');
INSERT INTO dev.for_code (id, code, name)
VALUES (1512, '450609',
        'Aboriginal And Torres Strait Islander Mathematical, Physical And Chemical Sciences (Excl. Astronomy And Cosmology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1513, '450699', 'Aboriginal And Torres Strait Islander Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1514, '450701', 'Te Whāomoomo I Te Tuku Ihotanga Māori (Conservation Of Māori Heritage)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1515, '450702', 'Te Mana Wahine (Female Status)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1516, '450703', 'Te Mana Tāne (Male Status)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1517, '450704', 'Te Mātai Whaipara Māori (Māori Archaeology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1518, '450705', 'Ngā Taonga Māori Nō Mua (Māori Artefacts)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1519, '450706', 'Te Hītori Ahurea Māori (Māori Cultural History)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1520, '450707', 'Te Ahurea Māori (Māori Culture)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1521, '450708',
        'Ngā Mātai Kaitiaki, Pūranga Me Ngā Whare Tongarewa O Te Māori (Māori Curatorial, Archives And Museum Studies)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1522, '450709', 'Ngā Matatika O Te Māori (Māori Ethics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1523, '450710', 'Te Hītori Māori (Māori History)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1524, '450711', 'Te Whenua, Ahurea Me Te Tuakiri O Te Māori (Māori Land, Culture And Identity)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1525, '450712', 'Te Mātai I Te Reo Māori Me Te Reo Māori (Māori Linguistics And Languages)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1526, '450713',
        'Te Mātākōrero, Te Kawe Kōrero Me Te Tuhituhi Ngaio O Te Māori (Māori Literature, Journalism And Professional Writing)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1527, '450714',
        'Ngā Arapāho, Ngā Kiriata, Te Hākoritanga Me Te Hopu Whakaahua O Te Māori (Māori Media, Film, Animation And Photography)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1528, '450715', 'Te Puoro Me Ngā Mahi A Te Rēhia O Te Māori (Māori Music And Performing Arts)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1529, '450716', 'Te Rapunga Whakaaro O Te Māori (Māori Philosophy)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1530, '450717', 'Ngā Kaupapa Māori (Māori Projects)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1531, '450718', 'Te Whakapono Me Te Mātai Whakapono O Te Māori (Māori Religion And Religious Studies)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1532, '450719', 'Te Whakahoki Taonga A Te Māori Ki Te Kāinga (Māori Repatriation)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1533, '450720', 'Ngā Tikanga Rangahau O Te Māori (Māori Research Methods)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1534, '450721', 'Ngā Toi Ataata Ngā Mahi Ā-Rehe O Te Māori (Māori Visual Arts And Crafts)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1535, '450799',
        'Te Ahurea, Reo, Me Te Hītori O Te Māori Kāore Anō Kia Whakarōpūtia I Wāhi Kē (Māori Culture, Language And History Not Elsewhere Classified)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1536, '450801', 'Ngā Kōhanga Reo (Māori Curriculum And Pedagogy)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1537, '450802', 'Te Whāriki - Te Mātauranga Kōhungahunga Māori (Māori Early Childhood Education)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1538, '450803', 'Ngā Tikanga Mātauranga O Te Māori (Māori Educational Methods)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1539, '450804', 'Te Mātauranga Kura Tuatoru Māori (Māori Higher Education)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1540, '450805', 'Te Mātauranga Reo Māori (Māori Language Education)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1541, '450806', 'Ngā Kura Kaupapa Māori (Māori Primary Education)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1542, '450807',
        'Te Urupare Me Te Whai Wāhi Māori Ki Te Mātauranga (Māori Responsiveness And Engaged Education)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1543, '450808', 'Te Mātauranga Kura Tuarua Māori (Māori Secondary Education)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1544, '450809', 'Te Whai Wāhi Ākonga Me Ngā Mahi Whakaako O Te Māori (Māori Student Engagement And Teaching)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1545, '450810',
        'Tō Te Māori Mātauranga Hangarau, Mātauranga Atu Anō, Mātauranga Haere Tonu, Me Te Mātauranga Hapori (Māori Technical, Further, Continuing And Community Education)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1546, '450811', 'Te Mātauranga Māori I Roto I Te Mātauranga (Mātauranga Māori In Education)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1547, '450899',
        'Te Mātauranga Māori Kāore Anō Kia Whakarōpūtia I Wāhi Kē (Māori Education Not Elsewhere Classified)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1548, '450901', 'Te Ahuwhenua Me Ngā Mahi Ngahere O Te Māori (Māori Agriculture And Forestry)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1549, '450902', 'Ngā Pūtaiao-Ā-Nuku O Te Māori (Māori Earth Sciences)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1550, '450903', 'Te Whāomoomo Taiao O Te Māori (Māori Environmental Conservation)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1551, '450904', 'Ngā Mātauranga Taiao O Te Māori (Māori Environmental Knowledges)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1552, '450905', 'Te Ahumoana Me Te Ahumoana Tuku Iho O Te Māori (Māori Fisheries And Customary Fisheries)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1553, '450906', 'Te Whakahaere Whenua Me Te Wai O Te Māori (Māori Land And Water Management)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1554, '450907', 'Te Pūtaiao Taiao Moana O Te Māori (Māori Marine Environment Science)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1555, '450999',
        'Ngā Mātauranga Taiao O Te Māori Kāore Anō Kia Whakarōpūtia I Wāhi Kē (Māori Environmental Knowledges Not Elsewhere Classified)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1556, '451001', 'Te Whaikaha Me Te Māori (Māori And Disability)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1557, '451002', 'Ngā Pūtaiao Koiora-Hauora, Haumanu Hoki O Te Māori (Māori Biomedical And Clinical Sciences)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1558, '451003', 'Ngā Tokoingoa Ahurea O Te Hauora O Te Māori (Māori Cultural Determinants Of Health)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1559, '451004', 'Te Horakai Me Ngā Kai O Te Māori (Māori Diet And Nutrition)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1560, '451005', 'Te Mātai Tahumaero O Te Māori (Māori Epidemiology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1561, '451006', 'Ngā Kaupapahere Hauora O Te Māori (Māori Health Policy)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1562, '451007', 'Te Whakatairanga Hauora O Te Māori (Māori Health Promotion)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1563, '451008', 'Ngā Wāhanga Ora O Te Māori (Māori Life Course)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1564, '451009', 'Ngā Rongoā Me Ngā Whakamaimoa O Te Māori (Māori Medicine And Treatments)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1565, '451010', 'Ngā Kaiwhakawhānau Me Te Mātai Mate Tamariki O Te Māori (Māori Midwifery And Paediatrics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1566, '451011',
        'Te Hauora Me Te Oranga Ā-Whaea, Ā-Pēpi O Te Māori (Māori Mothers And Babies Health And Wellbeing)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1567, '451012', 'Te Mahi Tapuhi O Te Māori (Māori Nursing)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1568, '451013', 'Mātauranga Hinengaro Kaupapa Māori (Māori Psychology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1569, '451014', 'Ngā Pūnaha Mātauranga Hinengaro O Te Māori (Māori Psychology Knowledge Systems)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1570, '451015', 'Te Hauora Me Te Oranga Tūmatanui O Te Māori (Māori Public Health And Wellbeing)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1571, '451016', 'Te Hauora Mamao O Te Māori (Māori Remote Health)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1572, '451017',
        'Te Oranga Ā-Pāpori, Ā-Hinengaro, Ā-Ahurea, Ā-Wairua O Te Māori (Māori Social, Cultural, Emotional And Spiritual Wellbeing)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1573, '451018', 'Ngā Tokoingoa Pāpori O Te Hauora O Te Māori (Māori Social Determinants Of Health)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1574, '451019', 'Ngā Hākinakina Me Te Korikori Tinana O Te Māori (Māori Sport And Physical Activity)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1575, '451020', 'Te Ariā O Ngā Tauira Panoni Hauora O Te Māori (Māori Theory Of Change Models For Health)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1576, '451021', 'Ngā Taiohi Me Ngā Whānau Māori (Māori Youth And Family)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1577, '451099',
        'Te Hauora Me Te Oranga O Te Māori Kāore Anō Kia Whakarōpūhia I Wāhi Kē (Māori Health And Wellbeing Not Elsewhere Classified)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1578, '451101', 'Te Mahi Kaute O Te Māori (Māori Accounting)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1579, '451102', 'Te Mātauranga Tikanga Māori (Māori Anthropology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1580, '451103', 'Te Hoahoanga Whare O Te Māori (Māori Architecture)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1581, '451104', 'Ngā Mahi Tauhokohoko O Te Māori (Māori Commerce)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1582, '451105', 'Te Whanaketanga Ā-Hapori, Ā-Rohe O Te Māori (Māori Community And Regional Development)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1583, '451106', 'Te Rangahau Kei Rō Hapori O Te Māori (Māori Community-Based Research)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1584, '451107',
        'Te Kāwana Ā-Hapori, Whakatau Take Hoki O Te Māori (Māori Community Governance And Decision Making)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1585, '451108', 'Te Mātauranga Taihara Māori (Māori Criminology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1586, '451109', 'Ngā Tikanga Māori (Māori Customary Law)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1587, '451110', 'Te Whakaharatau Me Te Whakahaere Hoahoa O Te Māori (Māori Design Practice And Management)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1588, '451111', 'Te Mātauranga Ōhanga O Te Māori (Māori Economics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1589, '451112', 'Te Ahumoni Māori (Māori Finance)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1590, '451113',
        'Te Mātauranga Matawhenua Ā-Iwi Me Te Tatauranga Ā-Iwi O Te Māori (Māori Human Geography And Demography)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1591, '451114', 'Te Ture Whenua (Māori Land Law)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1592, '451115', 'Te Ture Me Te Tika Māori (Māori Law And Justice)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1593, '451116', 'Ngā Ture Māori (Māori Legislation)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1594, '451117', 'Te Whakahaere O Te Māori (Māori Management)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1595, '451118', 'Te Whakamākete O Te Māori (Māori Marketing)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1596, '451119', 'Ngā Hinonga Pāpori Kaupapa Atawhai O Te Māori (Māori Not-For-Profit Social Enterprises)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1597, '451120', 'Ngā Iwi Māori Me Te Ture (Māori Peoples And The Law)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1598, '451121', 'Ngā Tirohanga Māori (Māori Perspectives)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1599, '451122',
        'Te Whai Wāhi Me Te Whakakanohi Taha Tōrāngapū O Te Māori (Māori Political Participation And Representation)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1600, '451123', 'Ngā Mahi Tōrangapū Māori (Māori Politics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1601, '451124', 'Ngā Ture Rawa Māori (Māori Resource Law)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1602, '451125',
        'Te Pāpātanga Pāpori Me Te Aromātai Hōtaka O Te Māori (Māori Social Impact And Program Evaluation)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1603, '451126', 'Ngā Mahi Tauwhiro Me Te Tika Pāpori O Te Māori (Māori Social Work And Social Justice)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1604, '451127', 'Ngā Mātai Tikanga Ā-Iwi O Te Māori (Māori Sociological Studies)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1605, '451128', 'Te Mātauranga Pāpori O Te Māori (Māori Sociology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1606, '451129', 'Te Mahi Tāpoi Māori (Māori Tourism)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1607, '451130', 'Te Tiriti O Waitangi (The Treaty Of Waitangi)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1608, '451131', 'Te Whakamahere Ā-Tāone, Ā-Rohe O Te Māori (Māori Urban And Regional Planning)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1609, '451199',
        'Ngā Tāngata, Te Porihanga Me Ngā Hapori O Te Māori Kāore Anō Kia Whakarōpūtia I Wāhi Kē (Māori Peoples, Society And Community Not Elsewhere Classified)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1610, '451201', 'Te Mātai Arorangi Me Te Mātai Tuarangi O Te Māori (Māori Astronomy And Cosmology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1611, '451202', 'Ngā Pūtaiao Koiora O Te Māori (Māori Biological Sciences)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1612, '451203',
        'Te Whakamahi Me Te Hoahoa O Te Hangarau Rorohiko O Te Māori (Māori Computing Technology Use And Design)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1613, '451204', 'Te Mana Motuhake O Ngā Raraunga Māori (Māori Data Sovereignty)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1614, '451205', 'Te Mātauranga Pūkaha O Te Māori (Māori Engineering)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1615, '451206', 'Te Mātai Huingaira O Te Māori (Māori Genomics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1616, '451207',
        'Ngā Pūnaha Whakahaere Mōhiohio Me Te Mātauranga O Te Māori (Māori Information And Knowledge Management Systems)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1617, '451208', 'Te Wairua Auaha O Te Māori (Māori Innovation)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1618, '451209', 'Ngā Tikanga Whakahaere Mōhiotanga Māori (Māori Knowledge Management Methods)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1619, '451210',
        'Ngā Pūtaiao Pāngarau, Ōkiko, Matū Hoki - Hāunga Te Mātai Arorangi Me Te Mātai Tuarangi O Te Māori (Māori Mathematical, Physical And Chemical Sciences - Excl. Astronomy And Cosmology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1620, '451211', 'Te Tukatuka Reo Noa O Te Māori (Māori Natural Language Processing)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1621, '451299',
        'Ngā Pūtaiao Māori Kāore Anō Kia Whakarōpūhia I Wāhi Kē (Māori Sciences Not Elsewhere Classified)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1622, '451301', 'Archaeology Of New Guinea And Pacific Islands (Excl. New Zealand)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1623, '451302', 'Conservation Of Pacific Peoples Heritage');
INSERT INTO dev.for_code (id, code, name)
VALUES (1624, '451303', 'Pacific Peoples Artefacts');
INSERT INTO dev.for_code (id, code, name)
VALUES (1625, '451304', 'Pacific Peoples Cultural History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1626, '451305', 'Pacific Peoples Culture');
INSERT INTO dev.for_code (id, code, name)
VALUES (1627, '451306', 'Pacific Peoples Curatorial, Archives And Museum Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1628, '451307', 'Pacific Peoples Ethics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1629, '451308', 'Pacific Peoples History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1630, '451309', 'Pacific Peoples Land, Culture And Identity');
INSERT INTO dev.for_code (id, code, name)
VALUES (1631, '451310', 'Pacific Peoples Linguistics And Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1632, '451311', 'Pacific Peoples Literature, Journalism And Professional Writing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1633, '451312', 'Pacific Peoples Media, Film, Animation And Photography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1634, '451313', 'Pacific Peoples Music And Performing Arts');
INSERT INTO dev.for_code (id, code, name)
VALUES (1635, '451314', 'Pacific Peoples Philosophy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1636, '451315', 'Pacific Peoples Religion And Religious Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1637, '451316', 'Pacific Peoples Repatriation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1638, '451317', 'Pacific Peoples Research Methods');
INSERT INTO dev.for_code (id, code, name)
VALUES (1639, '451318', 'Pacific Peoples Visual Arts And Crafts');
INSERT INTO dev.for_code (id, code, name)
VALUES (1640, '451319', 'Pacific Peoples Ways Of Knowing, Being And Doing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1641, '451399', 'Pacific Peoples Culture, Language And History Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1642, '451401', 'Cultural Responsiveness And Working With Pacific Peoples Communities Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1643, '451402',
        'Embedding Pacific Peoples Knowledges, Histories, Culture, Country, Perspectives And Ethics In Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1644, '451403', 'Pacific Peoples Curriculum And Pedagogy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1645, '451404', 'Pacific Peoples Early Childhood Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1646, '451405', 'Pacific Peoples Educational Methods');
INSERT INTO dev.for_code (id, code, name)
VALUES (1647, '451406', 'Pacific Peoples Technical, Further, Continuing And Community Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1648, '451407', 'Pacific Peoples Higher Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1649, '451408', 'Pacific Peoples Language Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1650, '451409', 'Pacific Peoples Men’S Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1651, '451410', 'Pacific Peoples Primary Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1652, '451411', 'Pacific Peoples Secondary Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1653, '451412', 'Pacific Peoples Student Engagement And Teaching');
INSERT INTO dev.for_code (id, code, name)
VALUES (1654, '451413', 'Pacific Peoples Women’S Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1655, '451499', 'Pacific Peoples Education Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1656, '451501', 'Pacific Peoples Agriculture And Forestry');
INSERT INTO dev.for_code (id, code, name)
VALUES (1657, '451502', 'Pacific Peoples Earth Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (1658, '451503', 'Pacific Peoples Environmental Conservation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1659, '451504', 'Pacific Peoples Environmental Knowledges');
INSERT INTO dev.for_code (id, code, name)
VALUES (1660, '451505', 'Pacific Peoples Fisheries And Customary Fisheries');
INSERT INTO dev.for_code (id, code, name)
VALUES (1661, '451506', 'Pacific Peoples Land And Water Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1662, '451507', 'Pacific Peoples Marine Environment Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (1663, '451599', 'Pacific Peoples Environmental Knowledges Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1664, '451601', 'Pacific Peoples And Disability');
INSERT INTO dev.for_code (id, code, name)
VALUES (1665, '451602', 'Pacific Peoples Biomedical And Clinical Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (1666, '451603', 'Pacific Peoples Cultural Determinants Of Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1667, '451604', 'Pacific Peoples Diet And Nutrition');
INSERT INTO dev.for_code (id, code, name)
VALUES (1668, '451605', 'Pacific Peoples Epidemiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1669, '451606', 'Pacific Peoples Health Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1670, '451607', 'Pacific Peoples Health Promotion');
INSERT INTO dev.for_code (id, code, name)
VALUES (1671, '451608', 'Pacific Peoples Life Course');
INSERT INTO dev.for_code (id, code, name)
VALUES (1672, '451609', 'Pacific Peoples Medicine And Treatments');
INSERT INTO dev.for_code (id, code, name)
VALUES (1673, '451610', 'Pacific Peoples Midwifery And Paediatrics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1674, '451611', 'Pacific Peoples Mothers And Babies Health And Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1675, '451612', 'Pacific Peoples Nursing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1676, '451613', 'Pacific Peoples Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1677, '451614', 'Pacific Peoples Public Health And Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1678, '451615', 'Pacific Peoples Remote Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1679, '451616', 'Pacific Peoples Social Determinants Of Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1680, '451617', 'Pacific Peoples Social, Cultural, Emotional And Spiritual Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1681, '451618', 'Pacific Peoples Sport And Physical Activity');
INSERT INTO dev.for_code (id, code, name)
VALUES (1682, '451619', 'Pacific Peoples Theory Of Change Models For Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1683, '451620', 'Pacific Peoples Youth And Family');
INSERT INTO dev.for_code (id, code, name)
VALUES (1684, '451699', 'Pacific Peoples Health And Wellbeing Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1685, '451701', 'Pacific Peoples Astronomy And Cosmology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1686, '451702', 'Pacific Peoples Biological Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (1687, '451703', 'Pacific Peoples Computing Technology Use And Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (1688, '451704', 'Pacific Peoples Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1689, '451705', 'Pacific Peoples Genomics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1690, '451706', 'Pacific Peoples Information And Knowledge Management Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1691, '451707', 'Pacific Peoples Innovation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1692, '451708', 'Pacific Peoples Knowledge Management Methods');
INSERT INTO dev.for_code (id, code, name)
VALUES (1693, '451709', 'Pacific Peoples Mathematical, Physical And Chemical Sciences (Excl. Astronomy And Cosmology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1694, '451799', 'Pacific Peoples Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1695, '451801', 'Pacific Peoples And The Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1696, '451802', 'Pacific Peoples Anthropology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1697, '451803', 'Pacific Peoples Architecture');
INSERT INTO dev.for_code (id, code, name)
VALUES (1698, '451804', 'Pacific Peoples Commerce');
INSERT INTO dev.for_code (id, code, name)
VALUES (1699, '451805', 'Pacific Peoples Community And Regional Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (1700, '451806', 'Pacific Peoples Community Governance And Decision Making');
INSERT INTO dev.for_code (id, code, name)
VALUES (1701, '451807', 'Pacific Peoples Community-Based Research');
INSERT INTO dev.for_code (id, code, name)
VALUES (1702, '451808', 'Pacific Peoples Criminology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1703, '451809', 'Pacific Peoples Customary Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1704, '451810', 'Pacific Peoples Design Practice And Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1705, '451811', 'Pacific Peoples Economics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1706, '451812', 'Pacific Peoples Finance');
INSERT INTO dev.for_code (id, code, name)
VALUES (1707, '451813', 'Pacific Peoples Human Geography And Demography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1708, '451814', 'Pacific Peoples Legislation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1709, '451815', 'Pacific Peoples Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1710, '451816', 'Pacific Peoples Marketing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1711, '451817', 'Pacific Peoples Not-For-Profit Social Enterprises');
INSERT INTO dev.for_code (id, code, name)
VALUES (1712, '451818', 'Pacific Peoples Perspectives');
INSERT INTO dev.for_code (id, code, name)
VALUES (1713, '451819', 'Pacific Peoples Political Participation And Representation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1714, '451820', 'Pacific Peoples Politics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1715, '451821', 'Pacific Peoples Social Impact And Program Evaluation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1716, '451822', 'Pacific Peoples Social Work And Social Justice');
INSERT INTO dev.for_code (id, code, name)
VALUES (1717, '451823', 'Pacific Peoples Sociological Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1718, '451824', 'Pacific Peoples Sociology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1719, '451825', 'Pacific Peoples Tourism');
INSERT INTO dev.for_code (id, code, name)
VALUES (1720, '451826', 'Pacific Peoples Urban And Regional Planning');
INSERT INTO dev.for_code (id, code, name)
VALUES (1721, '451899', 'Pacific Peoples, Society And Community Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1722, '451901', 'Global Indigenous Studies Culture, Language And History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1723, '451902', 'Global Indigenous Studies Environmental Knowledges And Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1724, '451903', 'Global Indigenous Studies Health And Wellbeing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1725, '451904', 'Global Indigenous Studies Peoples, Society And Community');
INSERT INTO dev.for_code (id, code, name)
VALUES (1726, '451905', 'Global Indigenous Studies Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (1727, '451906', 'Indigenous Data And Data Technologies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1728, '451907', 'Indigenous Methodologies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1729, '451999', 'Other Indigenous Data, Methodologies And Global Indigenous Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1730, '459999', 'Other Indigenous Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1731, '460101', 'Applications In Arts And Humanities');
INSERT INTO dev.for_code (id, code, name)
VALUES (1732, '460102', 'Applications In Health');
INSERT INTO dev.for_code (id, code, name)
VALUES (1733, '460103', 'Applications In Life Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (1734, '460104', 'Applications In Physical Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (1735, '460105', 'Applications In Social Sciences And Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1736, '460106', 'Spatial Data And Applications');
INSERT INTO dev.for_code (id, code, name)
VALUES (1737, '460199', 'Applied Computing Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1738, '460201', 'Artificial Life And Complex Adaptive Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1739, '460202', 'Autonomous Agents And Multiagent Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1740, '460203', 'Evolutionary Computation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1741, '460204', 'Fuzzy Computation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1742, '460205', 'Intelligent Robotics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1743, '460206', 'Knowledge Representation And Reasoning');
INSERT INTO dev.for_code (id, code, name)
VALUES (1744, '460207', 'Modelling And Simulation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1745, '460208', 'Natural Language Processing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1746, '460209', 'Planning And Decision Making');
INSERT INTO dev.for_code (id, code, name)
VALUES (1747, '460210', 'Satisfiability And Optimisation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1748, '460211', 'Speech Production');
INSERT INTO dev.for_code (id, code, name)
VALUES (1749, '460212', 'Speech Recognition');
INSERT INTO dev.for_code (id, code, name)
VALUES (1750, '460299', 'Artificial Intelligence Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1751, '460301', 'Active Sensing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1752, '460302', 'Audio Processing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1753, '460303', 'Computational Imaging');
INSERT INTO dev.for_code (id, code, name)
VALUES (1754, '460304', 'Computer Vision');
INSERT INTO dev.for_code (id, code, name)
VALUES (1755, '460305', 'Image And Video Coding');
INSERT INTO dev.for_code (id, code, name)
VALUES (1756, '460306', 'Image Processing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1757, '460307', 'Multimodal Analysis And Synthesis');
INSERT INTO dev.for_code (id, code, name)
VALUES (1758, '460308', 'Pattern Recognition');
INSERT INTO dev.for_code (id, code, name)
VALUES (1759, '460309', 'Video Processing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1760, '460399', 'Computer Vision And Multimedia Computation Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1761, '460401', 'Cryptography');
INSERT INTO dev.for_code (id, code, name)
VALUES (1762, '460402', 'Data And Information Privacy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1763, '460403', 'Data Security And Protection');
INSERT INTO dev.for_code (id, code, name)
VALUES (1764, '460404', 'Digital Forensics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1765, '460405', 'Hardware Security');
INSERT INTO dev.for_code (id, code, name)
VALUES (1766, '460406', 'Software And Application Security');
INSERT INTO dev.for_code (id, code, name)
VALUES (1767, '460407', 'System And Network Security');
INSERT INTO dev.for_code (id, code, name)
VALUES (1768, '460499', 'Cybersecurity And Privacy Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1769, '460501', 'Data Engineering And Data Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (1770, '460502', 'Data Mining And Knowledge Discovery');
INSERT INTO dev.for_code (id, code, name)
VALUES (1771, '460503', 'Data Models, Storage And Indexing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1772, '460504', 'Data Quality');
INSERT INTO dev.for_code (id, code, name)
VALUES (1773, '460505', 'Database Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1774, '460506', 'Graph, Social And Multimedia Data');
INSERT INTO dev.for_code (id, code, name)
VALUES (1775, '460507', 'Information Extraction And Fusion');
INSERT INTO dev.for_code (id, code, name)
VALUES (1776, '460508', 'Information Retrieval And Web Search');
INSERT INTO dev.for_code (id, code, name)
VALUES (1777, '460509', 'Query Processing And Optimisation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1778, '460510', 'Recommender Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1779, '460511', 'Stream And Sensor Data');
INSERT INTO dev.for_code (id, code, name)
VALUES (1780, '460599', 'Data Management And Data Science Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1781, '460601', 'Cloud Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1782, '460602', 'Concurrent/Parallel Systems And Technologies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1783, '460603', 'Cyberphysical Systems And Internet Of Things');
INSERT INTO dev.for_code (id, code, name)
VALUES (1784, '460604', 'Dependable Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1785, '460605', 'Distributed Systems And Algorithms');
INSERT INTO dev.for_code (id, code, name)
VALUES (1786, '460606', 'Energy-Efficient Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1787, '460607', 'High Performance Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1788, '460608', 'Mobile Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1789, '460609', 'Networking And Communications');
INSERT INTO dev.for_code (id, code, name)
VALUES (1790, '460610', 'Operating Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1791, '460611', 'Performance Evaluation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1792, '460612', 'Service Oriented Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1793, '460699', 'Distributed Computing And Systems Software Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1794, '460701', 'Computer Aided Design');
INSERT INTO dev.for_code (id, code, name)
VALUES (1795, '460702', 'Computer Graphics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1796, '460703', 'Entertainment And Gaming');
INSERT INTO dev.for_code (id, code, name)
VALUES (1797, '460704', 'Interactive Narrative');
INSERT INTO dev.for_code (id, code, name)
VALUES (1798, '460705', 'Procedural Content Generation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1799, '460706', 'Serious Games');
INSERT INTO dev.for_code (id, code, name)
VALUES (1800, '460707', 'Sound And Music Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1801, '460708', 'Virtual And Mixed Reality');
INSERT INTO dev.for_code (id, code, name)
VALUES (1802, '460799', 'Graphics, Augmented Reality And Games Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1803, '460801', 'Accessible Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1804, '460802', 'Affective Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1805, '460803', 'Collaborative And Social Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1806, '460804', 'Computing Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1807, '460805', 'Fairness, Accountability, Transparency, Trust And Ethics Of Computer Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1808, '460806', 'Human-Computer Interaction');
INSERT INTO dev.for_code (id, code, name)
VALUES (1809, '460807', 'Information Visualisation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1810, '460808', 'Mixed Initiative And Human-In-The-Loop');
INSERT INTO dev.for_code (id, code, name)
VALUES (1811, '460809', 'Pervasive Computing');
INSERT INTO dev.for_code (id, code, name)
VALUES (1812, '460810', 'Social Robotics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1813, '460899', 'Human-Centred Computing Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1814, '460901', 'Business Process Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1815, '460902', 'Decision Support And Group Support Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1816, '460903', 'Information Modelling, Management And Ontologies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1817, '460904', 'Information Security Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1818, '460905', 'Information Systems Development Methodologies And Practice');
INSERT INTO dev.for_code (id, code, name)
VALUES (1819, '460906', 'Information Systems Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1820, '460907', 'Information Systems For Sustainable Development And The Public Good');
INSERT INTO dev.for_code (id, code, name)
VALUES (1821, '460908', 'Information Systems Organisation And Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1822, '460909', 'Information Systems Philosophy, Research Methods And Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (1823, '460910', 'Information Systems User Experience Design And Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (1824, '460911', 'Inter-Organisational, Extra-Organisational And Global Information Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (1825, '460912', 'Knowledge And Information Management');
INSERT INTO dev.for_code (id, code, name)
VALUES (1826, '460999', 'Information Systems Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1827, '461001', 'Digital Curation And Preservation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1828, '461002', 'Human Information Behaviour');
INSERT INTO dev.for_code (id, code, name)
VALUES (1829, '461003', 'Human Information Interaction And Retrieval');
INSERT INTO dev.for_code (id, code, name)
VALUES (1830, '461004', 'Information Governance, Policy And Ethics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1831, '461005', 'Informetrics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1832, '461006', 'Library Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1833, '461007', 'Open Access');
INSERT INTO dev.for_code (id, code, name)
VALUES (1834, '461008', 'Organisation Of Information And Knowledge Resources');
INSERT INTO dev.for_code (id, code, name)
VALUES (1835, '461009', 'Recordkeeping Informatics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1836, '461010', 'Social And Community Informatics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1837, '461099', 'Library And Information Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1838, '461101', 'Adversarial Machine Learning');
INSERT INTO dev.for_code (id, code, name)
VALUES (1839, '461102', 'Context Learning');
INSERT INTO dev.for_code (id, code, name)
VALUES (1840, '461103', 'Deep Learning');
INSERT INTO dev.for_code (id, code, name)
VALUES (1841, '461104', 'Neural Networks');
INSERT INTO dev.for_code (id, code, name)
VALUES (1842, '461105', 'Reinforcement Learning');
INSERT INTO dev.for_code (id, code, name)
VALUES (1843, '461106', 'Semi- And Unsupervised Learning');
INSERT INTO dev.for_code (id, code, name)
VALUES (1844, '461199', 'Machine Learning Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1845, '461201', 'Automated Software Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1846, '461202', 'Empirical Software Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1847, '461203', 'Formal Methods For Software');
INSERT INTO dev.for_code (id, code, name)
VALUES (1848, '461204', 'Programming Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1849, '461205', 'Requirements Engineering');
INSERT INTO dev.for_code (id, code, name)
VALUES (1850, '461206', 'Software Architecture');
INSERT INTO dev.for_code (id, code, name)
VALUES (1851, '461207', 'Software Quality, Processes And Metrics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1852, '461208', 'Software Testing, Verification And Validation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1853, '461299', 'Software Engineering Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1854, '461301', 'Coding, Information Theory And Compression');
INSERT INTO dev.for_code (id, code, name)
VALUES (1855, '461302', 'Computational Complexity And Computability');
INSERT INTO dev.for_code (id, code, name)
VALUES (1856, '461303', 'Computational Logic And Formal Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1857, '461304', 'Concurrency Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (1858, '461305', 'Data Structures And Algorithms');
INSERT INTO dev.for_code (id, code, name)
VALUES (1859, '461306', 'Numerical Computation And Mathematical Software');
INSERT INTO dev.for_code (id, code, name)
VALUES (1860, '461307', 'Quantum Computation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1861, '461399', 'Theory Of Computation Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1862, '469999', 'Other Information And Computing Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1863, '470101', 'Communication Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1864, '470102', 'Communication Technology And Digital Media Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1865, '470103', 'Environmental Communication');
INSERT INTO dev.for_code (id, code, name)
VALUES (1866, '470104', 'International And Development Communication');
INSERT INTO dev.for_code (id, code, name)
VALUES (1867, '470105', 'Journalism Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1868, '470106', 'Media Industry Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1869, '470107', 'Media Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1870, '470108', 'Organisational, Interpersonal And Intercultural Communication');
INSERT INTO dev.for_code (id, code, name)
VALUES (1871, '470199', 'Communication And Media Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1872, '470201', 'Arts And Cultural Policy');
INSERT INTO dev.for_code (id, code, name)
VALUES (1873, '470202', 'Asian Cultural Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1874, '470203', 'Consumption And Everyday Life');
INSERT INTO dev.for_code (id, code, name)
VALUES (1875, '470204', 'Cultural And Creative Industries');
INSERT INTO dev.for_code (id, code, name)
VALUES (1876, '470205', 'Cultural Studies Of Agriculture, Food And Wine');
INSERT INTO dev.for_code (id, code, name)
VALUES (1877, '470206', 'Cultural Studies Of Nation And Region');
INSERT INTO dev.for_code (id, code, name)
VALUES (1878, '470207', 'Cultural Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (1879, '470208', 'Culture, Representation And Identity');
INSERT INTO dev.for_code (id, code, name)
VALUES (1880, '470209', 'Environment And Culture');
INSERT INTO dev.for_code (id, code, name)
VALUES (1881, '470210', 'Globalisation And Culture');
INSERT INTO dev.for_code (id, code, name)
VALUES (1882, '470211', 'Migrant Cultural Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1883, '470212', 'Multicultural, Intercultural And Cross-Cultural Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1884, '470213', 'Postcolonial Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1885, '470214', 'Screen And Media Culture');
INSERT INTO dev.for_code (id, code, name)
VALUES (1886, '470299', 'Cultural Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1887, '470301', 'African Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1888, '470302', 'Central And Eastern European Languages (Incl. Russian)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1889, '470303', 'Chinese Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1890, '470304', 'Comparative Language Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1891, '470305', 'Early English Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1892, '470306', 'English As A Second Language');
INSERT INTO dev.for_code (id, code, name)
VALUES (1893, '470307', 'English Language');
INSERT INTO dev.for_code (id, code, name)
VALUES (1894, '470308', 'French Language');
INSERT INTO dev.for_code (id, code, name)
VALUES (1895, '470309', 'German Language');
INSERT INTO dev.for_code (id, code, name)
VALUES (1896, '470310', 'Iberian Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1897, '470311', 'Indian Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1898, '470312', 'Indonesian Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1899, '470313', 'Italian Language');
INSERT INTO dev.for_code (id, code, name)
VALUES (1900, '470314', 'Japanese Language');
INSERT INTO dev.for_code (id, code, name)
VALUES (1901, '470315', 'Korean Language');
INSERT INTO dev.for_code (id, code, name)
VALUES (1902, '470316', 'Latin And Classical Greek Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1903, '470317', 'Middle Eastern Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1904, '470318', 'Other Asian Languages (Excl. South-East Asian)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1905, '470319', 'Other European Languages');
INSERT INTO dev.for_code (id, code, name)
VALUES (1906, '470320', 'South-East Asian Languages (Excl. Indonesian)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1907, '470321', 'Translation And Interpretation Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (1908, '470399', 'Language Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1909, '470401', 'Applied Linguistics And Educational Linguistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1910, '470402', 'Child Language Acquisition');
INSERT INTO dev.for_code (id, code, name)
VALUES (1911, '470403', 'Computational Linguistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1912, '470404', 'Corpus Linguistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1913, '470405', 'Discourse And Pragmatics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1914, '470406', 'Historical, Comparative And Typological Linguistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1915, '470407', 'Language Documentation And Description');
INSERT INTO dev.for_code (id, code, name)
VALUES (1916, '470408', 'Lexicography And Semantics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1917, '470409', 'Linguistic Structures (Incl. Phonology, Morphology And Syntax)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1918, '470410', 'Phonetics And Speech Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (1919, '470411', 'Sociolinguistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (1920, '470499', 'Linguistics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1921, '470501', 'African Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1922, '470502', 'Australian Literature (Excl. Aboriginal And Torres Strait Islander Literature)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1923, '470503', 'Book History');
INSERT INTO dev.for_code (id, code, name)
VALUES (1924, '470504', 'British And Irish Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1925, '470505', 'Central And Eastern European Literature (Incl. Russian)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1926, '470506', 'Children''S Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1927, '470507', 'Comparative And Transnational Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1928, '470508', 'Digital Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1929, '470509', 'Ecocriticism');
INSERT INTO dev.for_code (id, code, name)
VALUES (1930, '470510', 'Indian Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1931, '470511', 'Indonesian Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1932, '470512', 'Korean Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1933, '470513', 'Latin And Classical Greek Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1934, '470514', 'Literary Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (1935, '470515', 'Literature In Chinese');
INSERT INTO dev.for_code (id, code, name)
VALUES (1936, '470516', 'Literature In French');
INSERT INTO dev.for_code (id, code, name)
VALUES (1937, '470517', 'Literature In German');
INSERT INTO dev.for_code (id, code, name)
VALUES (1938, '470518', 'Literature In Italian');
INSERT INTO dev.for_code (id, code, name)
VALUES (1939, '470519', 'Literature In Japanese');
INSERT INTO dev.for_code (id, code, name)
VALUES (1940, '470520', 'Literature In Spanish And Portuguese');
INSERT INTO dev.for_code (id, code, name)
VALUES (1941, '470521', 'Middle Eastern Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1942, '470522', 'New Zealand Literature (Excl. Māori Literature)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1943, '470523', 'North American Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1944, '470524', 'Other Asian Literature (Excl. South-East Asian)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1945, '470525', 'Other European Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1946, '470526', 'Other Literatures In English');
INSERT INTO dev.for_code (id, code, name)
VALUES (1947, '470527', 'Popular And Genre Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1948, '470528', 'Print Culture');
INSERT INTO dev.for_code (id, code, name)
VALUES (1949, '470529', 'South-East Asian Literature (Excl. Indonesian)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1950, '470530', 'Stylistics And Textual Analysis');
INSERT INTO dev.for_code (id, code, name)
VALUES (1951, '470531', 'Young Adult Literature');
INSERT INTO dev.for_code (id, code, name)
VALUES (1952, '470599', 'Literary Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1953, '479999', 'Other Language, Communication And Culture Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1954, '480101', 'Banking, Finance And Securities Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1955, '480102', 'Commercial Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1956, '480103', 'Corporations And Associations Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1957, '480104', 'Labour Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1958, '480105', 'Not-For-Profit Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1959, '480106', 'Taxation Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1960, '480199', 'Commercial Law Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1961, '480201', 'Animal Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1962, '480202', 'Climate Change Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1963, '480203', 'Environmental Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1964, '480204', 'Mining, Energy And Natural Resources Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1965, '480299', 'Environmental And Resources Law Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1966, '480301', 'Asian And Pacific Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1967, '480302', 'Comparative Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1968, '480303', 'Conflict Of Laws (Incl. Private International Law)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1969, '480304', 'European Union Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1970, '480305', 'International Arbitration');
INSERT INTO dev.for_code (id, code, name)
VALUES (1971, '480306', 'International Criminal Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1972, '480307', 'International Humanitarian And Human Rights Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1973, '480308', 'International Trade And Investment Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1974, '480309', 'Ocean Law And Governance');
INSERT INTO dev.for_code (id, code, name)
VALUES (1975, '480310', 'Public International Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1976, '480311', 'Space, Maritime And Aviation Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1977, '480399', 'International And Comparative Law Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1978, '480401', 'Criminal Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1979, '480402', 'Family Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1980, '480403', 'Law And Humanities');
INSERT INTO dev.for_code (id, code, name)
VALUES (1981, '480404', 'Law And Religion');
INSERT INTO dev.for_code (id, code, name)
VALUES (1982, '480405', 'Law And Society And Socio-Legal Research');
INSERT INTO dev.for_code (id, code, name)
VALUES (1983, '480406', 'Law Reform');
INSERT INTO dev.for_code (id, code, name)
VALUES (1984, '480407', 'Law, Gender And Sexuality (Incl. Feminist Legal Scholarship)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1985, '480408', 'Law, Science And Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (1986, '480409', 'Legal Education');
INSERT INTO dev.for_code (id, code, name)
VALUES (1987, '480410', 'Legal Theory, Jurisprudence And Legal Interpretation');
INSERT INTO dev.for_code (id, code, name)
VALUES (1988, '480411', 'Media And Communication Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1989, '480412', 'Medical And Health Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1990, '480413', 'Race, Ethnicity And Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1991, '480414', 'Sports Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (1992, '480499', 'Law In Context Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (1993, '480501', 'Access To Justice');
INSERT INTO dev.for_code (id, code, name)
VALUES (1994, '480502', 'Civil Procedure');
INSERT INTO dev.for_code (id, code, name)
VALUES (1995, '480503', 'Criminal Procedure');
INSERT INTO dev.for_code (id, code, name)
VALUES (1996, '480504', 'Legal Institutions (Incl. Courts And Justice Systems)');
INSERT INTO dev.for_code (id, code, name)
VALUES (1997, '480505', 'Legal Practice, Lawyering And The Legal Profession');
INSERT INTO dev.for_code (id, code, name)
VALUES (1998, '480506', 'Litigation, Adjudication And Dispute Resolution');
INSERT INTO dev.for_code (id, code, name)
VALUES (1999, '480507', 'Youth Justice');
INSERT INTO dev.for_code (id, code, name)
VALUES (2000, '480599', 'Legal Systems Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2001, '480601', 'Contract Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (2002, '480602', 'Equity And Trusts Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (2003, '480603', 'Intellectual Property Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (2004, '480604', 'Property Law (Excl. Intellectual Property Law)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2005, '480605', 'Tort Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (2006, '480699', 'Private Law And Civil Obligations Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2007, '480701', 'Administrative Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (2008, '480702', 'Constitutional Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (2009, '480703', 'Domestic Human Rights Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (2010, '480704', 'Migration, Asylum And Refugee Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (2011, '480705', 'Military Law And Justice');
INSERT INTO dev.for_code (id, code, name)
VALUES (2012, '480706', 'Privacy And Data Rights');
INSERT INTO dev.for_code (id, code, name)
VALUES (2013, '480707', 'Welfare, Insurance, Disability And Social Security Law');
INSERT INTO dev.for_code (id, code, name)
VALUES (2014, '480799', 'Public Law Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2015, '489999', 'Other Law And Legal Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2016, '490101', 'Approximation Theory And Asymptotic Methods');
INSERT INTO dev.for_code (id, code, name)
VALUES (2017, '490102', 'Biological Mathematics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2018, '490103', 'Calculus Of Variations, Mathematical Aspects Of Systems Theory And Control Theory ');
INSERT INTO dev.for_code (id, code, name)
VALUES (2019, '490104', 'Complex Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (2020, '490105', 'Dynamical Systems In Applications');
INSERT INTO dev.for_code (id, code, name)
VALUES (2021, '490106', 'Financial Mathematics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2022, '490107', 'Mathematical Methods And Special Functions');
INSERT INTO dev.for_code (id, code, name)
VALUES (2023, '490108', 'Operations Research');
INSERT INTO dev.for_code (id, code, name)
VALUES (2024, '490109', 'Theoretical And Applied Mechanics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2025, '490199', 'Applied Mathematics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2026, '490201', 'Algebraic Structures In Mathematical Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2027, '490202', 'Integrable Systems (Classical And Quantum)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2028, '490203',
        'Mathematical Aspects Of Classical Mechanics, Quantum Mechanics And Quantum Information Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (2029, '490204', 'Mathematical Aspects Of General Relativity');
INSERT INTO dev.for_code (id, code, name)
VALUES (2030, '490205',
        'Mathematical Aspects Of Quantum And Conformal Field Theory, Quantum Gravity And String Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (2031, '490206', 'Statistical Mechanics, Physical Combinatorics And Mathematical Aspects Of Condensed Matter');
INSERT INTO dev.for_code (id, code, name)
VALUES (2032, '490299', 'Mathematical Physics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2033, '490301', 'Experimental Mathematics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2034, '490302', 'Numerical Analysis');
INSERT INTO dev.for_code (id, code, name)
VALUES (2035, '490303', 'Numerical Solution Of Differential And Integral Equations');
INSERT INTO dev.for_code (id, code, name)
VALUES (2036, '490304', 'Optimisation');
INSERT INTO dev.for_code (id, code, name)
VALUES (2037, '490399', 'Numerical And Computational Mathematics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2038, '490401', 'Algebra And Number Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (2039, '490402', 'Algebraic And Differential Geometry');
INSERT INTO dev.for_code (id, code, name)
VALUES (2040, '490403', 'Category Theory, K Theory, Homological Algebra ');
INSERT INTO dev.for_code (id, code, name)
VALUES (2041, '490404', 'Combinatorics And Discrete Mathematics (Excl. Physical Combinatorics)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2042, '490405', 'Group Theory And Generalisations');
INSERT INTO dev.for_code (id, code, name)
VALUES (2043, '490406', 'Lie Groups, Harmonic And Fourier Analysis');
INSERT INTO dev.for_code (id, code, name)
VALUES (2044, '490407', 'Mathematical Logic, Set Theory, Lattices And Universal Algebra');
INSERT INTO dev.for_code (id, code, name)
VALUES (2045, '490408', 'Operator Algebras And Functional Analysis');
INSERT INTO dev.for_code (id, code, name)
VALUES (2046, '490409', 'Ordinary Differential Equations, Difference Equations And Dynamical Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (2047, '490410', 'Partial Differential Equations');
INSERT INTO dev.for_code (id, code, name)
VALUES (2048, '490411', 'Real And Complex Functions (Incl. Several Variables)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2049, '490412', 'Topology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2050, '490499', 'Pure Mathematics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2051, '490501', 'Applied Statistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2052, '490502', 'Biostatistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2053, '490503', 'Computational Statistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2054, '490504', 'Forensic Evaluation, Inference And Statistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2055, '490505', 'Large And Complex Data Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (2056, '490506', 'Probability Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (2057, '490507', 'Spatial Statistics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2058, '490508', 'Statistical Data Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (2059, '490509', 'Statistical Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (2060, '490510', 'Stochastic Analysis And Modelling');
INSERT INTO dev.for_code (id, code, name)
VALUES (2061, '490511', 'Time Series And Spatial Modelling');
INSERT INTO dev.for_code (id, code, name)
VALUES (2062, '490599', 'Statistics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2063, '499999', 'Other Mathematical Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2064, '500101', 'Bioethics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2065, '500102', 'Business Ethics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2066, '500103', 'Ethical Use Of New Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2067, '500104', 'Human Rights And Justice Issues (Excl. Law)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2068, '500105', 'Legal Ethics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2069, '500106', 'Medical Ethics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2070, '500107', 'Professional Ethics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2071, '500199', 'Applied Ethics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2072, '500201', 'History And Philosophy Of Engineering And Technology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2073, '500202', 'History And Philosophy Of Law And Justice');
INSERT INTO dev.for_code (id, code, name)
VALUES (2074, '500203', 'History And Philosophy Of Medicine');
INSERT INTO dev.for_code (id, code, name)
VALUES (2075, '500204', 'History And Philosophy Of Science');
INSERT INTO dev.for_code (id, code, name)
VALUES (2076, '500205', 'History And Philosophy Of The Humanities');
INSERT INTO dev.for_code (id, code, name)
VALUES (2077, '500206', 'History And Philosophy Of The Social Sciences');
INSERT INTO dev.for_code (id, code, name)
VALUES (2078, '500207', 'History Of Ideas');
INSERT INTO dev.for_code (id, code, name)
VALUES (2079, '500208', 'History Of Philosophy');
INSERT INTO dev.for_code (id, code, name)
VALUES (2080, '500299', 'History And Philosophy Of Specific Fields Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2081, '500301', 'Aesthetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2082, '500302', 'Critical Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (2083, '500303', 'Decision Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (2084, '500304', 'Environmental Philosophy');
INSERT INTO dev.for_code (id, code, name)
VALUES (2085, '500305', 'Epistemology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2086, '500306', 'Ethical Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (2087, '500307', 'Hermeneutics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2088, '500308', 'Logic');
INSERT INTO dev.for_code (id, code, name)
VALUES (2089, '500309', 'Metaphysics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2090, '500310', 'Phenomenology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2091, '500311', 'Philosophical Psychology (Incl. Moral Psychology And Philosophy Of Action)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2092, '500312', 'Philosophy Of Cognition');
INSERT INTO dev.for_code (id, code, name)
VALUES (2093, '500313', 'Philosophy Of Gender');
INSERT INTO dev.for_code (id, code, name)
VALUES (2094, '500314', 'Philosophy Of Language');
INSERT INTO dev.for_code (id, code, name)
VALUES (2095, '500315', 'Philosophy Of Mind (Excl. Cognition)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2096, '500316', 'Philosophy Of Religion');
INSERT INTO dev.for_code (id, code, name)
VALUES (2097, '500317', 'Philosophy Of Science (Excl. History And Philosophy Of Specific Fields)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2098, '500318', 'Philosophy Of Specific Cultures (Incl. Comparative Philosophy)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2099, '500319', 'Poststructuralism');
INSERT INTO dev.for_code (id, code, name)
VALUES (2100, '500320', 'Psychoanalytic Philosophy');
INSERT INTO dev.for_code (id, code, name)
VALUES (2101, '500321', 'Social And Political Philosophy');
INSERT INTO dev.for_code (id, code, name)
VALUES (2102, '500399', 'Philosophy Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2103, '500401', 'Christian Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (2104, '500402', 'Comparative Religious Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (2105, '500403', 'Islamic Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (2106, '500404', 'Jewish Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (2107, '500405', 'Religion, Society And Culture');
INSERT INTO dev.for_code (id, code, name)
VALUES (2108, '500406', 'Studies In Eastern Religious Traditions');
INSERT INTO dev.for_code (id, code, name)
VALUES (2109, '500407', 'Studies In Religious Traditions (Excl. Eastern, Jewish, Christian And Islamic Traditions)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2110, '500499', 'Religious Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2111, '500501', 'Theology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2112, '500599', 'Theology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2113, '509999', 'Other Philosophy And Religious Studies Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2114, '510101', 'Astrobiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2115, '510102', 'Astronomical Instrumentation');
INSERT INTO dev.for_code (id, code, name)
VALUES (2116, '510103', 'Cosmology And Extragalactic Astronomy');
INSERT INTO dev.for_code (id, code, name)
VALUES (2117, '510104', 'Galactic Astronomy');
INSERT INTO dev.for_code (id, code, name)
VALUES (2118, '510105', 'General Relativity And Gravitational Waves');
INSERT INTO dev.for_code (id, code, name)
VALUES (2119, '510106', 'High Energy Astrophysics And Galactic Cosmic Rays');
INSERT INTO dev.for_code (id, code, name)
VALUES (2120, '510107', 'Planetary Science (Excl. Solar System And Planetary Geology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2121, '510108', 'Solar Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2122, '510109', 'Stellar Astronomy And Planetary Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (2123, '510199', 'Astronomical Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2124, '510201', 'Atomic And Molecular Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2125, '510202', 'Lasers And Quantum Electronics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2126, '510203', 'Nonlinear Optics And Spectroscopy');
INSERT INTO dev.for_code (id, code, name)
VALUES (2127, '510204', 'Photonics, Optoelectronics And Optical Communications');
INSERT INTO dev.for_code (id, code, name)
VALUES (2128, '510205', 'Terahertz Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2129, '510299', 'Atomic, Molecular And Optical Physics Not Elsewhere Classified ');
INSERT INTO dev.for_code (id, code, name)
VALUES (2130, '510301', 'Acoustics And Acoustical Devices; Waves');
INSERT INTO dev.for_code (id, code, name)
VALUES (2131, '510302', 'Classical And Physical Optics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2132, '510303', 'Electrostatics And Electrodynamics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2133, '510304', 'Thermodynamics And Statistical Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2134, '510399', 'Classical Physics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2135, '510401', 'Condensed Matter Characterisation Technique Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (2136, '510402', 'Condensed Matter Imaging');
INSERT INTO dev.for_code (id, code, name)
VALUES (2137, '510403', 'Condensed Matter Modelling And Density Functional Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (2138, '510404', 'Electronic And Magnetic Properties Of Condensed Matter; Superconductivity');
INSERT INTO dev.for_code (id, code, name)
VALUES (2139, '510405', 'Soft Condensed Matter');
INSERT INTO dev.for_code (id, code, name)
VALUES (2140, '510406', 'Structural Properties Of Condensed Matter');
INSERT INTO dev.for_code (id, code, name)
VALUES (2141, '510407', 'Surface Properties Of Condensed Matter');
INSERT INTO dev.for_code (id, code, name)
VALUES (2142, '510499', 'Condensed Matter Physics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2143, '510501', 'Biological Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2144, '510502', 'Medical Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2145, '510599', 'Medical And Biological Physics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2146, '510601', 'Nuclear Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2147, '510602', 'Plasma Physics; Fusion Plasmas; Electrical Discharges');
INSERT INTO dev.for_code (id, code, name)
VALUES (2148, '510699', 'Nuclear And Plasma Physics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2149, '510701', 'Astroparticle Physics And Particle Cosmology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2150, '510702', 'Field Theory And String Theory');
INSERT INTO dev.for_code (id, code, name)
VALUES (2151, '510703', 'Particle Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2152, '510799', 'Particle And High Energy Physics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2153, '510801', 'Degenerate Quantum Gases And Atom Optics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2154, '510802', 'Foundations Of Quantum Mechanics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2155, '510803', 'Quantum Information, Computation And Communication');
INSERT INTO dev.for_code (id, code, name)
VALUES (2156, '510804', 'Quantum Optics And Quantum Optomechanics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2157, '510805', 'Quantum Technologies');
INSERT INTO dev.for_code (id, code, name)
VALUES (2158, '510899', 'Quantum Physics Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2159, '510901', 'Astrodynamics And Space Situational Awareness');
INSERT INTO dev.for_code (id, code, name)
VALUES (2160, '510902', 'Heliophysics And Space Weather');
INSERT INTO dev.for_code (id, code, name)
VALUES (2161, '510903', 'Mesospheric, Thermospheric, Ionospheric And Magnetospheric Physics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2162, '510904', 'Solar System Energetic Particles');
INSERT INTO dev.for_code (id, code, name)
VALUES (2163, '510905', 'Solar System Planetary Science (Excl. Planetary Geology)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2164, '510906', 'Space Instrumentation');
INSERT INTO dev.for_code (id, code, name)
VALUES (2165, '510999', 'Space Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2166, '511001', 'Accelerators');
INSERT INTO dev.for_code (id, code, name)
VALUES (2167, '511002', 'Instruments And Techniques');
INSERT INTO dev.for_code (id, code, name)
VALUES (2168, '511003', 'Synchrotrons');
INSERT INTO dev.for_code (id, code, name)
VALUES (2169, '511099', 'Synchrotrons And Accelerators Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2170, '519901', 'Complex Physical Systems');
INSERT INTO dev.for_code (id, code, name)
VALUES (2171, '519999', 'Other Physical Sciences Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2172, '520101', 'Child And Adolescent Development');
INSERT INTO dev.for_code (id, code, name)
VALUES (2173, '520102', 'Educational Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2174, '520103', 'Forensic Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2175, '520104', 'Industrial And Organisational Psychology (Incl. Human Factors)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2176, '520105', 'Psychological Methodology, Design And Analysis');
INSERT INTO dev.for_code (id, code, name)
VALUES (2177, '520106', 'Psychology Of Ageing');
INSERT INTO dev.for_code (id, code, name)
VALUES (2178, '520107', 'Sport And Exercise Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2179, '520108', 'Testing, Assessment And Psychometrics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2180, '520199', 'Applied And Developmental Psychology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2181, '520201', 'Behavioural Genetics');
INSERT INTO dev.for_code (id, code, name)
VALUES (2182, '520202', 'Behavioural Neuroscience');
INSERT INTO dev.for_code (id, code, name)
VALUES (2183, '520203', 'Cognitive Neuroscience');
INSERT INTO dev.for_code (id, code, name)
VALUES (2184, '520204', 'Evolutionary Psychological Studies');
INSERT INTO dev.for_code (id, code, name)
VALUES (2185, '520205', 'Psychopharmacology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2186, '520206', 'Psychophysiology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2187, '520207', 'Social And Affective Neuroscience');
INSERT INTO dev.for_code (id, code, name)
VALUES (2188, '520299', 'Biological Psychology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2189, '520301', 'Clinical Neuropsychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2190, '520302', 'Clinical Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2191, '520303', 'Counselling Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2192, '520304', 'Health Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2193, '520399', 'Clinical And Health Psychology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2194, '520401', 'Cognition');
INSERT INTO dev.for_code (id, code, name)
VALUES (2195, '520402', 'Decision Making');
INSERT INTO dev.for_code (id, code, name)
VALUES (2196, '520403', 'Learning, Motivation And Emotion');
INSERT INTO dev.for_code (id, code, name)
VALUES (2197, '520404', 'Memory And Attention');
INSERT INTO dev.for_code (id, code, name)
VALUES (2198, '520405', 'Psycholinguistics (Incl. Speech Production And Comprehension)');
INSERT INTO dev.for_code (id, code, name)
VALUES (2199, '520406', 'Sensory Processes, Perception And Performance');
INSERT INTO dev.for_code (id, code, name)
VALUES (2200, '520499', 'Cognitive And Computational Psychology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2201, '520501', 'Community Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2202, '520502', 'Gender Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2203, '520503', 'Personality And Individual Differences');
INSERT INTO dev.for_code (id, code, name)
VALUES (2204, '520504', 'Psychology Of Religion');
INSERT INTO dev.for_code (id, code, name)
VALUES (2205, '520505', 'Social Psychology');
INSERT INTO dev.for_code (id, code, name)
VALUES (2206, '520599', 'Social And Personality Psychology Not Elsewhere Classified');
INSERT INTO dev.for_code (id, code, name)
VALUES (2207, '529999', 'Other Psychology Not Elsewhere Classified');

create table seo_code
(
    id   bigint auto_increment
        primary key,
    code varchar(255) null,
    name varchar(255) null
);

INSERT INTO dev.seo_code (id, code, name)
VALUES (1, '10', 'Animal Production And Animal Primary Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (2, '11', 'Commercial Services And Tourism');
INSERT INTO dev.seo_code (id, code, name)
VALUES (3, '12', 'Construction');
INSERT INTO dev.seo_code (id, code, name)
VALUES (4, '13', 'Culture And Society');
INSERT INTO dev.seo_code (id, code, name)
VALUES (5, '14', 'Defence');
INSERT INTO dev.seo_code (id, code, name)
VALUES (6, '15', 'Economic Framework');
INSERT INTO dev.seo_code (id, code, name)
VALUES (7, '16', 'Education And Training');
INSERT INTO dev.seo_code (id, code, name)
VALUES (8, '17', 'Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (9, '18', 'Environmental Management');
INSERT INTO dev.seo_code (id, code, name)
VALUES (10, '19', 'Environmental Policy, Climate Change And Natural Hazards');
INSERT INTO dev.seo_code (id, code, name)
VALUES (11, '20', 'Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (12, '21', 'Indigenous');
INSERT INTO dev.seo_code (id, code, name)
VALUES (13, '22', 'Information And Communication Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (14, '23', 'Law, Politics And Community Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (15, '24', 'Manufacturing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (16, '25', 'Mineral Resources (Excl. Energy Resources)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (17, '26', 'Plant Production And Plant Primary Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (18, '27', 'Transport');
INSERT INTO dev.seo_code (id, code, name)
VALUES (19, '28', 'Expanding Knowledge');
INSERT INTO dev.seo_code (id, code, name)
VALUES (20, '1001', 'Environmentally Sustainable Animal Production');
INSERT INTO dev.seo_code (id, code, name)
VALUES (21, '1002', 'Fisheries - Aquaculture');
INSERT INTO dev.seo_code (id, code, name)
VALUES (22, '1003', 'Fisheries - Wild Caught');
INSERT INTO dev.seo_code (id, code, name)
VALUES (23, '1004', 'Livestock Raising');
INSERT INTO dev.seo_code (id, code, name)
VALUES (24, '1005', 'Pasture, Browse And Fodder Crops');
INSERT INTO dev.seo_code (id, code, name)
VALUES (25, '1006', 'Primary Products From Animals');
INSERT INTO dev.seo_code (id, code, name)
VALUES (26, '1099', 'Other Animal Production');
INSERT INTO dev.seo_code (id, code, name)
VALUES (27, '1099', 'Other Animal Production And Animal Primary Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (28, '1101', 'Environmentally Sustainable Commercial Services And Tourism');
INSERT INTO dev.seo_code (id, code, name)
VALUES (29, '1102', 'Financial Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (30, '1103', 'Property, Business Support Services And Trade');
INSERT INTO dev.seo_code (id, code, name)
VALUES (31, '1104', 'Tourism Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (32, '1105', 'Water And Waste Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (33, '1199', 'Other Commercial Services And Tourism');
INSERT INTO dev.seo_code (id, code, name)
VALUES (34, '1201', 'Building Management And Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (35, '1202', 'Construction Design');
INSERT INTO dev.seo_code (id, code, name)
VALUES (36, '1203', 'Construction Materials Performance And Processes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (37, '1204', 'Construction Planning');
INSERT INTO dev.seo_code (id, code, name)
VALUES (38, '1205', 'Construction Processes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (39, '1206', 'Environmentally Sustainable Construction Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (40, '1299', 'Other Construction');
INSERT INTO dev.seo_code (id, code, name)
VALUES (41, '1301', 'Arts');
INSERT INTO dev.seo_code (id, code, name)
VALUES (42, '1302', 'Communication');
INSERT INTO dev.seo_code (id, code, name)
VALUES (43, '1303', 'Ethics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (44, '1304', 'Heritage');
INSERT INTO dev.seo_code (id, code, name)
VALUES (45, '1305', 'Religion');
INSERT INTO dev.seo_code (id, code, name)
VALUES (46, '1306', 'Sport, Exercise And Recreation');
INSERT INTO dev.seo_code (id, code, name)
VALUES (47, '1307', 'Understanding Past Societies');
INSERT INTO dev.seo_code (id, code, name)
VALUES (48, '1399', 'Other Culture And Society');
INSERT INTO dev.seo_code (id, code, name)
VALUES (49, '1401', 'Defence');
INSERT INTO dev.seo_code (id, code, name)
VALUES (50, '1501', 'International Trade Policy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (51, '1502', 'Macroeconomics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (52, '1503', 'Management And Productivity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (53, '1504', 'Measurement Standards And Calibration Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (54, '1505', 'Microeconomics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (55, '1599', 'Other Economic Framework');
INSERT INTO dev.seo_code (id, code, name)
VALUES (56, '1601', 'Learner And Learning');
INSERT INTO dev.seo_code (id, code, name)
VALUES (57, '1602', 'Schools And Learning Environments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (58, '1603', 'Teaching And Curriculum');
INSERT INTO dev.seo_code (id, code, name)
VALUES (59, '1699', 'Other Education And Training');
INSERT INTO dev.seo_code (id, code, name)
VALUES (60, '1701', 'Energy Efficiency');
INSERT INTO dev.seo_code (id, code, name)
VALUES (61, '1702', 'Energy Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (62, '1703', 'Energy Storage, Distribution And Supply');
INSERT INTO dev.seo_code (id, code, name)
VALUES (63, '1704', 'Energy Transformation');
INSERT INTO dev.seo_code (id, code, name)
VALUES (64, '1705', 'Environmentally Sustainable Energy Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (65, '1706', 'Mining And Extraction Of Energy Resources');
INSERT INTO dev.seo_code (id, code, name)
VALUES (66, '1707', 'Processing Of Energy Sources');
INSERT INTO dev.seo_code (id, code, name)
VALUES (67, '1708', 'Renewable Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (68, '1799', 'Other Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (69, '1801', 'Air Quality, Atmosphere And Weather');
INSERT INTO dev.seo_code (id, code, name)
VALUES (70, '1802', 'Coastal And Estuarine Systems And Management');
INSERT INTO dev.seo_code (id, code, name)
VALUES (71, '1803', 'Fresh, Ground And Surface Water Systems And Management');
INSERT INTO dev.seo_code (id, code, name)
VALUES (72, '1804', 'Management Of Antarctic And Southern Ocean Environments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (73, '1805', 'Marine Systems And Management');
INSERT INTO dev.seo_code (id, code, name)
VALUES (74, '1806', 'Terrestrial Systems And Management');
INSERT INTO dev.seo_code (id, code, name)
VALUES (75, '1899', 'Other Environmental Management ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (76, '1901', 'Adaptation To Climate Change');
INSERT INTO dev.seo_code (id, code, name)
VALUES (77, '1902', 'Environmental Policy, Legislation And Standards');
INSERT INTO dev.seo_code (id, code, name)
VALUES (78, '1903', 'Mitigation Of Climate Change');
INSERT INTO dev.seo_code (id, code, name)
VALUES (79, '1904', 'Natural Hazards');
INSERT INTO dev.seo_code (id, code, name)
VALUES (80, '1905', 'Understanding Climate Change');
INSERT INTO dev.seo_code (id, code, name)
VALUES (81, '1999', 'Other Environmental Policy, Climate Change And Natural Hazards');
INSERT INTO dev.seo_code (id, code, name)
VALUES (82, '2001', 'Clinical Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (83, '2002', 'Evaluation Of Health And Support Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (84, '2003', 'Provision Of Health And Support Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (85, '2004', 'Public Health (Excl. Specific Population Health)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (86, '2005', 'Specific Population Health (Excl. Indigenous Health)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (87, '2099', 'Other Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (88, '2101', 'Aboriginal And Torres Strait Islander Community Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (89, '2102', 'Aboriginal And Torres Strait Islander Education');
INSERT INTO dev.seo_code (id, code, name)
VALUES (90, '2103', 'Aboriginal And Torres Strait Islander Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (91, '2104', 'Aboriginal And Torres Strait Islander Heritage And Culture');
INSERT INTO dev.seo_code (id, code, name)
VALUES (92, '2105', 'Ngā Ratonga Hapori Māori (Māori Community Services)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (93, '2106', 'Mātauranga Māori (Māori Education)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (94, '2107', 'Te Hauora (Hauora Māori) (Māori Health)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (95, '2108', 'Te Tuku Ihotanga Me Te Ahurea Māori (Māori Heritage And Culture)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (96, '2109', 'Pacific Peoples Community Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (97, '2110', 'Pacific Peoples Education');
INSERT INTO dev.seo_code (id, code, name)
VALUES (98, '2111', 'Pacific Peoples Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (99, '2112', 'Pacific Peoples Heritage And Culture');
INSERT INTO dev.seo_code (id, code, name)
VALUES (100, '2199', 'Other Indigenous');
INSERT INTO dev.seo_code (id, code, name)
VALUES (101, '2201', 'Communication Technologies, Systems And Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (102, '2202', 'Environmentally Sustainable Information And Communication Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (103, '2203', 'Information Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (104, '2204', 'Information Systems, Technologies And Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (105, '2205', 'Media Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (106, '2299', 'Other Information And Communication Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (107, '2301', 'Community Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (108, '2302', 'Government And Politics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (109, '2303', 'International Relations');
INSERT INTO dev.seo_code (id, code, name)
VALUES (110, '2304', 'Justice And The Law');
INSERT INTO dev.seo_code (id, code, name)
VALUES (111, '2305', 'Work And Labour Market');
INSERT INTO dev.seo_code (id, code, name)
VALUES (112, '2399', 'Other Law, Politics And Community Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (113, '2401', 'Agricultural Chemicals');
INSERT INTO dev.seo_code (id, code, name)
VALUES (114, '2402', 'Basic Metal Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (115, '2403', 'Ceramics, Glass And Industrial Mineral Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (116, '2404', 'Computer, Electronic And Communication Equipment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (117, '2405', 'Dairy Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (118, '2406', 'Environmentally Sustainable Manufacturing Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (119, '2407', 'Fabricated Metal Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (120, '2408', 'Human Pharmaceutical Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (121, '2409', 'Industrial Chemicals And Related Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (122, '2410', 'Instrumentation');
INSERT INTO dev.seo_code (id, code, name)
VALUES (123, '2411', 'Leather Products, Fibre Processing And Textiles');
INSERT INTO dev.seo_code (id, code, name)
VALUES (124, '2412', 'Machinery And Equipment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (125, '2413', 'Processed Food Products And Beverages (Excl. Dairy Products)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (126, '2414', 'Processed Non-Food Agriculture Products (Excl. Wood, Paper And Fibre)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (127, '2415', 'Transport Equipment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (128, '2416', 'Veterinary Pharmaceutical Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (129, '2417', 'Wood, Wood Products And Paper');
INSERT INTO dev.seo_code (id, code, name)
VALUES (130, '2499', 'Other Manufacturing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (131, '2501', 'Environmentally Sustainable Mineral Resource Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (132, '2502', 'First Stage Treatment Of Minerals');
INSERT INTO dev.seo_code (id, code, name)
VALUES (133, '2503', 'Mineral Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (134, '2504', 'Primary Mining And Extraction Of Minerals');
INSERT INTO dev.seo_code (id, code, name)
VALUES (135, '2599', 'Other Mineral Resources (Excl. Energy Resources)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (136, '2601', 'Environmentally Sustainable Plant Production');
INSERT INTO dev.seo_code (id, code, name)
VALUES (137, '2602', 'Forestry');
INSERT INTO dev.seo_code (id, code, name)
VALUES (138, '2603', 'Grains And Seeds');
INSERT INTO dev.seo_code (id, code, name)
VALUES (139, '2604', 'Harvesting And Packaging Of Plant Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (140, '2605', 'Horticultural Crops');
INSERT INTO dev.seo_code (id, code, name)
VALUES (141, '2606', 'Industrial Crops');
INSERT INTO dev.seo_code (id, code, name)
VALUES (142, '2699', 'Other Plant Production And Plant Primary Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (143, '2701', 'Aerospace Transport');
INSERT INTO dev.seo_code (id, code, name)
VALUES (144, '2702', 'Environmentally Sustainable Transport Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (145, '2703', 'Ground Transport');
INSERT INTO dev.seo_code (id, code, name)
VALUES (146, '2704', 'Water Transport');
INSERT INTO dev.seo_code (id, code, name)
VALUES (147, '2799', 'Other Transport');
INSERT INTO dev.seo_code (id, code, name)
VALUES (148, '2801', 'Expanding Knowledge');
INSERT INTO dev.seo_code (id, code, name)
VALUES (149, '100101', 'Management Of Gaseous Waste From Animal Production (Excl. Greenhouse Gases)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (150, '100102', 'Management Of Liquid Waste From Animal Production (Excl. Water)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (151, '100103', 'Management Of Solid Waste From Animal Production');
INSERT INTO dev.seo_code (id, code, name)
VALUES (152, '100104', 'Management Of Water Consumption By Animal Production');
INSERT INTO dev.seo_code (id, code, name)
VALUES (153, '100199', 'Environmentally Sustainable Animal Production Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (154, '100201', 'Aquaculture Crustaceans (Excl. Rock Lobster And Prawns)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (155, '100202', 'Aquaculture Fin Fish (Excl. Tuna)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (156, '100203', 'Aquaculture Molluscs (Excl. Oysters)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (157, '100204', 'Aquaculture Oysters');
INSERT INTO dev.seo_code (id, code, name)
VALUES (158, '100205', 'Aquaculture Prawns');
INSERT INTO dev.seo_code (id, code, name)
VALUES (159, '100206', 'Aquaculture Rock Lobster');
INSERT INTO dev.seo_code (id, code, name)
VALUES (160, '100207', 'Aquaculture Tuna');
INSERT INTO dev.seo_code (id, code, name)
VALUES (161, '100299', 'Fisheries - Aquaculture Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (162, '100301', 'Fisheries - Recreational Freshwater');
INSERT INTO dev.seo_code (id, code, name)
VALUES (163, '100302', 'Fisheries - Recreational Marine ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (164, '100303', 'Wild Caught Crustaceans (Excl. Rock Lobster And Prawns)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (165, '100304', 'Wild Caught Edible Molluscs');
INSERT INTO dev.seo_code (id, code, name)
VALUES (166, '100305', 'Wild Caught Fin Fish (Excl. Tuna)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (167, '100306', 'Wild Caught Prawns');
INSERT INTO dev.seo_code (id, code, name)
VALUES (168, '100307', 'Wild Caught Rock Lobster');
INSERT INTO dev.seo_code (id, code, name)
VALUES (169, '100308', 'Wild Caught Tuna');
INSERT INTO dev.seo_code (id, code, name)
VALUES (170, '100399', 'Fisheries - Wild Caught Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (171, '100401', 'Beef Cattle');
INSERT INTO dev.seo_code (id, code, name)
VALUES (172, '100402', 'Dairy Cattle');
INSERT INTO dev.seo_code (id, code, name)
VALUES (173, '100403', 'Deer');
INSERT INTO dev.seo_code (id, code, name)
VALUES (174, '100404', 'Game Livestock (E.G. Kangaroos, Wallabies, Camels, Buffaloes)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (175, '100405', 'Goats');
INSERT INTO dev.seo_code (id, code, name)
VALUES (176, '100406', 'Horses');
INSERT INTO dev.seo_code (id, code, name)
VALUES (177, '100407', 'Insects');
INSERT INTO dev.seo_code (id, code, name)
VALUES (178, '100408', 'Minor Livestock (E.G. Alpacas, Ostriches, Crocodiles, Farmed Rabbits)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (179, '100409', 'Non-Cattle Dairy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (180, '100410', 'Pigs');
INSERT INTO dev.seo_code (id, code, name)
VALUES (181, '100411', 'Poultry');
INSERT INTO dev.seo_code (id, code, name)
VALUES (182, '100412', 'Sheep For Meat');
INSERT INTO dev.seo_code (id, code, name)
VALUES (183, '100413', 'Sheep For Wool');
INSERT INTO dev.seo_code (id, code, name)
VALUES (184, '100499', 'Livestock Raising Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (185, '100501', 'Browse Crops');
INSERT INTO dev.seo_code (id, code, name)
VALUES (186, '100502', 'Lucerne');
INSERT INTO dev.seo_code (id, code, name)
VALUES (187, '100503', 'Native And Residual Pastures');
INSERT INTO dev.seo_code (id, code, name)
VALUES (188, '100504', 'Non-Cereal Crops (Non-Cereal Crops For Hay/Silage/Green Feed)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (189, '100505', 'Sown Pastures (Excl. Lucerne)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (190, '100599', 'Pasture, Browse And Fodder Crops Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (191, '100601', 'Eggs');
INSERT INTO dev.seo_code (id, code, name)
VALUES (192, '100602', 'Honey');
INSERT INTO dev.seo_code (id, code, name)
VALUES (193, '100603', 'Pearls');
INSERT INTO dev.seo_code (id, code, name)
VALUES (194, '100604', 'Raw Wool');
INSERT INTO dev.seo_code (id, code, name)
VALUES (195, '100605', 'Unprocessed Or Minimally Processed Fish');
INSERT INTO dev.seo_code (id, code, name)
VALUES (196, '100606', 'Unprocessed Or Minimally Processed Milk');
INSERT INTO dev.seo_code (id, code, name)
VALUES (197, '100699', 'Primary Products From Animals Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (198, '109901', 'Animal Adaptation To Climate Change ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (199, '109902', 'Animal Welfare');
INSERT INTO dev.seo_code (id, code, name)
VALUES (200, '109903', 'Fish Product Traceability And Quality Assurance');
INSERT INTO dev.seo_code (id, code, name)
VALUES (201, '109904', 'Livestock Product Traceability And Quality Assurance');
INSERT INTO dev.seo_code (id, code, name)
VALUES (202, '109999', 'Other Animal Production And Animal Primary Products Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (203, '110101', 'Management Of Gaseous Waste From Commercial Services And Tourism (Excl. Greenhouse Gases)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (204, '110102', 'Management Of Liquid Waste From Commercial Services And Tourism (Excl. Water)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (205, '110103', 'Management Of Solid Waste From Commercial Services And Tourism');
INSERT INTO dev.seo_code (id, code, name)
VALUES (206, '110104', 'Management Of Water Consumption By Commercial Services And Tourism');
INSERT INTO dev.seo_code (id, code, name)
VALUES (207, '110199', 'Environmentally Sustainable Commercial Services And Tourism Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (208, '110201', 'Finance Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (209, '110202', 'Investment Services (Excl. Superannuation)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (210, '110203', 'Superannuation And Insurance Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (211, '110299', 'Financial Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (212, '110301', 'Administration And Business Support Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (213, '110302', 'Professional, Scientific And Technical Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (214, '110303', 'Property Services (Incl. Security)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (215, '110304', 'Wholesale And Retail Trade');
INSERT INTO dev.seo_code (id, code, name)
VALUES (216, '110399', 'Property, Business Support Services And Trade Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (217, '110401', 'Economic Issues In Tourism');
INSERT INTO dev.seo_code (id, code, name)
VALUES (218, '110402', 'Socio-Cultural Issues In Tourism');
INSERT INTO dev.seo_code (id, code, name)
VALUES (219, '110403', 'Tourism Infrastructure Development');
INSERT INTO dev.seo_code (id, code, name)
VALUES (220, '110499', 'Tourism Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (221, '110501', 'Waste Management Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (222, '110502', 'Waste Recycling Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (223, '110503', 'Water Recycling Services (Incl. Sewage And Greywater)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (224, '110504', 'Water Services And Utilities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (225, '110599', 'Water And Waste Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (226, '119901', 'Hospitality Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (227, '119902', 'Recreational Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (228, '119999', 'Other Commercial Services And Tourism Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (229, '120101', 'Civil Building Management And Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (230, '120102', 'Commercial Building Management And Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (231, '120103', 'Industrial Building Management And Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (232, '120104', 'Institutional Building Management And Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (233, '120105', 'Residential Building Management And Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (234, '120199', 'Building Management And Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (235, '120201', 'Civil Construction Design');
INSERT INTO dev.seo_code (id, code, name)
VALUES (236, '120202', 'Commercial Construction Design');
INSERT INTO dev.seo_code (id, code, name)
VALUES (237, '120203', 'Industrial Construction Design');
INSERT INTO dev.seo_code (id, code, name)
VALUES (238, '120204', 'Institutional Construction Design');
INSERT INTO dev.seo_code (id, code, name)
VALUES (239, '120205', 'Residential Construction Design');
INSERT INTO dev.seo_code (id, code, name)
VALUES (240, '120299', 'Construction Design Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (241, '120301', 'Cement And Concrete Materials');
INSERT INTO dev.seo_code (id, code, name)
VALUES (242, '120302', 'Glass Materials');
INSERT INTO dev.seo_code (id, code, name)
VALUES (243, '120303', 'Metals ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (244, '120304', 'Polymeric Materials And Paints');
INSERT INTO dev.seo_code (id, code, name)
VALUES (245, '120305', 'Stone, Ceramics And Clay Materials');
INSERT INTO dev.seo_code (id, code, name)
VALUES (246, '120306', 'Timber Materials');
INSERT INTO dev.seo_code (id, code, name)
VALUES (247, '120399', 'Construction Materials Performance And Processes Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (248, '120401', 'Civil Construction Planning');
INSERT INTO dev.seo_code (id, code, name)
VALUES (249, '120402', 'Commercial Construction Planning');
INSERT INTO dev.seo_code (id, code, name)
VALUES (250, '120403', 'Industrial Construction Planning');
INSERT INTO dev.seo_code (id, code, name)
VALUES (251, '120404', 'Regional Planning');
INSERT INTO dev.seo_code (id, code, name)
VALUES (252, '120405', 'Residential Construction Planning');
INSERT INTO dev.seo_code (id, code, name)
VALUES (253, '120406', 'Urban Planning');
INSERT INTO dev.seo_code (id, code, name)
VALUES (254, '120499', 'Construction Planning Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (255, '120501', 'Civil Construction Processes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (256, '120502', 'Commercial Construction Processes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (257, '120503', 'Industrial Construction Processes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (258, '120504', 'Institutional Construction Processes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (259, '120505', 'Residential Construction Processes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (260, '120599', 'Construction Processes Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (261, '120601', 'Management Of Gaseous Waste From Construction Activities (Excl. Greenhouse Gases)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (262, '120602', 'Management Of Liquid Waste From Construction Activities (Excl. Water)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (263, '120603', 'Management Of Solid Waste From Construction Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (264, '120604', 'Management Of Water Consumption By Construction Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (265, '120699', 'Environmentally Sustainable Construction Activities Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (266, '129901', 'Adaptation To Climate Change In Construction');
INSERT INTO dev.seo_code (id, code, name)
VALUES (267, '129999', 'Other Construction Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (268, '130101', 'Design');
INSERT INTO dev.seo_code (id, code, name)
VALUES (269, '130102', 'Music');
INSERT INTO dev.seo_code (id, code, name)
VALUES (270, '130103', 'The Creative Arts ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (271, '130104', 'The Performing Arts ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (272, '130199', 'Arts Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (273, '130201', 'Communication Across Languages And Culture');
INSERT INTO dev.seo_code (id, code, name)
VALUES (274, '130202', 'Languages And Linguistics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (275, '130203', 'Literature');
INSERT INTO dev.seo_code (id, code, name)
VALUES (276, '130204', 'The Media');
INSERT INTO dev.seo_code (id, code, name)
VALUES (277, '130205', 'Visual Communication');
INSERT INTO dev.seo_code (id, code, name)
VALUES (278, '130299', 'Communication Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (279, '130301', 'Bioethics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (280, '130302', 'Business Ethics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (281, '130303', 'Environmental Ethics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (282, '130304', 'Social Ethics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (283, '130305', 'Technological Ethics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (284, '130306', 'Workplace And Organisational Ethics (Excl. Business Ethics)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (285, '130399', 'Ethics Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (286, '130401', 'Assessment Of Heritage Value');
INSERT INTO dev.seo_code (id, code, name)
VALUES (287, '130402', 'Conserving Collections And Movable Cultural Heritage');
INSERT INTO dev.seo_code (id, code, name)
VALUES (288, '130403', 'Conserving Intangible Cultural Heritage');
INSERT INTO dev.seo_code (id, code, name)
VALUES (289, '130404', 'Conserving Natural Heritage');
INSERT INTO dev.seo_code (id, code, name)
VALUES (290, '130405', 'Conserving The Historic Environment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (291, '130499', 'Heritage Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (292, '130501', 'Religion And Society');
INSERT INTO dev.seo_code (id, code, name)
VALUES (293, '130502', 'Religious Philosophies And Belief Systems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (294, '130503', 'Religious Rituals And Traditions (Excl. Structures)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (295, '130504', 'Religious Structures');
INSERT INTO dev.seo_code (id, code, name)
VALUES (296, '130599', 'Religion Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (297, '130601', 'Exercise');
INSERT INTO dev.seo_code (id, code, name)
VALUES (298, '130602', 'Organised Sports');
INSERT INTO dev.seo_code (id, code, name)
VALUES (299, '130603', 'Recreation And Leisure Activities (Excl. Sport And Exercise)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (300, '130699', 'Sport, Exercise And Recreation Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (301, '130701', 'Understanding Africa’S Past');
INSERT INTO dev.seo_code (id, code, name)
VALUES (302, '130702', 'Understanding Asia’S Past');
INSERT INTO dev.seo_code (id, code, name)
VALUES (303, '130703', 'Understanding Australia’S Past');
INSERT INTO dev.seo_code (id, code, name)
VALUES (304, '130704', 'Understanding Europe’S Past');
INSERT INTO dev.seo_code (id, code, name)
VALUES (305, '130705', 'Understanding New Zealand’S Past');
INSERT INTO dev.seo_code (id, code, name)
VALUES (306, '130706', 'Understanding The Past Of The Americas');
INSERT INTO dev.seo_code (id, code, name)
VALUES (307, '130799', 'Understanding Past Societies Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (308, '139999', 'Other Culture And Society Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (309, '140101', 'Air');
INSERT INTO dev.seo_code (id, code, name)
VALUES (310, '140102', 'Command, Control And Communications');
INSERT INTO dev.seo_code (id, code, name)
VALUES (311, '140103', 'Cyber And Electronic Security And Warfare');
INSERT INTO dev.seo_code (id, code, name)
VALUES (312, '140104', 'Emerging Defence Technologies');
INSERT INTO dev.seo_code (id, code, name)
VALUES (313, '140105', 'Intelligence, Surveillance And Space');
INSERT INTO dev.seo_code (id, code, name)
VALUES (314, '140106', 'Land');
INSERT INTO dev.seo_code (id, code, name)
VALUES (315, '140107', 'Logistics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (316, '140108', 'Maritime');
INSERT INTO dev.seo_code (id, code, name)
VALUES (317, '140109', 'National Security');
INSERT INTO dev.seo_code (id, code, name)
VALUES (318, '140110', 'Personnel');
INSERT INTO dev.seo_code (id, code, name)
VALUES (319, '140199', 'Defence Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (320, '150101', 'International Agreements On Trade');
INSERT INTO dev.seo_code (id, code, name)
VALUES (321, '150102', 'Trade Assistance And Protection');
INSERT INTO dev.seo_code (id, code, name)
VALUES (322, '150103', 'Trade Policy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (323, '150199', 'International Trade Policy Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (324, '150201', 'Balance Of Payments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (325, '150202', 'Demography');
INSERT INTO dev.seo_code (id, code, name)
VALUES (326, '150203', 'Economic Growth');
INSERT INTO dev.seo_code (id, code, name)
VALUES (327, '150204', 'Exchange Rates');
INSERT INTO dev.seo_code (id, code, name)
VALUES (328, '150205', 'Fiscal Policy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (329, '150206', 'Income Distribution');
INSERT INTO dev.seo_code (id, code, name)
VALUES (330, '150207', 'Macro Labour Market Issues');
INSERT INTO dev.seo_code (id, code, name)
VALUES (331, '150208', 'Monetary Policy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (332, '150209', 'Savings And Investments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (333, '150210', 'Taxation');
INSERT INTO dev.seo_code (id, code, name)
VALUES (334, '150299', 'Macroeconomics Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (335, '150301', 'Industrial Relations');
INSERT INTO dev.seo_code (id, code, name)
VALUES (336, '150302', 'Management');
INSERT INTO dev.seo_code (id, code, name)
VALUES (337, '150303', 'Marketing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (338, '150304', 'Productivity (Excl. Public Sector)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (339, '150305', 'Public Sector Productivity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (340, '150306', 'Technological And Organisational Innovation');
INSERT INTO dev.seo_code (id, code, name)
VALUES (341, '150399', 'Management And Productivity Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (342, '150401', 'Agricultural And Environmental Standards And Calibrations');
INSERT INTO dev.seo_code (id, code, name)
VALUES (343, '150402', 'Defence Standards And Calibrations');
INSERT INTO dev.seo_code (id, code, name)
VALUES (344, '150403', 'Manufacturing Standards And Calibrations');
INSERT INTO dev.seo_code (id, code, name)
VALUES (345, '150404', 'Service Industries Standards And Calibrations');
INSERT INTO dev.seo_code (id, code, name)
VALUES (346, '150499', 'Measurement Standards And Calibration Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (347, '150501', 'Consumption');
INSERT INTO dev.seo_code (id, code, name)
VALUES (348, '150502', 'Human Capital Issues');
INSERT INTO dev.seo_code (id, code, name)
VALUES (349, '150503', 'Industrial Organisations');
INSERT INTO dev.seo_code (id, code, name)
VALUES (350, '150504', 'Industry Costs And Structure');
INSERT INTO dev.seo_code (id, code, name)
VALUES (351, '150505', 'Industry Policy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (352, '150506', 'Market-Based Mechanisms');
INSERT INTO dev.seo_code (id, code, name)
VALUES (353, '150507', 'Micro Labour Market Issues');
INSERT INTO dev.seo_code (id, code, name)
VALUES (354, '150508', 'Microeconomic Effects Of Taxation');
INSERT INTO dev.seo_code (id, code, name)
VALUES (355, '150509', 'Preference, Behaviour And Welfare');
INSERT INTO dev.seo_code (id, code, name)
VALUES (356, '150510', 'Production');
INSERT INTO dev.seo_code (id, code, name)
VALUES (357, '150511', 'Supply And Demand');
INSERT INTO dev.seo_code (id, code, name)
VALUES (358, '150599', 'Microeconomics Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (359, '159901', 'Carbon And Emissions Trading');
INSERT INTO dev.seo_code (id, code, name)
VALUES (360, '159902', 'Ecological Economics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (361, '159999', 'Other Economic Framework Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (362, '160101', 'Early Childhood Education');
INSERT INTO dev.seo_code (id, code, name)
VALUES (363, '160102', 'Higher Education');
INSERT INTO dev.seo_code (id, code, name)
VALUES (364, '160103', 'Primary Education');
INSERT INTO dev.seo_code (id, code, name)
VALUES (365, '160104', 'Professional Development And Adult Education');
INSERT INTO dev.seo_code (id, code, name)
VALUES (366, '160105', 'Secondary Education');
INSERT INTO dev.seo_code (id, code, name)
VALUES (367, '160199', 'Learner And Learning Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (368, '160201', 'Equity And Access To Education');
INSERT INTO dev.seo_code (id, code, name)
VALUES (369, '160202', 'Gender Aspects In Education');
INSERT INTO dev.seo_code (id, code, name)
VALUES (370, '160203', 'Inclusive Education');
INSERT INTO dev.seo_code (id, code, name)
VALUES (371, '160204', 'Management, Resources And Leadership');
INSERT INTO dev.seo_code (id, code, name)
VALUES (372, '160205', 'Policies And Development');
INSERT INTO dev.seo_code (id, code, name)
VALUES (373, '160206', 'Workforce Transition And Employment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (374, '160299', 'Schools And Learning Environments Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (375, '160301', 'Assessment, Development And Evaluation Of Curriculum');
INSERT INTO dev.seo_code (id, code, name)
VALUES (376, '160302', 'Pedagogy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (377, '160303', 'Teacher And Instructor Development');
INSERT INTO dev.seo_code (id, code, name)
VALUES (378, '160304', 'Teaching And Instruction Technologies');
INSERT INTO dev.seo_code (id, code, name)
VALUES (379, '160399', 'Teaching And Curriculum Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (380, '169999', 'Other Education And Training Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (381, '170101', 'Commercial Energy Efficiency');
INSERT INTO dev.seo_code (id, code, name)
VALUES (382, '170102', 'Industrial Energy Efficiency');
INSERT INTO dev.seo_code (id, code, name)
VALUES (383, '170103', 'Residential Energy Efficiency');
INSERT INTO dev.seo_code (id, code, name)
VALUES (384, '170104', 'Transport Energy Efficiency');
INSERT INTO dev.seo_code (id, code, name)
VALUES (385, '170199', 'Energy Efficiency Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (386, '170201', 'Coal Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (387, '170202', 'Geothermal Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (388, '170203', 'Oil And Gas Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (389, '170204', 'Oil Shale And Tar Sands Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (390, '170205', 'Uranium Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (391, '170299', 'Energy Exploration Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (392, '170301', 'Battery Storage');
INSERT INTO dev.seo_code (id, code, name)
VALUES (393, '170302', 'Carbon Capture And Storage');
INSERT INTO dev.seo_code (id, code, name)
VALUES (394, '170303', 'Energy Services And Utilities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (395, '170304', 'Energy Storage (Excl. Hydrogen And Batteries)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (396, '170305', 'Energy Systems And Analysis');
INSERT INTO dev.seo_code (id, code, name)
VALUES (397, '170306', 'Energy Transmission And Distribution (Excl. Hydrogen)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (398, '170307', 'Hydrogen Distribution');
INSERT INTO dev.seo_code (id, code, name)
VALUES (399, '170308', 'Hydrogen Storage');
INSERT INTO dev.seo_code (id, code, name)
VALUES (400, '170309', 'Smart Grids');
INSERT INTO dev.seo_code (id, code, name)
VALUES (401, '170399', 'Energy Storage, Distribution And Supply Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (402, '170401', 'Fuel Cells (Excl. Solid Oxide)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (403, '170402', 'Hydrogen-Based Energy Systems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (404, '170403', 'Nuclear Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (405, '170404', 'Solid Oxide Fuel Cells');
INSERT INTO dev.seo_code (id, code, name)
VALUES (406, '170405', 'Transformation Of Coal Into Electricity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (407, '170406', 'Transformation Of Coal Into Fuels');
INSERT INTO dev.seo_code (id, code, name)
VALUES (408, '170407', 'Transformation Of Electricity And Material Feedstocks Into Fuels');
INSERT INTO dev.seo_code (id, code, name)
VALUES (409, '170408', 'Transformation Of Gas Into Electricity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (410, '170409', 'Transformation Of Gas Into Fuels');
INSERT INTO dev.seo_code (id, code, name)
VALUES (411, '170499', 'Energy Transformation Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (412, '170501', 'Management Of Gaseous Waste From Energy Activities (Excl. Greenhouse Gases)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (413, '170502', 'Management Of Liquid Waste From Energy Activities (Excl. Water)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (414, '170503', 'Management Of Solid Waste From Energy Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (415, '170504', 'Management Of Water Consumption By Energy Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (416, '170599', 'Environmentally Sustainable Energy Activities Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (417, '170601', 'Coal Mining And Extraction');
INSERT INTO dev.seo_code (id, code, name)
VALUES (418, '170602', 'Geothermal Energy Extraction');
INSERT INTO dev.seo_code (id, code, name)
VALUES (419, '170603', 'Oil And Gas Extraction');
INSERT INTO dev.seo_code (id, code, name)
VALUES (420, '170604', 'Oil Shale And Tar Sands Mining And Extraction');
INSERT INTO dev.seo_code (id, code, name)
VALUES (421, '170605', 'Uranium Mining And Extraction');
INSERT INTO dev.seo_code (id, code, name)
VALUES (422, '170699', 'Mining And Extraction Of Energy Resources Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (423, '170701', 'Biomass Processing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (424, '170702', 'Hydrogen Production From Fossil Fuels');
INSERT INTO dev.seo_code (id, code, name)
VALUES (425, '170703', 'Hydrogen Production From Nuclear Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (426, '170704', 'Hydrogen Production From Renewable Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (427, '170705', 'Oil And Gas Processing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (428, '170706', 'Preparation Of Black Coal');
INSERT INTO dev.seo_code (id, code, name)
VALUES (429, '170707', 'Preparation Of Brown Coal (Lignite)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (430, '170708', 'Preparation Of Oil Shale And Tar Sands');
INSERT INTO dev.seo_code (id, code, name)
VALUES (431, '170709', 'Preparation Of Uranium');
INSERT INTO dev.seo_code (id, code, name)
VALUES (432, '170799', 'Processing Of Energy Sources Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (433, '170801', 'Biofuel Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (434, '170802', 'Geothermal Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (435, '170803', 'Hydro-Electric Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (436, '170804', 'Solar-Photovoltaic Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (437, '170805', 'Solar-Thermal Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (438, '170806', 'Tidal Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (439, '170807', 'Wave Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (440, '170808', 'Wind Energy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (441, '170899', 'Renewable Energy Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (442, '179999', 'Other Energy Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (443, '180101', 'Air Quality');
INSERT INTO dev.seo_code (id, code, name)
VALUES (444, '180102', 'Atmospheric Composition (Incl. Greenhouse Gas Inventory)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (445, '180103', 'Atmospheric Processes And Dynamics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (446, '180104', 'Weather');
INSERT INTO dev.seo_code (id, code, name)
VALUES (447, '180199', 'Air Quality, Atmosphere And Weather Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (448, '180201', 'Assessment And Management Of Coastal And Estuarine Ecosystems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (449, '180202', 'Coastal Erosion');
INSERT INTO dev.seo_code (id, code, name)
VALUES (450, '180203', 'Coastal Or Estuarine Biodiversity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (451, '180204', 'Control Of Pests, Diseases And Exotic Species In Coastal And Estuarine Environments ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (452, '180205', 'Measurement And Assessment Of Estuarine Water Quality ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (453, '180206', 'Rehabilitation Or Conservation Of Coastal Or Estuarine Environments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (454, '180299', 'Coastal And Estuarine Systems And Management Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (455, '180301', 'Assessment And Management Of Freshwater Ecosystems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (456, '180302', 'Control Of Pests, Diseases And Exotic Species In Fresh, Ground And Surface Water ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (457, '180303', 'Fresh, Ground And Surface Water Biodiversity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (458, '180304', 'Freshwater Assimilative Capacity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (459, '180305', 'Ground Water Quantification, Allocation And Impact Of Depletion ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (460, '180306',
        'Measurement And Assessment Of Freshwater Quality (Incl. Physical And Chemical Conditions Of Water) ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (461, '180307', 'Rehabilitation Or Conservation Of Fresh, Ground And Surface Water Environments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (462, '180308', 'Surface Water Quantification, Allocation And Impact Of Depletion');
INSERT INTO dev.seo_code (id, code, name)
VALUES (463, '180399', 'Fresh, Ground And Surface Water Systems And Management Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (464, '180401', 'Antarctic And Southern Ocean Ice Dynamics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (465, '180402', 'Antarctic And Southern Ocean Oceanic Processes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (466, '180403', 'Assessment And Management Of Antarctic And Southern Ocean Ecosystems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (467, '180404', 'Biodiversity In Antarctic And Southern Ocean Environments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (468, '180405', 'Control Of Pests, Diseases And Exotic Species In Antarctic And Southern Ocean Environments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (469, '180406', 'Protection And Conservation Of Antarctic And Southern Ocean Environments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (470, '180407', 'Water Quality In Antarctic And Southern Ocean Environments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (471, '180499', 'Management Of Antarctic And Southern Ocean Environments Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (472, '180501', 'Assessment And Management Of Benthic Marine Ecosystems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (473, '180502', 'Assessment And Management Of Pelagic Marine Ecosystems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (474, '180503', 'Control Of Pests, Diseases And Exotic Species In Marine Environments ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (475, '180504', 'Marine Biodiversity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (476, '180505', 'Measurement And Assessment Of Marine Water Quality And Condition');
INSERT INTO dev.seo_code (id, code, name)
VALUES (477, '180506', 'Oceanic Processes (Excl. In The Antarctic And Southern Ocean)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (478, '180507', 'Rehabilitation Or Conservation Of Marine Environments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (479, '180599', 'Marine Systems And Management Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (480, '180601', 'Assessment And Management Of Terrestrial Ecosystems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (481, '180602', 'Control Of Pests, Diseases And Exotic Species In Terrestrial Environments ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (482, '180603', 'Evaluation, Allocation, And Impacts Of Land Use ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (483, '180604', 'Rehabilitation Or Conservation Of Terrestrial Environments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (484, '180605', 'Soils');
INSERT INTO dev.seo_code (id, code, name)
VALUES (485, '180606', 'Terrestrial Biodiversity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (486, '180607', 'Terrestrial Erosion ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (487, '180699', 'Terrestrial Systems And Management Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (488, '189999', 'Other Environmental Management Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (489, '190101', 'Climate Change Adaptation Measures (Excl. Ecosystem)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (490, '190102', 'Ecosystem Adaptation To Climate Change');
INSERT INTO dev.seo_code (id, code, name)
VALUES (491, '190103', 'Social Impacts Of Climate Change And Variability ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (492, '190199', 'Adaptation To Climate Change Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (493, '190201', 'Consumption Patterns, Population Issues And The Environment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (494, '190202', 'Eco-Verification (Excl. Environmental Lifecycle Assessment)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (495, '190203', 'Environmental Education And Awareness');
INSERT INTO dev.seo_code (id, code, name)
VALUES (496, '190204', 'Environmental Lifecycle Assessment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (497, '190205', 'Environmental Protection Frameworks (Incl. Economic Incentives)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (498, '190206', 'Institutional Arrangements');
INSERT INTO dev.seo_code (id, code, name)
VALUES (499, '190207', 'Land Policy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (500, '190208', 'Rights To Environmental And Natural Resources (Excl. Water Allocation)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (501, '190209', 'Sustainability Indicators');
INSERT INTO dev.seo_code (id, code, name)
VALUES (502, '190210', 'Trade And Environment ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (503, '190211', 'Water Policy (Incl. Water Allocation)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (504, '190299', 'Environmental Policy, Legislation And Standards Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (505, '190301', 'Climate Change Mitigation Strategies');
INSERT INTO dev.seo_code (id, code, name)
VALUES (506, '190302', 'Management Of Greenhouse Gas Emissions From Animal Production');
INSERT INTO dev.seo_code (id, code, name)
VALUES (507, '190303', 'Management Of Greenhouse Gas Emissions From Commercial Services And Tourism');
INSERT INTO dev.seo_code (id, code, name)
VALUES (508, '190304', 'Management Of Greenhouse Gas Emissions From Construction Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (509, '190305', 'Management Of Greenhouse Gas Emissions From Electricity Generation');
INSERT INTO dev.seo_code (id, code, name)
VALUES (510, '190306', 'Management Of Greenhouse Gas Emissions From Energy Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (511, '190307', 'Management Of Greenhouse Gas Emissions From Information And Communication Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (512, '190308', 'Management Of Greenhouse Gas Emissions From Manufacturing Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (513, '190309', 'Management Of Greenhouse Gas Emissions From Mineral Resources Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (514, '190310', 'Management Of Greenhouse Gas Emissions From Plant Production');
INSERT INTO dev.seo_code (id, code, name)
VALUES (515, '190311', 'Management Of Greenhouse Gas Emissions From Transport Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (516, '190399', 'Mitigation Of Climate Change Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (517, '190401', 'Climatological Hazards (E.G. Extreme Temperatures, Drought And Wildfires)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (518, '190402', 'Extraterrestrial Hazards (E.G. Meteorites)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (519, '190403', 'Geological Hazards (E.G. Earthquakes, Landslides And Volcanic Activity)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (520, '190404', 'Hydrological Hazards (E.G. Avalanches And Floods)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (521, '190405', 'Meteorological Hazards (E.G. Cyclones And Storms)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (522, '190499', 'Natural Hazards Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (523, '190501', 'Climate Change Models');
INSERT INTO dev.seo_code (id, code, name)
VALUES (524, '190502', 'Climate Variability (Excl. Social Impacts)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (525, '190503', 'Effects Of Climate Change On Antarctic And Sub-Antarctic Environments (Excl. Social Impacts)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (526, '190504', 'Effects Of Climate Change On Australia (Excl. Social Impacts)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (527, '190505', 'Effects Of Climate Change On New Zealand (Excl. Social Impacts) ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (528, '190506',
        'Effects Of Climate Change On The South Pacific (Excl. Australia And New Zealand) (Excl. Social Impacts)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (529, '190507',
        'Global Effects Of Climate Change (Excl. Australia, New Zealand, Antarctica And The South Pacific) (Excl. Social Impacts)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (530, '190508', 'Understanding The Impact Of Natural Hazards Caused By Climate Change');
INSERT INTO dev.seo_code (id, code, name)
VALUES (531, '190599', 'Understanding Climate Change Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (532, '199999', 'Other Environmental Policy, Climate Change And Natural Hazards Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (533, '200101', 'Diagnosis Of Human Diseases And Conditions');
INSERT INTO dev.seo_code (id, code, name)
VALUES (534, '200102', 'Efficacy Of Medications');
INSERT INTO dev.seo_code (id, code, name)
VALUES (535, '200103', 'Human Pain Management');
INSERT INTO dev.seo_code (id, code, name)
VALUES (536, '200104', 'Prevention Of Human Diseases And Conditions');
INSERT INTO dev.seo_code (id, code, name)
VALUES (537, '200105', 'Treatment Of Human Diseases And Conditions');
INSERT INTO dev.seo_code (id, code, name)
VALUES (538, '200199', 'Clinical Health Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (539, '200201', 'Determinants Of Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (540, '200202', 'Evaluation Of Health Outcomes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (541, '200203', 'Health Education And Promotion');
INSERT INTO dev.seo_code (id, code, name)
VALUES (542, '200204', 'Health Inequalities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (543, '200205', 'Health Policy Evaluation');
INSERT INTO dev.seo_code (id, code, name)
VALUES (544, '200206', 'Health System Performance (Incl. Effectiveness Of Programs)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (545, '200207', 'Social Structure And Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (546, '200208', 'Telehealth');
INSERT INTO dev.seo_code (id, code, name)
VALUES (547, '200299', 'Evaluation Of Health And Support Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (548, '200301', 'Allied Health Therapies (Excl. Mental Health Services)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (549, '200302', 'Community Health Care');
INSERT INTO dev.seo_code (id, code, name)
VALUES (550, '200303', 'Health Surveillance');
INSERT INTO dev.seo_code (id, code, name)
VALUES (551, '200304', 'Inpatient Hospital Care');
INSERT INTO dev.seo_code (id, code, name)
VALUES (552, '200305', 'Mental Health Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (553, '200306', 'Midwifery');
INSERT INTO dev.seo_code (id, code, name)
VALUES (554, '200307', 'Nursing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (555, '200308', 'Outpatient Care');
INSERT INTO dev.seo_code (id, code, name)
VALUES (556, '200309', 'Palliative Care');
INSERT INTO dev.seo_code (id, code, name)
VALUES (557, '200310', 'Primary Care');
INSERT INTO dev.seo_code (id, code, name)
VALUES (558, '200311', 'Urgent And Critical Care, And Emergency Medicine');
INSERT INTO dev.seo_code (id, code, name)
VALUES (559, '200399', 'Provision Of Health And Support Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (560, '200401', 'Behaviour And Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (561, '200402', 'Dental Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (562, '200403', 'Disability And Functional Capacity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (563, '200404', 'Disease Distribution And Transmission (Incl. Surveillance And Response)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (564, '200405', 'Food Safety');
INSERT INTO dev.seo_code (id, code, name)
VALUES (565, '200406', 'Health Protection And Disaster Response');
INSERT INTO dev.seo_code (id, code, name)
VALUES (566, '200407', 'Health Status (Incl. Wellbeing)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (567, '200408', 'Injury Prevention And Control');
INSERT INTO dev.seo_code (id, code, name)
VALUES (568, '200409', 'Mental Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (569, '200410', 'Nutrition');
INSERT INTO dev.seo_code (id, code, name)
VALUES (570, '200411', 'Overweight And Obesity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (571, '200412', 'Preventive Medicine ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (572, '200413', 'Substance Abuse');
INSERT INTO dev.seo_code (id, code, name)
VALUES (573, '200499', 'Public Health (Excl. Specific Population Health) Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (574, '200501', 'Adolescent Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (575, '200502', 'Health Related To Ageing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (576, '200503', 'Health Related To Specific Ethnic Groups');
INSERT INTO dev.seo_code (id, code, name)
VALUES (577, '200504', 'Men''S Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (578, '200505', 'Migrant Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (579, '200506', 'Neonatal And Child Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (580, '200507', 'Occupational Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (581, '200508', 'Rural And Remote Area Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (582, '200509', 'Women''S And Maternal Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (583, '200599', 'Specific Population Health (Excl. Indigenous Health) Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (584, '209999', 'Other Health Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (585, '210101', 'Aboriginal And Torres Strait Islander Community Service Programs');
INSERT INTO dev.seo_code (id, code, name)
VALUES (586, '210102', 'Aboriginal And Torres Strait Islander Development And Wellbeing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (587, '210199', 'Aboriginal And Torres Strait Islander Community Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (588, '210201', 'Aboriginal And Torres Strait Islander Education Engagement And Attendance Outcomes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (589, '210202', 'Aboriginal And Torres Strait Islander Education System Performance');
INSERT INTO dev.seo_code (id, code, name)
VALUES (590, '210203', 'Aboriginal And Torres Strait Islander Literacy And Numeracy Outcomes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (591, '210299', 'Aboriginal And Torres Strait Islander Education Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (592, '210301', 'Aboriginal And Torres Strait Islander Determinants Of Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (593, '210302', 'Aboriginal And Torres Strait Islander Health Status And Outcomes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (594, '210303', 'Aboriginal And Torres Strait Islander Health System Performance');
INSERT INTO dev.seo_code (id, code, name)
VALUES (595, '210399', 'Aboriginal And Torres Strait Islander Health Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (596, '210401', 'Aboriginal And Torres Strait Islander Artefacts');
INSERT INTO dev.seo_code (id, code, name)
VALUES (597, '210402', 'Aboriginal And Torres Strait Islander Connection To Land And Environment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (598, '210403', 'Aboriginal And Torres Strait Islander Customary Practices');
INSERT INTO dev.seo_code (id, code, name)
VALUES (599, '210404', 'Aboriginal And Torres Strait Islander Knowledge');
INSERT INTO dev.seo_code (id, code, name)
VALUES (600, '210405', 'Aboriginal And Torres Strait Islander Places Of Significance');
INSERT INTO dev.seo_code (id, code, name)
VALUES (601, '210406', 'Aboriginal And Torres Strait Islander Tradition');
INSERT INTO dev.seo_code (id, code, name)
VALUES (602, '210407', 'Conserving Aboriginal And Torres Strait Islander Heritage And Culture');
INSERT INTO dev.seo_code (id, code, name)
VALUES (603, '210499', 'Aboriginal And Torres Strait Islander Heritage And Culture Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (604, '210501', 'Ngā Hōtaka Ratonga Hapori Māori (Māori Community Service Programs)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (605, '210502', 'Te Whanaketanga Me Te Oranga O Te Māori (Māori Development And Wellbeing)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (606, '210599',
        'Ngā Ratonga Hapori O Te Māori Kāore Anō Kia Whakarōpūtia I Wāhi Kē (Māori Community Services Not Elsewhere Classified)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (607, '210601',
        'Te Whai Wāhi O Te Māori Ki Te Mātauranga Me Te Taetae Atu Ki Te Kura (Māori Education Engagement And Attendance Outcomes)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (608, '210602', 'Te Whakatutukitanga O Te Pūnaha Mātauranga Māori (Māori Education System Performance)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (609, '210603', 'Ngā Putanga Reo Matatini Me Te Pāngarau O Te Māori (Māori Literacy And Numeracy Outcomes)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (610, '210699',
        'Te Mātauranga Māori Kāore Kāore Anō Kia Whakarōpūtia I Wāhi Kē (Māori Education Not Elsewhere Classified)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (611, '210701', 'Ngā Tokoingoa Hauora (Determinants Of Māori Health)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (612, '210702', 'Te Tūnga Me Ngā Putanga Hauora (Māori Health Status And Outcomes)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (613, '210703', 'Te Whakatutukinga O Te Pūnaha Hauora (Māori Health System Performance)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (614, '210799', 'Te Hauora Kāore Anō Kia Whakarōpūtia I Wāhi Kē (Māori Health Not Elsewhere Classified)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (615, '210801', 'Āhuatanga Māori (Te Tuku Ihotanga Māori) (Māori Tradition)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (616, '210802', 'Te Whāomoomo I Te Tuku Ihotanga Me Te Ahurea Māori (Conserving Māori Heritage And Culture)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (617, '210803', 'Mōhiotanga Māori (Māori Knowledge)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (618, '210804', 'Ngā Taonga (Māori Artefacts)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (619, '210805', 'Ngā Tikanga Māori (Māori Customary Practices) ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (620, '210806', 'Ngā Wāhi Taonga (Māori Places Of Significance)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (621, '210899',
        'Te Tuku Ihotanga Me Te Ahurea Māori Kāore Anō Kia Whakarōpūhia I Wāhi Kē (Māori Heritage And Culture Not Elsewhere Classified)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (622, '210901', 'Pacific Peoples Community Service Programs');
INSERT INTO dev.seo_code (id, code, name)
VALUES (623, '210902', 'Pacific Peoples Development And Wellbeing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (624, '210999', 'Pacific Peoples Community Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (625, '211001', 'Pacific Peoples Education Engagement And Attendance');
INSERT INTO dev.seo_code (id, code, name)
VALUES (626, '211002', 'Pacific Peoples Education System Performance');
INSERT INTO dev.seo_code (id, code, name)
VALUES (627, '211003', 'Pacific Peoples Literacy And Numeracy Outcomes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (628, '211099', 'Pacific Peoples Education Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (629, '211101', 'Pacific Peoples Determinants Of Health');
INSERT INTO dev.seo_code (id, code, name)
VALUES (630, '211102', 'Pacific Peoples Health Status And Outcomes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (631, '211103', 'Pacific Peoples Health System Performance');
INSERT INTO dev.seo_code (id, code, name)
VALUES (632, '211199', 'Pacific Peoples Health Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (633, '211201', 'Conserving Pacific Peoples Heritage And Culture');
INSERT INTO dev.seo_code (id, code, name)
VALUES (634, '211202', 'Pacific Peoples Connection To Land And Environment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (635, '211299', 'Pacific Peoples Heritage And Culture Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (636, '219999', 'Other Indigenous Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (637, '220101', 'E-Infrastructures');
INSERT INTO dev.seo_code (id, code, name)
VALUES (638, '220102', 'Internet Protocols (Ip)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (639, '220103', 'Mobile Technologies And Communications');
INSERT INTO dev.seo_code (id, code, name)
VALUES (640, '220104', 'Network Security');
INSERT INTO dev.seo_code (id, code, name)
VALUES (641, '220105', 'Network Systems And Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (642, '220106', 'Satellite Technologies, Networks And Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (643, '220107', 'Wireless Technologies, Networks And Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (644, '220199', 'Communication Technologies, Systems And Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (645, '220201', 'Management Of Solid Waste From Information And Communication Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (646, '220202', 'Management Of Water Consumption By Information And Communication Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (647, '220299', 'Environmentally Sustainable Information And Communication Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (648, '220301', 'Digital Humanities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (649, '220302', 'Electronic Information Storage And Retrieval Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (650, '220303', 'Library And Archival Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (651, '220304', 'Museum And Gallery Collections');
INSERT INTO dev.seo_code (id, code, name)
VALUES (652, '220305', 'News Collection Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (653, '220306', 'Open Access');
INSERT INTO dev.seo_code (id, code, name)
VALUES (654, '220399', 'Information Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (655, '220401', 'Application Software Packages');
INSERT INTO dev.seo_code (id, code, name)
VALUES (656, '220402', 'Applied Computing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (657, '220403', 'Artificial Intelligence');
INSERT INTO dev.seo_code (id, code, name)
VALUES (658, '220404', 'Computer Systems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (659, '220405', 'Cybersecurity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (660, '220406', 'Graphics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (661, '220407', 'Human-Computer Interaction');
INSERT INTO dev.seo_code (id, code, name)
VALUES (662, '220408', 'Information Systems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (663, '220499', 'Information Systems, Technologies And Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (664, '220501', 'Animation, Video Games And Computer Generated Imagery Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (665, '220502', 'Internet, Digital And Social Media');
INSERT INTO dev.seo_code (id, code, name)
VALUES (666, '220503', 'Publishing And Print Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (667, '220504', 'Radio, Television, Film And Video Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (668, '220599', 'Media Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (669, '229999', 'Other Information And Communication Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (670, '230101', 'Ability And Disability');
INSERT INTO dev.seo_code (id, code, name)
VALUES (671, '230102', 'Ageing And Older People');
INSERT INTO dev.seo_code (id, code, name)
VALUES (672, '230103', 'Carers'' Support');
INSERT INTO dev.seo_code (id, code, name)
VALUES (673, '230104', 'Children''S Services And Childcare');
INSERT INTO dev.seo_code (id, code, name)
VALUES (674, '230105', 'Citizenship And National Identity');
INSERT INTO dev.seo_code (id, code, name)
VALUES (675, '230106', 'Employment Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (676, '230107', 'Families And Family Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (677, '230108', 'Gender And Sexualities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (678, '230109', 'Homelessness And Housing Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (679, '230110', 'Migrant And Refugee Settlement Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (680, '230111', 'Multicultural Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (681, '230112', 'Social Class And Inequalities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (682, '230113', 'Structure, Delivery And Resourcing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (683, '230114', 'Violence And Abuse Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (684, '230115', 'Youth Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (685, '230199', 'Community Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (686, '230201', 'Civics And Citizenship');
INSERT INTO dev.seo_code (id, code, name)
VALUES (687, '230202', 'Electoral Systems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (688, '230203', 'Political Systems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (689, '230204', 'Public Services Policy Advice And Analysis');
INSERT INTO dev.seo_code (id, code, name)
VALUES (690, '230299', 'Government And Politics Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (691, '230301', 'Defence And Security Policy');
INSERT INTO dev.seo_code (id, code, name)
VALUES (692, '230302', 'International Aid And Development');
INSERT INTO dev.seo_code (id, code, name)
VALUES (693, '230303', 'International Organisations');
INSERT INTO dev.seo_code (id, code, name)
VALUES (694, '230304', 'International Political Economy (Excl. International Trade)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (695, '230305', 'Peace And Conflict');
INSERT INTO dev.seo_code (id, code, name)
VALUES (696, '230399', 'International Relations Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (697, '230401', 'Civil Justice');
INSERT INTO dev.seo_code (id, code, name)
VALUES (698, '230402', 'Crime Prevention');
INSERT INTO dev.seo_code (id, code, name)
VALUES (699, '230403', 'Criminal Justice');
INSERT INTO dev.seo_code (id, code, name)
VALUES (700, '230404', 'Law Enforcement');
INSERT INTO dev.seo_code (id, code, name)
VALUES (701, '230405', 'Law Reform');
INSERT INTO dev.seo_code (id, code, name)
VALUES (702, '230406', 'Legal Processes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (703, '230407', 'Legislation, Civil And Criminal Codes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (704, '230408', 'Rehabilitation And Correctional Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (705, '230499', 'Justice And The Law Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (706, '230501', 'Employment Patterns And Change');
INSERT INTO dev.seo_code (id, code, name)
VALUES (707, '230502', 'Professions And Professionalisation');
INSERT INTO dev.seo_code (id, code, name)
VALUES (708, '230503', 'Remuneration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (709, '230504', 'Unpaid Work And Volunteering');
INSERT INTO dev.seo_code (id, code, name)
VALUES (710, '230505', 'Work And Family Responsibilities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (711, '230506', 'Workplace Safety');
INSERT INTO dev.seo_code (id, code, name)
VALUES (712, '230599', 'Work And Labour Market Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (713, '239999', 'Other Law, Politics And Community Services Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (714, '240101', 'Animal Protection Chemicals');
INSERT INTO dev.seo_code (id, code, name)
VALUES (715, '240102', 'Chemical Fertilisers');
INSERT INTO dev.seo_code (id, code, name)
VALUES (716, '240103', 'Crop And Pasture Protection Chemicals');
INSERT INTO dev.seo_code (id, code, name)
VALUES (717, '240199', 'Agricultural Chemicals Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (718, '240201', 'Basic Aluminium Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (719, '240202', 'Basic Copper Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (720, '240203', 'Basic Iron And Steel Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (721, '240204', 'Basic Precious Metal Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (722, '240205', 'Basic Zinc Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (723, '240299', 'Basic Metal Products Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (724, '240301', 'Cement Products And Concrete Materials');
INSERT INTO dev.seo_code (id, code, name)
VALUES (725, '240302', 'Ceramics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (726, '240303', 'Clay Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (727, '240304', 'Composite Materials');
INSERT INTO dev.seo_code (id, code, name)
VALUES (728, '240305', 'Plaster And Plaster Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (729, '240306', 'Structural Glass And Glass Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (730, '240399', 'Ceramics, Glass And Industrial Mineral Products Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (731, '240401', 'Computer And Electronic Office Equipment (Excl. Communication Equipment)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (732, '240402', 'Consumer Electronic Equipment (Excl. Communication Equipment)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (733, '240403', 'Integrated Circuits And Devices');
INSERT INTO dev.seo_code (id, code, name)
VALUES (734, '240404', 'Integrated Systems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (735, '240405', 'Network Infrastructure Equipment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (736, '240406', 'Processor Modules');
INSERT INTO dev.seo_code (id, code, name)
VALUES (737, '240407', 'Robotics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (738, '240408', 'Satellite Navigation Equipment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (739, '240409', 'Telemetry Equipment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (740, '240410', 'Voice And Data Equipment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (741, '240499', 'Computer, Electronic And Communication Equipment Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (742, '240501', 'Butter And Milk-Derived Fats And Oils (Excl. Cream)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (743, '240502', 'Casein');
INSERT INTO dev.seo_code (id, code, name)
VALUES (744, '240503', 'Cheese');
INSERT INTO dev.seo_code (id, code, name)
VALUES (745, '240504', 'Processed Milk And Cream (Incl. Powder, Evaporated And Condensed)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (746, '240505', 'Whey');
INSERT INTO dev.seo_code (id, code, name)
VALUES (747, '240599', 'Dairy Products Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (748, '240601', 'Development Of Recyclable Or Biodegradable Componentry, Packaging Or Materials ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (749, '240602', 'Management Of Gaseous Waste From Manufacturing Activities (Excl. Greenhouse Gases)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (750, '240603', 'Management Of Liquid Waste From Manufacturing Activities (Excl. Water)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (751, '240604', 'Management Of Solid Waste From Manufacturing Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (752, '240605', 'Management Of Water Consumption By Manufacturing Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (753, '240699', 'Environmentally Sustainable Manufacturing Activities Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (754, '240701', 'Coated Metal And Metal-Coated Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (755, '240702', 'Machined Metal Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (756, '240703', 'Metal Castings');
INSERT INTO dev.seo_code (id, code, name)
VALUES (757, '240704', 'Semi-Finished Metal Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (758, '240705', 'Sheet Metal Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (759, '240706', 'Structural Metal Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (760, '240799', 'Fabricated Metal Products Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (761, '240801', 'Human Biological Preventatives ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (762, '240802', 'Human Diagnostics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (763, '240803', 'Human Pharmaceutical Treatments ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (764, '240899', 'Human Pharmaceutical Products Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (765, '240901', 'Antimicrobials, Antifungals And Biocides');
INSERT INTO dev.seo_code (id, code, name)
VALUES (766, '240902', 'Bioplastics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (767, '240903', 'Cosmetics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (768, '240904', 'Fine Chemicals');
INSERT INTO dev.seo_code (id, code, name)
VALUES (769, '240905', 'Industrial Gases');
INSERT INTO dev.seo_code (id, code, name)
VALUES (770, '240906', 'Inorganic Industrial Chemicals');
INSERT INTO dev.seo_code (id, code, name)
VALUES (771, '240907', 'Lubricants');
INSERT INTO dev.seo_code (id, code, name)
VALUES (772, '240908', 'Organic Industrial Chemicals (Excl. Resins, Rubber And Plastics)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (773, '240909', 'Paints');
INSERT INTO dev.seo_code (id, code, name)
VALUES (774, '240910', 'Plastics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (775, '240911', 'Resins');
INSERT INTO dev.seo_code (id, code, name)
VALUES (776, '240912', 'Rubber');
INSERT INTO dev.seo_code (id, code, name)
VALUES (777, '240913', 'Soaps');
INSERT INTO dev.seo_code (id, code, name)
VALUES (778, '240999', 'Industrial Chemicals And Related Products Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (779, '241001', 'Industrial Instruments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (780, '241002', 'Medical Instruments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (781, '241003', 'Scientific Instruments');
INSERT INTO dev.seo_code (id, code, name)
VALUES (782, '241099', 'Instrumentation Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (783, '241101', 'Clothing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (784, '241102', 'Cotton Ginning');
INSERT INTO dev.seo_code (id, code, name)
VALUES (785, '241103', 'Natural Fibres, Yarns And Fabrics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (786, '241104', 'Non-Fabric Textiles (E.G. Felt)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (787, '241105', 'Skins, Leather And Leather Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (788, '241106', 'Synthetic Fibres, Yarns And Fabrics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (789, '241107', 'Wool Scouring And Top Making');
INSERT INTO dev.seo_code (id, code, name)
VALUES (790, '241199', 'Leather Products, Fibre Processing And Textiles Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (791, '241201', '3D Printers And Printing');
INSERT INTO dev.seo_code (id, code, name)
VALUES (792, '241202', 'Autonomous And Robotic Systems');
INSERT INTO dev.seo_code (id, code, name)
VALUES (793, '241203', 'Electrical Machinery And Equipment (Incl. Appliances)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (794, '241204', 'Industrial Machinery And Equipment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (795, '241205', 'Medical Machinery And Equipment ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (796, '241299', 'Machinery And Equipment Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (797, '241301', 'Alcoholic Beverages');
INSERT INTO dev.seo_code (id, code, name)
VALUES (798, '241302', 'Bakery Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (799, '241303', 'Carcass Meat (Incl. Fish And Seafood)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (800, '241304', 'Flour Mill And Cereal Food');
INSERT INTO dev.seo_code (id, code, name)
VALUES (801, '241305', 'Insects');
INSERT INTO dev.seo_code (id, code, name)
VALUES (802, '241306', 'Non-Alcoholic Beverages (Excl. Fruit Juices And Non-Dairy Milk)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (803, '241307', 'Non-Dairy Milk');
INSERT INTO dev.seo_code (id, code, name)
VALUES (804, '241308', 'Nutraceuticals And Functional Foods');
INSERT INTO dev.seo_code (id, code, name)
VALUES (805, '241309', 'Oils And Fats (Incl. Margarines)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (806, '241310', 'Processed Fish And Seafood Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (807, '241311', 'Processed Fruit And Vegetable Products (Incl. Juices)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (808, '241312', 'Processed Meat Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (809, '241313', 'Sugar, Sweeteners And Confectionery Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (810, '241399', 'Processed Food Products And Beverages (Excl. Dairy Products) Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (811, '241401', 'Essential Oils ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (812, '241402', 'Organic Fertilisers');
INSERT INTO dev.seo_code (id, code, name)
VALUES (813, '241403', 'Plant Extracts ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (814, '241404', 'Prepared Animal Feed');
INSERT INTO dev.seo_code (id, code, name)
VALUES (815, '241499',
        'Processed Non-Food Agricultural Products (Excl. Wood, Paper And Fibre) Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (816, '241501', 'Aerospace Equipment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (817, '241502', 'Automotive Equipment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (818, '241503', 'Nautical Equipment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (819, '241504', 'Rail Equipment');
INSERT INTO dev.seo_code (id, code, name)
VALUES (820, '241599', 'Transport Equipment Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (821, '241601', 'Veterinary Biological Preventatives ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (822, '241602', 'Veterinary Diagnostics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (823, '241603', 'Veterinary Pharmaceutical Treatments ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (824, '241699', 'Veterinary Pharmaceutical Products Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (825, '241701', 'Paper Products And Pulp ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (826, '241702', 'Printing And Publishing Processes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (827, '241703', 'Reconstituted Timber Products ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (828, '241704', 'Wood Products ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (829, '241705', 'Wood Sawing And Veneer');
INSERT INTO dev.seo_code (id, code, name)
VALUES (830, '241799', 'Wood, Wood Products And Paper Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (831, '249999', 'Other Manufacturing Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (832, '250101', 'Management Of Gaseous Waste From Mineral Resource Activities (Excl. Greenhouse Gases)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (833, '250102', 'Management Of Liquid Waste From Mineral Resource Activities (Excl. Water)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (834, '250103', 'Management Of Solid Waste From Mineral Resource Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (835, '250104', 'Management Of Water Consumption By Mineral Resource Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (836, '250199', 'Environmentally Sustainable Mineral Resource Activities Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (837, '250201', 'Alumina Production');
INSERT INTO dev.seo_code (id, code, name)
VALUES (838, '250202', 'Beneficiation Of Bauxite And Aluminium Ores (Excl. Alumina Production)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (839, '250203', 'Beneficiation Or Dressing Of Iron Ores');
INSERT INTO dev.seo_code (id, code, name)
VALUES (840, '250204', 'Beneficiation Or Dressing Of Non-Metallic Minerals (Incl. Diamonds)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (841, '250205', 'Concentrating Processes Of Base Metal Ores (Excl. Aluminium And Iron Ores)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (842, '250206', 'Production Of Unrefined Precious Metal Ingots And Concentrates');
INSERT INTO dev.seo_code (id, code, name)
VALUES (843, '250299', 'First Stage Treatment Of Minerals Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (844, '250301', 'Aluminium Ore Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (845, '250302', 'Copper Ore Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (846, '250303', 'Diamond Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (847, '250304', 'Iron Ore Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (848, '250305', 'Precious (Noble) Metal Ore Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (849, '250306', 'Stone And Clay Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (850, '250307', 'Titanium Minerals, Zircon, And Rare Earth Metal Ore (E.G. Monazite) Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (851, '250308', 'Zinc Ore Exploration');
INSERT INTO dev.seo_code (id, code, name)
VALUES (852, '250399', 'Mineral Exploration Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (853, '250401', 'Mining And Extraction Of Aluminium Ores');
INSERT INTO dev.seo_code (id, code, name)
VALUES (854, '250402', 'Mining And Extraction Of Copper Ores');
INSERT INTO dev.seo_code (id, code, name)
VALUES (855, '250403', 'Mining And Extraction Of Diamonds');
INSERT INTO dev.seo_code (id, code, name)
VALUES (856, '250404', 'Mining And Extraction Of Iron Ores');
INSERT INTO dev.seo_code (id, code, name)
VALUES (857, '250405', 'Mining And Extraction Of Precious (Noble) Metal Ores');
INSERT INTO dev.seo_code (id, code, name)
VALUES (858, '250406', 'Mining And Extraction Of Stone And Clay');
INSERT INTO dev.seo_code (id, code, name)
VALUES (859, '250407', 'Mining And Extraction Of Titanium Minerals, Zircon, And Rare Earth Metal Ores (E.G. Monazite)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (860, '250408', 'Mining And Extraction Of Zinc Ores');
INSERT INTO dev.seo_code (id, code, name)
VALUES (861, '250499', 'Primary Mining And Extraction Of Minerals Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (862, '259999', 'Other Mineral Resources (Excl. Energy Resources) Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (863, '260101', 'Management Of Gaseous Waste From Plant Production (Excl. Greenhouse Gases)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (864, '260102', 'Management Of Liquid Waste From Plant Production (Excl. Water)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (865, '260103', 'Management Of Solid Waste From Plant Production');
INSERT INTO dev.seo_code (id, code, name)
VALUES (866, '260104', 'Management Of Water Consumption By Plant Production');
INSERT INTO dev.seo_code (id, code, name)
VALUES (867, '260199', 'Environmentally Sustainable Plant Production Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (868, '260201', 'Hardwood Plantations');
INSERT INTO dev.seo_code (id, code, name)
VALUES (869, '260202', 'Harvesting And Transport Of Forest Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (870, '260203', 'Integration Of Farm And Forestry');
INSERT INTO dev.seo_code (id, code, name)
VALUES (871, '260204', 'Native Forests');
INSERT INTO dev.seo_code (id, code, name)
VALUES (872, '260205', 'Softwood Plantations');
INSERT INTO dev.seo_code (id, code, name)
VALUES (873, '260299', 'Forestry Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (874, '260301', 'Barley');
INSERT INTO dev.seo_code (id, code, name)
VALUES (875, '260302', 'Canola');
INSERT INTO dev.seo_code (id, code, name)
VALUES (876, '260303', 'Grain Legumes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (877, '260304', 'Linseed');
INSERT INTO dev.seo_code (id, code, name)
VALUES (878, '260305', 'Lupins');
INSERT INTO dev.seo_code (id, code, name)
VALUES (879, '260306', 'Maize');
INSERT INTO dev.seo_code (id, code, name)
VALUES (880, '260307', 'Oats');
INSERT INTO dev.seo_code (id, code, name)
VALUES (881, '260308', 'Rice');
INSERT INTO dev.seo_code (id, code, name)
VALUES (882, '260309', 'Safflower Seed');
INSERT INTO dev.seo_code (id, code, name)
VALUES (883, '260310', 'Sorghum');
INSERT INTO dev.seo_code (id, code, name)
VALUES (884, '260311', 'Soybeans');
INSERT INTO dev.seo_code (id, code, name)
VALUES (885, '260312', 'Wheat');
INSERT INTO dev.seo_code (id, code, name)
VALUES (886, '260399', 'Grains And Seeds Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (887, '260401', 'Cotton Lint And Cotton Seed');
INSERT INTO dev.seo_code (id, code, name)
VALUES (888, '260402', 'Fresh Fruits And Vegetables (Post Harvest)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (889, '260403', 'Sugar Cane (Cut For Crushing)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (890, '260404', 'Unprocessed Grains');
INSERT INTO dev.seo_code (id, code, name)
VALUES (891, '260405', 'Unprocessed Industrial Crops (Excl. Sugar And Cotton)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (892, '260406', 'Unprocessed Seeds');
INSERT INTO dev.seo_code (id, code, name)
VALUES (893, '260499', 'Harvesting And Packaging Of Plant Products Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (894, '260501', 'Almonds');
INSERT INTO dev.seo_code (id, code, name)
VALUES (895, '260502', 'Avocado');
INSERT INTO dev.seo_code (id, code, name)
VALUES (896, '260503', 'Berry Fruit (Excl. Kiwifruit)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (897, '260504', 'Citrus Fruit');
INSERT INTO dev.seo_code (id, code, name)
VALUES (898, '260505', 'Field Grown Vegetable Crops');
INSERT INTO dev.seo_code (id, code, name)
VALUES (899, '260506', 'Kiwifruit');
INSERT INTO dev.seo_code (id, code, name)
VALUES (900, '260507', 'Macadamias');
INSERT INTO dev.seo_code (id, code, name)
VALUES (901, '260508', 'Mushrooms And Truffles');
INSERT INTO dev.seo_code (id, code, name)
VALUES (902, '260509', 'Olives');
INSERT INTO dev.seo_code (id, code, name)
VALUES (903, '260510', 'Ornamentals, Natives, Flowers And Nursery Plants');
INSERT INTO dev.seo_code (id, code, name)
VALUES (904, '260511', 'Pome Fruit, Pip Fruit');
INSERT INTO dev.seo_code (id, code, name)
VALUES (905, '260512', 'Protected Vegetable Crops');
INSERT INTO dev.seo_code (id, code, name)
VALUES (906, '260513', 'Stone Fruit (Excl. Avocado)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (907, '260514', 'Table Grapes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (908, '260515', 'Tree Nuts (Excl. Almonds And Macadamias)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (909, '260516', 'Tropical Fruit');
INSERT INTO dev.seo_code (id, code, name)
VALUES (910, '260599', 'Horticultural Crops Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (911, '260601', 'Cannabis');
INSERT INTO dev.seo_code (id, code, name)
VALUES (912, '260602', 'Cotton');
INSERT INTO dev.seo_code (id, code, name)
VALUES (913, '260603', 'Essential Oil Crops');
INSERT INTO dev.seo_code (id, code, name)
VALUES (914, '260604', 'Hemp');
INSERT INTO dev.seo_code (id, code, name)
VALUES (915, '260605', 'Hops');
INSERT INTO dev.seo_code (id, code, name)
VALUES (916, '260606', 'Plant Extract Crops');
INSERT INTO dev.seo_code (id, code, name)
VALUES (917, '260607', 'Sugar');
INSERT INTO dev.seo_code (id, code, name)
VALUES (918, '260608', 'Wine Grapes');
INSERT INTO dev.seo_code (id, code, name)
VALUES (919, '260699', 'Industrial Crops Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (920, '269901', 'Climate Adaptive Plants');
INSERT INTO dev.seo_code (id, code, name)
VALUES (921, '269902', 'Forest Product Traceability And Quality Assurance');
INSERT INTO dev.seo_code (id, code, name)
VALUES (922, '269903', 'Plant Product Traceability And Quality Assurance (Excl. Forest Products)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (923, '269999', 'Other Plant Production And Plant Primary Products Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (924, '270101', 'Air Freight');
INSERT INTO dev.seo_code (id, code, name)
VALUES (925, '270102', 'Air Passenger Transport');
INSERT INTO dev.seo_code (id, code, name)
VALUES (926, '270103', 'Air Safety And Traffic Management');
INSERT INTO dev.seo_code (id, code, name)
VALUES (927, '270104', 'Air Terminal Infrastructure And Management');
INSERT INTO dev.seo_code (id, code, name)
VALUES (928, '270105', 'Autonomous Air Vehicles ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (929, '270106', 'Space Transport');
INSERT INTO dev.seo_code (id, code, name)
VALUES (930, '270199', 'Aerospace Transport Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (931, '270201', 'Management Of Gaseous Waste From Transport Activities (Excl. Greenhouse Gases)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (932, '270202', 'Management Of Liquid Waste From Transport Activities (Excl. Water)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (933, '270203', 'Management Of Noise And Vibration From Transport Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (934, '270204', 'Management Of Solid Waste From Transport Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (935, '270205', 'Management Of Water Consumption By Transport Activities');
INSERT INTO dev.seo_code (id, code, name)
VALUES (936, '270299', 'Environmentally Sustainable Transport Activities Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (937, '270301', 'Active Ground Transport ');
INSERT INTO dev.seo_code (id, code, name)
VALUES (938, '270302', 'Autonomous Road Vehicles');
INSERT INTO dev.seo_code (id, code, name)
VALUES (939, '270303', 'Heavy Rail Infrastructure And Networks');
INSERT INTO dev.seo_code (id, code, name)
VALUES (940, '270304', 'Rail Freight');
INSERT INTO dev.seo_code (id, code, name)
VALUES (941, '270305', 'Rail Passenger Movements');
INSERT INTO dev.seo_code (id, code, name)
VALUES (942, '270306', 'Rail Safety');
INSERT INTO dev.seo_code (id, code, name)
VALUES (943, '270307', 'Road Freight');
INSERT INTO dev.seo_code (id, code, name)
VALUES (944, '270308', 'Road Infrastructure And Networks');
INSERT INTO dev.seo_code (id, code, name)
VALUES (945, '270309', 'Road Passenger Movements (Excl. Public Transport)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (946, '270310', 'Road Public Transport');
INSERT INTO dev.seo_code (id, code, name)
VALUES (947, '270311', 'Road Safety');
INSERT INTO dev.seo_code (id, code, name)
VALUES (948, '270312', 'Urban Rail Infrastructure And Networks (Incl. Light And Metro Rail)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (949, '270399', 'Ground Transport Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (950, '270401', 'Autonomous Water Vehicles');
INSERT INTO dev.seo_code (id, code, name)
VALUES (951, '270402', 'Coastal Sea Freight Transport');
INSERT INTO dev.seo_code (id, code, name)
VALUES (952, '270403', 'Domestic Passenger Water Transport (E.G. Ferries)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (953, '270404', 'International Passenger Water Transport (E.G. Passenger Ships)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (954, '270405', 'International Sea Freight Transport (Excl. Live Animals, Food Products And Liquefied Gas)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (955, '270406', 'International Sea Transport Of Food Products');
INSERT INTO dev.seo_code (id, code, name)
VALUES (956, '270407', 'International Sea Transport Of Liquefied Gas');
INSERT INTO dev.seo_code (id, code, name)
VALUES (957, '270408', 'International Sea Transport Of Live Animals');
INSERT INTO dev.seo_code (id, code, name)
VALUES (958, '270409', 'Port Infrastructure And Management');
INSERT INTO dev.seo_code (id, code, name)
VALUES (959, '270410', 'Water Safety');
INSERT INTO dev.seo_code (id, code, name)
VALUES (960, '270499', 'Water Transport Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (961, '279901', 'Intermodal Materials Handling');
INSERT INTO dev.seo_code (id, code, name)
VALUES (962, '279902', 'Multimodal Transport');
INSERT INTO dev.seo_code (id, code, name)
VALUES (963, '279903', 'Pipeline Transport');
INSERT INTO dev.seo_code (id, code, name)
VALUES (964, '279904', 'Postal And Package Services (Incl. Courier Services)');
INSERT INTO dev.seo_code (id, code, name)
VALUES (965, '279999', 'Other Transport Not Elsewhere Classified');
INSERT INTO dev.seo_code (id, code, name)
VALUES (966, '280101', 'Expanding Knowledge In The Agricultural, Food And Veterinary Sciences');
INSERT INTO dev.seo_code (id, code, name)
VALUES (967, '280102', 'Expanding Knowledge In The Biological Sciences');
INSERT INTO dev.seo_code (id, code, name)
VALUES (968, '280103', 'Expanding Knowledge In The Biomedical And Clinical Sciences');
INSERT INTO dev.seo_code (id, code, name)
VALUES (969, '280104', 'Expanding Knowledge In Built Environment And Design');
INSERT INTO dev.seo_code (id, code, name)
VALUES (970, '280105', 'Expanding Knowledge In The Chemical Sciences');
INSERT INTO dev.seo_code (id, code, name)
VALUES (971, '280106', 'Expanding Knowledge In Commerce, Management, Tourism And Services');
INSERT INTO dev.seo_code (id, code, name)
VALUES (972, '280107', 'Expanding Knowledge In The Earth Sciences');
INSERT INTO dev.seo_code (id, code, name)
VALUES (973, '280108', 'Expanding Knowledge In Economics');
INSERT INTO dev.seo_code (id, code, name)
VALUES (974, '280109', 'Expanding Knowledge In Education');
INSERT INTO dev.seo_code (id, code, name)
VALUES (975, '280110', 'Expanding Knowledge In Engineering');
INSERT INTO dev.seo_code (id, code, name)
VALUES (976, '280111', 'Expanding Knowledge In The Environmental Sciences');
INSERT INTO dev.seo_code (id, code, name)
VALUES (977, '280112', 'Expanding Knowledge In The Health Sciences');
INSERT INTO dev.seo_code (id, code, name)
VALUES (978, '280113', 'Expanding Knowledge In History, Heritage And Archaeology');
INSERT INTO dev.seo_code (id, code, name)
VALUES (979, '280114', 'Expanding Knowledge In Indigenous Studies');
INSERT INTO dev.seo_code (id, code, name)
VALUES (980, '280115', 'Expanding Knowledge In The Information And Computing Sciences');
INSERT INTO dev.seo_code (id, code, name)
VALUES (981, '280116', 'Expanding Knowledge In Language, Communication And Culture');
INSERT INTO dev.seo_code (id, code, name)
VALUES (982, '280117', 'Expanding Knowledge In Law And Legal Studies');
INSERT INTO dev.seo_code (id, code, name)
VALUES (983, '280118', 'Expanding Knowledge In The Mathematical Sciences');
INSERT INTO dev.seo_code (id, code, name)
VALUES (984, '280119', 'Expanding Knowledge In Philosophy And Religious Studies');
INSERT INTO dev.seo_code (id, code, name)
VALUES (985, '280120', 'Expanding Knowledge In The Physical Sciences');
INSERT INTO dev.seo_code (id, code, name)
VALUES (986, '280121', 'Expanding Knowledge In Psychology');
INSERT INTO dev.seo_code (id, code, name)
VALUES (987, '280122', 'Expanding Knowledge In Creative Arts And Writing Studies');
INSERT INTO dev.seo_code (id, code, name)
VALUES (988, '280123', 'Expanding Knowledge In Human Society');

create table subsystem
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

INSERT INTO dev.subsystem (id, name)
VALUES (1, 'Power');
INSERT INTO dev.subsystem (id, name)
VALUES (2, 'Thermal');
INSERT INTO dev.subsystem (id, name)
VALUES (3, 'Communications');
INSERT INTO dev.subsystem (id, name)
VALUES (4, 'Data');
INSERT INTO dev.subsystem (id, name)
VALUES (5, 'Propulsion');
INSERT INTO dev.subsystem (id, name)
VALUES (6, 'Attitude Determination');
INSERT INTO dev.subsystem (id, name)
VALUES (7, 'Mechanical');

create table area
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

INSERT INTO dev.area (id, name)
VALUES (1, 'Food Science');
INSERT INTO dev.area (id, name)
VALUES (2, 'Physiology');
INSERT INTO dev.area (id, name)
VALUES (3, 'Space Medicine');
INSERT INTO dev.area (id, name)
VALUES (4, 'Wearables');
INSERT INTO dev.area (id, name)
VALUES (5, 'Space Suits');

create table test_subject_type
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

INSERT INTO dev.test_subject_type (id, name)
VALUES (1, 'Mission Astronaut');
INSERT INTO dev.test_subject_type (id, name)
VALUES (2, 'Trainee Astronaut');
INSERT INTO dev.test_subject_type (id, name)
VALUES (3, 'Researchers');

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
    email       varchar(255) null,
    family_name varchar(255) null,
    first_name  varchar(255) null,
    phone       varchar(255) null,
    state       varchar(255) null,
    updated_at  datetime(6)  null
);

INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (1, 'RMIT', true, 'Melbourne', 'Australia', '2022-05-01 00:00:00', false, null, 'Iles', 'Gail', null, 'Victoria',
        null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (2, 'RMIT HIVE', true, 'Melbourne', 'Australia', '2022-05-01 00:00:00', false, null, 'Florent', 'Nicholas', null,
        'Victoria', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (3, 'RMIT HIVE', true, 'Melbourne', 'Australia', '2022-05-01 00:00:00', false, null, 'Kirby', 'James', null,
        'Victoria', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (4, 'Baylor College of Medicine ', true, 'Copenhagen', 'Denmark', '2022-05-01 00:00:00', false, null, 'Norsk',
        'Peter', null, 'Copenhagen', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (5, 'NL Agency', true, 'Amsterdam', 'Netherlands', '2022-05-01 00:00:00', false, null, 'Dieckmann', 'Matthias',
        null, 'North Holland', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (6, 'University of Hamburg', true, 'Hamburg', 'Germany', '2022-05-01 00:00:00', false, null, 'Dierks', 'Karsten',
        null, 'Northern Germany', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (7, 'Sorbonne University', true, 'Paris ', 'France', '2022-05-01 00:00:00', false, null, 'Driss-Ecole',
        'Dominique', null, 'Île-de-France', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (8, 'University of Brest', true, 'Morlaix', 'France', '2022-05-01 00:00:00', false, null, 'Prieur', 'Daniel',
        null, 'Btitanny', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (9, 'University of Freiburg', true, 'Breisgau', 'Germany', '2022-05-01 00:00:00', false, null, 'Dold', 'Pit',
        null, 'Baden-Württemberg', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (10, 'Darmstadt University of Technology', true, 'Darmstadt', 'Germany', '2022-05-01 00:00:00', false, null,
        'Scherer', 'Gerhard ', null, 'Southern Germany', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (11, 'Institute of Biology II (Botany), University of Freiburg', true, 'Breisgau', 'Germany',
        '2022-05-01 00:00:00', false, null, 'Palme', 'Klaus ', null, 'Baden-Württemberg', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (12, 'ESTEC for HE Space Operations', true, 'Amsterdam', 'Netherlands', '2022-05-01 00:00:00', false, null,
        'Demets', 'Rene', null, 'North Holland', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (13, 'University of Hamburg', true, 'Hamburh', 'Germany', '2022-05-01 00:00:00', false, null, 'Wunderlich',
        'Rainer', null, 'Northern Germany', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (14, 'European Academy of Sciences and Arts', true, 'Homburg', 'Germany', '2022-05-01 00:00:00', false, null,
        'Fecht', 'Hans-Jorg', null, 'Saarland', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (15, 'European College of Sport Science(ECSS)', true, 'Cologn', 'Germany', '2022-05-01 00:00:00', false, null,
        'Schneider', 'Stefan', null, 'North Rhine-Westphalia', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (16, 'Space Research Institute, USSR Academy of Sciences', true, 'Moscow', 'Russia', '2022-05-01 00:00:00',
        false, null, 'Vedernikov', 'Andrei', null, 'Western Russia', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (17, 'Airbus Defence and Space', true, 'Aachen', 'Germany', '2022-05-01 00:00:00', false, null, 'Steimle',
        'Christian', null, 'Western Germany', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (18, 'DISI and DEI Department', true, 'Bologna', 'Italy', '2022-05-01 00:00:00', false, null, 'Bartolini',
        'Andrea', null, 'Emilia-Romagna region', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (19, 'University of Lyon', true, 'Lyon', 'France', '2022-05-01 00:00:00', false, null, 'Clement', 'Gilles', null,
        'Auvergne-Rhône-Alpes', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (20, 'European Space Agency', true, 'Eriangen', 'Germany', '2022-05-01 00:00:00', false, null, 'Witt',
        'Johannes', null, 'Bavaria', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (21, 'German Aerosapce Center', true, 'Aachen', 'Germany', '2022-05-01 00:00:00', false, null, 'Lohofer',
        'George', null, 'Western Germany', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (22, 'Graz University of Technology', true, 'Styria', 'Austria', '2022-05-01 00:00:00', false, null,
        'Pottlacher', 'George', null, 'Southern Austria', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (23, 'University of California', true, 'Los Angeles', 'USA', '2022-05-01 00:00:00', false, null, 'Horvath',
        'Steve', null, 'California', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (24, 'CSIR-Central Salt and Marine Chemicals Research Institute', true, 'Bhavnagar', 'India',
        '2022-05-01 00:00:00', false, null, 'Raj', 'Savan', null, 'Gujarat', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (25, 'School of Physics and Astronomy at the University of Edinburgh', true, 'London', 'England',
        '2022-05-01 00:00:00', false, null, 'Cockell', 'Charles', null, 'South-East England', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (26, 'Integrative Neuroscience and Cognition Center', true, 'Paris', 'France', '2022-05-01 00:00:00', false,
        null, 'Mcintyre', 'Joe', null, 'North-Central of France', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (27, 'University of Padova', true, 'Padua', 'Italy', '2022-05-01 00:00:00', false, null, 'Tagliabue',
        'Mariaelena', null, 'Veneto', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (28, 'CNES', true, 'Toulouse', 'France', '2022-05-01 00:00:00', false, null, 'Mignot', 'Jean', null,
        'Southern France', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (29, 'MEDES - Institute for Space Medicine and Physiology', true, 'Toulouse', 'France', '2022-05-01 00:00:00',
        false, null, 'Llodra-Perez', 'Anais', null, 'Occitanie', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (30, 'NASA Engineering & Safety Center', true, 'Purdue', 'USA', '2022-05-01 00:00:00', false, null, 'Bauer',
        'Frank', null, 'Indiana', null);
INSERT INTO dev.person (id, affiliation, approved, city, country, created_at, deleted, email, family_name, first_name,
                        phone, state, updated_at)
VALUES (31, 'European Spacen Agency', true, 'Aachen', 'Germany', '2022-05-01 00:00:00', false, null, 'Armborst',
        'Lukas', null, 'Western Germany', null);

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

INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (1, true, '2022-04-01 00:00:00', false, '2021-01-01', 1, '2021-01-01', 'ISS Increment 65', '2021-01-01', null,
        1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (2, true, '2022-04-01 00:00:00', false, '1995-01-01', 1, '1995-01-01', 'MIR Euromir 95', '1995-01-01', null, 1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (3, true, '2022-04-01 00:00:00', false, '1998-01-01', 1, '1998-01-01', 'STS-95', '1998-01-01', null, 2);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (4, true, '2022-04-01 00:00:00', false, '1997-01-01', 1, '1997-01-01', 'STS-84', '1997-01-01', null, 2);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (5, true, '2022-04-01 00:00:00', false, '2007-01-01', 1, '2007-01-01', 'Foton-M3', '2007-01-01', null, 3);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (6, true, '2022-04-01 00:00:00', false, '2005-01-01', 1, '2005-01-01', 'Foton-M2', '2005-01-01', null, 3);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (7, true, '2022-04-01 00:00:00', false, '2015-01-01', 1, '2015-01-01', 'MASER 13', '2015-01-01', null, 4);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (8, true, '2022-04-01 00:00:00', false, '2009-01-01', 1, '2009-01-01', 'TEXUS 46', '2009-01-01', null, 4);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (9, true, '2022-04-01 00:00:00', false, '2020-01-01', 1, '2020-01-01', '73rd ESA Parabolic Flight Campaign',
        '2020-01-01', null, 5);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (10, true, '2022-04-01 00:00:00', false, '2007-01-01', 1, '2007-01-01', 'Drop Tower Bremen', '2007-01-01', null,
        6);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (11, true, '2022-04-01 00:00:00', false, '2020-01-01', 1, '2020-01-01', 'ISS Increment 63', '2020-01-01', null,
        1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (12, true, '2022-04-01 00:00:00', false, '2015-01-01', 1, '2015-01-01', 'ISS Increment 64', '2015-01-01', null,
        1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (13, true, '2022-04-01 00:00:00', false, '2017-01-01', 1, '2017-01-01', 'ISS Increment 66', '2017-01-01', null,
        1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (14, true, '2022-04-01 00:00:00', false, '2020-01-01', 1, '2020-01-01', 'ISS Increment 67', '2020-01-01', null,
        1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (15, true, '2022-04-01 00:00:00', false, '2020-01-01', 1, '2020-01-01', 'ISS Increment 68', '2020-01-01', null,
        1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (16, true, '2022-04-01 00:00:00', false, '2020-01-01', 1, '2020-01-01', 'ISS Increment 69', '2020-01-01', null,
        1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (17, true, '2022-04-01 00:00:00', false, '2020-01-01', 1, '2020-01-01', 'ISS Increment 70', '2020-01-01', null,
        1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (18, true, '2022-04-01 00:00:00', false, '2018-01-01', 1, '2018-01-01', 'ISS Increment 71', '2018-01-01', null,
        1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (19, true, '2022-04-01 00:00:00', false, '2016-01-01', 1, '2016-01-01', 'ISS Increment 72', '2016-01-01', null,
        1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (20, true, '2022-04-01 00:00:00', false, '2014-01-01', 1, '2014-01-01', 'ISS Increment 73', '2014-01-01', null,
        1);
INSERT INTO dev.mission (id, approved, created_at, deleted, end_date, experiment_count, launch_date, name, start_date,
                         updated_at, platform_id)
VALUES (21, true, '2022-04-01 00:00:00', false, '2019-01-01', 1, '2019-01-01', 'ISS Increment 74', '2019-01-01', null,
        1);

create table experiment
(
    id                    bigint auto_increment
        primary key,
    approved              bit           not null,
    created_at            datetime(6)   null,
    deleted               bit           not null,
    experiment_objectives varchar(1023) null,
    lead_institution      varchar(255)  null,
    payload               varchar(1023) null,
    spacecraft            varchar(1023) null,
    test_subject_count    bigint        null,
    title                 varchar(255)  null,
    updated_at            datetime(6)   null,
    activity_id           bigint        not null,
    area_id               bigint        null,
    for_code_id           bigint        null,
    mission_id            bigint        not null,
    platform_id           bigint        not null,
    seo_code_id           bigint        null,
    subsystem_id          bigint        null,
    test_subject_type_id  bigint        null,
    toa_id                bigint        null,
    constraint FK7ijpx4m1q9ramxthh9rvjnl5i
        foreign key (area_id) references area (id),
    constraint FKa5dtlslln7y3ffff5xnytotfb
        foreign key (subsystem_id) references subsystem (id),
    constraint FKe10ehdoytkcjmxmihbksx4o2y
        foreign key (activity_id) references activity (id),
    constraint FKfngj6llveh6hcski9mjnjr7ft
        foreign key (seo_code_id) references seo_code (id),
    constraint FKgygeesbjm6430vcp7oqbj6i56
        foreign key (mission_id) references mission (id),
    constraint FKjikfxojmw5kwckcnhpdle3566
        foreign key (toa_id) references toa (id),
    constraint FKk79oehu9wu86ovdresbnuokyk
        foreign key (test_subject_type_id) references test_subject_type (id),
    constraint FKmhtqqtjv2v0vr3dawwqsemmm0
        foreign key (platform_id) references platform (id),
    constraint FKqaiemh670d1hykcnsmr52di4l
        foreign key (for_code_id) references for_code (id)
);

INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (1, true, '2022-05-01 00:00:00', false,
        'Develop a single mean field theory for the condesation phenomena of the magnetic particles', 'RMIT', null,
        null, null, 'Self-agglomeration of a ferrofluid in microgravity', null, 1, null, 2, 1, 1, 2, null, null, 1);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (2, true, '2022-05-01 00:00:00', false,
        'Increased urine output during the first periods of space flight has been reported in many astronauts and considered as an adaptive mechanism to cephalad fluid shift. During German-MIR-92 mission and D2-Spacelab mission the renal output of sodium and fluid',
        'DAMEC Research Center Copenhagen DENMARK', null, null, null,
        'Influence of microgravity on renal fluid excretion in humans', null, 1, null, 6, 2, 1, 12, null, null, 3);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (3, true, '2022-05-01 00:00:00', false,
        'Crystal growth is in essence particle size increase as a function of time, and it is therefore important to investigate on inherent visco-elastic properties, or cluster sizes of such sample solutions. The crystallisation of biological   macromolecules in ',
        'ESA-ESTEC,  Dierks & Partner Systemtechnik', null, null, null,
        'Characterization of selected biomolecules by Dynamic Light Scattering in the course of the STS-95 mission preparation',
        null, 1, null, 2, 3, 2, 12, null, null, 2);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (4, true, '2022-05-01 00:00:00', false,
        'Previous space experiments have shown that the polarity of lentil root statocytes was modified in microgravity (Perbal G. and Driss-Ecole D, 1989). The nucleus was slightly displaced toward the cell center and the amyloplasts were located in the proximal ',
        'Université Pierre et Marie Curie Laboratoire CEMV', null, null, null,
        'The cytoskeleton of the Lentil root statocyte', null, 1, null, 7, 4, 2, 2, null, null, 4);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (5, true, '2022-05-01 00:00:00', false,
        'Perform space experiments during a short mission life (generally up to 2 weeks)', 'University of Brest', null,
        null, null, 'Highrad', null, 1, null, 5, 5, 3, 16, null, null, 4);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (6, true, '2022-05-01 00:00:00', false,
        'Cadmium telluride (CdTe) and related compounds are promising materials for radiation sensors and photorefractive devices. Their commercial use is still limited owing to the problems in growing them. This MAP project is a close collaboration of scientists ',
        'University of Freiburg', null, null, null, 'Crystallisation of CdTe and related compounds', null, 1, null, 2,
        6, 3, 4, null, null, 4);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (7, true, '2022-05-01 00:00:00', false,
        'In the SPARC experiment a close look will be taken at these auxin-transporting proteins: AUX and PIN. It is envisaged that in the absence of gravity, the auxintransporting proteins will change their position. This process will be explored by exposing seed',
        'ESA-ESTEC', null, null, null,
        'SPARC - Specialized Phospholipase A, and Re-localization in auxin-transporting Cells in micro-g', null, 1,
        null, 2, 7, 4, 4, null, null, 3);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (8, true, '2022-05-01 00:00:00', false,
        'To perform high precision viscosity, surface tension and specific heat capacity measurements of an industrial Fe-alloy.',
        'Institut für Mikro und Nanomaterialien Universität Ulm Abt. Werkstoffe der Elektrotechnik', null, null, null,
        'High precision thermo-physical property data of liquid metals for modeling of industrial solidification processes',
        null, 1, null, 2, 8, 4, 6, null, null, 4);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (9, true, '2022-05-01 00:00:00', false,
        'Within this study we would like to investigate, that is a correlation between cerebrovascular auroregulation and neurocognitive performance during changed gravity conditions and  an effect of age on these mechanisms.',
        'Deutsche Sporthochschule Köln Institut für Bewegungs- und Neurowissenschaft Zentrum für integrative Physiologie im Weltraum',
        null, null, null, 'Cerebrovascular autoregulation as a determinant for neurocognitive performance', null, 1,
        null, 6, 9, 5, 12, null, null, 2);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (10, true, '2022-05-01 00:00:00', false,
        'The 61st ESA Parabolic Flight Campaign took place from 1 September to 12 September 2014 and was conducted from Bordeaux-Mérignac airport in France. While the first week was dedicated to the preparation of the experiments and the experiment integration int',
        'Université Libre de Bruxelles Microgravity Research Center', null, null, null,
        'ICAPS-IPE - Interactions in Cosmic and Atmospheric Particle Systems - ICAPS Precursor Experiments', null, 1,
        null, 4, 10, 6, 16, null, null, 3);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (11, true, '2022-05-01 00:00:00', false,
        'The Bartolomeo external payload facility will extend the infrastructure and capability of the ISS by 12 additional external sites fitting the expectations of the market. It enables the hosting of external payloads in low-Earth orbit, on-board the Internat',
        'Airbus Defence and Space Location Ottobrunn', null, null, null, 'Bartolomeo - Commercial', null, 1, null, 15,
        11, 1, 9, null, null, 2);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (12, true, '2022-05-01 00:00:00', false,
        'ESA EPO Task List is a series of educational videos about life on the ISS. Different astronauts explain during their respective mission certain aspects of their stay on board. Often they are accompanied by ''Paxi'' - ESA''s mascot for kids. They use Paxi as ',
        'ESA-ESTEC Directorate of Human Spaceflight and Exploration Education Office', null, null, null,
        'EPO Task List', null, 1, null, 13, 12, 1, 13, null, null, 1);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (13, true, '2022-05-01 00:00:00', false,
        'Judgments of durations in seconds, minutes, hours, and days will be recorded in crewmembers throughout their stay on board the ISS and compared with pre- and post-flight baselines. It is hypothesized that time duration is underestimated by astronauts in o',
        'Lyon Neuroscience Research Center', null, null, null, 'TIME - Time Perception in Microgravity', null, 1, null,
        16, 13, 1, 9, null, null, 2);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (14, true, '2022-05-01 00:00:00', false,
        'Demonstrate the robustness of the improved technology at the ISS in a representative operational environment: ISS as a test bed for technologies for future exploration. Develop small European niches in the area of life support based on state of the art te',
        'ESA-ESTEC', null, null, null, 'ANITA-2 - ANalyzing InTerferometer for ambient Air', null, 1, null, 10, 14, 1,
        9, null, null, 4);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (15, true, '2022-05-01 00:00:00', false,
        'ELECTRICAL RESISTIVITY project is dedicated to measuring electrical resistivity of molten metals. The aim of the project is to determine the resistivity dependence on the temperature. This dependence can then  be further used to indirectly determine therm',
        'Graz University of Technology Institute of Experimental Physics', null, null, null,
        'RESISTIVITY - Electrical Resistivity Measurements of High Temperature Metallic Melts, Batch 2', null, 1, null,
        2, 15, 1, 4, null, null, 3);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (16, true, '2022-05-01 00:00:00', false,
        'he effect of long-term living in space on physical ageing, such as loss of bone density is well-documented. The effect on the innate process of ageing however, is not known. This important question has remained largely unanswered because until now, there ',
        'Oslo University Hospital Department of Molecular Microbiologya, University of California Department of Human Genetics',
        null, null, null, 'DNAmAGE - Effects of prolonged spaceflight on DNA methylation age', null, 1, null, 6, 16, 1,
        12, null, null, 4);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (17, true, '2022-05-01 00:00:00', false,
        'The interaction between microbes and rocks in a medium phase can be affected by reduced gravity in more than one way. The reduction of thermal convection in low-gravity, and its absence in microgravity, will minimize the natural stirring in liquids and ga',
        'UK Centre for Astrobiology University of Edinburgh', null, null, null, 'BioAsteroid', null, 1, null, 6, 17, 1,
        12, null, null, 4);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (18, true, '2022-05-01 00:00:00', false,
        'The purpose of this proposed research is to better understand how the CNS integrates information from different sensory modalities, encoded in different reference frames, in order to coordinate the hand with the visual environment. More specifically, we w',
        'CNRS UMR 8119 Université Paris Descartes', null, null, null,
        'GRASP - Gravitational References for Sensorimotor Performance: Reaching and Grasping', null, 1, null, 11, 18,
        1, 12, null, null, 3);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (19, true, '2022-05-01 00:00:00', false,
        'The objectives of this experiment are to correct mathematical models of fluid sloshing provided by CFD tools;  To derive predictive models for future sloshing  under different operational conditions; To observe the fluid covering all the internal surface ',
        'France''s space agency CNES User Support and Operation Centre CADMOS', null, null, null,
        'FLUIDICS: FLUId DynamICs in Space (CNES National Contribution)', null, 1, null, 2, 19, 1, 4, null, null, 1);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (20, true, '2022-05-01 00:00:00', false,
        'Amateur Radio on the International Space Station (ARISS) inspires students, worldwide, to pursue interests and careers in science, technology, engineering and math through amateur radio communications opportunities with the International Space Station (IS',
        'ARISS - Amateur Radio on the International Space Station', null, null, null,
        'ARISS - Amateur Radio on the International Space Station', null, 1, null, 13, 20, 1, 13, null, null, 2);
INSERT INTO dev.experiment (id, approved, created_at, deleted, experiment_objectives, lead_institution, payload,
                            spacecraft, test_subject_count, title, updated_at, activity_id, area_id, for_code_id,
                            mission_id, platform_id, seo_code_id, subsystem_id, test_subject_type_id, toa_id)
VALUES (21, true, '2022-05-01 00:00:00', false,
        'Cryptography ICE Cube is a compact experiment aimed at enhancing cybersecurity for future space missions. It is testing two related approaches to encryption for non rad-hardened systems to make encryption-based secure communication feasible for space miss',
        'ESA-ESTEC', null, null, null, 'CryptIC - Cryptography ICE Cube#5', null, 1, null, 10, 21, 1, 9, null, null, 3);

create table attachment
(
    id            bigint auto_increment
        primary key,
    filename      varchar(1023) null,
    media_type    varchar(255)  null,
    experiment_id bigint        null,
    constraint FKg0a4dpinmvuixjko8t50rshjm
        foreign key (experiment_id) references experiment (id)
);

create table publication
(
    id               bigint auto_increment
        primary key,
    access_date      varchar(255)  null,
    doi              varchar(255)  null,
    issue_number     varchar(255)  null,
    journal          varchar(1023) null,
    journal_database varchar(255)  null,
    pages_used       varchar(255)  null,
    title            varchar(1023) null,
    url              varchar(1023) null,
    volume_number    varchar(255)  null,
    year_published   varchar(255)  null,
    experiment_id    bigint        null,
    constraint FKbu0k1t8r9min47m1s26p2ho4t
        foreign key (experiment_id) references experiment (id)
);

create table author
(
    id         bigint auto_increment
        primary key,
    first_name varchar(255) null,
    last_name  varchar(255) null
);

create table publication_author
(
    publication_id bigint not null,
    author_id      bigint not null,
    constraint FKg942a597vajs5b8v8r8ecj9su
        foreign key (publication_id) references publication (id),
    constraint FKs2kspjpjhf4cgxq5uunrury3m
        foreign key (author_id) references author (id)
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
