exports.get = (request, response) => {
  response.cookie('data', '0', { maxAge: 0, httpOnly: true });
  response.redirect('/admin/login');
};
