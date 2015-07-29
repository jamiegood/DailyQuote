angular.module('starter.services', [])

.factory('QuotesLibraryService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var quotes = [{
    id: 0,
    name: '',
    lastText: 'Mind is everyting. What you think you become',
    face: ''
  }, {
    id: 1,
    name: '',
    lastText: 'Hey, it\'s me',
    face: ''
  },{
    id: 2,
    name: '',
    lastText: 'I should buy a boat',
    face: ''
  }, {
    id: 3,
    name: '',
    lastText: 'Look at my mukluks!',
    face: ''
  }, {
    id: 4,
    name: '',
    lastText: 'This is wicked good ice cream.',
    face: ''
  }];


  return {
    all: function() {
      return quotes;
    },
    remove: function(quote) {
      quotes.splice(quotes.indexOf(quote), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < quotes.length; i++) {
        if (quotes[i].id === parseInt(chatId)) {
          return quotes[i];
        }
      }
      return null;
    }
  };


});
