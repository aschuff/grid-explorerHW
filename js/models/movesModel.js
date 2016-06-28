module.exports = Backbone.Model.extend({
    defaults: {
        username: '',
        charSize: 'small',
        userEnergy: 100,
        moveCount: 0,
        rightLeftMove: 0,
        upDownMove: 0,
    },
    smallCharacter: function(){
      if ('charSize' === 'charSize') {
        this.set('userEnergy', this.get('userEnergy') - 2)
      }else if ('charSize' != 'charSize') {
        this.set('userEnergy', this.get('userEnergy') - 5)
      }
    },

    largeCharacter: function(){
      // 1.5x the energy
      if ('charSize' === 'charSize') {
        this.set('userEnergy', this.get('userEnergy') - 2)
      }else if ('charSize' != 'charSize') {
        this.set('userEnergy', this.get('userEnergy') - 5)
      }
    },

    startButton: function(userNameValue) {
        this.set('username', userNameValue)
    },
    // notEnoughEnergy: function(){
    //   if ('userEnergy' <= 0) {
    //
    //   }
    // }

    right: function() {
        if (this.get('rightLeftMove') < 10) {
            this.set('rightLeftMove', this.get('rightLeftMove') + 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 2)
        }
    },

    left: function() {
        if (this.get('rightLeftMove') > -10) {
            this.set('rightLeftMove', this.get('rightLeftMove') - 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 2)
        }
    },

    up: function() {
        if (this.get('upDownMove') < 10) {
            this.set('upDownMove', this.get('upDownMove') + 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 2)
        }
    },
    down: function() {
        if (this.get('upDownMove') > -10) {
            this.set('upDownMove', this.get('upDownMove') - 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('userEnergy', this.get('userEnergy') - 2)
        }
    },
});
