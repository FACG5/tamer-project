const { parse } = require('cookie');
const { verify } = require('jsonwebtoken');

require('env2')('./config.env');

exports.isLoggedIn = (request, response, next) => {
  if (!request.headers.cookie) return response.redirect('/admin/login');

  const { data } = parse(request.headers.cookie);

  if (!data) return response.redirect('/admin/login');

  return verify(data, process.env.SECRET, (err, result) => {
    if (err) return response.redirect('/admin/login');
    return next();
  });
};
