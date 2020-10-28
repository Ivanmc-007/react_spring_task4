create sequence hibernate_sequence start 121 increment 1;
CREATE TABLE usr (
    id int8 NOT NULL,
    date_login date,
    date_registration date,
    email varchar(255),
    name varchar(255),
    password varchar(255),
    user_status varchar(255),
    PRIMARY KEY (id)
);