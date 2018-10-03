const app = require('./app');

app.listen(app.get('port'), () => {
  console.log('App is on ', app.get('port'));
});
