if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const bcrypt = require('bcrypt');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const User = require('./models/user');

const initializePassport = require('./passport-config');
initializePassport(passport);

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://davidkcoletta:JEhDFGfijrFt6INq@cluster0.khih3bl.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// use
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', checkAuthenticated, (req, res) => {
  res.redirect('/blogs');
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login', {title: 'Login', user: null});
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/blogs',
  failureRedirect: '/login',
  failureFlash: true 
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register', {title: 'Register', user: null});
});

app.post('/register', async (req, res) => {
  try {
    const hashed_password = await bcrypt.hash(req.body.password, 10);
    const user = new User({username: req.body.username, email: req.body.email, password: hashed_password});
    user.save()
      .then(result => {
        req.logIn(user, function (err) {
          if ( ! err ){
            res.redirect('/');
          } else {
            console.log(err);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (e) {
    res.redirect('/register');
  }
});

app.get('/logout', checkAuthenticated, (req, res) => {
  res.render('logout', { title: 'Log Out', user: req?.user?.username });
})

app.delete('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { console.log(err); }
    res.redirect('/login');
  });
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', user: req?.user?.username });
});

// blog routes
app.use('/blogs', checkAuthenticated, blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404', user: req?.user?.username });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/blogs');
  }
}