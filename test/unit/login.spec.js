describe('LoginCtrl', function() {

  var controller,
      deferredLogin,
      userSessionMock,
      stateMock,
      ionicPopupMock,
      scope;

  beforeEach(module('smartAlarm'));

  beforeEach(inject(function($controller, $q){
    deferredLogin = $q.defer();

    userSessionMock = {
      login: jasmine.createSpy('login spy')
                    .and.returnValue(deferredLogin.promise)
    };

    stateMock = jasmine.createSpyObj('$state spy', ['go']);

    ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

    controller = $controller('LoginCtrl', {
      '$ionicPopup': ionicPopupMock,
      '$state': stateMock,
      'UserSession': userSessionMock,
      '$scope': {}
    });

  }));
  //
  // describe('#login', function(){
  //
  //   beforeEach(inject(function(_$rootScope_){
  //     $rootScope = _$rootScope_;
  //     controller.email = 'test@gmail.com';
  //     controller.password = 'password1';
  //     controller.login();
  //   }));
  //
  //   it('should call login on UserSession', function(){
  //     expect(userSessionMock).toHaveBeenCalledWith('test@gmail.com', 'password1');
  //
  //     deferredLogin.resolve();
  //     $rootScope.$digest();
  //   });
  //
  //   describe('when the login is executed,', function(){
  //     it('if successful, should change state to dashboard', function(){
  //
  //       // TODO: Mock the login response from DinnerService
  //
  //       expect(stateMock.go).toHaveBeenCalledWith('dashboard');
  //     });
  //     it('if unsuccessful, should show a popup', function(){
  //
  //       // TODO: Mock the login response from DinnerService
  //
  //       expect(ionicPopupMock.alert).toHaveBeenCalled();
  //     });
  //   });
  // });
});
