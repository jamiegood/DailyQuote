angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $ionicActionSheet, Quotes, FavouritesService, config) {

  //create actionSheet for share options.
  $scope.quotes = Quotes.all();
  var favQuote = false,
    currentQuoteID = 0;

  $scope.showShare = function(quote, event) {
    window.plugins.socialsharing.share('Message only')
   };  

   $scope.save = function() {
    console.log('save quote');
    var favQuote = angular.copy($scope.quotes[currentQuoteID]);
    console.log(favQuote);
    FavouritesService.add(config.localStorageKey, favQuote);
    console.log(FavouritesService.list(config.localStorageKey));

   }

   $scope.slideHasChanged = function(index) {

    console.log('slie changed', index);

    currentQuoteID = index;
    console.log(currentQuoteID);

   }


})

.controller('FavouritesCtrl', function($scope, config, FavouritesService, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.$on('$ionicView.enter', function() {
    console.log('ionicview enter');
    $scope.quotes = FavouritesService.list(config.localStorageKey);
  });

  $scope.quotes = FavouritesService.list(config.localStorageKey);
  console.log(' Favs CTRL have I run, do I run agagin?');

  console.log('where is a ll the fav quotes', $scope.quotes)

  // $scope.$watch("quotes", function() {
  //   $scope.quotes = FavouritesService.list(config.localStorageKey);
  // })
  $scope.remove = function(index) {
    console.log('removing this index', index);
    FavouritesService.remove(config.localStorageKey, index);
    $scope.quotes  = FavouritesService.list(config.localStorageKey);
    //$ionicLoading.show({ template: 'Item removed!', noBackdrop: true, duration: config.prompt_duration });
  }

  $scope.enteringFavorites = function() {
    console.log('on entering');

  }
})

.controller('FavouritesDetailCtrl', function($scope, $stateParams, FavouritesService, config) {
  
  console.log('indse the FavouritesDetailCtrl');
  console.log()
  $scope.quote = FavouritesService.find(config.localStorageKey, $stateParams.favId);
  console.log($scope.quote);

})

.controller('SettingsCtrl', function($scope) {


  $scope.settings = {
    enableReminders: false
  };

  console.log($scope.settings);


  //watcht this one for changes.
  $scope.$watch( function(scope) {
    return $scope.settings.enableReminders;
  }, function(data) {

    if(data) {
      console.log('do somehting');      
    } else {
      console.log('DOnt do somehting');
    }

  })

});
