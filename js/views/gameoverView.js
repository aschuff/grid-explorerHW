module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.collectionOfHighScores.on('scoresLoaded', this.render, this);
    },
    events: {
        'click #playAgain': 'newGame',
    },
    newGame: function() {
        this.model.playAgain();
        this.model.sendScore();
    },
    render: function() {
      let finalScore = this.el.querySelector('#scoreBoard')
        finalScore.textContent = `Final score: ${this.model.get('score')}`;


        let renderScores = this.el.querySelector('#highScoreList')
        let self = this;
        this.model.collectionOfHighScores.forEach(function(model) {
          let scoreList = document.createElement('li')
          console.log(model);
            scoreList.textContent = `${model.get('playerType')} ${model.get('name')} ${model.get('score')} `;
                renderScores.appendChild(scoreList);
        })
    },
});
