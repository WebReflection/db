var
  copyright = '(C) Andrea Giammarchi, @WebReflection - Mit Style License',
  JSBuilder = require("./JSBuilder")
;

JSBuilder.queue([
  function () {
    JSBuilder.write(
      '../build/db.max.js',
      JSBuilder.replace(
        JSBuilder.read('../src/db.js'),
        [
          "/*:WebSQL:*/",
            "/*:IndexedDB:*/",
          "/*:localStorage:*/",
          "/*:cookies:*/"
          //, /function AsynchronousStorage/g
        ],
        [
          JSBuilder.read('../src/WebSQL.js'),
          JSBuilder.read('../src/IndexedDB.js'),
          JSBuilder.read('../src/localStorage.js'),
          JSBuilder.read('../src/cookies.js')
          //, "function "
        ]
      )
    );
    JSBuilder.next();
  },
  "",
  "-----------------------",
  "|        db.js        |",
  "-----------------------",
  function () {
    JSBuilder.compile(
        copyright,
        'build/db.max.js',
        'build/db.js',
        [
            "../build/db.max.js"
        ]
    );
  },
  "----------------------",
  ""
]);