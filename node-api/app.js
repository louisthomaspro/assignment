var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var tasks = require('./routes/tasks');
var solver = require('./routes/solver');
var assign = require('./routes/assign');

var list = require('./routes/list');

var app = express();



var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://ltpro.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://easy-assignment.com',
    issuer: "https://ltpro.eu.auth0.com/",
    algorithms: ['RS256']
});


// app.use(jwtCheck);
//
// app.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401).json({message:'Missing or invalid token'});
//   }
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/tasks', tasks);
app.use('/solver', solver);
app.use('/list', list);
app.use('/assign', assign);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(36);
console.log('Working !');
module.exports = app;