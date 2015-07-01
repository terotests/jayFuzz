# jayFuzz - file system storage and emulator

Emulates the file system writes on `IndexedDB`, `memory` and performs real writes on `node.js` environment.

The goals are:

1. Quickly setup a FS emulation in memory
2. Simulate filesystem operations as if they are in server
3. The same code can work in both client and server
4. Created filesystem part can be saved
5. You can use JavaScript to manipulate filesystem contents
6. Serve as simple "tar" for sending file system structures over network

Since the filsesystem can be packaged (a bit like `tar` in linux, but in JSON) it is quick to set up a test environment.

In the memory format, each object represents a folder and object property a file like this:

```javascript
 // The file system description
 {
    "README.TXT" : "contents of the file",
    "subDir" : {
        "foobar.cc" : "my code is written ehre", 
    }
 }
```
Binary file support is intented to be added using `base64` encoding but this interface is very low lever interface for simluation purposes and does not natively support that.

The library includes implementations for most simple FS operations using promise -based interface.

# Initialize with IndexedDB

```javascript

var filesystem = fsServerIndexedDB("TheServerName");
filesystem.then( function() {
    // ready to go
    var folder = filesystem.getRootFolder();
    folder.writeFile("README.TXT", "We are on!").then( function() {
        // ... write is done
    });
});

```

# Initialize with Memory based interface

```javascript

var filesystem = fsServerMemory("TheServerName");
filesystem.then( function() {
    // ready to go
    var folder = filesystem.getRootFolder();
    folder.writeFile("README.TXT", "We are on!").then( function() {
        // ... write is done
    });
});

```

# Initialize with node.js based interface

In node.js environment you have to give the absolute path of the file system to be used for the constructor.

```javascript
var filesystem = require("./jayFuzz.js");
var folder = filesystem.nodeFsFolder("/path/to/the/directory/");

folder.writeFile("README.TXT", "We are on!").then( function() {
    // ... write is done
});


```

# The supported FS operations

## appendFile
```javascript
folder.appendFile("README.TXT", "next line").then( function() {
    // ... append is done
});

```
## folder#createDir
```javascript
folder.createDir("newFolder").then( function() {
    // ... append is done
});

```
## folder#listFiles
```javascript
folder.listFiles().then( function(list) {
    // list = array of files
});

```
## folder#listFolders
```javascript
folder.listFolders().then( function(list) {
    // list = array of folders
});

```
## folder#readFile
```javascript
folder.readFile("README.TXT").then( function(data) {
    // data = contents of file
});

```

## folder#writeFile
```javascript
folder.writeFile("README.TXT", "newData").then( function(data) {
    // data written to file
});

```





# Unserializing

WARNING! be careful when using this with node.js environment. Actual files will be overwritten if present.

```javascript

folder.fromData(data);

```

# Serializing

```javascript
var options = {
    fileFilter : function(fileName) {
        // optional filter return true if file is serialized
    },
    dirFilter : function(fileName) {
        // optional directory filter return true if folder is serialized
    },
    getData : true // set false if file data is ignored
};
folder.toData(options).then( function(data) {
    // The data is readable here...
});

```

If the `getData` is set to true, then each file will be assigned boolean value `true`.




# License.

MIT

























   

 


   
#### Class localFs





   
    
    
    
    
    
    
    
    
    
    
    
    
    
    


   
      
            
#### Class _promise


