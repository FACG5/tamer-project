const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const getAdmin = require('../database/queries/checkAdmin');

exports.get = (request, response) => {
  response.render('login', {
    layout: 'login', style: 'login', js: 'login', title: 'تسجيل الدخول',
  });
};

exports.post = (request, response) => {
  const { usernameValue } = request.body;
  const { passwordValue } = request.body;
  getAdmin(usernameValue, (error, result) => {
    console.log(result);
    if (error) return response.send(JSON.stringify({ err: 'UserName Not Found !' }));
    if (result[0]) {
      return bcrypt.compare(passwordValue, result[0].password, (err, res) => {
        if (err) return response.send(JSON.stringify({ err: 'Error!' }));
        if (res === false) return response.send(JSON.stringify({ err: 'Wrong Password !' }));
        const data = {
          admin: 'admin',
        };
        return sign(data, process.env.SECRET, (signError, cookie) => {
          if (signError) return response.send(JSON.stringify({ err: 'Error!' }));
          response.setHeader(
            'set-cookie',
            `data=${cookie};httpOnly;Max-Age=999999`,
          );
          return response.send(JSON.stringify({ err: null, message: 'Welcome' }));
        });
      });
    }
    return response.send(JSON.stringify({ err: 'Wrong username/password' }));
  });
};
