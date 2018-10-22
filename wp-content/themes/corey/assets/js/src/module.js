this.module = function (names, fn) {
    var   name
        , space
    ;
    
    if(typeof names === 'string') {
        names = names.split('.');
    }

    space = this[name = names.shift()] || (this[name] = {});
    space.module || (space.module = this.module);
    
    if(names.length) {
        return space.module(names, fn);
    }else{
        return fn.call(space);
    }
};