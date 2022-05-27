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

create table activity
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

create table toa
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

create table for_code
(
    id   bigint auto_increment
        primary key,
    code varchar(255) null,
    name varchar(255) null
);

create table seo_code
(
    id   bigint auto_increment
        primary key,
    code varchar(255) null,
    name varchar(255) null
);

create table subsystem
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

create table area
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

create table test_subject_type
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

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

create table role
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

create table platform
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

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