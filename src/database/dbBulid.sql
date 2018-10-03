BEGIN ;

DROP TABLE IF EXISTS book, library, store, category, admin, users,  brorow CASCADE;

CREATE TABLE admin (
    id serial PRIMARY KEY,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE category (
    id serial PRIMARY KEY,
    Name TEXT NOT NULL,
    category_serial TEXT NOT NULL UNIQUE
);

CREATE TABLE book (
    id serial PRIMARY KEY,
    name serial NOT NULL,
    image_url serial NOT NULL,
    description serial NOT NULL,
    category_serial integer NOT NULL REFERENCES category(id) ON UPDATE CASCADE,
    author TEXT NOT NULL
);

CREATE TABLE store (
    id serial PRIMARY KEY,
    id_book integer NOT NULL REFERENCES book(id) ON UPDATE CASCADE,
    copy_id integer NOT NULL
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
    name serial NOT NULL,
    address serial NOT NULL,
    mobile_number serial NOT NULL
);

CREATE TABLE borrow (
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id) ON UPDATE CASCADE,
    book_library_id integer NOT NULL REFERENCES library(id) ON UPDATE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

COMMIT ;
