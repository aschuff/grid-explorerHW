module.exports = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    events: {
        'click #startingEnergy': 'totalEnergy',
        'click #userMoves': 'totalMoves',
        'click #right': 'clickRight',
        'click #left': 'clickLeft',
        'click #up': 'clickUp',
        'click #down': 'clickDown',
    },
    gridGenerator: function() {
        let myGrid = document.getElementById('gridArea');
        myGrid.innerHTML = '';
        console.log(myGrid);

        let size = 10;
        for (var y = 0; y < size; y++) {
            let row = document.createElement('div');
            row.classList.add('row');
            for (var x = 0; x < size; x++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
              if (this.model.get('upDownMove') === y && this.model.get('rightLeftMove') === x) {
                cell.setAttribute('id', 'player')
              }
            }
            myGrid.appendChild(row);
        }
    },
totalEnergy: function() {
    this.model.startingEnergy();
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
    allMovesTotal.textContent = `Total Moves: ${this.model.get('score')}`;

    let energyLevel = this.el.querySelector('#startingEnergy');
    energyLevel.textContent = `Total Energy: ${this.model.get('startingEnergy')}`;

    // Grid
    this.gridGenerator();
},
});
