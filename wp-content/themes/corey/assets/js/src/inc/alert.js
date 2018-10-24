this.module('corey', function () {
    this.module('alert', function () {

        var   alertTime = 5000
            , wrap
            , addAlertTimer
            , removeAlertTimer
            , autoRemoveAlertTimer
        ;

        this.init = function() {
            wrap = $('#alert_wrapper');
        };

        this.removeAlert = function() {
            wrap.css('bottom', '-200px');

            removeAlertTimer = setTimeout(function () {
                wrap.find('.alert').remove();
            }, 250);
        };

        this.addAlert = function (content) {
            wrap.append(content);
            wrap.css('bottom', 0);
        };

        /**
         * Display a banner message across the top of the page
         *
         * @param {string}  alertType   - (Default: 'alert-warning') Types are 'alert-warning' 'alert-success' 'alert-danger' 'alert-info'
         * @parma {string}  msg         - The message to display in the banner
         * @param {number}  time        - **Optional** (Default: 5000) Milliseconds this banner should be visible
         * @param {boolean} autoClose   - **Optional** (Default: true) Should this be auto-closed
         */
        this.add = function (alertType, msg, time, autoClose) {
            var   temp  = Handlebars.templates['nags/banner']
                , data  = {
                      'alertType'   : alertType || 'alert-warning'
                    , 'message'     : msg
                    , 'escMsg'      : encodeURI(msg)
                }
            ;

            // Set default values if none passed
            time = time || alertTime;
            if(autoClose !== false) {
                autoClose = true;
            }

            clearTimeout(addAlertTimer);
            clearTimeout(removeAlertTimer);
            clearTimeout(autoRemoveAlertTimer);

            if(wrap.find('.alert').length) {
                corey.alert.removeAlert();

                addAlertTimer = setTimeout(function () {
                    corey.alert.addAlert(temp(data));
                }, corey.timerBase + 50);

            }else{
                corey.alert.addAlert(temp(data));
            }

            wrap.on('click', '.close-banner', function () {
                corey.alert.removeAlert();
            });

            if(autoClose) {
                autoRemoveAlertTimer = setTimeout(function () {
                    corey.alert.removeAlert();
                }, time);
            }
        };
    });
});

jQuery(function () {
    corey.alert.init();

    var alertMsg = decodeURIComponent(corey.common.getParameterByName('alert_msg'));
    if(alertMsg) {
        corey.alert.add('alert-warning', alertMsg);

        if(history.pushState) {
            history.replaceState('', '', location.href.split(/[?#]/)[0].split("#")[0]);
        }
    }
});





