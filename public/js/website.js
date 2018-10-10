const search = document.getElementById('search');
const inputSearch = document.getElementById('input-search');
const submitSearch = document.getElementById('submit-search');

const creatElement = (content, text, parent) => {
  const element = document.createElement('span');
  const content1 = document.createElement('h5');
  content1.textContent = content;
  element.textContent = text;
  element.style.color = '#000';
  content1.appendChild(element);
  parent.appendChild(content1);
};

const caseBook = (num, parent) => {
  const element = document.createElement('h5');
  if (num === 0) {
    element.textContent = 'متاح';
    element.style.color = '#00ff00';
  } else {
    element.textContent = 'مستعار';
    element.style.color = '#ff0000';
  }
  parent.appendChild(element);
};

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
      .then(respons => respons.json())
      .then((respons) => {
        search.classList.add('main__search--book-visible');
        search.textContent = '';
        if (respons.result.length > 0) {
          for (let i = 0; i < respons.result.length; i++) {
            const div = document.createElement('div');
            const img = document.createElement('img');
            if (respons.result.imgURL) {
              img.src = respons.result.imgURL;
            } else {
              img.src = 'https://edition-medali.tn/img/p/ar-default.jpg';
            }
            div.appendChild(img);
            creatElement('اسم الكتاب :  ', respons.result[i].nameBook, div);
            creatElement('اسم الكاتب :  ', respons.result[i].nameAuthor, div);
            caseBook(respons.result[i].caseBook, div);
            search.appendChild(div);
          }
        } else {
          const div = document.createElement('div');
          const error = document.createElement('h5');
          error.textContent = 'عذرا ﻻ تتوفر نتيجة';
          div.appendChild(error);
          search.appendChild(div);
        }
      })
      .catch(err => swal(err, ' ', 'error'));
  } else {
    swal('Error !', 'أرجوا أن تدخل النص', 'error');
  }
});
