const showRoutes = require('./shows');
const aboutMeRoutes = require('./aboutme');

const constructorMethod = (app) => {
  app.use('/shows', showRoutes);
  app.use('/aboutme', aboutMeRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;