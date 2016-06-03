angular.module('smartAlarm.services', [])

.factory('AlarmService', function($resource) {
  var alarm = '06:00';
  return alarm;
})

.factory('UserSession', function($resource, ApiEndpoint) {
  return $resource(ApiEndpoint.url + "/user");
})

.factory('WeatherApi', function($resource, ApiEndpoint) {
  return $resource(ApiEndpoint.url + "/weathers");
})

.factory('SignUp', function($resource, ApiEndpoint) {
  return function (details) {
    return $resource(ApiEndpoint.url + "/api/user/signup", [{"signUp":{method: "post"}, "params": details }]);
  };
})

.factory('Notification', function($cordovaLocalNotification){

  var setAlarmTime = function(data) {
    var hours = parseInt(data.time_to_leave.substr(0,2));
    var minutes = parseInt(data.time_to_leave.substr(3,4));
    return new Date().setHours(hours, minutes);
  };

  var scheduleNotification = function(data) {
    var alarmTime = setAlarmTime(data);
    $cordovaLocalNotification.add({
        id: "1234",
        date: alarmTime,
        message: "It's time to go!",
        title: "LEAVE",
        autoCancel: true,
        sound: 'file://assets/Drop-what-youre-doing-and-leave-now.mp3'
    }).then(function () {
        alert("Your alarm to LEAVE has been set!");
    });
  };
  return scheduleNotification;
})

.service('StationList', function($http, ApiEndpoint) {
  return $http.get(ApiEndpoint.url + '/stations');
})

.service('CurrentWeather', function($http, ApiEndpoint) {
  return $http.get(ApiEndpoint.url + '/weathers');
})

.service('PostTrip', function($http, ApiEndpoint) {
  return function (tripDetails) {
      return $http({
        method: 'POST',
        url: ApiEndpoint.url + '/alarms',
        contentType: 'application/json',
        data: tripDetails
      });
  };
})

.service('GetTrip', function($http, ApiEndpoint) {
  return function (tripDetails) {
      return $http({
        method: 'GET',
        url: ApiEndpoint.url + '/alarms',
        contentType: 'application/json'
      });
  };
});
