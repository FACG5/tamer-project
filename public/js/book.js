const mainBook = document.getElementsByClassName('main__conten--book');
const tabLinks = document.getElementsByClassName('main__header--nav-tablink');
const next = document.getElementById('next');
const AddCategory = document.getElementById('button-add-category');

const viewUser = (event, idUser) => {
  for (let i = 0; i < mainBook.length; i += 1) {
    mainBook[i].style.display = 'none';
    tabLinks[i].className = tabLinks[i].className.replace('active', '');
  }
  document.getElementById(idUser).style.display = 'block';
  event.currentTarget.classList.toggle('active');
};

const AddNewBook = () => {
  next.classList.add('btn__next--visible');
};

const AddNewCategory = () => {
  AddCategory.classList.add('panel-content--category-visible');
};

const AddNewCategoryBook = () => {
  AddCategory.classList.remove('panel-content--category-visible');
};
