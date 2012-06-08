var
  copyright = '(C) Andrea Giammarchi, @WebReflection - Mit Style License',
  JSBuilder = require("./JSBuilder")
;

JSBuilder.queue([
  function () {
    JSBuilder.write(
      '../build/asyncStorage.max.js',
      JSBuilder.replace(
        JSBuilder.read('../src/asyncStorage.js'),
        [
          "/*:WebSQL:*/",
            "/*:IndexedDB:*/",
          "/*:localStorage:*/",
          "/*:cookie:*/"
          //, /function AsynchronousStorage/g
        ],
        [
          JSBuilder.read('../src/WebSQL.js'),
          JSBuilder.read('../src/IndexedDB.js'),
          JSBuilder.read('../src/localStorage.js'),
          JSBuilder.read('../src/cookie.js')
          //, "function "
        ]
      )
    );
    JSBuilder.next();
  },
  "",
  "-----------------------",
  "|   asyncStorage.js   |",
  "-----------------------",
  function () {
    JSBuilder.compile(
        copyright,
        'build/asyncStorage.max.js',
        'build/asyncStorage.js',
        [
            "../build/asyncStorage.max.js"
        ]
    );
  },
  "----------------------",
  ""
]);