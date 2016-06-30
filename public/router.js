(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        'use strict';

        var MovesModel = require('./models/mainModel');
        var PlayerTypeCollection = require('./models/playerTypeCollection');
        var LogInView = require('./views/logInView');
        var GamePlayView = require('./views/gamePlayView');
        var GameoverView = require('./views/gameoverView');

        module.exports = Backbone.Router.extend({
            initialize: function initialize() {
                debugger;
                // MODEL
                var movesM = new MovesModel();

                //VIEWS
                this.logInV = new LogInView({
                    model: movesM,
                    el: document.getElementById('logIn')
                });
                movesM.on('letsGo', function(model) {
                    console.log(model);
                    this.navigate('newGame', {
                        trigger: true
                    });
                }, this);

                this.gamePlayV = new GamePlayView({
                    model: movesM,
                    el: document.getElementById('gameField')
                });

                movesM.on('gameEnded', function(model) {
                    this.navigate('gameOver', {
                        trigger: true
                    });
                }, this);

                this.gameoverV = new GameoverView({
                    model: movesM,
                    el: document.getElementById('gameOverField')
                });
                debugger;
                var collectionOfTypes = new PlayerTypeCollection();
                collectionOfTypes.fetch(); // send types to a view after this?
            },
            routes: {
                'logIn': 'logInNewGame',
                'newGame': 'startGame',
                'gameOver': 'gameOver',
                '': 'logInNewGame'
            },
            logInNewGame: function logInNewGame() {
                // if(who === null) {
                //   this.navigate('logIn', {trigger:true});
                //   return;
                // }
                console.log('time to log in!');
                this.logInV.el.classList.remove('hidden');
                this.gamePlayV.el.classList.add('hidden');
                this.gameoverV.el.classList.add('hidden');
            },
            startGame: function startGame() {
                console.log('starting new game');
                this.logInV.el.classList.add('hidden');
                this.gamePlayV.el.classList.remove('hidden');
                this.gameoverV.el.classList.add('hidden');
            },
            gameOver: function gameOver() {
                // let self = this;
                // let newHighScore = new highScoreCollection()
                //
                // newHighScore.fetch({
                //     success: function() {
                //         self.gameOver.model = newHighScore;
                //         self.gameOver.render();
                //     },
                // });
                console.log('start over :(');
                this.gameoverV.el.classList.remove('hidden');
                this.gamePlayV.el.classList.add('hidden');
                this.logInV.el.classList.add('hidden');
            }
        });
    }, {
        "./models/mainModel": 3,
        "./models/playerTypeCollection": 4,
        "./views/gamePlayView": 6,
        "./views/gameoverView": 7,
        "./views/logInView": 8
    }],
    2: [function(require, module, exports) {
        module.exports = Backbone.Model.extend({
            url: 'http://grid.queencityiron.com/api/highscore',
            defaults: {
                username: '',
                userEnergy: 0,
                charSize: 0
            },
        });

    }, {}],
    3: [function(require, module, exports) {
        let PlayerType = require('./playerTypeModel');
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

            playAgain: function() {
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

    }, {
        "./highScoreModel": 2,
        "./playerTypeModel": 5
    }],
    4: [function(require, module, exports) {
        let PlayerType = require('./playerTypeModel');

        module.exports = Backbone.Collection.extend({
            url: 'http://grid.queencityiron.com/api/players',
            model: PlayerType,
        });

    }, {
        "./playerTypeModel": 5
    }],
    5: [function(require, module, exports) {
        module.exports = Backbone.Model.extend({
            url: 'http://grid.queencityiron.com/api/players',
            defaults: {
                charSize: '',
                energyPerMove: 0,
                startingEnergy: 0
            },
        });


    }, {}],
    6: [function(require, module, exports) {
        module.exports = Backbone.View.extend({

            initialize: function() {
                this.model.on('change', this.render, this);
            },

            events: {
                'click #userEnergy': 'totalEnergy',
                'click #userMoves': 'totalMoves',
                'click #right': 'clickRight',
                'click #left': 'clickLeft',
                'click #up': 'clickUp',
                'click #down': 'clickDown',
            },
            totalEnergy: function() {
                this.model.userEnergy();
            },

            totalMoves: function() {
                this.model.userMoves();
            },
            clickRight: function() {
                this.model.right();
            },
            clickLeft: function() {
                this.model.left();
            },
            clickUp: function() {
                this.model.up();
            },
            clickDown: function() {
                this.model.down();
            },

            render: function() {

                let rightButton = this.el.querySelector('#xAxis');
                rightButton.textContent = this.model.get('rightLeftMove');

                let leftButton = this.el.querySelector('#xAxis');
                leftButton.textContent = this.model.get('rightLeftMove');

                let upButton = this.el.querySelector('#yAxis');
                upButton.textContent = this.model.get('upDownMove');

                let downButton = this.el.querySelector('#yAxis');
                downButton.textContent = this.model.get('upDownMove');

                let allMovesTotal = this.el.querySelector('#userMoves');
                allMovesTotal.textContent = `Total Moves: ${this.model.get('moveCount')}`;

                let energyLevel = this.el.querySelector('#userEnergy');
                energyLevel.textContent = `Total Energy: ${this.model.get('userEnergy')}`;
            },
        });

    }, {}],
    7: [function(require, module, exports) {
        module.exports = Backbone.View.extend({

            initialize: function() {
                this.model.on('change', this.render, this);
            },
            events: {
                'click #playAgain': 'newGame',
            },
            newGame: function() {
                this.model.playAgain();
            },
        });

    }, {}],
    8: [function(require, module, exports) {
        module.exports = Backbone.View.extend({

            initialize: function() {
                this.model.on('change', this.render, this);
            },
            events: {
                'click #smallCharacter': 'smallChar',
                'click #largeCharacter': 'largeChar',
                'click #startButton': 'clickStart',
            },
            smallChar: function() {
                console.log('little one');
                this.model.smallCharacter();
            },
            largeChar: function() {
                console.log('big one');
                this.model.largeCharacter();
            },

            clickStart: function() {
                let userNameValue = document.getElementById('input').value;
                console.log(userNameValue);
                this.model.startButton(userNameValue);
            },

            render: function() {
                let newUser = this.el.querySelector('#greeting');
                newUser.textContent = `Hello ${this.model.get('username')}!`;
            },
        });

    }, {}]
}, {}, [1])