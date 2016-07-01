module.exports = Backbone.View.extend({

    initialize: function() {
      this.model.on('change', this.render, this);
    },
    events: {
      'click #playAgain': 'newGame',
    },
    newGame: function(){
      this.model.playAgain();
      this.model.sendScore();
    },
  });
