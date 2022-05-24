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

