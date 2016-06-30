let HighScore = require('./highScoreModel');

module.exports = Backbone.Collection.extend({
  url: 'http://grid.queencityiron.com/api/highscore',
  model: HighScore,
});
