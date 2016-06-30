module.exports = Backbone.View.extend({

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.collectionOfTypes.on('typesLoaded', this.render, this);
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
      console.log('rendered');

      this.model.collectionOfTypes.forEach(function(model){
        console.log(model.get('name'));
        let sizeButtons = document.createElement('button');
        let appendedContainer = document.getElementById('charChoice')
        sizeButtons.textContent = `${model.get('name')}`;
        appendedContainer.appendChild(sizeButtons);
      })
  },
});
