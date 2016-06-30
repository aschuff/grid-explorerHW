let HighScoreModel = require('./highScoreModel');

module.exports = Backbone.Collection.extend({
  url: 'http://grid.queencityiron.com/api/highscore',
  model: HighScoreModel,
});
