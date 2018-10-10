const search = (input, table1) => {
  const table = table1;
  const tr = table.getElementsByTagName('tr');
  const div = document.createElement('div');
  const p = document.createElement('p');
  p.textContent = 'عذرا ﻻ تتوفر بيانات';
  div.appendChild(p);
  const bod = table.parentElement;
  bod.appendChild(div);
  div.style.display = 'none';
  input.addEventListener('input', (e) => {
    e.preventDefault();
    let count = 0;
    const filter = input.value;
    for (let i = 0; i < tr.length; i += 1) {
      const td1 = tr[i].getElementsByTagName('td')[0];
      const td2 = tr[i].getElementsByTagName('td')[1];
      if (td1 || td2) {
        if (td1.innerHTML.indexOf(filter) > -1 || td2.innerHTML.indexOf(filter) > -1) {
          count = 0;
          tr[i].style.display = '';
          div.style.display = 'none';
          table.style.display = '';
        } else {
          count += 1;
          tr[i].style.display = 'none';
          if (count === i) {
            div.style.display = '';
            table.style.display = 'none';
          }
        }
      }
    }
  });
};

const displayErr = (errElem, errMsg) => {
  errElem.textContent = errMsg;
};

const check = (input, errorMessageElement, errMessage) => {
  if (!input.value) {
    displayErr(errorMessageElement, errMessage);
  } else {
    displayErr(errorMessageElement, '');
    return true;
  }
};

const deleteButtonFunction = (
  button,
  route,
  redirectLocation,
  dataOfDelete,
) => {
  button.addEventListener('click', (e) => {
    swal({
      title: 'Are you sure ?',
      text: 'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(route, {
          method: 'DELETE',
          credentials: 'same-origin',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(dataOfDelete),
        })
          .then(result => result.json())
          .then((result) => {
            if (result.err) return swal('Error', '', 'error');
            return swal(result.message, {
              icon: 'success',
            }).then((value) => {
              window.location = redirectLocation;
            });
          });
      }
    });
  });
};
