const search = document.getElementById('search');
const addNewUser = document.getElementById('addNewUser');
const viewDataUser = document.getElementById('viewUser');
const addBookUser = document.getElementById('addBookUser');

const searchUser = () => {
  search.classList.add('main__search--result-visible');
};

const addUser = () => {
  addNewUser.classList.add('main__content--addUser-visible');
};

const viewUser = () => {
  addNewUser.classList.remove('main__content--addUser-visible');
  addNewUser.classList.add('main__content--addUser');
  search.classList.remove('main__search--result-visible');
  search.classList.add('main__content--result');
  viewDataUser.classList.add('main__content--viewUser-visible');
};

const addBookForUser = () => {
  addBookUser.classList.add('main__content--addBookForUser-visible');
};


const addBook = () => {
  addBookUser.classList.remove('main__content--addBookForUser-visible');
};
