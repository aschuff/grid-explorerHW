let PlayerTypeModel = require('./playerTypeModel');

module.exports = Backbone.Collection.extend({
  url: 'http://grid.queencityiron.com/api/players',
  model: PlayerTypeModel,
});
