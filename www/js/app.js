angular.module('smartAlarm', ['ionic', 'smartAlarm.controllers', 'smartAlarm.services', 'ngResource', 'ion-datetime-picker', 'ionic-modal-select', 'ngCordova'])

.constant('ApiEndpoint', {
  url: 'http://localhost:8100/api'
})

.filter('capitalize', function() {
  return function(input, all) {
    var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
    return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
  };
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.withCredentials = true;

  $stateProvider

  .state('landing', {
    url: '/landing',
    templateUrl: 'templates/landing.html',
    controller: 'LandingCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })

  .state('tab.dashboard', {
    url: '/dashboard',
    views: {
      'tab-dashboard': {
        templateUrl: 'templates/tab-dashboard.html',
        controller: 'DashboardCtrl'
      }
    }
  })

  .state('tab.travelPlan', {
    url: '/travelPlan',
    views: {
      'tab-travelPlan': {
        templateUrl: 'templates/tab-travelPlan.html',
        controller: 'TravelPlanCtrl'
      }
    }
  })

  .state('stationModal', {
    url: '/stationModal',
    templateUrl: 'templates/stationModal.html',
    controller: 'DestinationTimeCtrl' // needs to be in its own controller
  })

  .state('tab.weather', {
    url: '/weather',
    views: {
      'tab-weather': {
        templateUrl: 'templates/tab-weather.html'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.alarm', {
    url: '/alarm',
    views : {
      'tab-alarm' :{
        templateUrl: 'templates/tab-alarm.html',
        controller: 'AlarmCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/landing');

})

.run(function($ionicPlatform, $rootScope, $timeout) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        window.plugin.notification.local.onadd = function (id, state, json) {
            var notification = {
                id: id,
                state: state,
                json: json
            };
            $timeout(function() {
                $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
            });
        };
    });
});
