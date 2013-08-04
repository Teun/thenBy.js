function firstBy(init_function) {
    var sorter = function (v1, v2) {
        // if initial returns 0, we return the result from the secondary function
        // this is why || is called the dafault operator
        return init_function(v1, v2) || secondary_function(v1, v2);
    }
    // the sorter has a thenBy method that allows appecding functions for secondary sorting
    sorter.thenBy = function (ftb) {
        // if the secondary is already set, we pass on the thenBy-function to the tail of the chain
        if (secondary_function.thenBy) {
            secondary_function.thenBy(ftb);
        } else {
            // set the secondary function
            secondary_function = firstBy(ftb);
        }
        return sorter;
    };
    // initialize the secondary function on something that doesn't care
    var secondary_function = function () { return 0; }
    return sorter;
}
