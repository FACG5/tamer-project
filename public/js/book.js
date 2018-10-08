const mainBook = document.getElementsByClassName('main__conten--book');
const tabLinks = document.getElementsByClassName('main__header--nav-tablink');
const next = document.getElementById('next');
const AddCategory = document.getElementById('button-add-category');
const searchLibrary = document.getElementById('input-search-library');
const library = document.getElementById('table-library');
const nameBook = document.getElementById('nameBook');
const imageBook = document.getElementById('image');
const description = document.getElementById('description');
const nameAuthor = document.getElementById('name-author');
const category = document.getElementById('category');
const addBook = document.getElementById('addBook');
const categoryError = document.getElementById('categoryError');
const nameBookError = document.getElementById('nameBookError');
const nameAuthorError = document.getElementById('nameAuthorError');
const nameCategory = document.getElementById('nameCategory');
const serialNumber = document.getElementById('serialNumber');
const addCategory = document.getElementById('addCategory');
const serialNumberCategoryError = document.getElementById('serialNumberCategoryError');
const nameCategoryError = document.getElementById('nameCategoryError');
const searchBorrow = document.getElementById('input-search-borrow');
const borrow = document.getElementById('table-borrow');
const searchStore = document.getElementById('input-search-store');
const store = document.getElementById('table-store');

const viewUser = (event, idUser) => {
  for (let i = 0; i < mainBook.length; i += 1) {
    mainBook[i].style.display = 'none';
    tabLinks[i].className = tabLinks[i].className.replace('active', '');
  }
  document.getElementById(idUser).style.display = 'block';
  event.currentTarget.classList.toggle('active');
};

const AddNewCategory = () => {
  AddCategory.classList.add('panel-content--category-visible');
};

const AddNewCategoryBook = () => {
  AddCategory.classList.remove('panel-content--category-visible');
};

nameBook.addEventListener('focusout', (e) => {
  check(nameBook, nameBookError, 'هذا الحقل مطلوب');
});

nameAuthor.addEventListener('focusout', (e) => {
  check(nameAuthor, nameAuthorError, 'هذا الحقل مطلوب');
});

category.addEventListener('focusout', (e) => {
  check(category, categoryError, 'هذا الحقل مطلوب');
});

nameCategory.addEventListener('focusout', (e) => {
  check(nameCategory, nameCategoryError, 'هذا الحقل مطلوب');
});

serialNumber.addEventListener('focusout', (e) => {
  check(serialNumber, serialNumberCategoryError, 'هذا الحقل مطلوب');
});

nameCategory.addEventListener('focusout', (e) => {
  check(nameCategory, nameCategoryError, 'هذا الحقل مطلوب');
});

serialNumber.addEventListener('focusout', (e) => {
  check(serialNumber, serialNumberCategoryError, 'هذا الحقل مطلوب');
});

addBook.addEventListener('click', (e) => {
  const checkName = check(nameBook, nameBookError, 'هذا الحقل مطلوب');
  const checkNameAuthor = check(nameAuthor, nameAuthorError, 'هذا الحقل مطلوب');
  const checkCategory = check(category, categoryError, 'هذا الحقل مطلوب');
  if (checkName && checkNameAuthor && checkCategory) {
    const nameBookVal = nameBook.value;
    const nameAuthorVal = nameAuthor.value;
    const descriptionVal = description.value;
    const imageBookVal = imageBook.value;
    const categorySerial = category[category.selectedIndex].value;
    const data = {
      nameBookVal,
      nameAuthorVal,
      imageBookVal,
      descriptionVal,
      categorySerial,
    };
    fetch('/admin/books/', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then(result => result.json())
      .then((response) => {
        swal('Good job!', response.message, 'success').then((value) => {
          next.classList.add('btn__next--visible');
          next.value = response.bookId;
          JSON.stringify(response);
        });
      })
      .catch(error => swal(error, 'error', 'error'));
  }
});

addCategory.addEventListener('click', (e) => {
  const checkNameCategory = check(nameCategory, nameCategoryError, 'هذا الحقل مطلوب');
  const checkSerialNumber = check(serialNumber, serialNumberCategoryError, 'هذا الحقل مطلوب');
  if (checkNameCategory && checkSerialNumber) {
    const nameCategoryVal = nameCategory.value;
    const serialNumberVal = serialNumber.value;
    const data = {
      nameCategoryVal,
      serialNumberVal,
    };
    fetch('/admin/books/category', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then(result => result.json())
      .then((response) => {
        if (response.errorMessage) return swal('Error !', response.errorMessage, 'error');
        swal('Good job!', response.message, 'success').then((value) => {
          window.location = '/admin/books/add/';
          JSON.stringify(response);
        });
      })
      .catch(error => swal('Error while adding category !', error.errorMessage, 'error'));
  }
});

search(searchLibrary, library);
search(searchBorrow, borrow);
search(searchStore, store);
