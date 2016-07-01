let PlayerTypeCollection = require('./playerTypeCollection');
let HighScoreCollection = require('./highScoreCollection');
let PlayerType = require('./playerTypeModel');
let HighScore = require('./highScoreModel');

module.exports = Backbone.Model.extend({
    initialize: function() {
        let self = this;
        self.collectionOfTypes = new PlayerTypeCollection();
        self.collectionOfTypes.fetch({
            success: function() {
                console.log(self.collectionOfTypes);
                self.collectionOfTypes.trigger('typesLoaded');
            }
        }); // send types to a view after this?
        let newHighScore = new HighScore({
          username: this.get('username'),
          name: this.get('name'),
          score: this.get('moveCount'),
        });
        newHighScore.save();
    },
    // url: 'http://grid.queencityiron.com/api/players',
    defaults: {
        username: '',
        name: '',
        startingEnergy: 20,
        moveCount: 0,
        energyPerMove: 0,
        rightLeftMove: 0,
        upDownMove: 0,
    },
    setPlayerType: function(type) {
      let target = this.collectionOfTypes.find(function(collectionOfTypes){
        return collectionOfTypes.get('name') === type;
      });
      this.set('name', type)
      this.set('startingEnergy', target.get('startingEnergy'));
      this.set('energyPerMove', target.get('energyPerMove'));
      console.log('setting player type');
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
    sendScore: function() {
      this..get('username');
      this..get('name');
      this..get('moveCount');
      this.save();
    },
    playAgain: function() {
        this.trigger('startOver', this);
        this.clear({
            silent: true
        });
        this.set(this.defaults)
    },
    right: function() {
        if (this.get('rightLeftMove') < 10) {
            this.set('rightLeftMove', this.get('rightLeftMove') + 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
        }
        if (this.get('startingEnergy') <= 0) {
            this.trigger('gameEnded', this)
        }
    },
    left: function() {
        if (this.get('rightLeftMove') > -10) {
            this.set('rightLeftMove', this.get('rightLeftMove') - 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
        }
        if (this.get('startingEnergy') <= 0) {
            this.trigger('gameEnded', this)
        }
    },
    up: function() {
        if (this.get('upDownMove') < 10) {
            this.set('upDownMove', this.get('upDownMove') + 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
        }
        if (this.get('startingEnergy') <= 0) {
            this.trigger('gameEnded', this)
        }
    },
    down: function() {
        if (this.get('upDownMove') > -10) {
            this.set('upDownMove', this.get('upDownMove') - 1)
            this.set('moveCount', this.get('moveCount') + 1)
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'))
        }
        if (this.get('startingEnergy') <= 0) {
            this.trigger('gameEnded', this)
        }
    },
});
