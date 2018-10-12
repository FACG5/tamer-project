const editBook = document.getElementById('editbtn');
const nameBook = document.getElementById('nameBook');
const nameAuthor = document.getElementById('nameAuthor');
const description = document.getElementById('description');
const copyNumber = document.getElementById('copyNumber');
const img = document.getElementById('img');
const nameBookError = document.getElementById('nameBookError');
const nameAuthorError = document.getElementById('nameAuthorError');
const descriptionError = document.getElementById('descriptionError');
const copyNumberError = document.getElementById('copyNumberError');
const form = document.querySelector('.form');
const URL = window.location.href;
const splitUrl = URL.split('/');
const storeId = splitUrl[splitUrl.length - 1];
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

copyNumber.addEventListener('focusout', () => {
  check(copyNumber, copyNumberError, 'هذا الحقل مطلوب');
});

editBook.addEventListener('click', (e) => {
  e.preventDefault();
  const checkNameBook = check(nameBook, nameBookError, 'هذا الحقل مطلوب');
  const checkNameAuthor = check(nameAuthor, nameAuthorError, 'هذا الحقل مطلوب');
  const checkDescription = check(description, descriptionError, 'هذا الحقل مطلوب');
  const checkCopyNumber = check(copyNumber, copyNumberError, 'هذا الحقل مطلوب');

  if (checkNameBook && checkNameAuthor && checkDescription && checkCopyNumber && img) {
    const nameBookVal = nameBook.value;
    const nameAuthorVal = nameAuthor.value;
    const descriptionVal = description.value;
    const copyNumberVal = copyNumber.value;
    const imgVal = img.value;

    const data = {
      nameBookVal,
      nameAuthorVal,
      descriptionVal,
      copyNumberVal,
      imgVal,
      storeId,
      bookId,
    };
    fetch(`/admin/books/store/book/edit/${storeId}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((response) => {
        if (response.errorMessage) return swal('خطأ', response.errorMessage, 'error');
        swal('OK!', response.message, 'success').then((value) => {
          window.location = `/admin/books/store/book/${storeId}`;
          JSON.stringify(response);
        });
      })
      .catch(error => swal(error, 'error', 'error'));
  }
});
