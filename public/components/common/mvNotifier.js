angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function(mvToastr){
    return {
        notify: function(msg){
            mvToastr.success(msg);
            console.log('success')
        },
        error: function(msg){
            mvToastr.error(msg);
            console.log('error')
        }
    }
});