let PlayerType = require('./playerTypeModel');

module.exports = Backbone.Collection.extend({
  url: 'http://grid.queencityiron.com/api/players',
  model: PlayerType,
});
