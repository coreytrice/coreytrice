this.module('corey', function () {
    this.module('common', function () {
        
        // Used to get language from language files. 'obj' is used to pass variables to language strings
        this.getLang = function (k, obj) {
            var t = corey.lang.en_US;

            k.split('.').map(function (v) {
                t = t[v];
            });

            if(obj) {
                $.each(obj, function (k, v) {
                    var r = '{{' + k + '}}';
                    t = t.replace(r, v);
                });
            }

            return (typeof t === 'string' ? t : '');
        };

        this.getParameterByName = function(name, url) {
            if(!url) {
                url = window.location.href;
            }

            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
            var results = regex.exec(url);

            if (!results || !results[2]) {
                return '';
            }
            
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        };
    });
});




