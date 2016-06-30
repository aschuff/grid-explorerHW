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
