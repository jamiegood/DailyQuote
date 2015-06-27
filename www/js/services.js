angular.module('starter.services', [])

.factory('Quotes', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var quotes = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
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

  console.log('quotes library');
  //console.log(QuotesLibrary.all());

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
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {

      console.log($window.localStorage[key]);

      return JSON.parse($window.localStorage[key] || '[{}]');
    }
  }
}])

.factory('FavouritesService', ['$window', '$localstorage', function($window, $localstorage) {


  var separator = '|';
  var list_array =[];


  return {
    favourites: [],
    add: function(key, value) {
      //get the local storage
      var separatorAdd = separator;
    //  console.log('localstorage: ', $localstorage.get(key, false));

      if($localstorage.get(key, false) === false) {
        separatorAdd = '';
      }
      $localstorage.set(key, $localstorage.get(key, '') + separatorAdd + JSON.stringify(value));

    },
    setObject: function(key, value) {
      return $localstorage.setObject(key, value);
    },
    getObject: function(key) {
      return $localstorage.getObject(key);
    },    
    getObject: function(key, value) {
      return $localstorage.getObject(key);
    },
    remove: function(key, index) {

      var list = $localstorage.get(key, '');

      var list_array = list.split(separator);
      list_array.splice(index, 1);

      $localstorage.set(key,list_array.join(separator));

    },
    list: function(key) {
      var list = $localstorage.get(key, '');
      // explode to an array
      var list_array =[];
      
      if(list !== '') {
        list_array = list.split("|");
        console.log("list not enough to space");
      } 
      var i;

      for(i =0; i <list_array.length; i++) {
        console.log(i);
        var example = list_array[i];
        list_array[i] = JSON.parse(example);
      }
      this.favourites = list_array;
      return list_array;

    }, 
    getStore: function() {
      return list_array;
    },
    find: function(key, id) {
      var item = this.list(key);
      return item[id];

    }
  }

}]);


angular.module('starter.services2', [])
.factory('QuotesLibrary', function() {
  // Might use a resource here that returns a JSON array

  return {};


});

