const searchRoutes = require('./search');
const showsRoutes = require('./shows');

const constructorMethod = (app) => {
  app.use('/search', searchRoutes);
  app.use('/shows', showsRoutes);

 app.get('/', (req, res) => {
    res.render('layouts/index', {title: "Show Finder"});
    return;
});

  app.use('*', (req, res) => {
    res.sendStatus(404);
    return;
  });
};

module.exports = constructorMethod;