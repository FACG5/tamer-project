INSERT INTO admin(user_name, password) VALUES ('admin',
'$2y$12$yhE8ruRCa7kJ9P8z.CqOEe4A6U1P9E8dfF1S1aRonYn6d9VWjrz1C');

INSERT INTO category(name, category_serial) VALUES ('أطفال','501');
INSERT INTO category(name, category_serial) VALUES ('علوم','502');
INSERT INTO category(name, category_serial) VALUES ('روايات','503');

INSERT INTO book(name_book, name_author, image_url, description, category_serial) VALUES('ليلى الحمقاء','سعاد شواهنة','https://www.tamerinst.org/media/uploads/2018/07/16/lele.PNG','كتاب أطفال جميل','501');
INSERT INTO book(name_book, name_author, image_url, description, category_serial) VALUES('مذكرات أطفال البحر','لبنى طه','https://www.tamerinst.org/media/uploads/2018/07/10/sea.PNG','كتاب أطفال جميل','501');
INSERT INTO book(name_book, name_author, image_url, description, category_serial) VALUES('الباب الأزرق','سونيا نمر','https://www.tamerinst.org/media/uploads/2018/08/09/38298020_1758931300856519_1958010147829710848_o.jpg','كتاب علوم مفيد','502');
INSERT INTO book(name_book, name_author, image_url, description, category_serial) VALUES('سرير جدي','أحلام كمال','https://www.tamerinst.org/media/uploads/2018/08/09/38768481_1770337053049277_2849485285048188928_n.jpg','كتاب علوم مفيد','502');
INSERT INTO book(name_book, name_author, image_url, description, category_serial) VALUES('قلبي غابة','رنين حنا','https://www.tamerinst.org/media/uploads/2018/07/07/heart.PNG','رواية جميل','503');
INSERT INTO book(name_book, name_author, image_url, description, category_serial) VALUES('صندوق العجب','سامح عبوشي','https://www.tamerinst.org/media/uploads/2018/07/09/box.PNG','رواية جميل','503');

INSERT INTO store(book_id, copy_number) VALUES (1, 10);
INSERT INTO store(book_id, copy_number) VALUES (2, 20);
INSERT INTO store(book_id, copy_number) VALUES (3, 30);
INSERT INTO store(book_id, copy_number) VALUES (4, 40);

INSERT INTO library(book_id, bookshelf, section, copy_id) VALUES (1, 1, 5, 2);
INSERT INTO library(book_id, bookshelf, section, copy_id) VALUES (4, 1, 10, 2);
INSERT INTO library(book_id, bookshelf, section, copy_id) VALUES (5, 3, 6, 5);
INSERT INTO library(book_id, bookshelf, section, copy_id) VALUES (6, 4, 8, 1);

INSERT INTO "user"(name, address, mobile_number) VALUES ('أسماء', 'غزة - النصر', '0599112233');
INSERT INTO "user"(name, address, mobile_number) VALUES ('لبنى', 'الوسطى', '0599558899');
INSERT INTO "user"(name, address, mobile_number) VALUES ('علي', 'غزة', '0599778899');

INSERT INTO borrow(user_id, book_library_id, start_date, end_date) VALUES (1, 1, '2018-09-15', '2018-09-25');
INSERT INTO borrow(user_id, book_library_id, start_date, end_date) VALUES (1, 2, '2018-09-20', '2018-09-30');
INSERT INTO borrow(user_id, book_library_id, start_date, end_date) VALUES (2, 3, '2018-09-30', '2018-10-09');
INSERT INTO borrow(user_id, book_library_id, start_date, end_date) VALUES (3, 4, '2018-10-05', '2018-10-10');
