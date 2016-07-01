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
        finalScore.textContent = `You lost ${this.model.get('username')}
        Final score: ${this.model.get('score')}`;


        let renderScores = this.el.querySelector('#highScoreList')
        this.model.collectionOfHighScores.forEach(function(model) {
          let scoreList = document.createElement('li')
            scoreList.textContent = `${this.model.get('name')}`;
                renderScores.appendChild(scoreList);
        })
    },
});
// this.model.collectionOfTypes.forEach(function(model) {
//     let sizeButtons = document.createElement('button');
//     sizeButtons.classList.add('playerSize')
//     let appendedContainer = document.getElementById('charChoice');
//     sizeButtons.textContent = `${model.get('name')}`;
//     appendedContainer.appendChild(sizeButtons);
// })
