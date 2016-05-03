/***
   Copyright 2013 Teun Duynstee

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
module.exports = (function() {
    function handleCase(value, ignoreCase) {
      return ignoreCase ? value.toLowerCase() : value;
    }
    function makeCompareFunction(f, direction, ignoreCase){
      if(typeof(ignoreCase)=="undefined"){
        ignoreCase = false;
      }
      if(typeof(f)!="function"){
        var prop = f;
        // make unary function
        f = function(v1){return !!v1[prop] ? v1[prop] : "";}
      }
      if(f.length > 1 && ignoreCase) {
        console.warn('Cannot ignore case for non-unary functions. Please use ".toLowerCase()" when declaring the compare function.');
      }
      if(f.length === 1) {
        // f is a unary function mapping a single item to its sort score
        var uf = f;
        f = function(v1,v2) {
          v1 = uf(v1);
          v2 = uf(v2);
          // if the values are string
          if (typeof(v1)=="string" && typeof(v2)=="string"){
            // check if the case should be ignored
            v1 = handleCase(v1, ignoreCase);
            v2 = handleCase(v2, ignoreCase);
          }
          return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
        }
      }
      if(direction === -1)return function(v1,v2){return -f(v1,v2)};
      return f;
    }
    /* mixin for the `thenBy` property */
    function extend(f, d, c) {
      f=makeCompareFunction(f, d, c);
      f.thenBy = tb;
      return f;
    }

    /* adds a secondary compare function to the target function (`this` context)
     which is applied in case the first one returns 0 (equal)
     returns a new compare function, which has a `thenBy` method as well */
    function tb(y, d, c) {
      var x = this;
      y = makeCompareFunction(y, d, c);
      return extend(function(a, b) {
        return x(a,b) || y(a,b);
      });
    }
    return extend;
})();
