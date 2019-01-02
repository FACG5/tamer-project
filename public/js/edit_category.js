const editCategory = document.getElementById('editbtn');
const categoryName = document.getElementById('categoryName');
const categorySerial = document.getElementById('categorySerial');
const categoryNameError = document.getElementById('categoryNameError');
const categorySerialError = document.getElementById('categorySerialError');
const URL = window.location.href;
const splitUrl = URL.split('/');
const categoryId = splitUrl[splitUrl.length - 1];

categoryName.addEventListener('focusout', () => {
  check(categoryName, categoryNameError, 'هذا الحقل مطلوب');
});
categorySerial.addEventListener('focusout', () => {
  check(categorySerial, categorySerialError, 'هذا الحقل مطلوب');
});

editCategory.addEventListener('click', (e) => {
  e.preventDefault();
  const checkCategoryName = check(categoryName, categoryNameError, 'هذا الحقل مطلوب');
  const checkCategorySerial = check(categorySerial, categorySerialError, 'هذا الحقل مطلوب');

  if (checkCategoryName && checkCategorySerial) {
    const categoryNameVal = categoryName.value;
    const categorySerialVal = categorySerial.value;

    const data = {
      categoryNameVal,
      categorySerialVal,
      categoryId,
    };
    fetch(`/admin/books/category/edit/${categoryId}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((response) => {
        if (response.errorMessage) return swal('خطأ', response.errorMessage, 'error');
        swal('', response.message, 'success').then((value) => {
          window.location = '/admin/books/category';
          JSON.stringify(response);
        });
      })
      .catch(error => swal(error, 'error', 'error'));
  }
});
