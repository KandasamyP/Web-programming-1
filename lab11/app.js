const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const configRoutes = require('./routes');

app.use('/public', static);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});