const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');

const static = express.static(__dirname + '/public');


app.use(cookieParser());
app.use(express.json());

app.use('/public', static);
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(
  session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  })
);
configRoutes(app);


// app.use('/login', (req, res, next) => {
//     if (req.session.user) {
//       return res.redirect('/private');
//     } else {
//       //here I',m just manually setting the req.method to post since it's usually coming from a form
//       req.method = 'POST';
//       next();
//     }
//   });


app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});