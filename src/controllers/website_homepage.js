const { getSearchedBook } = require('../database/queries/website');

exports.get = (request, response) => {
  response.render('website_homepage',
    {
      layout: 'website',
      title: 'الرئيسية',
      js: 'website',
    });
};

exports.post = (request, response, next) => {
  const { string } = request.body;
  getSearchedBook(string, string)
    .then((responseArray) => {
      const array = [];
      responseArray.forEach((res) => {
        const serialNumber = `${res.category}.${res.bookShelf}.${res.section}.${res.copyId}`;
        const data = {
          idLibrary: res.idLibrary,
          nameBook: res.nameBook,
          nameAuthor: res.nameAuthor,
          caseBook: res.caseBook,
          serialNumber,
          imgURL: res.imageUrl,
        };
        array.push(data);
      });
      response.send({ result: array });
    })
    .catch(error => next(error));
};
