describe('MyCtrl', function(){
    var scope, ctrl, identity, $httpBackend, q, mockNotifier, mockAuth;



    beforeEach(module('app', function($provide){
/*        $provide.value('mvNotifier', mockNotifier);
        $provide.value('mvAuth', mockAuth);*/

    }));

    beforeEach(inject(function($injector, $rootScope, $controller, $q) {

        var mockNotifier = {
            notify: function(){
            }
        };

        var mockAuth =  {
            authenticateUser: function() {
                var deferred = q.defer();
                return deferred.promise;
            }
        };

        scope = $rootScope.$new();
        ctrl = $controller('mvLoginCtrl', { $scope: scope, mvAuth: mockAuth });
        identity =  $injector.get('mvIdentity');
        q = $q;
    }));


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

/*    it('should set identity after login', function() {
        identity.currentUser = {username:'ben'};
        expect(scope.identity).toBe(identity);
        expect(scope.identity.currentUser.username).toEqual('ben')
    });

    it('should call authenticate after login', function(){
        scope.login('ben', 'password');
        expect(mockAuth.authenticateUser()).toHaveBeenCalled();
    });*/


});