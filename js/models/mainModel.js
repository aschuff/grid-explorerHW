let PlayerType  = require('./playerTypeModel');
let HighScore = require('./highScoreModel');

module.exports = Backbone.Model.extend({
    // url: 'http://grid.queencityiron.com/api/players',
    defaults: {
        username: '',
        charSize: '',
        userEnergy: 20,
        moveCount: 0,
        rightLeftMove: 0,
        upDownMove: 0,
    },
    smallCharacter: function() {
        this.set('charSize', 'small')
    },

    largeCharacter: function() {
        this.set('charSize', 'large')
        this.set('userEnergy', 30)
    },

    startButton: function(userNameValue) {
        this.set('username', userNameValue)
        this.trigger('letsGo', this)
        this.set('rightLeftMove', 0)
        this.set('upDownMove', 0)
        this.set('moveCount', 0)
        // this.set('input', null)
        // this.set('username', this.get('username'.innerHtml === '')) need to clear username
    },

    playAgain: function(){
      this.trigger('startOver', this);
      this.clear({
        silent: true
      });
      this.set(this.defaults)
    },

    right: function() {
        if (this.get('rightLeftMove') < 10 && this.get('charSize') === 'large') {
            this.set('rightLeftMove', this.get('rightLeftMove') + 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 2)
        } else if (this.get('charSize') === 'small' && this.get('rightLeftMove') < 10) {
            this.set('rightLeftMove', this.get('rightLeftMove') + 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 1)
        }
        if (this.get('userEnergy') <= 0) {
          this.trigger('gameEnded', this)
        }
    },

    left: function() {
        if (this.get('rightLeftMove') > -10 && this.get('charSize') === 'large') {
            this.set('rightLeftMove', this.get('rightLeftMove') - 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 2)
        } else if (this.get('charSize') === 'small' && this.get('rightLeftMove') > -10) {
          this.set('rightLeftMove', this.get('rightLeftMove') - 1)
          this.set('moveCount', this.get('moveCount') + 1)
          this.set('userEnergy', this.get('userEnergy') - 1)
        }
        if (this.get('userEnergy') <= 0) {
          this.trigger('gameEnded', this)
        }
    },

    up: function() {
        if (this.get('upDownMove') < 10 && this.get('charSize') === 'large') {
            this.set('upDownMove', this.get('upDownMove') + 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 2)
        } else if (this.get('charSize') === 'small' && this.get('upDownMove') < 10) {
            this.set('upDownMove', this.get('upDownMove') + 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 1)
        }
        if (this.get('userEnergy') <= 0) {
          this.trigger('gameEnded', this)
        }
    },
    down: function() {
        if (this.get('upDownMove') > -10 && this.get('charSize') === 'large') {
            this.set('upDownMove', this.get('upDownMove') - 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 2)
        } else if (this.get('charSize') === 'small' && this.get('upDownMove') > -10) {
          this.set('upDownMove', this.get('upDownMove') - 1)
          this.set('moveCount', this.get('moveCount') + 1)
          this.set('userEnergy', this.get('userEnergy') - 1)
        }
        if (this.get('userEnergy') <= 0) {
          this.trigger('gameEnded', this)
        }
    },
});
