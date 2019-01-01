const copyId = document.getElementById('copyId');
const bookshelf = document.getElementById('bookshelf');
const section = document.getElementById('section');
const libraryId = document.getElementById('libraryId');
const addBookToUser = document.getElementById('addBookToUser');

addBookToUser.addEventListener('click', (e) => {
  e.preventDefault();
  const copyIdVal = copyId.value;
  const bookshelfVal = bookshelf.value;
  const sectionsVal = section.value;
  const libraryIdVal = libraryId.value;
  const userId = addBookForUser.value;
  const data = {
    copyIdVal,
    bookshelfVal,
    sectionsVal,
    userId,
    libraryIdVal,
  };
  fetch('/admin/user/book', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(data),
  })
    .then(result => result.json())
    .then((response) => {
      if (response.message === ' هذا الكتاب مستعار ') {
        swal('خطأ !', response.message, 'error');
      } else if (response.resultLibrary.length > 0) {
        const href = window.location.href;
        const mobileNum = href.split('=')[1];
        swal('إضافة', response.message, 'success').then((value) => {
          window.location = `/admin/borrow?data=${mobileNum}`;
        });
      } else {
        swal('خطأ !', response.message, 'error');
      }
    })
    .catch(error => swal('خطأ !', '', 'error'));
});
