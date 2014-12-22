describe('mvRegisterCtrl', function(){
    var scope, ctrl, q, mockNotifier, mockAuthService, deferred, mockUserData, location;

    beforeEach(module('app'));

    beforeEach(inject(function($injector, $rootScope, $controller) {

        q = $injector.get('$q');
        scope = $rootScope.$new();
        mockAuthService = $injector.get('mvAuth');
        mockNotifier =  $injector.get('mvNotifier');
        ctrl = $controller('mvRegisterCtrl', { $scope: scope});
        location = $injector.get('$location');

        scope.username = 'ben';
        scope.password = 'pass';
        scope.firstName = 'benben';

        mockUserData = {
            username: 'ben',
            firstName: 'benben',
            password: 'pass'
        };

        spyOn(mockNotifier, "notify").and.callFake(function(){return ''});
        spyOn(mockNotifier, "error").and.callFake(function(){return ''});

    }));

    describe('successful registration', function(){

        beforeEach(inject(function() {

            spyOn(mockAuthService, "createUser").and.callFake(function() {
                deferred = q.defer();
                deferred.resolve();
                return deferred.promise;
            });
        }));

        it('should call mvAuth service with new user information', function(){
            scope.register();
            expect(mockAuthService.createUser).toHaveBeenCalledWith(mockUserData)
        });

        it('should show success notification when the user registers successfully', function(){
            scope.register();
            scope.$apply();
            expect(mockNotifier.notify).toHaveBeenCalledWith('You have just registered')
        });

        it('should redirect to home after registration', function(){
            scope.register();
            scope.$apply();
            expect(location.path()).toEqual('/');
        });

    });

    describe('failed registration', function(){

        it('should show failure notification when the registration fails', function(){
            spyOn(mockAuthService, "createUser").and.callFake(function() {
                deferred = q.defer();
                deferred.reject('error');
                return deferred.promise;
            });
            scope.register();
            scope.$apply();
            expect(mockNotifier.error).toHaveBeenCalledWith('error');
        });
    })



});