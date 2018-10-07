exports.client = (req, res) => {
  res.status(404).render('error', {
    layout: 'error',
    title: 'Error | 404',
    statusCode: 404,
    errorMessage: 'الصفحة المطلوبة غير موجودة',
  });
};

exports.server = (err, req, res, next) => {
  res.status(500).render('error', {
    layout: 'error',
    title: 'Error | 500',
    statusCode: 500,
    errorMessage: 'خطأ داخلي في السيرفر',
  });
};
