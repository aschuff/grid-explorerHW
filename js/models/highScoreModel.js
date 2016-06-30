module.exports = Backbone.Model.extend({
  url: 'http://grid.queencityiron.com/api/highscore',
  defaults: {
    username: '',
    userEnergy: 0,
    charSize: 0
  },
});
