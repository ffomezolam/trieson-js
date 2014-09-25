require('should');
var T = require('moretrieson');

describe('moretrieson', function() {
    var t = new T();
    t.add('bonjo');
    t.add('boley');
    t.add('banjo');
    t.all();
});
