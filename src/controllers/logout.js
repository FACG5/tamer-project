exports.get = (request, response) => {
  response.setHeader('Set-Cookie', 'data=0;httpOnly;Max-Age=0');
  response.redirect('/admin/login');
};
