describe('mvProfileCtrl', function(){
    var scope, ctrl, identity, q, mockNotifier, mockAuthService, deferred, mockUserData;

    beforeEach(module('app'));

    beforeEach(inject(function($injector, $rootScope, $controller) {

        identity = {currentUser: {username: 'ben', firstName: 'benben'}};
        mockUserData = { username: 'ben', firstName: 'benben'};

        q = $injector.get('$q');
        scope = $rootScope.$new();
        mockAuthService = $injector.get('mvAuth');
        mockNotifier =  $injector.get('mvNotifier');
        ctrl = $controller('mvProfileCtrl', { $scope: scope, mvIdentity: identity});

        spyOn(mockAuthService, "updateCurrentUser").and.callFake(function() {
            deferred = q.defer();
            deferred.resolve();
            return deferred.promise;
        });

        spyOn(mockNotifier, "notify").and.callFake(function(){return ''});
    }));

    it('should set username and the first name to the correct username from identity', function(){
        expect(scope.username).toEqual('ben');
        expect(scope.firstName).toEqual('benben');
    });

    it('should have update method', function(){
        expect(scope.update).toBeDefined();
    });

    it('should call mvAuth:updateCurrentUser method', function(){
        scope.update();
        scope.$apply();
        expect(mockAuthService.updateCurrentUser).toHaveBeenCalledWith(mockUserData);
    });

    it('should not include password if it\'s length > 0', function(){
        scope.password = "";
        scope.update();
        scope.$apply();
        expect(mockAuthService.updateCurrentUser).toHaveBeenCalledWith(mockUserData);
    });

    it('should include password if it\'s length > 0', function(){
        mockUserData.password = '123';
        scope.password = "123";
        scope.update();
        scope.$apply();
        expect(mockAuthService.updateCurrentUser).toHaveBeenCalledWith(mockUserData);
    });

    it('should call notifier after updating the user data', function(){
        scope.update();
        scope.$apply();
        expect(mockNotifier.notify).toHaveBeenCalledWith('The information is saved');
    });
});