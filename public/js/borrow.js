const addNewUser = document.getElementById('addNewUser');
const addBookUser = document.getElementById('addBookUser');
const mobileNumber = document.getElementById('mobileNumber');
const searchUserbtn = document.getElementById('searchUser');
const mobileNumberError = document.getElementById('mobileNumberError');
const main = document.getElementById('main');
const tableUser = document.getElementById('tabelUser');
const viewAddUser = document.getElementById('viewAddUser');
const tableBorrowedBook = document.getElementById('ViewBorrowedBook');
const result = document.getElementById('result');

mobileNumber.addEventListener('focusout', (e) => {
  check(mobileNumber, mobileNumberError, 'الرجاء ادخال رقم الجوال');
});

const addUser = () => {
  addNewUser.classList.add('main__content--addUser-visible');
  result.classList.remove('main__search--result');
  result.classList.add('main__search--result--invisible');
};

const addBookForUser = () => {
  addBookUser.classList.add('main__content--addBookForUser-visible');
  addBookForUser.value = document.getElementsByClassName('trUser')[0].id;
};

const addBook = () => {
  addBookUser.classList.remove('main__content--addBookForUser-visible');
};

const deleteButtons = (button, route, routeToRedirect, deleteData) => {
  deleteButtonFunction(button, route, routeToRedirect, deleteData);
};

const fetchData = () => {
  const mobileNumberVal = mobileNumber.value;
  const data = {
    mobileNumberVal,
  };
  fetch('/admin/borrow/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(data),
  })
    .then(result => result.json())
    .then((response) => {
      tableUser.textContent = '';
      tableBorrowedBook.textContent = '';
      const userData = response.resultUser;
      const borrowedBook = response.resultBorrowedBooksByUserId;
      const trUserhead = document.createElement('tr');
      const trUser = document.createElement('tr');
      const name = document.createElement('th');
      const address = document.createElement('th');
      const mobile = document.createElement('th');
      name.textContent = 'اسم العضو';
      address.textContent = 'العنوان';
      mobile.textContent = ' رقم الجوال';
      trUserhead.appendChild(name);
      trUserhead.appendChild(address);
      trUserhead.appendChild(mobile);
      tableUser.appendChild(trUserhead);
      if (userData.length > 0) {
        viewAddUser.classList.remove('addNewUser-visible');
        viewAddUser.classList.add('addNewUser');
        main.classList.remove('main__content--result');
        main.classList.add('main__content--viewUser-visible');
        Object.keys(userData[0]).forEach((key, index) => {
          trUser.id = userData[0].userId;
          trUser.classList.add('trUser');
          if (index === 0) {
            return;
          }
          const tdUser = document.createElement('td');
          tdUser.textContent = userData[0][key];
          trUser.appendChild(tdUser);
          tableUser.appendChild(trUser);
        });
        if (borrowedBook.length > 0) {
          tableBorrowedBook.classList.add('main__content--table');
          tableBorrowedBook.classList.remove('main__content--table-invisible');
          const trBorrowedBookhead = document.createElement('tr');
          const nameBook = document.createElement('th');
          const date = document.createElement('th');
          const numSerial = document.createElement('th');
          const deleteBorrowed = document.createElement('th');
          nameBook.textContent = 'اسم الكتاب';
          date.textContent = 'تاريخ الانتهاء';
          deleteBorrowed.textContent = ' الإرجاع';
          numSerial.textContent = ' الرقم التسلسلى';
          trBorrowedBookhead.appendChild(nameBook);
          trBorrowedBookhead.appendChild(date);
          trBorrowedBookhead.appendChild(numSerial);
          trBorrowedBookhead.appendChild(deleteBorrowed);
          tableBorrowedBook.appendChild(trBorrowedBookhead);
          for (let i = 0; i <= borrowedBook.length; i += 1) {
            const trBorrowedBook = document.createElement('tr');
            Object.keys(borrowedBook[i]).forEach((key, index) => {
              const tdBorrowedBook = document.createElement('td');
              if (index === Object.keys(borrowedBook[i]).length - 1) {
                const button = document.createElement('button');
                button.classList.add('btnDelete');
                button.textContent = 'إرجاع';
                button.id = borrowedBook[i].idBorrow;
                tdBorrowedBook.appendChild(button);
                button.addEventListener(('click'), () => {
                  const idBorrow = button.getAttribute('id');
                  const deleteData = { idBorrow };
                  const route = `/admin/borrow/${idBorrow}`;
                  const mobileNum = href.split('=')[1];
                  const routeToRedirect = `/admin/borrow?data=${mobileNum}`;
                  deleteButtons(button, route, routeToRedirect, deleteData);
                });
              } else {
                tdBorrowedBook.textContent = borrowedBook[i][key];
              }
              trBorrowedBook.appendChild(tdBorrowedBook);
              tableBorrowedBook.appendChild(trBorrowedBook);
            });
          }
        } else {
          tableBorrowedBook.classList.remove('main__content--table');
          tableBorrowedBook.classList.add('main__content--table-invisible');
        }
      } else {
        main.classList.add('main__content--result');
        main.classList.remove('main__content--viewUser-visible');
        viewAddUser.classList.remove('addNewUser');
        viewAddUser.classList.add('addNewUser-visible');
      }
    })
    .catch(error => swal(error, 'error', 'error'));
};

const href = window.location.href;
const mobileNum = href.split('=')[1];
if (mobileNum) {
  mobileNumber.value = mobileNum;
  fetchData();
}

searchUserbtn.addEventListener('click', (e) => {
  const checkMobileNumber = check(mobileNumber, mobileNumberError, 'هذا الحقل مطلوب');
  if (checkMobileNumber) {
    fetchData();
  }
});
