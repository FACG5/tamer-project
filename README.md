# TAMER Institute Library Project 

TAMER Institute for Community Education is an educational non-governmental non for profit organization established in 1989 as a natural and necessary response to the urgent needs of the Palestinian community during the first intifada (uprising). The most important of these is the need to acquire means to help people learn and become productive. Focusing principally on the rights to education, identity, freedom of expression, and access to information.

 ---------------------------
### Problem Statement

* TAMER Institute follows the traditional manual way for managing its library.


#### Our Solution 

* Create management system for TAMER Institute's library that content of :

  * A control Panel for TAMER Institute that include view/add/delete/update (CRUD) of the books/users/borrowing section
  * Landing page for library users to search for books in it.

 ---------------------------
 
 ### user stories
**AS AN ADMIN**
 
* I can login to the admin panel.
* I can logout from the admin panel.
* I can view dashboard statistics. 
* I can view the current books data in the library. 
* I can view the current books data in the store . 
* I can view the borrowed books data. 
* I can search for borrowed books.
* I can  search for book in the library.
* I can  search for book in the store.
* I can view book information in the library.
* I can view book information in the store.
* I can edit the current books data  in the library .
* I can delete the current books data  in the library .
* I can edit the current books data  in the store .
* I can delete the current books data  in the store .
* I can add new books.
* I can add new books in the library.
* I can add new books in the store.
* I can view users.
* I can search for user.
* I can view borrowers.
* I can search for borrower.
* I can view the borrowing section.
* I can search for user by mobile number in the borrowing section.
* I can add new user when doesn't exists in the searching process.
* I can delete book to the user borrowing list.
* I can add book to the user borrowing list.
* If I go the wrong path go the error page.

**As a guest**

* I can search books tamer library.
* I can know from the result if the book available or not .
* I can view most borrowed books home page .
* If I go the wrong path  go the error page.


 --------------------------- 
 
### How to run website locally 
- Clone this repository
- Run ```npm i```
- Create a ```config.env``` file
- Add ```DB_URL AND SECRET``` 
- run ```npm start``` or ```npm run dev``` to run the project

 ---------------------------
 
 ### Database Schema
 ![DB_SCHEMA](https://files.gitter.im/lubnaabd/et3f/db2.png)


### How to run tests
- Add ```TEST_DB_URL``` to ```config.env``` 

- run ```npm run test-db``` to run database tests.
- run ```npm run test-routes``` to run server routes tests.
 ---------------------------
Link Of Prototype [Here ](https://www.figma.com/proto/bvtedIRRYAB3T86hrSEtJiKz/tamer-project?node-id=119%3A64&scaling=min-zoom&redirected=1)

 ---------------------------
### Tech stack
- Express.js
- PostgreSQL
- HTML5
- CSS3
- Javascript

### Team
- Ali
- Lubna
- Asmaa
