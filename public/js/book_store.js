const numberCopiesStore = document.getElementById('numberCopiesStore');
const numberCopiesStoreError = document.getElementById('numberCopiesStoreError');
const addBookStore = document.getElementById('addBookStore');

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
        if (response.errorMessage) return swal('Error !', response.errorMessage, 'error');
        swal('Good job!', response.message, 'success').then((value) => {
          JSON.stringify(response);
        });
      })
      .catch(error => swal('Error while adding category !', error.errorMessage, 'error'));
  }
});
