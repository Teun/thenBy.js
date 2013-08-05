firstBy = (function() {
    /* mixin for the `thenBy` property */
    function extend(f) {
        f.thenBy = tb;
        return f;
    }
    /* adds a secondary compare function to the target function (`this` context)
       which is applied in case the first one returns 0 (equal)
       returns a new compare function, which has a `thenBy` method as well */
    function tb(y) {
        var x = this;
        return extend(function(a, b) {
            return x(a,b) || y(a,b);
        });
    }
    return extend;
})();
