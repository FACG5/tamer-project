exports.get = (request, response) => {
  response.clearCookie('data');
  response.redirect('/admin/login');
};
