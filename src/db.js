(function (asyncStorage, window) {"use strict";

  if (asyncStorage in window) return;

  // node.js exports
  if (typeof __dirname != "undefined") {
    window.create = create;
    window = global;
  } else {
    window[asyncStorage] = {create: create};
  }

  // exported function
  function create(name, callback, errorback, size) {
    return new AsynchronousStorage(name, callback || nothingToDoHere, errorback || nothingToDoHere, size || 1 << 20);
  }

  // utility
  function concat() {
    return "".concat.apply("", arguments);
  }

  function nothingToDoHere() {
    //^ for debug only
    console.log("[ERROR]", arguments);
    //$
  }

  var
    // fast + ad-hoc + easy polyfills
    bind                  = create.bind || function (self) {
                            var
                              callback = this,
                              args = [].slice.call(arguments, 1)
                            ;
                            return function () {
                              return callback.apply(self, args.concat.apply(args, arguments));
                            };
                          },
    indexOf               = [].indexOf || function (value) {
                            for (var i = this.length; i-- && this[i] !== value;);
                            return i;
                          },
    setTimeout            = window.setTimeout,
    // strings shortcuts
    EOF                   = "\x00",
    ndexedDB              = "ndexedDB",
    openDatabase          = "openDatabase",
    executeSql            = "executeSql",
    transaction           = "transaction",
    readTransaction       = "readTransaction",
    localStorage          = "localStorage",
    prototype             = "prototype",
    unobtrusiveTableName  = asyncStorage + "_data",
    keyFieldName          = asyncStorage + "_key",
    valueFieldName        = asyncStorage + "_value",
    $keys                 = "_keys",
    $length               = "length",
    $key                  = "key",
    $getItem              = "getItem",
    $setItem              = "setItem",
    $removeItem           = "removeItem",
    $clear                = "clear",
    // original IndexedDB ... unfortunately it's not usable right now as favorite choice, actually dropped later on
    indexedDB             = window["i" + ndexedDB] ||
                            window["webkitI" + ndexedDB] ||
                            window["mozI" + ndexedDB] ||
                            window["msI" + ndexedDB],
    // other shortcuts
    NULL                  = null,
    max                   = window.Math.max,
    // lazily assigned variables
    AsynchronousStorage, asPrototype,
    prepareTable, readLength, checkLength, setLength,
    prepareUpdate, checkIfPresent, clearAllItems, clearOneItem,
    onUpdateComplete, onCheckComplete, onGetComplete, onItemsCleared, onItemCleared
  ;

  // the circus ... hopefully a bloody fallback will always be available
  if (openDatabase in window) {
    AsynchronousStorage = /*:WebSQL:*/
  } else if (indexedDB) {
    AsynchronousStorage = /*:IndexedDB:*/
  } else if (localStorage in window) {
    AsynchronousStorage = /*:localStorage:*/
  } else {
    AsynchronousStorage = /*:cookie:*/
  }

}("asyncStorage", this));
// var db = asyncStorage.create("db", function () {console.log(arguments)});