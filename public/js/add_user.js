const name = document.getElementById('name');
const mobileNumberUser = document.getElementById('mobileNumberUser');
const address = document.getElementById('address');
const addUsers = document.getElementById('addUsers');
const nameError = document.getElementById('nameError');
const mobileNumberUserError = document.getElementById('mobileNumberUserError');
const addressError = document.getElementById('addressError');

name.addEventListener('focusout', (e) => {
  check(name, nameError, 'هذا الحقل مطلوب');
});

mobileNumberUser.addEventListener('focusout', (e) => {
  check(mobileNumberUser, mobileNumberUserError, 'هذا الحقل مطلوب');
});

address.addEventListener('focusout', (e) => {
  check(address, addressError, 'هذا الحقل مطلوب');
});

addUsers.addEventListener('click', (e) => {
  const checkName = check(name, nameError, 'هذا الحقل مطلوب');
  const checkMobileNumberUser = check(mobileNumberUser, mobileNumberUserError, 'هذا الحقل مطلوب');
  const checkAddress = check(address, addressError, 'هذا الحقل مطلوب');
  if (checkName && checkMobileNumberUser && checkAddress) {
    const nameUserVal = name.value;
    const mobileNumberUserVal = mobileNumberUser.value;
    const addressVal = address.value;
    const data = {
      nameUserVal,
      mobileNumberUserVal,
      addressVal,
    };
    fetch('/admin/user/', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    })
      .then(result => result.json())
      .then((response) => {
        if (response.errorMessage) return swal('Error !', response.errorMessage, 'error');
        swal('Good job!', response.message, 'success').then((value) => {
          const mobileNumber = response.mobileNumberUser;
          window.location = `/admin/borrow?data=${mobileNumber}`;
          JSON.stringify({ response, mobileNumber });
          JSON.stringify(response);
        });
      })
      .catch(error => swal('Error while adding category !', error.errorMessage, 'error'));
  }
});
