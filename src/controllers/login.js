const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const getAdmin = require('../database/queries/checkAdmin');

exports.get = (request, response) => {
  response.render('login', {
    layout: 'login', style: ['login'], js: 'login', title: 'تسجيل الدخول',
  });
};

exports.post = (request, response) => {
  const { usernameValue } = request.body;
  const { passwordValue } = request.body;

  getAdmin(usernameValue, (error, result) => {
    if (error) return response.status(500).send(JSON.stringify({ err: ' اسم المستخدم  غير موجود!' }));
    if (result[0]) {
      return bcrypt.compare(passwordValue, result[0].password, (err, res) => {
        if (err) return response.send(JSON.stringify({ err: 'Error!' }));
        if (res === false) return response.status(302).send(JSON.stringify({ err: 'خطأفى  كلمة السر !' }));
        const data = {
          admin: 'admin',
        };
        return sign(data, process.env.SECRET, (signError, cookie) => {
          if (signError) return response.send(JSON.stringify({ err: 'خطأ!' }));
          response.cookie('data', cookie, { maxAge: 6048000000, httpOnly: true });
          return response.send(JSON.stringify({ err: null, message: 'أهلا وسهلا' }));
        });
      });
    }
    return response.status(302).send(JSON.stringify({ err: 'خطأفى اسم المستخدم أو كلمة السر' }));
  });
};
