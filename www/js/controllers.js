angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $ionicActionSheet, Quotes, FavouritesService, config, $timeout, $ionicLoading, $ionicBackdrop, $ionicPopup,  $ionicScrollDelegate) {

  //create actionSheet for share options.
  Quotes.prime();

  $scope.quotes = Quotes.all();
  var favQuote = false,
    currentQuoteID = 0;


  //Show a backdrop for one second
  $scope.action = function() {
    $ionicLoading.show({
      template: '<div id="overlay-tips">Loadingdddddd...</div>'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.showShare = function(quote, event) {
    window.plugins.socialsharing.share('Message only')
   };

   $scope.animateClass = false;

   $scope.save = function() {

    $scope.animateClass = true;
    console.log('save quote');
    var favQuote = angular.copy($scope.quotes[currentQuoteID]);
    console.log(favQuote);
    FavouritesService.add(config.localStorageKey, favQuote);
    console.log(FavouritesService.list(config.localStorageKey));

    $ionicLoading.show({ template: 'Added to favourites', noBackdrop: true, duration: 2000 });



   }

   $scope.slideHasChanged = function(index) {

    console.log('slie changed', index);

    currentQuoteID = index;
    console.log(currentQuoteID);
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
   }


  var backgrounds = [
    //'http://total-yoga.org/wp-content/uploads/2013/03/Buddha-in-Meditation.jpg',
    'http://ezscrap.net/wp-content/uploads/2008/12/shapes8-square1.gif',
    'http://2.bp.blogspot.com/-bD5LhqZOyoA/UUMsmxi-uKI/AAAAAAAAC9E/tfWwQW31pUA/s1600/shapes2.png'];

  $scope.randomBg = backgrounds[Math.round(Math.random() * (backgrounds.length - 1))];


  // .fromTemplate() method
  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';



 // An alert dialog
 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Don\'t eat that!',
     template: 'It might taste good'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };




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
  $scope.quote = FavouritesService.find(config.localStorageKey, $stateParams.favId);
  console.log($scope.quote);

})

.controller('SettingsCtrl', function($scope, $rootScope,  $ionicUser, $ionicPush, $localstorage) {

  console.log('CURRENT REMINDER localStorageKey', $localstorage.get('reminder', false));

  $scope.settings = {};

  if($localstorage.get('reminder') === 'true') {
    $scope.settings.enableReminders = true;
  } else {
    $scope.settings.enableReminders = false;
  }

    $scope.slots = {epochTime: 12600, format: 24, step: 15};

    $scope.timePickerCallback = function (val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        console.log('Selected time is : ', val);    // `val` will contain the selected time in epoch
        $scope.epochTimeX = val;
      }
    };

  $scope.saveSettings = function() {
    console.log('cliked save settings', $scope.settings.enableReminders);

    if( $scope.settings.enableReminders) {
      console.log('do somehting');
      $localstorage.set('reminder', true);
    } else {
      console.log('DOnt do somehting');
      $localstorage.set('reminder', false);
    }
  }

    // Handles incoming device tokens
    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
      alert("Successfully registered token " + data.token);
      console.log('Ionic Push: Got token ', data.token, data.platform);
      $scope.token = data.token;
    });


  // Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');




    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Ionitron',
      bio: 'I am the bio',
      reminder: true
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };

  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        // console.log(notification);
        return true;
      }
    });
  };
});
