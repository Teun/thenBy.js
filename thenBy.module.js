var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var thenBy_exports = {};
__export(thenBy_exports, {
  firstBy: () => firstBy
});
module.exports = __toCommonJS(thenBy_exports);
function firstBy() {
  function identity(v) {
    return v;
  }
  function ignoreCase(v) {
    return typeof v === "string" ? v.toLowerCase() : v;
  }
  function makeCompareFunction(f, opt) {
    opt = typeof opt === "object" ? opt : { direction: opt };
    if (typeof f != "function") {
      var prop = f;
      f = function(v1) {
        return !!v1[prop] ? v1[prop] : "";
      };
    }
    if (f.length === 1) {
      var uf = f;
      var preprocess = opt.ignoreCase ? ignoreCase : identity;
      var cmp = opt.cmp || function(v1, v2) {
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
      };
      f = function(v1, v2) {
        return cmp(preprocess(uf(v1)), preprocess(uf(v2)));
      };
    }
    const descTokens = { "-1": "", desc: "" };
    if (opt.direction in descTokens)
      return function(v1, v2) {
        return -f(v1, v2);
      };
    return f;
  }
  function tb(func, opt) {
    var x = typeof this == "function" && !this.firstBy ? this : false;
    var y = makeCompareFunction(func, opt);
    var f = x ? function(a, b) {
      return x(a, b) || y(a, b);
    } : y;
    f.thenBy = tb;
    return f;
  }
  tb.firstBy = tb;
  return tb;
}
;
