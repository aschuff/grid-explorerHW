module.exports = Backbone.View.extend({

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.collectionOfTypes.on('typesLoaded', this.render, this);
  },
  events: {
    // 'click #smallCharacter': 'smallChar',
    // 'click #largeCharacter': 'largeChar',
    'click .playerSize': 'clickCharButton',
    'click #startButton': 'clickStart',
  },
  // smallChar: function(){
  //   console.log('little one');
  //   this.model.smallCharacter();
  // },
  // largeChar: function(){
  //   console.log('big one');
  //   this.model.largeCharacter();
  // },
  clickCharButton: function(event) {
    let character = event.target.textContent;
    this.model.setPlayerType(character);
    // this.trigger('')
  },

  clickStart: function() {
    let userNameValue = document.getElementById('input').value;
    console.log(userNameValue);
    this.model.startButton(userNameValue);
  },

  render: function() {
    let newUser = this.el.querySelector('#greeting');
      newUser.textContent = `Hello ${this.model.get('username')}!`;
      // console.log('rendered');

      this.model.collectionOfTypes.forEach(function(model){
        // console.log(model.get('name'));/
        let sizeButtons = document.createElement('button');
        sizeButtons.classList.add('playerSize')
        let appendedContainer = document.getElementById('charChoice');
        sizeButtons.textContent = `${model.get('name')}`;
        // appendedContainer.innerHtml = ''; need to get duplicated buttons to stop
        // sizeButtons.innerHtml = '';
        appendedContainer.appendChild(sizeButtons);
      })
  },
});
