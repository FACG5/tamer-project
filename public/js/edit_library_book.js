const editBook = document.getElementById('editbtn');
const nameBook = document.getElementById('nameBook');
const nameAuthor = document.getElementById('nameAuthor');
const description = document.getElementById('description');
const bookShelf = document.getElementById('bookShelf');
const section = document.getElementById('section');
const img = document.getElementById('img');
const nameBookError = document.getElementById('nameBookError');
const nameAuthorError = document.getElementById('nameAuthorError');
const descriptionError = document.getElementById('descriptionError');
const bookShelfError = document.getElementById('bookShelfError');
const sectionError = document.getElementById('sectionError');
const form = document.querySelector('.form');
const URL = window.location.href;
const splitUrl = URL.split('/');
const libraryId = splitUrl[splitUrl.length - 1];
const bookId = form.id;

nameBook.addEventListener('focusout', () => {
  check(nameBook, nameBookError, 'هذا الحقل مطلوب');
});
nameAuthor.addEventListener('focusout', () => {
  check(nameAuthor, nameAuthorError, 'هذا الحقل مطلوب');
});
description.addEventListener('focusout', () => {
  check(description, descriptionError, 'هذا الحقل مطلوب');
});

bookShelf.addEventListener('focusout', () => {
  check(bookShelf, bookShelfError, 'هذا الحقل مطلوب');
});
section.addEventListener('focusout', () => {
  check(section, sectionError, 'هذا الحقل مطلوب');
});

editBook.addEventListener('click', (e) => {
  e.preventDefault();
  const checkNameBook = check(nameBook, nameBookError, 'هذا الحقل مطلوب');
  const checkNameAuthor = check(nameAuthor, nameAuthorError, 'هذا الحقل مطلوب');
  const checkDescription = check(description, descriptionError, 'هذا الحقل مطلوب');
  const checkBookShelf = check(bookShelf, bookShelfError, 'هذا الحقل مطلوب');
  const checkSection = check(section, sectionError, 'هذا الحقل مطلوب');

  if (checkNameBook && checkNameAuthor && checkDescription && checkBookShelf && checkSection && img) {
    const nameBookVal = nameBook.value;
    const nameAuthorVal = nameAuthor.value;
    const descriptionVal = description.value;
    const bookShelfVal = bookShelf.value;
    const sectionVal = section.value;
    const imgVal = img.value;

    const data = {
      nameBookVal,
      nameAuthorVal,
      descriptionVal,
      bookShelfVal,
      sectionVal,
      imgVal,
      libraryId,
      bookId,
    };
    fetch(`/admin/books/library/book/edit/${libraryId}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((response) => {
        if (response.errorMessage) return swal('خطأ', response.errorMessage, 'error');
        swal('', response.message, 'success').then((value) => {
          window.location = `/admin/books/library/book/${libraryId}`;
          JSON.stringify(response);
        });
      })
      .catch(error => swal(error, 'error', 'error'));
  }
});
