describe('DashCtrl', function() {

  var scope, createController;

  beforeEach(module('smartAlarm'));

  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    createController = function() {
      return $controller('DashCtrl', {
        '$scope': scope
      });
    };
  }));
  // 
  // it('shows controller', function() {
  //   var controller = createController();
  //   console.log(controller);
  //   expect(controller).toBeTruthy();
  // });
});
