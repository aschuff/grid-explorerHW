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

        var GameRouter = require('./router');

        window.addEventListener('load', function() {
            var router = new GameRouter();
            Backbone.history.start();
        });
    }, {
        "./router": 3
    }],
    2: [function(require, module, exports) {
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
            playAgain: function() {
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

    }, {}],
    3: [function(require, module, exports) {
        let MovesModel = require('./models/movesModel');
        // let ScoreCollection = require('./models/collection')
        let LogInView = require('./views/logInView');
        let GamePlayView = require('./views/gamePlayView');
        let GameoverView = require('./views/gameoverView');

        module.exports = Backbone.Router.extend({
            initialize: function() {
                // MODELS
                let movesM = new MovesModel();

                // COLLECTION
                // let highScoreC = new ScoreCollection();

                //VIEWS
                this.logInV = new LogInView({
                    model: movesM,
                    el: document.getElementById('logIn'),
                });
                movesM.on('letsGo', function(model) {
                    this.navigate('newGame', {
                        trigger: true
                    })
                }, this)

                this.gamePlayV = new GamePlayView({
                    model: movesM,
                    el: document.getElementById('gameField'),
                });

                movesM.on('gameEnded', function(model) {
                    this.navigate('gameOver', {
                        trigger: true
                    })
                }, this);

                this.gameoverV = new GameoverView({
                    model: movesM,
                    el: document.getElementById('gameOverField')
                });
            },
            routes: {
                'logIn': 'logInNewGame',
                'newGame': 'startGame',
                'gameOver': 'gameOver',
                '': 'logInNewGame',
            },
            logInNewGame: function() {
                // if(who === null) {
                //   this.navigate('logIn', {trigger:true});
                //   return;
                // }
                console.log('time to log in!');
                this.logInV.el.classList.remove('hidden');
                this.gamePlayV.el.classList.add('hidden');
                this.gameoverV.el.classList.add('hidden');
            },
            startGame: function() {
                console.log('starting new game');
                this.logInV.el.classList.add('hidden');
                this.gamePlayV.el.classList.remove('hidden');
                this.gameoverV.el.classList.add('hidden');
            },
            gameOver: function() {
                let self = this;
                let playerStats = new MovesModel()

                playerStats.fetch({
                    url: `http://tiny-tiny.herokuapp.com/collections/gridAdventure`,
                    success: function() {
                        self.gameOver.model = playerStats;
                        // self.gameOver.render(`${'id'}`); err: not a function??
                    },
                });
                console.log('start over :(');
                this.gameoverV.el.classList.remove('hidden');
                this.gamePlayV.el.classList.add('hidden');
                this.logInV.el.classList.add('hidden');
            },
        })

    }, {
        "./models/movesModel": 2,
        "./views/gamePlayView": 4,
        "./views/gameoverView": 5,
        "./views/logInView": 6
    }],
    4: [function(require, module, exports) {
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
    5: [function(require, module, exports) {
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
    6: [function(require, module, exports) {
        module.exports = Backbone.View.extend({

            initialize: function() {
                this.model.on('change', this.render, this);
            },
            events: {
                'click #smallCharacter': 'smallChar',
                'click #largeCharacter': 'largeChar',
                'click #startButton': 'clickStart',
            },
            // start button events
            smallChar: function() {
                let littleChar = document.getElementById('smallCharacter').value;
                console.log('little one');
                this.model.smallCharacter(littleChar);
            },
            largeChar: function() {
                let bigChar = document.getElementById('largeCharacter').value;
                console.log('big one');
                this.model.largeCharacter(bigChar);
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