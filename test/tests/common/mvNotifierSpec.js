describe('mvNotifier', function(){
    var toastr, notifier;

    beforeEach(module('app'));
    beforeEach(inject(function($injector) {
        notifier = $injector.get('mvNotifier');
        toastr = $injector.get('mvToastr');

        toastr.success = jasmine.createSpy('toastr success spy');
        toastr.error = jasmine.createSpy('toastr success spy');

    }));

    describe('mvNotifier: methods', function(){
        it('should have method Notify', function(){
            expect(notifier.notify).toBeDefined();
        });

        it('should call Toastr on success', function(){
            notifier.notify('success');
            expect(toastr.success).toHaveBeenCalledWith('success');
        });

        it('should have method Error', function(){
            expect(notifier.error).toBeDefined();
        });

        it('should call Toastr on error', function(){
            notifier.error('some error');
            expect(toastr.error).toHaveBeenCalledWith('some error');
        });

    });


});