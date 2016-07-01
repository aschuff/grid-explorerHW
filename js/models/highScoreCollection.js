let HighScoreModel = require('./highScoreModel');

module.exports = Backbone.Collection.extend({
    initialize: function() {
        let highScoreC = new HighScoreCollection()
        let self2 = this;
        self2.highScoreC.fetch({
            success: function() {
                console.log((self2.highScoreC));
                self2.highScoreC.model = highScoreC;
                self2.highScoreC.render(highScoreC);
            }
        });
    },
    url: 'http://grid.queencityiron.com/api/highscore',
    model: HighScoreModel,
});
