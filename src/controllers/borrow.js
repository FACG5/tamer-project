exports.get = (request, response) => {
  response.render('view_borrow',
    {
      viewBorrow: 'active',
      borrow: 'active',
      layout: 'admin',
      title: 'اﻹعارة',
      style: ['borrow'],
      js: ['borrow'],
    });
};
