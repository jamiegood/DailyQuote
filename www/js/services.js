angular.module('starter.services', [])

.factory('Quotes', function(QuotesLibrary) {
  // Might use a resource here that returns a JSON array


  console.log('quotes library');
  //console.log(QuotesLibrary.all());

  return {
    prime: function() {
      quotes = QuotesLibrary.getData();
    },
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
.factory('QuotesLibrary', function($window, $q, $timeout, $http) {
  // Might use a resource here that returns a JSON array

  // function($resource){
  //   return $resource('/api/:quoteId.json', {}, {
  //     query: {method:'GET', params:{quoteId:'quotes'}, isArray:true}
  //   });
    var quotes = [];

  // Simple GET request example :
  // return {
  //   store: function() {
  //     $http.get('/api/quotes.json').
  //       success(function(data, status, headers, config) {
  //         // this callback will be called asynchronously
  //         // when the response is available
  //         console.log(data);
  //       }).
  //       error(function(data, status, headers, config) {
  //         // called asynchronously if an error occurs
  //         // or server returns response with an error status.
  //         console.log(data);
  //     });

  //   }
  //}

  var defer = $q.defer();
      console.log('I am here');

  return {
    getData: function() {
      return quotes;
    },
    store: function() {

      console.log('I am in User.checkSession');


        console.log('User.checkSession has User.session_id');

        // $timeout(function() {
        //   console.log('I am timeout ');
        //   defer.resolve(true);
        // }, 4000);

      //Simple GET request example :
      $http.get('/api/quotes.json').
        success(function(data, status, headers, config) {
          console.log(' am inside http ccall')
          console.log(data);
          quotes = data;
          defer.resolve(true);
        }).
        error(function(data, status, headers, config) {
          console.log("fail town", data, status, headers, config);
          defer.resolve(false);
        });

      return defer.promise;
    }
  }

})
.factory('FavouritesService', ['$window', '$localstorage', function($window, $localstorage) {


  var separator = '|';
  var list_array =[];

  /* this is a comment */

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
