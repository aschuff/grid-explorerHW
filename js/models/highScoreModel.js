module.exports = Backbone.Model.extend({
        url: 'http://grid.queencityiron.com/api/highscore',
        defaults: {
            username: '',
            startingEnergy: 0,
            name: '',
        },
});
