module.exports = Backbone.View.extend({

  initialize: function() {
    this.model.on('change', this.render, this);
  },
  events: {
    'click #smallCharacter': 'smallChar',
    'click #largeCharacter': 'largeChar',
    'click #startButton': 'clickStart',
  },
  smallChar: function(){
    console.log('little one');
    this.model.smallCharacter();
  },
  largeChar: function(){
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
