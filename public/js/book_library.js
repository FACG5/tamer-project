const numberCopies = document.getElementById('numberCopies');
const numberCopiesError = document.getElementById('numberCopiesError');
const bookshelf = document.getElementById('bookshelf');
const bookshelfError = document.getElementById('bookshelfError');
const section = document.getElementById('section');
const sectionError = document.getElementById('sectionError');
const addLibraryBook = document.getElementById('addLibraryBook');
const deleteLibraryBookButton = document.querySelectorAll('.delete');


numberCopies.addEventListener('focusout', (e) => {
  check(numberCopies, numberCopiesError, 'هذا الحقل مطلوب');
});

bookshelf.addEventListener('focusout', (e) => {
  check(bookshelf, bookshelfError, 'هذا الحقل مطلوب');
});

section.addEventListener('focusout', (e) => {
  check(section, sectionError, 'هذا الحقل مطلوب');
});

addLibraryBook.addEventListener('click', (e) => {
  const checkNumberCopies = check(numberCopies, numberCopiesError, 'هذا الحقل مطلوب');
  const checkBookshelf = check(bookshelf, bookshelfError, 'هذا الحقل مطلوب');
  const checkSection = check(section, sectionError, 'هذا الحقل مطلوب');
  if (checkNumberCopies && checkBookshelf && checkSection) {
    const copyIdVal = numberCopies.value;
    const bookshelfVal = bookshelf.value;
    const sectionVal = section.value;
    const bookId = next.value;
    const data = {
      bookId,
      bookshelfVal,
      sectionVal,
      copyIdVal,
    };
    fetch(`/admin/books/${bookId}/library`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then(result => result.json())
      .then((response) => {
        swal('', response.message, 'success').then(() => {
          JSON.stringify(response);
        });
      })
      .catch(error => swal('خطأ ! !', error, 'error'));
  }
});

deleteLibraryBookButton.forEach((button) => {
  const idLibrary = button.getAttribute('id');
  const deleteData = { idLibrary };
  const route = `/admin/books/library/${idLibrary}`;
  const routeToRedirect = '/admin/books/library';
  deleteButtonFunction(button, route, routeToRedirect, deleteData);
});
