const numberCopiesStore = document.getElementById('numberCopiesStore');
const numberCopiesStoreError = document.getElementById('numberCopiesStoreError');
const addBookStore = document.getElementById('addBookStore');
const deleteStoreBookButton = document.querySelectorAll('.delete');

numberCopiesStore.addEventListener('focusout', (e) => {
  check(numberCopiesStore, numberCopiesStoreError, 'هذا الحقل مطلوب');
});

addBookStore.addEventListener('click', (e) => {
  const checkNumberCopiesStore= check(numberCopiesStore, numberCopiesStoreError, 'هذا الحقل مطلوب');
  if (checkNumberCopiesStore) {
    const bookId = next.value;
    const copyNumberVal = numberCopiesStore.value;
    const data = {
      bookId,
      copyNumberVal,
    };
    fetch(`/admin/books/${bookId}/store`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then(result => result.json())
      .then((response) => {
        if (response.errorMessage) return swal('خطأ !', response.errorMessage, 'error');
        swal('', response.message, 'success').then((value) => {
          JSON.stringify(response);
        });
      })
      .catch(error => swal('خطأ!', error.errorMessage, 'error'));
  }
});

deleteStoreBookButton.forEach((button) => {
  const idStore = button.getAttribute('id');
  const deleteData = { idStore };
  const route = `/admin/books/store/${idStore}`;
  const routeToRedirect = '/admin/books/store';
  deleteButtonFunction(button, route, routeToRedirect, deleteData);
});
