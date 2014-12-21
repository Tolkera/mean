describe('mvAuth', function(){
    var authFactory, $httpBackend, identity, userFactory;

    beforeEach(module('app'));
    beforeEach(inject(function($injector) {
        identity = $injector.get('mvIdentity');
        authFactory = $injector.get('mvAuth');
        $httpBackend = $injector.get('$httpBackend');
        userFactory = $injector.get('mvUser');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('mvAuth: user authentication', function(){
        it('should have method authenticate', function(){
            expect(authFactory.authenticateUser).toBeDefined()
        });

        it('should send a POST request and set identity after login', function(){
            var returnData = {user: {username: 'ben'}, success: true};
            authFactory.authenticateUser();
            $httpBackend.expect('POST', '/login').respond(returnData);
            $httpBackend.flush();
            expect(identity.currentUser).toEqual(new userFactory(returnData.user));
        })
    });

    describe('mvAuth: user logout', function(){
        it('should have method logout', function(){
            expect(authFactory.logoutUser).toBeDefined()
        });

        it('should send a POST request and remove identity after logout', function(){
            identity.currentUser = 'somedata';
            authFactory.logoutUser();
            $httpBackend.expect('POST', '/logout').respond({});
            $httpBackend.flush();
            expect(identity.currentUser).toBeUndefined();
        })
    });


    describe('mvAuth: update user data', function(){
        it('should have method logout', function(){
            expect(authFactory.updateCurrentUser).toBeDefined();
        });

        it('should update user', function(){
            identity.currentUser = new userFactory({username: 'ben', firstName: 'bill'});
            authFactory.updateCurrentUser({username: 'carl'});
            $httpBackend.expect('PUT', '/api/users').respond();
            $httpBackend.flush();
            expect(identity.currentUser.username).toEqual('carl')
        });

    });

    describe('mvAuth: create a new user', function(){
        it('should have method createUser', function(){
            expect(authFactory.createUser).toBeDefined();
        });

        it('should update user', function(){
            authFactory.createUser({username: 'ben', firstName: 'bill'});
            $httpBackend.expect('POST', '/api/users').respond();
            $httpBackend.flush();
            expect(identity.currentUser.username).toEqual('ben')
        });

    })
});