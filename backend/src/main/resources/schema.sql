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

create table role
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
