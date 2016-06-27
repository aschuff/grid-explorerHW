module.exports = Backbone.View.extend({

    initialize: function() {
      this.model.on('change', this.render, this);
    },

    events: {
      'click #right': 'clickRight',
      'click #left': 'clickLeft',
      'click #up': 'clickUp',
      'click #down': 'clickDown',
    },

    clickRight: function(){
      this.model.right();
    },
    clickLeft: function(){
      this.model.left();
    },
    clickUp: function(){
      this.model.up();
    },
    clickDown: function(){
      this.model.down();
    },

    render: function() {
      let rightButton = this.el.querySelector('#rightXY');
        rightButton.textContent = this.model.get('rightMove');

      let leftButton = this.el.querySelector('#leftXY');
        leftButton.textContent = this.model.get('leftMove');

      let upButton = this.el.querySelector('#upXY');
        upButton.textContent = this.model.get('upMove');

      let downButton = this.el.querySelector('#downXY');
        downButton.textContent = this.model.get('downMove');
    },
})
