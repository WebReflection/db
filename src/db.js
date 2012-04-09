"db" in this || (function (window) {"use strict";

  // node.js exports
  if (typeof __dirname != "undefined") {
    window.create = create;
    window = global;
  } else {
    window.db = {create: create};
  }

  // exported function
  function create(name, size, callback) {
    if (callback == NULL) {
      callback = size;
      size = 1 << 20;
    }
    return new AsynchronousStorage(name, size, callback);
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
    unobtrusiveTableName  = "asynchronous_storage",
    keyFieldName          = "db_key",
    valueFieldName        = "db_value",
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
  //fuck you IndexedDB, not usable right now } else if (indexedDB) {
    //AsynchronousStorage = /*-IndexedDB:*/
  } else if (localStorage in window) {
    AsynchronousStorage = /*:localStorage:*/
  } else {
    AsynchronousStorage = /*:cookie:*/
  }

}(this));