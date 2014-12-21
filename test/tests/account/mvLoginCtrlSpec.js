describe('mvLoginCtrl', function(){
    var scope, ctrl, identity, q, mockNotifier, mockAuthService, deferred, timeout, location;

    beforeEach(module('app'));

    beforeEach(inject(function($injector, $rootScope, $controller, $q, mvAuth, mvNotifier, $location) {
        q = $q;
        scope = $rootScope.$new();
        mockAuthService = mvAuth;
        mockNotifier = mvNotifier;
        ctrl = $controller('mvLoginCtrl', { $scope: scope});
        identity =  $injector.get('mvIdentity');
        location = $injector.get('$location');

        spyOn(mockAuthService, "logoutUser").and.callFake(function() {
            deferred = q.defer();
            deferred.resolve();
            return deferred.promise;
        });

        spyOn(mockAuthService, "authenticateUser").and.callFake(function() {
            deferred = q.defer();
            deferred.resolve({ test: "test" });
            return deferred.promise;
        });

        spyOn(mockNotifier, "notify").and.callFake(function(){return ''});
    }));

    describe('login method', function(){
        it('should set identity after login', function() {
            identity.currentUser = {username:'ben'};
            scope.$apply();
            expect(scope.identity).toBe(identity);
            expect(scope.identity.currentUser.username).toEqual('ben')
        });

        it('should call authenticate after login', function(){
            scope.login('ben', 'password');
            expect(mockAuthService.authenticateUser).toHaveBeenCalled();
        });

        it('should call authenticate after login', function(){
            scope.login('ben', 'password');
            scope.$apply();
            expect(mockNotifier.notify).toHaveBeenCalledWith('You logged in!');
        });
    });

    describe('logout method', function(){

        it('should call logout service after logout', function(){
            scope.logout();
            scope.$apply();
            expect(mockAuthService.logoutUser).toHaveBeenCalled();
            expect(location.path()).toEqual('/')
        });

        it('should call notifier after logout', function(){
            scope.logout();
            scope.$apply();
            expect(mockNotifier.notify).toHaveBeenCalledWith('You signed out');
        });

        it('should clear login and password after logout', function(){
            scope.username = 'bob';
            scope.password = 'pass';
            scope.logout();
            scope.$apply();
            expect(scope.username).toEqual('');
            expect(scope.password).toEqual('');
        });

        it('should redirect to Home after logout', function(){
            location.path('/contact');
            scope.logout();
            scope.$apply();
            expect(location.path()).toEqual('/')
        });
    });
});