exports.get = (request, response) => {
  response.render('login', {
    layout: 'login', style: 'login', js: 'login', title: 'تسجيل الدخول',
  });
};
