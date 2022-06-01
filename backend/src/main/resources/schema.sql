drop table if exists prod.platform_seo_code;
drop table if exists prod.platform_for_code;
drop table if exists prod.experiment_person;
drop table if exists prod.publication_author;
drop table if exists prod.author;
drop table if exists prod.publication;
drop table if exists prod.attachment;
drop table if exists prod.experiment;
drop table if exists prod.mission;
drop table if exists prod.platform;
drop table if exists prod.role;
drop table if exists prod.person;
drop table if exists prod.test_subject_type;
drop table if exists prod.area;
drop table if exists prod.subsystem;
drop table if exists prod.seo_code;
drop table if exists prod.for_code;
drop table if exists prod.toa;
drop table if exists prod.activity;
drop table if exists prod.user;

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

create table platform_for_code
(
    platform_id bigint not null,
    for_code_id bigint not null,
    constraint FK6vkhaa3u1pebex05oaq42nrcs
        foreign key (for_code_id) references for_code (id),
    constraint FK8j2978xvl3kosrtsp46ghuucs
        foreign key (platform_id) references platform (id)
);

create table platform_seo_code
(
    seo_code_id bigint not null,
    platform_id bigint not null,
    constraint FKo09o7de35pc1xm4obfe7o19r7
        foreign key (platform_id) references seo_code (id),
    constraint FKqyqyuerdsq7en49gy09l3s6na
        foreign key (seo_code_id) references platform (id)
);
