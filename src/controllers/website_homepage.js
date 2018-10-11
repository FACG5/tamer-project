const { getSearchedBook, getMostBooks } = require('../database/queries/website');

exports.get = (request, response, next) => {
  getMostBooks()
    .then((res) => {
      response.render('website_homepage',
        {
          layout: 'website',
          title: 'الرئيسية',
          js: 'website',
          res,
        });
    })
    .catch(error => next(error));
};

exports.post = (request, response, next) => {
  const { string } = request.body;
  getSearchedBook(string)
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
