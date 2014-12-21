describe('mvIndentity', function(){
    var userFactory, identity, window;

    beforeEach(module('app'));
    beforeEach(inject(function($injector) {
        userFactory = $injector.get('mvUser');
        identity =  $injector.get('mvIdentity');
        window = $injector.get('$window');
    }));

    describe('mvIdentity', function(){
/*        it(' should create a new identity if there is a bootstrapped user', function(){
            var currentUser;
            window.bootstrappedUserObject = {username: 'ben'};
            currentUser = window.bootstrappedUserObject;
            expect(identity).toEqual('ben');
        });*/

    });
});
