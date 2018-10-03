BEGIN ;

DROP TABLE IF EXISTS book, library, store, category, admin, users, borrow CASCADE;

CREATE TABLE admin (
    id serial PRIMARY KEY,
    user_name varchar UNIQUE NOT NULL ,
    password varchar NOT NULL
);

CREATE TABLE category (
    id serial PRIMARY KEY,
    name varchar NOT NULL UNIQUE,
    category_serial varchar NOT NULL UNIQUE
);

CREATE TABLE book (
    id serial PRIMARY KEY,
    name_book varchar  NOT NULL,
    name_author varchar NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT NOT NULL,
    category_serial varchar NOT NULL REFERENCES category(category_serial) ON UPDATE CASCADE
);

CREATE TABLE store (
    id serial PRIMARY KEY,
    book_id integer NOT NULL REFERENCES book(id) ON UPDATE CASCADE,
    copy_number integer NOT NULL
);

  CREATE TABLE library (
    id serial PRIMARY KEY,
    book_id integer NOT NULL REFERENCES book(id) ON UPDATE CASCADE,
    bookshelf integer NOT NULL,
    section integer NOT NULL,
    copy_id integer NOT NULL
);


CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar NOT NULL,
    address TEXT NOT NULL,
    mobile_number varchar NOT NULL
);

CREATE TABLE borrow (
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON UPDATE CASCADE,
    book_library_id integer NOT NULL REFERENCES library(id) ON UPDATE CASCADE,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL
);

COMMIT ;
