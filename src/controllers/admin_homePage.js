const { getStatistics } = require('../database/queries/get_statistics');

exports.get = (request, response, next) => {
  getStatistics()
    .then((res) => {
      response.render('admin_homePage',
        {
          adminHomePage: 'active',
          layout: 'admin',
          title: 'الرئيسية',
          data: res[0],
        });
    })
    .catch(error => next(error));
};
