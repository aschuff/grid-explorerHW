module.exports = Backbone.Model.extend({
    // url: 'http://grid.queencityiron.com/api/players',
    url: 'http://tiny-tiny.herokuapp.com/collections/gridAdventure',

    defaults: {
        username: '',
        charSize: '',
        userEnergy: 20,
        moveCount: 0,
        rightLeftMove: 0,
        upDownMove: 0,
    },
    smallCharacter: function(littleChar) {
        this.set('charSize', littleChar)
    },

    largeCharacter: function(bigChar) {
        this.set('charSize', bigChar)
        this.set('userEnergy', 30)
    },

    startButton: function(userNameValue) {
        this.set('username', userNameValue)
        this.trigger('letsGo', this)
        this.set('rightLeftMove', 0)
        this.set('upDownMove', 0)
        this.set('moveCount', 0)
        this.set('userEnergy', 20)
        // this.set('input', null)
        // this.set('username', this.get('username'.innerHtml === '')) need to clear username
    },
// WHY DOES THIS WORK?? IT SAVES THE OPPOSITE THINGS I PASS IN TO THE FUNCTION???
    playAgain: function(){
      this.save();
      // this.set('rightLeftMove', rightLeftMove);
      // this.set('upDownMove', upDownMove);
      this.trigger('startOver', this);
      // console.log('saving stats');

      console.log('saved stuff');
      // this.save(undefined, {
      //   success: function(){
      //     console.log(`user is ${this.get('charSize')}`);
      //   },
      //   error: function() {
      //     console.log('nope, didn\'t save');
      //   },
      // });
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
