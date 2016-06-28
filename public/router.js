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

        var MovesModel = require('./models/movesModel');
        var LogInView = require('./views/logInView');
        var GamePlayView = require('./views/gamePlayView');
        var GameoverView = require('./views/gameoverView');

        module.exports = Backbone.Router.extend({
            initialize: function initialize() {
                // MODELS
                var movesM = new MovesModel();

                //VIEWS
                this.logInV = new LogInView({
                    model: movesM,
                    el: document.getElementById('logIn')
                });
                this.gamePlayV = new GamePlayView({
                    model: movesM,
                    el: document.getElementById('gameField')
                });
                this.gameoverV = new GameoverView({
                    model: movesM,
                    el: document.getElementById('gameOverField')
                });
            },
            routes: {
                'logIn': 'logInNewGame',
                'newGame': 'startGame',
                'gameOver': 'gameOver',
                '': 'logInNewGame'
            },
            logInNewGame: function logInNewGame() {
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
                console.log('start over :(');
                this.gameoverV.el.classList.remove('hidden');
                this.gamePlayV.el.classList.add('hidden');
                this.logInV.el.classList.add('hidden');
            }
        });
    }, {
        "./models/movesModel": 2,
        "./views/gamePlayView": 3,
        "./views/gameoverView": 4,
        "./views/logInView": 5
    }],
    2: [function(require, module, exports) {
        module.exports = Backbone.Model.extend({
            defaults: {
                username: '',
                charSize: 'small',
                userEnergy: 100,
                moveCount: 0,
                rightLeftMove: 0,
                upDownMove: 0,
            },
            smallCharacter: function() {
                if ('charSize' === 'charSize') {
                    this.set('userEnergy', this.get('userEnergy') - 2)
                } else if ('charSize' != 'charSize') {
                    this.set('userEnergy', this.get('userEnergy') - 5)
                }
            },

            largeCharacter: function() {
                // 1.5x the energy
                if ('charSize' === 'charSize') {
                    this.set('userEnergy', this.get('userEnergy') - 2)
                } else if ('charSize' != 'charSize') {
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

    }, {}],
    3: [function(require, module, exports) {
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
    4: [function(require, module, exports) {
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
    5: [function(require, module, exports) {
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

            },
            largeChar: function() {

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