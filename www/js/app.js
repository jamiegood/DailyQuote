// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.directives', 'ionic.service.core', 'ngCordova', 'ionic.service.push',  'ionic-timepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})
.run(function($ionicUser, $ionicPush, $localstorage) {



    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Ionitron',
      bio: 'I am the bio',
      reminder: $localstorage.get('reminder', false)
    });
  $ionicPush.register({
    canShowAlert: true, //Should new pushes show an alert on your screen?
    canSetBadge: true, //Should new pushes be allowed to update app icon badges?
    canPlaySound: false, //Should notifications be allowed to play a sound?
    canRunActionsOnWake: true, // Whether to run auto actions outside the app,
    onNotification: function(notification) {
      // Called for each notification.
    }
  }, user);

})
// API config
.constant('config', {
  localStorageKey: 'favourites'
})
.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: 'eeaac208',
    // The public API key all services will use for this app
    api_key: '077ad1cd708e0e42cdba26424d1601de03a24de3906fb039',
    // The GCM project ID (project number) from your Google Developer Console (un-comment if used)
     gcm_id: '729498657015'
       // Set the app to use development pushes
  //  dev_push: true
  });
}])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    },
    // resolve: {
    //   populateSession: function(QuotesLibrary) {
    //     QuotesLibrary.store();
    //   }
    // },
    resolve: {
      greeting: function(QuotesLibrary){
        return QuotesLibrary.store();
      }
    }

  })

  .state('tab.favourites', {
      url: '/favourites',
      views: {
        'tab-favourites': {
          templateUrl: 'templates/tab-favourites.html',
          controller: 'FavouritesCtrl'
        }
      }
    })
    .state('tab.favourites-detail', {
      url: '/favourites/:favId',
      views: {
        'tab-favourites': {
          templateUrl: 'templates/favourites-detail.html',
          controller: 'FavouritesDetailCtrl'
        }
      }
    })

  .state('tab.setings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
