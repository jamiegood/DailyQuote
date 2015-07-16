angular.module('starter.services', [])

.factory('QuotesLibraryService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var quotes = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'Mind is everyting. What you think you become',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
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
