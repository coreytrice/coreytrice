(function () {
    window.corey = window.corey || {};

    corey.util = {
        inArray : function (needle, haystack) {
            if(Object.prototype.toString.call(needle) === '[object Array]') {
                for(var i = 0; i < needle.length; i++) {
                    if(haystack.indexOf(needle[i]) !== -1) {
                        return true;
                    }

                    if(i === needle.length - 1) {
                        return false;
                    }else{
                        continue;
                    }
                }
            }else{
                if(haystack.indexOf(needle) !== -1) {
                    return true;
                }else{
                    return false;
                }
            }
        },
        arrayIntersectsArray : function(haystack, arr) {
            return arr.some(function (v) {
              return haystack.indexOf(v) >= 0;
          });
        },
        capitalize : function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        /**
         * Returns full object with several standard date/time formats
         *     as well as all the pieces needed to build out any other
         *     date/time format you may want
         *
         * @param {string|number} input Accepts date string, datetime string,
         *     millisecond timestamp, or 'now'
         */
        formatDate : function (input) {
            if(typeof input === 'string' && input.toLowerCase() === 'now') {
                input = new Date();
            }
            if(Number(input) === parseInt(input, 10)) {
                input = new Date(Number(input));
            }
            var   jsDate        = new Date(input)
                , day           = jsDate.getDay()
                , date          = jsDate.getDate()
                , month         = jsDate.getMonth()
                , year          = jsDate.getFullYear()
                , timestamp     = jsDate.getTime()
                , hours         = jsDate.getHours()
                , minutes       = jsDate.getMinutes()
                , seconds       = jsDate.getSeconds()
                , leadZeroMins  = ('0' + jsDate.getMinutes()).slice(-2)
                , leadZeroSecs  = ('0' + jsDate.getSeconds()).slice(-2)
                , milliseconds  = jsDate.getMilliseconds()
                , now           = new Date()
                , nowTimestamp  = now.getTime()
                , millisecDay   = 86400000
                , millisecHour  = 3600000
                , millisecMin   = 60000
                , fullDay       = ['Sunday',    'Monday',   'Tuesday',  'Wednesday',    'Thursday', 'Friday',   'Saturday']
                , abrvDay       = ['Sun',       'Mon',      'Tue',      'Wed',          'Thur',     'Fri',      'Sat']
                , fullMonth     = ['January',   'February', 'March',    'April',    'May',  'June', 'July', 'August',   'September',    'October',  'November', 'December']
                , abrvMonth     = ['Jan',       'Feb',      'Mar',      'Apr',      'May',  'Jun',  'Jul',  'Aug',      'Sep',          'Oct',      'Nov',      'Dec']
                , twelveHours   = null
                , period        = null
                , periodAbrv    = null
                , sinceNow      = null
                , isToday       = null
                , obj
            ;

            if(hours < 12) {
                if(hours === 0) {
                    twelveHours = 12;
                }else{
                    twelveHours = hours;
                }
                period      = 'am';
                periodAbrv  = 'a';
            }else{
                if(hours === 12) {
                    twelveHours = 12;
                }else{
                    twelveHours = hours - 12;
                }
                period      = 'pm';
                periodAbrv  = 'p';
            }

            if(timestamp > (nowTimestamp - millisecMin)) {
                var secsSince = Math.round((nowTimestamp - timestamp) / 1000);

                sinceNow = secsSince + 's';

                if(date === now.getDate()) {
                    isToday = true;
                }
            }else if(timestamp > (nowTimestamp - millisecHour)) {
                var minsSince = Math.round((nowTimestamp - timestamp) / millisecMin);

                sinceNow = minsSince + 'm';

                if(date === now.getDate()) {
                    isToday = true;
                }
            }else if(timestamp > (nowTimestamp - millisecDay)) {
                var hoursSince = Math.round((nowTimestamp - timestamp) / millisecHour);

                sinceNow = hoursSince + 'h';

                if(date === now.getDate()) {
                    isToday = true;
                }
            }

            obj = {
                  'dayName'         : fullDay[day]
                , 'dayAbrv'         : abrvDay[day]
                , 'monthName'       : fullMonth[month]
                , 'monthAbrv'       : abrvMonth[month]
                , 'date'            : date
                , 'month'           : (month + 1)
                , 'year'            : year
                , 'timestamp'       : timestamp
                , 'twelveHours'     : twelveHours
                , 'period'          : period
                , 'periodAbrv'      : periodAbrv
                , 'hours'           : hours
                , 'minutes'         : minutes
                , 'seconds'         : seconds
                , 'leadZeroMinutes' : leadZeroMins
                , 'leadZeroSeconds' : leadZeroSecs
                , 'milliseconds'    : milliseconds
                , 'isToday'         : isToday
                , 'sinceNow'        : sinceNow
                , 'timePeriod'      : twelveHours + ':' + leadZeroMins + period
                , 'dateMonth'       : date + ' ' + abrvMonth[month]
                , 'monthDateYear'   : abrvMonth[month] + ' ' + date + ', ' + year
                , 'datetime'        : abrvMonth[month] + ' ' + date + ', ' + year + ' ' + twelveHours + ':' + leadZeroMins + period
                , 'dateAtTime'      : abrvMonth[month] + ' ' + date + ', ' + year + ' at ' + twelveHours + ':' + leadZeroMins + period
            };

            return obj;
        },
        queryParams : function (str) {
            var ret = (str || document.location.search);

            ret
                .replace(/(^\?)/,'')
                .split("&")
                .map(function (n) {
                    n = n.split("=");
                    this[n[0]] = n[1];

                    return this;
                }.bind(this))
            ;

            return this;
        },
        formDataObj : function (jqFormElem) {
            return jqFormElem
                .serializeArray()
                .reduce(function (obj, item) {
                    obj[item.name] = item.value;
                    return obj;
                }, {})
            ;
        },
        buildOptionList : function (selectTgt, options, className) {
            $.each(options, function (key, value) {   
                selectTgt.append(
                    $('<option class="' + className + '"></option>')
                        .attr('value', value)
                        .text(key)
                ); 
            });
        },
    };
})();