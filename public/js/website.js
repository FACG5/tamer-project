const search = document.getElementById('search');
const inputSearch = document.getElementById('input-search');
const submitSearch = document.getElementById('submit-search');

submitSearch.addEventListener('click', (e) => {
  e.preventDefault();
  if (inputSearch.value.trim() !== '') {
    const object = {
      string: inputSearch.value,
    };
    fetch('/', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(object),
    })
      .then(result => result.json())
      .then((result) => {
        console.log(result);
        search.classList.add('main__search--book-visible');
        const div = document.createElement('div');
        const h5 = document.createElement('h5');
        h5.textContent = 'كتاب';
        div.appendChild(h5);
        const img = document.createElement('img');
        img.src = 'https://edition-medali.tn/img/p/ar-default.jpg';
        div.appendChild(img);
        search.appendChild(div);
      })
      .catch(err => swal(err, ' ', 'error'));
  } else {
    swal('Error !', 'أرجوا أن تدخل النص', 'error');
  }
});
