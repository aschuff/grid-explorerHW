module.exports = Backbone.Model.extend({
  url: 'http://grid.queencityiron.com/api/players',
  defaults: {
    charSize: '',
    energyPerMove: 0,
    startingEnergy: 0
  },
});
 
