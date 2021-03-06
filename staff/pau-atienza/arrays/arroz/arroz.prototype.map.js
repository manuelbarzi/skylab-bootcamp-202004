'use strict';

Object.defineProperty(Arroz.prototype, 'map', {
    value: function(expression) {
        var result = new Arroz()
    
        for (var i = 0; i < this.length; i++)
            result[i] = expression(this[i], i, this);
    
        result.length = this.length;
    
        return result;
    },
    enumerable: false,
    writable: true
});