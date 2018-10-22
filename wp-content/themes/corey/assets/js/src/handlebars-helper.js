Handlebars.registerHelper('compare', function (l, r, options) {
    operator = options.hash.operator || "==";

    var operators = {
        '==' : function (l, r) {
            return l == r;
        },
        '===' : function (l, r) {
            return l === r;
        },
        '!=' : function (l, r) {
            return l != r;
        },
        '<' : function (l, r) {
            return l < r;
        },
        '>' : function (l, r) {
            return l > r;
        },
        '<=' : function (l, r) {
            return l <= r;
        },
        '>=' : function (l, r) {
            return l >= r;
        },
        'typeof' : function (l, r) {
            return typeof l == r;
        }
    };

    var result = operators[operator](l, r, options);

    if(result) {
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
});

Handlebars.registerHelper('inArray', function (needle, haystack, options) {
    var result = false;

    for(var h in haystack) {
        if(needle == haystack[h]) {
            result = true;
        break;
        }
    }

    if(result) {
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
});

Handlebars.registerHelper('log', function (data) {
    window.console && console.log(data);
});

Handlebars.registerHelper('indexEven', function (interger, options) {
    if(interger % 2 === 0) {
        return options.fn(this);
    }else{
        return options.inverse(this);
    }
});

Handlebars.registerHelper('formatDate', function (datetime, format) {
    if(typeof datetime === 'string' && datetime.toLowerCase() === 'now') {
        datetime = new Date();
    }
    if(Number(datetime) === parseInt(datetime, 10)) {
        datetime = new Date(Number(datetime));
    }

    var   jsDate        = new Date(datetime)
        , day           = jsDate.getDay()
        , date          = jsDate.getDate()
        , monthIndex    = jsDate.getMonth()
        , month         = monthIndex + 1
        , year          = jsDate.getFullYear()
        , timestamp     = jsDate.getTime()
        , hours         = jsDate.getHours()
        , minutes       = ('0' + jsDate.getMinutes()).slice(-2)
        , seconds       = ('0' + jsDate.getSeconds()).slice(-2)
        , fullDay       = ['Sunday',    'Monday',   'Tuesday',  'Wednesday',    'Thursday', 'Friday',   'Saturday']
        , abrvDay       = ['Sun',       'Mon',      'Tue',      'Wed',          'Thur',     'Fri',      'Sat']
        , fullMonth     = ['January',   'February', 'March',    'April',    'May',  'June', 'July', 'August',   'September',    'October',  'November', 'December']
        , abrvMonth     = ['Jan',       'Feb',      'Mar',      'Apr',      'May',  'Jun',  'Jul',  'Aug',      'Sep',          'Oct',      'Nov',      'Dec']
        , twelveHours   = null
        , period        = null
        , periodAbrv    = null
        , rtrn
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

    switch(format) {
        case 'dateAtTime':
            rtrn = abrvMonth[monthIndex] + ' ' + date + ', ' + year + ' at ' + twelveHours + ':' + minutes + period;
            break;

        case 'dateTime':
            rtrn = abrvMonth[monthIndex] + ' ' + date + ', ' + year + ' ' + twelveHours + ':' + minutes + period;
            break;

        case 'date':
            rtrn = abrvMonth[monthIndex] + ' ' + date + ', ' + year;
            break;

        case 'time':
            rtrn = twelveHours + ':' + minutes + period;
            break;

        default:
            rtrn = abrvMonth[monthIndex] + ' ' + date + ', ' + year + ' ' + twelveHours + ':' + minutes + period;
            break;
    }

    return rtrn;
});

Handlebars.registerHelper('everyNth', function (context, num, options) {
    var   fn        = options.fn
        , inverse   = options.inverse
        , num       = parseInt(num, 10)
        , rtrn      = ''
    ;

    if(context && context.length > 0) {
        for(var i = 0; i < context.length; i++) {
            var Nth = i % num === 0;

            rtrn = rtrn + fn($.extend({}, context[i], {
                  isNth             : Nth
                , isNthNotFirst     : Nth && i > 0
                , isNthFirstBreak   : Nth && num === i
                , isAfterFirstBreak : i >= num
                , isLast            : i === context.length - 1
                , index             : i
                , section           : Math.ceil((i + 1) / num)
            }));
        }
    }else{
        rtrn = inverse(this);
    }

    return rtrn;
});

Handlebars.registerHelper('afterNth', function (context, num, options) {
    var   fn        = options.fn
        , inverse   = options.inverse
        , num       = parseInt(num, 10)
        , rtrn      = ''
    ;

    if(context && context.length > 0) {
        for(var i = 0; i < context.length; i++) {
            var Nth = i === num - 1;

            rtrn = rtrn + fn($.extend({}, context[i], {
                  isNth         : Nth
                , isFirstAfter  : i === num
                , isAfter       : i >= num
                , isLast        : i === context.length - 1
                , index         : i
            }));
        }
    }else{
        rtrn = inverse(this);
    }

    return rtrn;
});

Handlebars.registerHelper('formatDuration', function (milliSeconds, format, isSeconds) {
    var   convert   = isSeconds || false
        , ms        = convert ? milliSeconds * 1000 : milliSeconds
        , date      = new Date(ms)
        , rtrn      = ''
        , hh        = date.getUTCHours()
        , mm        = date.getUTCMinutes()
        , ss        = date.getSeconds()
    ;

    if(hh > 12) {
        hh = hh % 12;
    }

    if(format == 'words') {
        if(hh !== 0) {
            rtrn += hh + ' hour'
            if(hh > 1) {
                rtrn += 's ';
            } else {
                rtrn += ' ';
            }
        }

        rtrn += mm + ' minute';
        if(mm > 1) {
            rtrn += 's ';
        } else {
            rtrn += ' ';
        }

        rtrn += ss + ' second';
        if(ss > 1) {
            rtrn += 's ';
        } else {
            rtrn += ' ';
        }

    } else {
        if (hh < 10) {
            hh = "0"+hh;
        }
        if (mm < 10) {
            mm = "0"+mm;
        }
        if (ss < 10) {
            ss = "0"+ss;
        }
        if(hh !== '00') {
            rtrn += hh + ":"
        }
        rtrn += mm + ":" + ss;
    }

    return rtrn;
});

Handlebars.registerHelper('tblz_get_human_post_type', function (type) {
    var text = 'story';
    switch (type) {
        case 'myv':
            text = 'post';
            break;
        case 'jwvideo':
            text = 'clip';
            break;
        case 'podcast':
            text = 'radio show';
            break;
        case 'channel':
            $text = 'channel';
            break;
    }
    return text;
});

Handlebars.registerHelper('checkIfHumanTime', function(str, options) {
    if(str.indexOf('ago') < 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('planPrice', function (price) {
    return parseFloat(price).toFixed(2);
});

Handlebars.registerHelper('planSavePercentage', function (price, frequency, monthlyPrice) {
    priceDifference = ((monthlyPrice * frequency) - price) / frequency;
    return Math.round((100 / monthlyPrice) * priceDifference);
});
