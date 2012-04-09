// IndexedDB version
    function AsynchronousStorage(name, size, callback) {
      this.name = name;
      this.type = "IndexedDB";
      var db = indexedDB.open(name, 1024);
      db.onsuccess = db.onupgradeneeded = bind.call(readLength, this, callback);
    };

    prepareTable = function (callback) {
      var os = this._db.createObjectStore(unobtrusiveTableName);
      os.createIndex(keyFieldName, keyFieldName, {unique: true});
      os.createIndex(valueFieldName, valueFieldName, {unique: false});
      readLength.call(this, callback, {type: NULL});
    };

    readLength = function (callback, event) {
      var
        db = this._db || (this._db = event.target.result),
        upgrade = event.type == "upgradeneeded",
        keys = [],
        cb
      ;
      if (upgrade || !~indexOf.call(db.objectStoreNames, unobtrusiveTableName)) {
        cb = bind.call(prepareTable, this, callback, event);
        upgrade ?
          cb() :
          db.setVersion(1).onsuccess = cb;
        ;
      } else {
        db.transaction(unobtrusiveTableName).objectStore(unobtrusiveTableName).openCursor().onsuccess = function(event) {  
          var cursor = event.target.result; 
          if (cursor) {  
            keys.push(cursor.key);
            cursor["continue"](); // both YUICompressor and ClosureCompiler fails without square brackets
          }
          else {
            console.log(keys);  
          }
        };
      }
    };

    asPrototype = AsynchronousStorage[prototype];