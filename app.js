const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const passport = require('passport');
const config = require('./config/config');
// const flash = require('connect-flash');
// const session = require('express-session');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const processesRouter = require('./routes/processes');
const tasksRouter = require('./routes/tasks');
const systemsRouter = require('./routes/systems');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// set passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use(config.api_ver+'/auth', authRouter);
app.use(config.api_ver+'/users', passport.authenticate('jwt', {session: false}), usersRouter);
app.use(config.api_ver+'/processes', passport.authenticate('jwt', {session: false}), processesRouter);
app.use(config.api_ver+'/tasks', passport.authenticate('jwt', {session: false}), tasksRouter);
app.use(config.api_ver+'/systems', passport.authenticate('jwt', {session: false}), systemsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