- [all](README.md#_promise_all)
- [collect](README.md#_promise_collect)
- [fail](README.md#_promise_fail)
- [fulfill](README.md#_promise_fulfill)
- [isFulfilled](README.md#_promise_isFulfilled)
- [isPending](README.md#_promise_isPending)
- [isRejected](README.md#_promise_isRejected)
- [onStateChange](README.md#_promise_onStateChange)
- [reject](README.md#_promise_reject)
- [rejectReason](README.md#_promise_rejectReason)
- [resolve](README.md#_promise_resolve)
- [state](README.md#_promise_state)
- [then](README.md#_promise_then)
- [triggerStateChange](README.md#_promise_triggerStateChange)
- [value](README.md#_promise_value)



   
    
##### trait util_fns

- [isArray](README.md#util_fns_isArray)
- [isFunction](README.md#util_fns_isFunction)
- [isObject](README.md#util_fns_isObject)


    
    
    
    


   
      
    
      
            
#### Class later


- [add](README.md#later_add)
- [after](README.md#later_after)
- [asap](README.md#later_asap)
- [every](README.md#later_every)
- [once](README.md#later_once)
- [onFrame](README.md#later_onFrame)
- [polyfill](README.md#later_polyfill)
- [removeFrameFn](README.md#later_removeFrameFn)



   


   



      
    



      
    
      
            
#### Class _localDB


- [_initDB](README.md#_localDB__initDB)
- [clearDatabases](README.md#_localDB_clearDatabases)
- [getDB](README.md#_localDB_getDB)
- [table](README.md#_localDB_table)



   
    
    
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
            
#### Class dbTable


- [_cursorAction](README.md#dbTable__cursorAction)
- [addRows](README.md#dbTable_addRows)
- [clear](README.md#dbTable_clear)
- [count](README.md#dbTable_count)
- [forEach](README.md#dbTable_forEach)
- [get](README.md#dbTable_get)
- [getAll](README.md#dbTable_getAll)
- [readAndDelete](README.md#dbTable_readAndDelete)
- [remove](README.md#dbTable_remove)
- [update](README.md#dbTable_update)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    



      
    
      
    



      
    
      
            
#### Class memoryFsFolder


- [_isFile](README.md#memoryFsFolder__isFile)
- [_isFolder](README.md#memoryFsFolder__isFolder)
- [appendFile](README.md#memoryFsFolder_appendFile)
- [createDir](README.md#memoryFsFolder_createDir)
- [fromData](README.md#memoryFsFolder_fromData)
- [getSubFolderObj](README.md#memoryFsFolder_getSubFolderObj)
- [getTree](README.md#memoryFsFolder_getTree)
- [isFile](README.md#memoryFsFolder_isFile)
- [listFiles](README.md#memoryFsFolder_listFiles)
- [listFolders](README.md#memoryFsFolder_listFolders)
- [readFile](README.md#memoryFsFolder_readFile)
- [removeFile](README.md#memoryFsFolder_removeFile)
- [toData](README.md#memoryFsFolder_toData)
- [writeFile](README.md#memoryFsFolder_writeFile)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    



      
    
      
            
#### Class fsServerMemory


- [_initServers](README.md#fsServerMemory__initServers)
- [_objectAtPath](README.md#fsServerMemory__objectAtPath)
- [createFrom](README.md#fsServerMemory_createFrom)
- [getRootFolder](README.md#fsServerMemory_getRootFolder)
- [openDir](README.md#fsServerMemory_openDir)



   


   



      
    
      
            
#### Class nodeFsFolder


- [_mkDir](README.md#nodeFsFolder__mkDir)
- [appendFile](README.md#nodeFsFolder_appendFile)
- [createDir](README.md#nodeFsFolder_createDir)
- [fromData](README.md#nodeFsFolder_fromData)
- [getSubFolderObj](README.md#nodeFsFolder_getSubFolderObj)
- [getTree](README.md#nodeFsFolder_getTree)
- [isFile](README.md#nodeFsFolder_isFile)
- [listFiles](README.md#nodeFsFolder_listFiles)
- [listFolders](README.md#nodeFsFolder_listFolders)
- [readFile](README.md#nodeFsFolder_readFile)
- [toData](README.md#nodeFsFolder_toData)
- [writeFile](README.md#nodeFsFolder_writeFile)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    



      
    
      
            
#### Class indexedDBFsFolder


- [_classFactory](README.md#indexedDBFsFolder__classFactory)
- [_filePath](README.md#indexedDBFsFolder__filePath)
- [_isFile](README.md#indexedDBFsFolder__isFile)
- [_isFolder](README.md#indexedDBFsFolder__isFolder)
- [_lastPath](README.md#indexedDBFsFolder__lastPath)
- [_loadFiles](README.md#indexedDBFsFolder__loadFiles)
- [_loadFolders](README.md#indexedDBFsFolder__loadFolders)
- [_normalize](README.md#indexedDBFsFolder__normalize)
- [_removeFileFromCache](README.md#indexedDBFsFolder__removeFileFromCache)
- [_removeFolderFromCache](README.md#indexedDBFsFolder__removeFolderFromCache)
- [appendFile](README.md#indexedDBFsFolder_appendFile)
- [createDir](README.md#indexedDBFsFolder_createDir)
- [fromData](README.md#indexedDBFsFolder_fromData)
- [getSubFolderObj](README.md#indexedDBFsFolder_getSubFolderObj)
- [getTree](README.md#indexedDBFsFolder_getTree)
- [isFile](README.md#indexedDBFsFolder_isFile)
- [listFiles](README.md#indexedDBFsFolder_listFiles)
- [listFolders](README.md#indexedDBFsFolder_listFolders)
- [readFile](README.md#indexedDBFsFolder_readFile)
- [removeFile](README.md#indexedDBFsFolder_removeFile)
- [toData](README.md#indexedDBFsFolder_toData)
- [writeFile](README.md#indexedDBFsFolder_writeFile)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    



      
    
      
            
#### Class fsServerIndexedDB


- [_classFactory](README.md#fsServerIndexedDB__classFactory)
- [createFrom](README.md#fsServerIndexedDB_createFrom)
- [getDb](README.md#fsServerIndexedDB_getDb)
- [getID](README.md#fsServerIndexedDB_getID)
- [getRootFolder](README.md#fsServerIndexedDB_getRootFolder)



   
    
##### trait _dataTrait

- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    


   
      
    



      
    





   
# Class localFs


The class has following internal singleton variables:
        
        
### localFs::constructor( aclFile )

```javascript

```
        


   
    
    
    
    
    
    
    
    
    
    
    
    
    
    


   
      
            
# Class _promise


The class has following internal singleton variables:
        
        
### <a name="_promise_all"></a>_promise::all(firstArg)


```javascript

var args;
if(this.isArray(firstArg)) {
  args = firstArg;
} else {
  args = Array.prototype.slice.call(arguments, 0);
}
// console.log(args);
var targetLen = args.length,
    rCnt = 0,
    myPromises = [],
    myResults = new Array(targetLen);
    
return this.then(
    function() {
 
        var allPromise = _promise();
        if(args.length==0) {
            allPromise.resolve([]);
        }
        args.forEach( function(b, index) {
            if(b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);
                
                b.then(function(v) {
                    myResults[index] = v;
                    rCnt++;
                    if(rCnt==targetLen) {

                        allPromise.resolve(myResults);
                    }
                }, function(v) {
                    allPromise.reject(v);
                });
                
            } else {
                allPromise.reject("Not list of promises");
            }
        })
        
        return allPromise;
        
    });



    

```

### <a name="_promise_collect"></a>_promise::collect(collectFn, promiseList, results)


```javascript

var args;
if(this.isArray(promiseList)) {
  args = promiseList;
} else {
  args = [promiseList];
}

// console.log(args);
var targetLen = args.length,
    isReady = false,
    noMore = false,
    rCnt = 0,
    myPromises = [],
    myResults = results || {};
    
return this.then(
    function() {
 
        var allPromise = _promise();
        args.forEach( function(b, index) {
            if(b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);
                
                b.then(function(v) {
                    rCnt++;
                    isReady = collectFn(v, myResults);
                    if( (isReady && !noMore) || (noMore==false && targetLen == rCnt) ) {
                        allPromise.resolve(myResults);
                        noMore = true;
                    }
                }, function(v) {
                    allPromise.reject(v);
                });
                
            } else {
                allPromise.reject("Not list of promises");
            }
        })
        
        return allPromise;
        
    });

```

### <a name="_promise_fail"></a>_promise::fail(fn)


```javascript
return this.then(null, fn);
```

### <a name="_promise_fulfill"></a>_promise::fulfill(withValue)


```javascript
// if(this._fulfilled || this._rejected) return;

if(this._rejected) return;
if(this._fulfilled && withValue != this._stateValue) {
    return;
}

var me = this;
this._fulfilled = true;
this._stateValue = withValue;

var chCnt = this._childPromises.length;

while(chCnt--) {
    var p = this._childPromises.shift();
    if(p._onFulfill) {
        try {
            var x = p._onFulfill(withValue);
            // console.log("Returned ",x);
            if(typeof(x)!="undefined") {
                p.resolve(x);
            } else {
                p.fulfill(withValue);
            }
        } catch(e) {
            // console.error(e);
            /*
                If either onFulfilled or onRejected throws an exception e, promise2 
                must be rejected with e as the reason.            
            */
            p.reject(e);
        }
    } else {
        /*
            If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
            fulfilled with the same value as promise1        
        */
        p.fulfill(withValue);
    }
};
// this._childPromises.length = 0;
this._state = 1;
this.triggerStateChange();

```

### _promise::constructor( onFulfilled, onRejected )

```javascript
// 0 = pending
// 1 = fullfilled
// 2 = error

this._state = 0;
this._stateValue = null;
this._isAPromise = true;
this._childPromises = [];

if(this.isFunction(onFulfilled))
    this._onFulfill = onFulfilled;
if(this.isFunction(onRejected))
    this._onReject = onRejected;
    
if(!onRejected && this.isFunction(onFulfilled) ) {

    var me = this;
    later().asap(
        function() {
            onFulfilled( function(v) {
                me.resolve(v)
            }, function(v) {
                me.reject(v);
            });           
        });
 
}
```
        
### <a name="_promise_isFulfilled"></a>_promise::isFulfilled(t)


```javascript
return this._state == 1;
```

### <a name="_promise_isPending"></a>_promise::isPending(t)


```javascript
return this._state == 0;
```

### <a name="_promise_isRejected"></a>_promise::isRejected(v)


```javascript
return this._state == 2;
```

### <a name="_promise_onStateChange"></a>_promise::onStateChange(fn)


```javascript

if(!this._listeners)
    this._listeners = [];

this._listeners.push(fn);
```

### <a name="_promise_reject"></a>_promise::reject(withReason)


```javascript

// if(this._rejected || this._fulfilled) return;

// conso

if(this._fulfilled) return;
if(this._rejected && withReason != this._rejectReason) return;


this._state = 2;
this._rejected = true;
this._rejectReason = withReason;
var me = this;

var chCnt = this._childPromises.length;
while(chCnt--) {
    var p = this._childPromises.shift();

    if(p._onReject) {
        try {
            p._onReject(withReason);
            p.reject(withReason);
        } catch(e) {
            /*
                If either onFulfilled or onRejected throws an exception e, promise2 
                must be rejected with e as the reason.            
            */
            p.reject(e);
        }
    } else {
        /*
            If onFulfilled is not a function and promise1 is fulfilled, promise2 must be 
            fulfilled with the same value as promise1        
        */
        p.reject(withReason);
    }
};

// this._childPromises.length = 0;
this.triggerStateChange();

```

### <a name="_promise_rejectReason"></a>_promise::rejectReason(reason)


```javascript
if(reason) {
    this._rejectReason = reason;
    return;
}
return this._rejectReason;
```

### <a name="_promise_resolve"></a>_promise::resolve(x)


```javascript

// console.log("Resolving ", x);

// can not do this many times...
if(this._state>0) return;

if(x==this) {
    // error
    this._rejectReason = "TypeError";
    this.reject(this._rejectReason);
    return;
}

if(this.isObject(x) && x._isAPromise) {
    
    // 
    this._state = x._state;
    this._stateValue = x._stateValue;
    this._rejectReason = x._rejectReason;
    // ... 
    if(this._state===0) {
        var me = this;
        x.onStateChange( function() {
            if(x._state==1) {
                // console.log("State change");
                me.resolve(x.value());
            } 
            if(x._state==2) {
                me.reject(x.rejectReason());                
            }
        });
    }
    if(this._state==1) {
        // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
        this.fulfill(this._stateValue);    
    }
    if(this._state==2) {
        // console.log("Relved to be Promise was rejected ", x._rejectReason);
        this.reject(this._rejectReason);
    }
    return;
}
if(this.isObject(x) && x.then && this.isFunction(x.then)) {
    // console.log("Thenable ", x);
    var didCall = false;
    try {
        // Call the x.then
        var  me = this;
        x.then.call(x, 
            function(y) {
                if(didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
            },
            function(r) {
                if(didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
            });
    } catch(e) {
        if(!didCall) this.reject(e);
    }
    return;    
}
this._state = 1;
this._stateValue = x;

// fulfill the promise...
this.fulfill(x);

```

### <a name="_promise_state"></a>_promise::state(newState)


```javascript
if(typeof(newState)!="undefined") {
    this._state = newState;
}
return this._state;
```

### <a name="_promise_then"></a>_promise::then(onFulfilled, onRejected)


```javascript

if(!onRejected) onRejected = function() {};

var p = new _promise(onFulfilled, onRejected);
var me = this;

if(this._state==1) {
    later().asap( function() {
        me.fulfill(me.value());
    });
}
if(this._state==2) {
    later().asap( function() {
        me.reject(me.rejectReason());
    });
}
this._childPromises.push(p);
return p;



```

### <a name="_promise_triggerStateChange"></a>_promise::triggerStateChange(t)


```javascript
var me = this;
if(!this._listeners) return;
this._listeners.forEach( function(fn) {
    fn(me); 
});
// one-timer
this._listeners.length = 0;
```

### <a name="_promise_value"></a>_promise::value(v)


```javascript
if(typeof(v)!="undefined") {
    this._stateValue = v;
    return this;
}
return this._stateValue;
```



   
    
## trait util_fns

The class has following internal singleton variables:
        
        
### <a name="util_fns_isArray"></a>util_fns::isArray(someVar)


```javascript
return Object.prototype.toString.call( someVar ) === '[object Array]';
```

### <a name="util_fns_isFunction"></a>util_fns::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="util_fns_isObject"></a>util_fns::isObject(obj)


```javascript
return obj === Object(obj);
```


    
    
    
    


   
      
    
      
            
# Class later


The class has following internal singleton variables:
        
* _initDone
        
* _callers
        
* _oneTimers
        
* _everies
        
* _framers
        
        
### <a name="later_add"></a>later::add(fn, thisObj, args)


```javascript
if(thisObj || args) {
   var tArgs;
   if( Object.prototype.toString.call( args ) === '[object Array]' ) {
       tArgs = args;
   } else {
       tArgs = Array.prototype.slice.call(arguments, 2);
       if(!tArgs) tArgs = [];
   }
   _callers.push([thisObj, fn, tArgs]);   
} else {
    _callers.push(fn);
}
```

### <a name="later_after"></a>later::after(seconds, fn, name)


```javascript

if(!name) {
    name = "time"+(new Date()).getTime()+Math.random(10000000);
}

_everies[name] = {
    step : Math.floor(seconds * 1000),
    fn : fn,
    nextTime : 0,
    remove : true
};
```

### <a name="later_asap"></a>later::asap(fn)


```javascript
this.add(fn);

```

### <a name="later_every"></a>later::every(seconds, fn, name)


```javascript

if(!name) {
    name = "time"+(new Date()).getTime()+Math.random(10000000);
}

_everies[name] = {
    step : Math.floor(seconds * 1000),
    fn : fn,
    nextTime : 0
};
```

### later::constructor( interval, fn )

```javascript
if(!_initDone) {
    
   this.polyfill();
 
   var frame, cancelFrame;
   if(typeof(window) != "undefined") {
       var frame = window['requestAnimationFrame'], 
           cancelFrame= window['cancelRequestAnimationFrame'];
       ['', 'ms', 'moz', 'webkit', 'o'].forEach( function(x) { 
           if(!frame) {
            frame = window[x+'RequestAnimationFrame'];
            cancelFrame = window[x+'CancelAnimationFrame'] 
                                       || window[x+'CancelRequestAnimationFrame'];
           }
        });
   }
 
    if (!frame)
        frame= function(cb) {
            return setTimeout(cb, 16);
        };
 
    if (!cancelFrame)
        cancelFrame = function(id) {
            clearTimeout(id);
        };    
        
    _callers = [];
    _oneTimers = {};
    _everies = {};
    _framers = [];
    var lastMs = 0;
    
    var _callQueQue = function() {
       var ms = (new Date()).getTime();
       var fn;
       while(fn=_callers.shift()) {
          if(Object.prototype.toString.call( fn ) === '[object Array]' ) {
              fn[1].apply(fn[0], fn[2]);
          } else {
              fn();
          }
           
       }
       
       for(var i=0; i<_framers.length;i++) {
           var fFn = _framers[i];
           fFn();
       }
       
       for(var n in _oneTimers) {
           if(_oneTimers.hasOwnProperty(n)) {
               var v = _oneTimers[n];
               v[0](v[1]);
               delete _oneTimers[n];
           }
       }
       
       for(var n in _everies) {
           if(_everies.hasOwnProperty(n)) {
               var v = _everies[n];
               if(v.nextTime < ms) {
                   if(v.remove) {
                       if(v.nextTime > 0) {
                          v.fn(); 
                          delete _everies[n];
                       } else {
                          v.nextTime = ms + v.step; 
                       }
                   } else {
                       v.fn();
                       v.nextTime = ms + v.step;
                   }
               }
               if(v.until) {
                   if(v.until < ms) {
                       delete _everies[n];
                   }
               }
           }
       }       
       
       frame(_callQueQue);
       lastMs = ms;
    };
    _callQueQue();
    _initDone = true;
}
```
        
### <a name="later_once"></a>later::once(key, fn, value)


```javascript
// _oneTimers

_oneTimers[key] = [fn,value];
```

### <a name="later_onFrame"></a>later::onFrame(fn)


```javascript

_framers.push(fn);
```

### <a name="later_polyfill"></a>later::polyfill(t)


```javascript
// --- let's not ---
```

### <a name="later_removeFrameFn"></a>later::removeFrameFn(fn)


```javascript

var i = _framers.indexOf(fn);
if(i>=0) {
    if(fn._onRemove) {
        fn._onRemove();
    }
    _framers.splice(i,1);
    return true;
} else {
    return false;
}
```



   


   



      
    



      
    
      
            
# Class _localDB


The class has following internal singleton variables:
        
* _initDone
        
* _dbList
        
* _db
        
        
### <a name="_localDB__initDB"></a>_localDB::_initDB(t)


```javascript

if(_db) return;
// if you want experimental support, enable browser based prefixes
_db = window.indexedDB; //  || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

_initDone = true;

_dbList = _localDB( "sys.db", {
    tables : {
        databases : {
            createOptions : { keyPath : "name" },
        }
    }
});
```

### <a name="_localDB_clearDatabases"></a>_localDB::clearDatabases(fn)


```javascript

_dbList.then( function() {
  var dbs = _dbList.table("databases");
  dbs.forEach( function(data, cursor) {
     if(fn(data)) {
         _db.deleteDatabase(data.name);
         cursor.delete();
     }       
  });

})
```

### <a name="_localDB_getDB"></a>_localDB::getDB(t)


```javascript
return this._db;
```

### _localDB::constructor( dbName, options )

```javascript

if(this._db) return;
this._initDB();

if(!dbName) {
    return;
}

var me = this;

var request = _db.open(dbName, 4);

request.onerror = function(event) {
  // Do something with request.errorCode!
  console.error( event.target.errorCode );
};
request.onsuccess = function(event) {
  // Do something with request.result!
  _dbList.then( function() {
      var dbs = _dbList.table("databases");
      dbs.addRows( [{ name : dbName }]);
  })
  me._db = event.target.result;
  me.resolve(true);
  
};
request.onupgradeneeded = function (event) {

    var db = event.target.result;
    me._db = db;

    if(options && options.tables) {
        for(var n in options.tables) {
            if(options.tables.hasOwnProperty(n)) {
                var opts = options.tables[n];
                // Create another object store called "names" with the autoIncrement flag set as true.    
                var objStore = db.createObjectStore(n, opts.createOptions);

                if(opts.indexes) {
                    for(var iName in opts.indexes) {
                        if(opts.indexes.hasOwnProperty(iName)) {
                            var iData = opts.indexes[iName];
                            objStore.createIndex(iName, iName, iData);
                        }
                    }
                }
                
            }
        }
    }

};

```
        
### <a name="_localDB_table"></a>_localDB::table(name)


```javascript
return dbTable(this._db, name);
```



   
    
    
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
            
# Class dbTable


The class has following internal singleton variables:
        
        
### <a name="dbTable__cursorAction"></a>dbTable::_cursorAction(mode, usingIndex, actionFn)


```javascript

var prom = _promise();

var trans = this._db.transaction(this._table,  mode);
var store = trans.objectStore(this._table);
var cursorRequest;

if(usingIndex) {

    var singleKeyRange, indexName;
    
    // BUG or FEATURE: currently accepts only one key like
    // { folderName : "data" };
    for(var n in usingIndex) {
        if(usingIndex.hasOwnProperty(n)) {
             indexName = n; 
             singleKeyRange = IDBKeyRange.only(usingIndex[n]);
        }
    }
    
    if(indexName) {
        var index = store.index(indexName); // open using the index only
        cursorRequest = index.openCursor(singleKeyRange);
    } else {
        prom.reject("invalid index key");
        return;
    }
} else {
    cursorRequest = store.openCursor();
}

trans.oncomplete = function(evt) {  
    prom.resolve(true);
};

cursorRequest.onerror = function(error) {
    console.log(error);
};

cursorRequest.onsuccess = function(evt) {                    
    var cursor = evt.target.result;
    if (cursor) {
        actionFn(cursor);
        cursor.continue();
    }
};

return prom;
```

### <a name="dbTable_addRows"></a>dbTable::addRows(rows)


```javascript

var prom = _promise();

var transaction = this._db.transaction([this._table], "readwrite");

var me = this;
// Do something when all the data is added to the database.
transaction.oncomplete = function(event) {
  // console.log("Writing into "+me._table+" was successfull");
  prom.resolve(true);
};

transaction.onerror = function(event) {
  prom.reject(event);
};

var objectStore = transaction.objectStore(this._table);
for (var i in rows) {
  var request = objectStore.add(rows[i]);
  request.onsuccess = function(event) {
    // console.log("Row ",i," written succesfully");
  };
}

return prom;
```

### <a name="dbTable_clear"></a>dbTable::clear(t)


```javascript

var prom = _promise();
var transaction = this._db.transaction(this._table, "readwrite");
var objectStore = transaction.objectStore(this._table);
var request = objectStore.clear();
request.onerror = function(event) {
  prom.fail(event.target.errorCode);
};
request.onsuccess = function(event) {
  prom.resolve( true );
};

return prom;

```

### <a name="dbTable_count"></a>dbTable::count(t)


```javascript
var prom = _promise();
var transaction = this._db.transaction([this._table], "readonly");

transaction.objectStore(this._table).count().onsuccess = function(e) {
	prom.resolve(e.target.result);
};

return prom;

```

### <a name="dbTable_forEach"></a>dbTable::forEach(fn, usingIndex)


```javascript

return this._cursorAction("readonly", usingIndex, function(cursor) {
   fn(cursor.value, cursor);
});

```

### <a name="dbTable_get"></a>dbTable::get(key)


```javascript

var prom = _promise();
var transaction = this._db.transaction(this._table, "readonly");
var objectStore = transaction.objectStore(this._table);
var request = objectStore.get(key);

request.onerror = function(event) {
  // Handle errors!
  console.log("Could not get ", key);
  prom.fail(event.target.errorCode);
};
request.onsuccess = function(event) {
  prom.resolve( request.result );
};

return prom;
```

### <a name="dbTable_getAll"></a>dbTable::getAll(usingIndex)


```javascript

var items = [],
    me = this;

return _promise(
        function(result, fail) {
            me._cursorAction("readonly", usingIndex, function(cursor) {
               items.push(cursor.value); 
            }).then( function() {
                result(items);
            }).fail(fail);
        });

```

### dbTable::constructor( db, tableName )

```javascript

this._db = db;
this._table = tableName;

```
        
### <a name="dbTable_readAndDelete"></a>dbTable::readAndDelete(usingIndex)


```javascript
var items = [],
    me = this;

return _promise(
        function(result, fail) {
            me._cursorAction("readwrite", usingIndex, function(cursor) {
               items.push(cursor.value); 
               cursor.delete(); // remove the key and continue... 
            }).then( function() {
                result(items);
            }).fail(fail);
        });

```

### <a name="dbTable_remove"></a>dbTable::remove(usingIndex)
`usingIndex` optional : { keyName : valueString}
 


```javascript
var me = this;

return _promise(
        function(result, fail) {
            me._cursorAction("readwrite", usingIndex, function(cursor) {
               cursor.delete(); // remove the key and continue... 
            }).then( function() {
                result(true);
            }).fail(fail);
        });

```

### <a name="dbTable_update"></a>dbTable::update(key, data)


```javascript
var prom = _promise();
var me = this;
var transaction = this._db.transaction([this._table], "readwrite");
var objectStore = transaction.objectStore(this._table);
try {
    var request = objectStore.get(key);
    request.onerror = function(event) {
      if(!request.result) {
          me.addRows([data]).then( function() {
              prom.resolve(data);
          });
          return;
      }     
      prom.fail(event.target.errorCode);
    };
    request.onsuccess = function(event) {
      if(!request.result) {
          me.addRows([data]).then( function() {
              prom.resolve(data);
          });
          return;
      }
      var requestUpdate = objectStore.put(data);
      requestUpdate.onerror = function(event) {
         // Do something with the error
         prom.fail( "update failed " );
      };
      requestUpdate.onsuccess = function(event) {
         // Success - the data is updated!
         prom.resolve(data);
      };
      
    };
} catch(e) {
    return this.addRows( [data] );
}

return prom;
```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
    



      
    
      
    



      
    
      
            
# Class memoryFsFolder


The class has following internal singleton variables:
        
* fs
        
* myDir
        
* path
        
        
### <a name="memoryFsFolder__isFile"></a>memoryFsFolder::_isFile(fileName)


```javascript
var fold = this._pathObj;
if(typeof( fold[fileName] ) != "undefined" && !this.isObject(fold[fileName]) ) return true;
return false;
```

### <a name="memoryFsFolder__isFolder"></a>memoryFsFolder::_isFolder(name)


```javascript
var fold = this._pathObj;
if(typeof( fold[name] ) != "undefined" && this.isObject(fold[name]) ) return true;
return false;
```

### <a name="memoryFsFolder_appendFile"></a>memoryFsFolder::appendFile(fileName, data)


```javascript
var p, me = this;
return _promise(
    function(result, fail) {
        var fold = me._pathObj;

        if(typeof(data) != "string") {
            // can not write anything else than strings
            fail({result : false, text : "Only string writes are accepted"});
            return;
        }        
        
        if(me._isFile(fileName)) {
            fold[fileName] += data;
            result({result : true});
        } else {
            result({result : false, text:"File does not exist"});
        }
        
    } );

```

### <a name="memoryFsFolder_createDir"></a>memoryFsFolder::createDir(dirName)


```javascript
var p, me = this;
return _promise(
    function(result, fail) {
        var fold = me._pathObj;
        if(!me._isFile(dirName) && !me._isFolder(dirName)) {
            fold[dirName] = {};
        } else {
            fail({result : false, text : "Creating directory failed"});
            return;
        }
        result({result : true});
    } );
```

### <a name="memoryFsFolder_fromData"></a>memoryFsFolder::fromData(obj)


```javascript
var me = this;
//this._server = server;
//this._pathObj = pathObj;
return _promise(
    function(result, fail) {
        if(!me._pathObj) {
            me._pathObj = {};
        }
        var all = [];
        var myProm = _promise();
        
        for( var n in obj ) {
            if(me.isObject(obj[n])) {
                if(!me._pathObj[n] || !me._isFolder(n)) {
                    me._pathObj[n] = {};
                }              
                var po = memoryFsFolder( me._server, me._pathObj[n] );
                all.push( po.fromData( obj[n]) );
                
            } else {
                if(obj[n]===true) {
                    
                } else {
                    me._pathObj[n] = obj[n];
                }
            }
        }

        myProm.all( all ).then( function() {
            result(true);
        }).fail( fail );
        myProm.resolve(true);        
        
});

  

```

### <a name="memoryFsFolder_getSubFolderObj"></a>memoryFsFolder::getSubFolderObj(dirName)


```javascript

if(this.isObject( this._pathObj[dirName] ) ) {
    return memoryFsFolder( this._server, this._pathObj[dirName]);
}
```

### <a name="memoryFsFolder_getTree"></a>memoryFsFolder::getTree(t)


```javascript

var treePromise =  this.toData({ getData : false});

return treePromise;
```

### memoryFsFolder::constructor( server, pathObj )

```javascript

this._server = server;
this._pathObj = pathObj;

```
        
### <a name="memoryFsFolder_isFile"></a>memoryFsFolder::isFile(fileName)


```javascript
var p, me = this;
return _promise(
    function(result, fail) {
        result(me._isFile(fileName));
    } );
```

### <a name="memoryFsFolder_listFiles"></a>memoryFsFolder::listFiles(filter)


```javascript

var p, me = this;
return _promise(
    function(result, fail) {
        var fold = me._pathObj;
        var list = [];
        for( var n in fold) {
            if(me._isFile(n)) list.push(n);
        }
        result(list);
    } );


```

### <a name="memoryFsFolder_listFolders"></a>memoryFsFolder::listFolders(filter)


```javascript

var p, me = this;
return _promise(
    function(result, fail) {
        var fold = me._pathObj;
        var list = [];
        for( var n in fold) {
            if(me._isFolder(n)) list.push(n);
        }
        result(list);
    } );
```

### <a name="memoryFsFolder_readFile"></a>memoryFsFolder::readFile(fileName, fn)


```javascript
var p, me = this;
return _promise(
    function(result, fail) {
        var fold = me._pathObj;
        if(me._isFile(fileName)) {
            result( fold[fileName]);
            return;
        }
        fail("File does not exist");
        
    } );

```

### <a name="memoryFsFolder_removeFile"></a>memoryFsFolder::removeFile(fileName)


```javascript
var p, me = this;
return _promise(
    function(result, fail) {
        var fold = me._pathObj;
        if(me._isFile(fileName)) {
            delete fold[fileName];
        } 
        result({result : true});
    } );

```

### <a name="memoryFsFolder_toData"></a>memoryFsFolder::toData(options, notUsed)


```javascript
var _rootDir = this._rootDir;
var me = this;

var options = options || {};

var fileFilter = options.fileFilter,
    dirFilter = options.dirFilter;

if(typeof( options.getData ) == "undefined" ) options.getData = true;

return _promise(
    function(result, fail) {
        
        var o = {};
        me.listFiles().then( function(list) {
            var cnt = list.length, done = 0,
                waiting = _promise();
            list.forEach(function(n) {
                if(fileFilter) {
                    if(!fileFilter(n)) {
                        done++;
                        if(done==cnt) waiting.resolve(true);       
                        return;
                    }
                }
                if(options.getData) {
                    me.readFile(n).then( function(data) {
                        o[n] = data;
                        done++;
                        if(done==cnt) waiting.resolve(true);
                    });
                } else {
                    o[n] = true;
                    done++;
                    if(done==cnt) waiting.resolve(true);                    
                }
            });
            if(cnt==0) waiting.resolve(true);
            return waiting;
        }).then( function() {
            return me.listFolders();
        }).then( function(list) {
            var cnt = list.length, done = 0,
                waiting = _promise();
            list.forEach(function(dirName) {
                if(dirFilter) {
                    if(!dirFilter(dirName)) {
                        done++;
                        if(done==cnt) waiting.resolve(true);     
                        return;
                    }
                }                
                var newF = me.getSubFolderObj(dirName);
                newF.toData(fileFilter, dirFilter).then( function(data) {
                    o[dirName] = data;
                    done++;
                    if(done==cnt) waiting.resolve(true);
                });
            });
            if(cnt==0) waiting.resolve(true);
            return waiting;            
        }).then( function() {
            result( o );  
        }).fail( function() {
            result({}); 
        });
});
```

### <a name="memoryFsFolder_writeFile"></a>memoryFsFolder::writeFile(fileName, fileData)


```javascript
var p, me = this;
return _promise(
    function(result, fail) {
        var fold = me._pathObj;
        if(typeof(fileData) != "string") {
            // can not write anything else than strings
            fail({result : false, text : "Only string writes are accepted"});
            return;
        }
        if(!me._isFolder(fileName)) {
            fold[fileName] = fileData;
        } else {
            fail({result : false, text : "Modifying the file failed"});
            return;
        }
        result({result : true});
    } );

```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
    



      
    
      
            
# Class fsServerMemory


The class has following internal singleton variables:
        
* _servers
        
        
### <a name="fsServerMemory__initServers"></a>fsServerMemory::_initServers(t)


```javascript
if(!_servers) {
    _servers = {};
}
```

### <a name="fsServerMemory__objectAtPath"></a>fsServerMemory::_objectAtPath(path, data)


```javascript

if(!path) return;

var arr = path.split("/");
if(!data) data = this._fsData;

if(path.charAt(0)=="/") arr.unshift();

var lastObj = data, lastName = path;

// The result has the object, name, type...
var res = {
    obj :  null,
    name : "",
    type : ""
};

while(arr.length>0) {
    
    var pathName = arr.shift();
    if(pathName.length==0) break;
    
    if(data.data) {
        
        // Then we go to the parent model...
        if(pathName=="..") {
            var pObj = this._find(data.__p);
            if(pObj) {
                data = pObj;
                lastObj = data;
                continue;
            } else {
                res.obj == null;
                return res;
            }
        }
        
        var sub = data.data[pathName];
        if(typeof(sub)=="undefined") {
            res.obj == null;
            return res;            
        } else {
            if(this.isObject(sub)) {
                res.obj = sub;
                res.type = "obj";
                res.name = null;
                data = sub;
                if(this.isArray) res.type = "array";
            } else {
                res.obj  = data;
                res.name = pathName;
            }
        }
    }
}
return res;
```

### <a name="fsServerMemory_createFrom"></a>fsServerMemory::createFrom(obj)


```javascript

```

### <a name="fsServerMemory_getRootFolder"></a>fsServerMemory::getRootFolder(t)


```javascript
var me = this;
return _promise(
    function(result) {
        result( memoryFsFolder( me, me._fsData ) );
    });

```

### fsServerMemory::constructor( serverName, createFrom )

```javascript
// The format of the filesystem description
/*

// The directory informatin, the data can be object or it can be string
// Type : 1 = file
// Type : 2 = directory

// Example of a directory entry
{
    
    data : {
        file1 : {
            data : "The file data",
            _type : 1,
            _acl : ""
        }
    },
    _type : 2,
    _acl : "string of the ACL data"
}

// Example of a file entry
{
    data : "String contents of the file",
    _type : 1,
    _birthtime: 1435487618,
    _atime : 1435487618,
    _mtime : 1435487618,
    _ctime : 1435487618,
    _owner : "userid",
    _group : "groupid",
    _size : 232,
    _acl : "string of the ACL data"
}


*/
this._serverName = serverName;
this._initServers();

this._fsData = createFrom;

```
        
### <a name="fsServerMemory_openDir"></a>fsServerMemory::openDir(pathString)


```javascript

// search the path...
```



   


   



      
    
      
            
# Class nodeFsFolder


The class has following internal singleton variables:
        
* fs
        
* myDir
        
* path
        
        
### <a name="nodeFsFolder__mkDir"></a>nodeFsFolder::_mkDir(dirName)


```javascript
if(!fs.existsSync(dirName)) {
  fs.mkdirSync(dirName, 502, function(err){});   
}    
```

### <a name="nodeFsFolder_appendFile"></a>nodeFsFolder::appendFile(fileName, data, fn)


```javascript
var _rootDir = this._rootDir;
var me = this;

return _promise(
    function(result, fail) {

        if(typeof(data) != "string") {
            // can not write anything else than strings
            fail({result : false, text : "Only string writes are accepted"});
            return;
        }         
        fileName = path.basename(fileName);
        var filePath = _rootDir+"/"+fileName;
        
        fs.appendFile(filePath, data, function (err) {
            if (err) {
               fail( err );
               return;
            }
            result({result:true, text:"File written"});            
        });
    });
```

### <a name="nodeFsFolder_createDir"></a>nodeFsFolder::createDir(dirName)


```javascript

var _rootDir = this._rootDir;
var me = this;

return _promise(
    function(result, fail) {
        // TODO: Should check if the directory is really under this diretory
        // basname is trying to normalize, but should be tested.
        var dirN = path.basename(dirName);
        me._mkDir(_rootDir + "/" +dirN); 
        result({result:true, text:"Directory created"});
    });

```

### <a name="nodeFsFolder_fromData"></a>nodeFsFolder::fromData(obj)


```javascript

// Create new directories...
var me = this;
var _rootDir = this._rootDir;

return _promise(
    function(result, fail) {
        var all = [];
        var myProm = _promise();
        
        for(var n in obj ) {
            
            if(n.indexOf("..") >=0) {
                fail(".. symbol is not allowed in the file or path names");
                return;
            }
            
            var name = path.basename(n);
            if(me.isObject(obj[name])) {
                ( function() { 
                    var dirDone = _promise();
                    all.push(dirDone);
                    me.createDir(name)
                        .then( function() {
                            var newF = me.getSubFolderObj(name);
                            return newF.fromData( obj[name] );
                        })
                        .then( function() {
                            dirDone.resolve();
                        })
                        .fail( function() {
                            dirDone.resolve();
                        });
                }());
            } else {
                if(typeof(obj[name]) == "string") {                
                    all.push( me.writeFile( name, obj[name] ));
                }
            }
        }        
        myProm.all( all ).then( function() {
            result(true);
        }).fail( fail );
        myProm.resolve(true);
    });



```

### <a name="nodeFsFolder_getSubFolderObj"></a>nodeFsFolder::getSubFolderObj(dirName)


```javascript
return nodeFsFolder(this._rootDir+"/"+dirName);
```

### <a name="nodeFsFolder_getTree"></a>nodeFsFolder::getTree(t)


```javascript
return this.toData({ getData : false});
```

### nodeFsFolder::constructor( dirName )

```javascript
this._rootDir = dirName;

if(!dirName) {
    throw " The directory must be specified ";
    return;
}

if(!fs) {
    fs = require('fs');
    path = require('path');
}

```
        
### <a name="nodeFsFolder_isFile"></a>nodeFsFolder::isFile(fileName)


```javascript

var _rootDir = this._rootDir;
var me = this;

return _promise(
    function(result, fail) {
        fileName = path.basename(fileName);

       fs.stat(_rootDir+"/"+fileName, function(err,stats){
         if(err || !stats.isFile()) result(false);
         result(true);
       });        
 
    });
```

### <a name="nodeFsFolder_listFiles"></a>nodeFsFolder::listFiles(filter)


```javascript
var _rootDir = this._rootDir;
var me = this;

return _promise(
    function(result, fail) {
        // Then we list the directory's file here...
        fs.readdir(_rootDir, function(err,files) {
            if(err) {
                fail(err);
                return;
            }
            
            var cnt = files.length, list = [];
            if(cnt==0) result(list);
            
            files.forEach( function(file) {
               fs.stat(_rootDir+"/"+file, function(err,stats){
                 // stats.isDirectory() would be alternative
                 if(!err && stats.isFile()) list.push( file );
                 cnt--;
                 if(cnt==0) result(list);
              });
            });
            
        });
});

```

### <a name="nodeFsFolder_listFolders"></a>nodeFsFolder::listFolders(filter)


```javascript
var _rootDir = this._rootDir;
var me = this;

return _promise(
    function(result, fail) {
        // Then we list the directory's file here...
        fs.readdir(_rootDir, function(err,files) {
            
            console.log(files);
            if(err) {
                fail(err);
                return;
            }
            
            var cnt = files.length, list = [];
            if(cnt==0) result(list);
            
            files.forEach( function(file) {
               fs.stat(_rootDir+"/"+file, function(err,stats){
                 // stats.isFiles() would be alternative
                 if(!err && stats.isDirectory()) {
                     console.log("Dir "+file);
                     list.push( file );
                 }
                 cnt--;
                 if(cnt==0) {
                    console.log("Cnt == 0");
                    result(list);
                 }
              });
            });
            
        });
});
```

### <a name="nodeFsFolder_readFile"></a>nodeFsFolder::readFile(fileName, fn)


```javascript
var _rootDir = this._rootDir;
var me = this;

return _promise(
    function(result, fail) {
        fileName = path.basename(fileName);
        fs.readFile(_rootDir+"/"+fileName, 'utf8', function (err, data) {
            if (err) {
               fail( err );
               return;
            }
            result( data );
        });
});
```

### <a name="nodeFsFolder_toData"></a>nodeFsFolder::toData(options, notUsed)


```javascript
var _rootDir = this._rootDir;
var me = this;

var options = options || {};

var fileFilter = options.fileFilter,
    dirFilter = options.dirFilter;

if(typeof( options.getData ) == "undefined" ) options.getData = true;

return _promise(
    function(result, fail) {
        
        var o = {};
        me.listFiles().then( function(list) {
            var cnt = list.length, done = 0,
                waiting = _promise();
            list.forEach(function(n) {
                if(fileFilter) {
                    if(!fileFilter(n)) {
                        done++;
                        if(done==cnt) waiting.resolve(true);       
                        return;
                    }
                }
                if(options.getData) {
                    me.readFile(n).then( function(data) {
                        o[n] = data;
                        done++;
                        if(done==cnt) waiting.resolve(true);
                    });
                } else {
                    o[n] = true;
                    done++;
                    if(done==cnt) waiting.resolve(true);                    
                }
            });
            if(cnt==0) waiting.resolve(true);
            return waiting;
        }).then( function() {
            return me.listFolders();
        }).then( function(list) {
            var cnt = list.length, done = 0,
                waiting = _promise();
            list.forEach(function(dirName) {
                if(dirFilter) {
                    if(!dirFilter(dirName)) {
                        done++;
                        if(done==cnt) waiting.resolve(true);     
                        return;
                    }
                }                
                var newF = me.getSubFolderObj(dirName);
                newF.toData(fileFilter, dirFilter).then( function(data) {
                    o[dirName] = data;
                    done++;
                    if(done==cnt) waiting.resolve(true);
                });
            });
            if(cnt==0) waiting.resolve(true);
            return waiting;            
        }).then( function() {
            result( o );  
        }).fail( function() {
            result({}); 
        });
});
```

### <a name="nodeFsFolder_writeFile"></a>nodeFsFolder::writeFile(fileName, fileData, fn)


```javascript
var _rootDir = this._rootDir;
var me = this;

return _promise(
    function(result, fail) {
        
        if(typeof(fileData) != "string") {
            // can not write anything else than strings
            fail({result : false, text : "Only string writes are accepted"});
            return;
        } 
        
        fileName = path.basename(fileName);
        fs.writeFile(_rootDir+"/"+fileName, fileData, function (err, data) {
            if (err) {
               fail( err );
               return;
            }
            result({result:true, text:"File written"});
        });
});

```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
    



      
    
      
            
# Class indexedDBFsFolder


The class has following internal singleton variables:
        
* _instances
        
        
### <a name="indexedDBFsFolder__classFactory"></a>indexedDBFsFolder::_classFactory(server, pathString)


```javascript

var id = server.getID()+pathString;

if(!_instances) {
    _instances = {};
}

if(_instances[id]) {
    return _instances[id];
} else {
    _instances[id] = this;
}
```

### <a name="indexedDBFsFolder__filePath"></a>indexedDBFsFolder::_filePath(fileName)

Simple helper, Later this function might be doing checking for duplicate // or similar mistakes in the path name
```javascript

var str = this._path+"/"+fileName;
str = str.replace("//", "/");
return str;
```

### <a name="indexedDBFsFolder__isFile"></a>indexedDBFsFolder::_isFile(fileName)


```javascript
var me = this;
return _promise(
    function(result, failure) {
        me._loadFiles().then(function(list) {
            for(var i=0; i<list.length;i++) {
                if(list[i].name==fileName) {
                    result(true);
                    return;
                }
            }             
            result(false);
         }).fail( failure );
    });
```

### <a name="indexedDBFsFolder__isFolder"></a>indexedDBFsFolder::_isFolder(name)


```javascript
var me = this;
return _promise(
    function(result, failure) {
        name = me._normalize( me._path + "/" + name+"/");
        me._loadFolders().then(function(list) {
            for(var i=0; i<list.length;i++) {
                if(list[i].name==name) {
                    result(true);
                    return;
                }
            }             
            result(false);
         }).fail( failure );
    });
```

### <a name="indexedDBFsFolder__lastPath"></a>indexedDBFsFolder::_lastPath(str)


```javascript

var parts = str.split("/");

var str = parts.pop();
while(parts.length > 0 ) {
    if(str.length>0) return str;
    str = parts.pop();
}
return str;
```

### <a name="indexedDBFsFolder__loadFiles"></a>indexedDBFsFolder::_loadFiles(t)


```javascript

var local = this._db,
    me = this;
    
return _promise(
    function(result) {
        
        /*
        if(me._fileCache) {
            result(me._fileCache);
        }*/
        
        me._server.then( function() {
            local.table("files").getAll({folderName:me._path}).then( function(res) {
                me._fileCache = res;
                result(me._fileCache);
            });    
        });
    });
```

### <a name="indexedDBFsFolder__loadFolders"></a>indexedDBFsFolder::_loadFolders(t)


```javascript
var local = this._db,
    me = this;
    
return _promise(
    function(result) {
        /*
        if(me._folderCache) {
            result(me._folderCache);
        }*/

        me._server.then( function() {
            local.table("folders").getAll({parentFolder:me._path}).then( function(res) {
                me._folderCache = res;
                result(me._folderCache);
            });    
        });
    });
```

### <a name="indexedDBFsFolder__normalize"></a>indexedDBFsFolder::_normalize(pathName)


```javascript
var str = pathName.replace("//", "/");
return str;
```

### <a name="indexedDBFsFolder__removeFileFromCache"></a>indexedDBFsFolder::_removeFileFromCache(fileName)


```javascript
if(this._fileCache) {
    for(var i=0; i<this._fileCache.length; i++) {
        if(this._fileCache[i].name == fileName) {
            this._fileCache.splice(i,1);
            return;
        }
    }
}
```

### <a name="indexedDBFsFolder__removeFolderFromCache"></a>indexedDBFsFolder::_removeFolderFromCache(name)


```javascript
if(this._folderCache) {
    for(var i=0; i<this._fileCache.length; i++) {
        if(this._folderCache[i].name == name) {
            this._folderCache.splice(i,1);
            return;
        }
    }
}
```

### <a name="indexedDBFsFolder_appendFile"></a>indexedDBFsFolder::appendFile(fileName, data)


```javascript

var p, me = this;
var local = this._db,
    server = this._server;

return _promise(
    function(result, fail) {
        
        if(typeof(data) != "string") {
            // can not write anything else than strings
            fail({result : false, text : "Only string writes are accepted"});
            return;
        }   

        server.then( function() {
            return me._isFile( fileName );
        }).then( function(isFile) {
            if(!isFile) {
                return local.table("files").addRows([
                    { name : fileName, folderName : me._path }
                ]);
            } else {
                return "OK";
            } 
        }).then( function() {
            return local.table("fileWrites").addRows([{filePath : me._filePath(fileName), data : data }]);
        }).then( function() {
            // all should be ready...
            result({result : true, text : "file "+fileName+" written"});
        }).fail(fail);

    } );    

```

### <a name="indexedDBFsFolder_createDir"></a>indexedDBFsFolder::createDir(dirName)


```javascript
var p, me = this;
var local = this._db,
    server = this._server;

return _promise(
    function(result, fail) {

        server.then( function() {
            return me._isFolder( dirName );
        }).then( function(isFolder) {
            if(!isFolder) {
                var row = { name : me._normalize( me._path+dirName+"/" ), parentFolder : me._path };
                return local.table("folders").addRows([row]);
            } else {
                return "OK";
            } 
        }).then( function() {
            
            result({result : true, text : "folder "+dirName+" created"});
        }).fail(fail);

    } );
```

### <a name="indexedDBFsFolder_fromData"></a>indexedDBFsFolder::fromData(obj)


```javascript

// Create new directories...
var me = this;
var local = this._db,
    server = this._server;

return _promise(
    function(result, fail) {
        var all = [];
        var myProm = _promise();
        
        server.then(
            function() {
                for(var n in obj ) {
                    
                    if(n.indexOf("..") >=0) {
                        fail(".. symbol is not allowed in the file or path names");
                        return;
                    }
                    
                    var name = a;
                    if(me.isObject(obj[name])) {
                        ( function() { 
                            var dirDone = _promise();
                            all.push(dirDone);
                            me.createDir(name)
                                .then( function() {
                                    var newF = me.getSubFolderObj(name);
                                    return newF.fromData( obj[name] );
                                })
                                .then( function() {
                                    dirDone.resolve();
                                })
                                .fail( function() {
                                    dirDone.resolve();
                                });
                        }());
                    } else {
                        if(typeof(obj[name]) == "string") {                
                            all.push( me.writeFile( name, obj[name] ));
                        }
                    }
                }        
                myProm.all( all ).then( function() {
                    result(true);
                }).fail( fail );
                myProm.resolve(true);                
            });

    });



```

### <a name="indexedDBFsFolder_getSubFolderObj"></a>indexedDBFsFolder::getSubFolderObj(dirName)


```javascript

var subPath = this._normalize( this._path+dirName+"/" );
return indexedDBFsFolder( this._server, subPath );

```

### <a name="indexedDBFsFolder_getTree"></a>indexedDBFsFolder::getTree(t)


```javascript

var treePromise =  this.toData({ getData : false});

return treePromise;
```

### indexedDBFsFolder::constructor( server, pathString )

```javascript


this._server  = server;
this._path = pathString;
this._db = server.getDb();


```
        
### <a name="indexedDBFsFolder_isFile"></a>indexedDBFsFolder::isFile(fileName)


```javascript
var p, me = this;
return _promise(
    function(result, fail) {
        result(me._isFile(fileName));
    } );
```

### <a name="indexedDBFsFolder_listFiles"></a>indexedDBFsFolder::listFiles(filter)


```javascript

var p, me = this;
var local = this._db,
    server = this._server;

return _promise(
    function(result, fail) {
        server.then( function() {
            me._loadFiles().then( function(list) {
                var res = [];
                list.forEach( function(data) {
                    res.push(data.name);
                })
                result(res);
            })
        }).fail(fail);
    });


```

### <a name="indexedDBFsFolder_listFolders"></a>indexedDBFsFolder::listFolders(filter)


```javascript
var p, me = this;
var local = this._db,
    server = this._server;

return _promise(
    function(result, fail) {
        server.then( function() {
            me._loadFolders().then( function(list) {
                var res = [];
                list.forEach( function(data) {
                    res.push(data.name);
                })
                result(res);
            })
        }).fail(fail);
    });
```

### <a name="indexedDBFsFolder_readFile"></a>indexedDBFsFolder::readFile(fileName, notUsed)


```javascript
var p, me = this;
var local = this._db,
    server = this._server;

return _promise(
    function(result, fail) {

        server.then( function() {
            return me._isFile( fileName );
        }).then( function(isFile) {
            if(!isFile) {
                throw "The file does not exist";
            } else {
                return "OK";
            } 
        }).then( function() {
            // remove the old write from the file table
            return local.table("fileWrites").getAll({filePath : me._filePath(fileName) });
        }).then( function(list) {
            var str = "";
            list.forEach( function(write) {
                str+=write.data;
            })
            result(str);
        }).fail(fail);

    } );
```

### <a name="indexedDBFsFolder_removeFile"></a>indexedDBFsFolder::removeFile(fileName)


```javascript
var p, me = this;
var local = this._db,
    server = this._server;

return _promise(
    function(result, fail) {
    
        var bIsFile = false;
        server.then( function() {
            return me._isFile( fileName );
        }).then( function(isFile) {
            bIsFile = isFile;
            if(!isFile) {
                return "OK";
            } else {
                return local.table("fileWrites").remove({filePath : me._filePath(fileName) });
            } 
        }).then( function() {
            if(bIsFile) {
                // {name: "README.TXT", folderName: "/"}
                return local.table("files")._cursorAction("readwrite", {folderName : me._path }, 
                    function(cursor) {
                        var data = cursor.value;
                        if(data.name==fileName) {
                            cursor.delete(); // remove the file if
                            me._removeFileFromCache(fileName);
                        }
                    }
                )
            } else {
                return "OK";
            } 
        }).then( function() {
            // all should be ready...
            result({result : true, text : "file "+fileName+" removed"});
        }).fail(fail);

    } );


```

### <a name="indexedDBFsFolder_toData"></a>indexedDBFsFolder::toData(options, notUsed)


```javascript

var me = this;

var options = options || {};

var fileFilter = options.fileFilter,
    dirFilter = options.dirFilter;

if(typeof( options.getData ) == "undefined" ) options.getData = true;

return _promise(
    function(result, fail) {
        
        var o = {};
        me.listFiles().then( function(list) {
            var cnt = list.length, done = 0,
                waiting = _promise();
            
            list.forEach(function(n) {
                if(fileFilter) {
                    if(!fileFilter(n)) {
                        done++;
                        if(done==cnt) waiting.resolve(true);       
                        return;
                    }
                }
                if(options.getData) {
                    me.readFile(n).then( function(data) {
                        o[n] = data;
                        done++;
                        if(done==cnt) waiting.resolve(true);
                    });
                } else {
                    o[n] = true;
                    done++;
                    if(done==cnt) waiting.resolve(true);                    
                }
            });
            if(cnt==0) waiting.resolve(true);
            return waiting;
        }).then( function() {
            return me.listFolders();
        }).then( function(list) {
            var cnt = list.length, done = 0,
                waiting = _promise();
            list.forEach(function(dirName) {
                if(dirFilter) {
                    if(!dirFilter(dirName)) {
                        done++;
                        if(done==cnt) waiting.resolve(true);     
                        return;
                    }
                }             
                var subName = me._lastPath(dirName);
                var newF = me.getSubFolderObj(subName);
                newF.toData(fileFilter, dirFilter).then( function(data) {
                    o[subName] = data;
                    done++;
                    if(done==cnt) waiting.resolve(true);
                });
            });
            if(cnt==0) waiting.resolve(true);
            return waiting;            
        }).then( function() {
            result( o );  
        }).fail( function() {
            result({}); 
        });
});
```

### <a name="indexedDBFsFolder_writeFile"></a>indexedDBFsFolder::writeFile(fileName, fileData)


```javascript
var p, me = this;
var local = this._db,
    server = this._server;

return _promise(
    function(result, fail) {
        
        if(typeof(fileData) != "string") {
            // can not write anything else than strings
            fail({result : false, text : "Only string writes are accepted"});
            return;
        }

        server.then( function() {
            return me._isFile( fileName );
        }).then( function(isFile) {
            if(!isFile) {
                return local.table("files").addRows([
                    { name : fileName, folderName : me._path }
                ]);
            } else {
                return "OK";
            } 
        }).then( function() {
            // remove the old write from the file table
            return local.table("fileWrites").remove({filePath : me._filePath(fileName) });
        }).then( function() {
            return local.table("fileWrites").addRows([{filePath : me._filePath(fileName), data : fileData }]);
        }).then( function() {
            // all should be ready...
            result({result : true, text : "file "+fileName+" written"});
        }).fail(fail);

    } );

```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
    



      
    
      
            
# Class fsServerIndexedDB


The class has following internal singleton variables:
        
* _instances
        
        
### <a name="fsServerIndexedDB__classFactory"></a>fsServerIndexedDB::_classFactory(id)


```javascript
if(!_instances) {
    _instances = {};
}

if(_instances[id]) {
    return _instances[id];
} else {
    _instances[id] = this;
}
```

### <a name="fsServerIndexedDB_createFrom"></a>fsServerIndexedDB::createFrom(t)


```javascript

```

### <a name="fsServerIndexedDB_getDb"></a>fsServerIndexedDB::getDb(t)


```javascript
return this._db;
```

### <a name="fsServerIndexedDB_getID"></a>fsServerIndexedDB::getID(t)

UUID for the server
```javascript

if(!this._id) {
    this._id = this.guid();
}
return this._id;
```

### <a name="fsServerIndexedDB_getRootFolder"></a>fsServerIndexedDB::getRootFolder(t)


```javascript


return indexedDBFsFolder(this, "/");
```

### fsServerIndexedDB::constructor( serverName, createFrom )
the database i&quot;vserver://&quot;+serverName
```javascript

var me = this;
this._serverName = serverName;
this._dbName = "vserver://"+serverName;
this._db = _localDB(this._dbName,
    {
        tables : {
            folders : {
                createOptions : { keyPath : "name" },
                indexes : {
                    parentFolder : { unique: false }
                }
            },
            files : {
                createOptions : { autoIncrement : true  },
                indexes : {
                    folderName : { unique: false }
                }
            },
            fileWrites : {
                createOptions : { autoIncrement : true  },
                indexes : {
                    filePath : { unique: false }
                }                
            }
        }
    });
  
// make sure that there is at least the root folder ...
this._db.then( function() {
    me._db.table("folders").count().then( function(cnt) {
        if(cnt >= 1) {
            
            me.resolve(true);
        } else {
            
            me._db.table("folders").addRows([{name:"/"}]).then( function() {
                 me.resolve(true); // the root has been inserted
            });
        }
    });
})  

```
        


   
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

```

### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript
return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript
return t === Object(t);
```


    
    


   
      
    



      
    




