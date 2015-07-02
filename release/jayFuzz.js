// The code template begins here
'use strict';

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var localFs_prototype = function localFs_prototype() {
    // Then create the traits and subclasses for this class here...

    // the subclass definition comes around here then

    // The class definition is here...
    var _promise_prototype = function _promise_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float someVar
         */
        _myTrait_.isArray = function (someVar) {
          return Object.prototype.toString.call(someVar) === '[object Array]';
        };

        /**
         * @param Function fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param Object obj
         */
        _myTrait_.isObject = function (obj) {
          return obj === Object(obj);
        };
      })(this);

      // the subclass definition comes around here then

      // The class definition is here...
      var later_prototype = function later_prototype() {
        // Then create the traits and subclasses for this class here...

        (function (_myTrait_) {
          var _initDone;
          var _callers;
          var _oneTimers;
          var _everies;
          var _framers;

          // Initialize static variables here...

          /**
           * @param function fn
           * @param float thisObj
           * @param float args
           */
          _myTrait_.add = function (fn, thisObj, args) {
            if (thisObj || args) {
              var tArgs;
              if (Object.prototype.toString.call(args) === '[object Array]') {
                tArgs = args;
              } else {
                tArgs = Array.prototype.slice.call(arguments, 2);
                if (!tArgs) tArgs = [];
              }
              _callers.push([thisObj, fn, tArgs]);
            } else {
              _callers.push(fn);
            }
          };

          /**
           * @param float seconds
           * @param float fn
           * @param float name
           */
          _myTrait_.after = function (seconds, fn, name) {

            if (!name) {
              name = 'time' + new Date().getTime() + Math.random(10000000);
            }

            _everies[name] = {
              step: Math.floor(seconds * 1000),
              fn: fn,
              nextTime: 0,
              remove: true
            };
          };

          /**
           * @param function fn
           */
          _myTrait_.asap = function (fn) {
            this.add(fn);
          };

          /**
           * @param float seconds
           * @param float fn
           * @param float name
           */
          _myTrait_.every = function (seconds, fn, name) {

            if (!name) {
              name = 'time' + new Date().getTime() + Math.random(10000000);
            }

            _everies[name] = {
              step: Math.floor(seconds * 1000),
              fn: fn,
              nextTime: 0
            };
          };

          if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
          if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
          _myTrait_.__traitInit.push(function (interval, fn) {
            if (!_initDone) {

              this.polyfill();

              var frame, cancelFrame;
              if (typeof window != 'undefined') {
                var frame = window['requestAnimationFrame'],
                    cancelFrame = window['cancelRequestAnimationFrame'];
                ['', 'ms', 'moz', 'webkit', 'o'].forEach(function (x) {
                  if (!frame) {
                    frame = window[x + 'RequestAnimationFrame'];
                    cancelFrame = window[x + 'CancelAnimationFrame'] || window[x + 'CancelRequestAnimationFrame'];
                  }
                });
              }

              if (!frame) frame = function (cb) {
                return setTimeout(cb, 16);
              };

              if (!cancelFrame) cancelFrame = function (id) {
                clearTimeout(id);
              };

              _callers = [];
              _oneTimers = {};
              _everies = {};
              _framers = [];
              var lastMs = 0;

              var _callQueQue = function _callQueQue() {
                var ms = new Date().getTime();
                var fn;
                while (fn = _callers.shift()) {
                  if (Object.prototype.toString.call(fn) === '[object Array]') {
                    fn[1].apply(fn[0], fn[2]);
                  } else {
                    fn();
                  }
                }

                for (var i = 0; i < _framers.length; i++) {
                  var fFn = _framers[i];
                  fFn();
                }

                for (var n in _oneTimers) {
                  if (_oneTimers.hasOwnProperty(n)) {
                    var v = _oneTimers[n];
                    v[0](v[1]);
                    delete _oneTimers[n];
                  }
                }

                for (var n in _everies) {
                  if (_everies.hasOwnProperty(n)) {
                    var v = _everies[n];
                    if (v.nextTime < ms) {
                      if (v.remove) {
                        if (v.nextTime > 0) {
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
                    if (v.until) {
                      if (v.until < ms) {
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
          });

          /**
           * @param  key
           * @param float fn
           * @param float value
           */
          _myTrait_.once = function (key, fn, value) {
            // _oneTimers

            _oneTimers[key] = [fn, value];
          };

          /**
           * @param function fn
           */
          _myTrait_.onFrame = function (fn) {

            _framers.push(fn);
          };

          /**
           * @param float t
           */
          _myTrait_.polyfill = function (t) {};

          /**
           * @param float fn
           */
          _myTrait_.removeFrameFn = function (fn) {

            var i = _framers.indexOf(fn);
            if (i >= 0) {
              if (fn._onRemove) {
                fn._onRemove();
              }
              _framers.splice(i, 1);
              return true;
            } else {
              return false;
            }
          };
        })(this);
      };

      var later = function later(a, b, c, d, e, f, g, h) {
        var m = this,
            res;
        if (m instanceof later) {
          var args = [a, b, c, d, e, f, g, h];
          if (m.__factoryClass) {
            m.__factoryClass.forEach(function (initF) {
              res = initF.apply(m, args);
            });
            if (typeof res == 'function') {
              if (res._classInfo.name != later._classInfo.name) return new res(a, b, c, d, e, f, g, h);
            } else {
              if (res) return res;
            }
          }
          if (m.__traitInit) {
            m.__traitInit.forEach(function (initF) {
              initF.apply(m, args);
            });
          } else {
            if (typeof m.init == 'function') m.init.apply(m, args);
          }
        } else return new later(a, b, c, d, e, f, g, h);
      };
      // inheritance is here

      later._classInfo = {
        name: 'later'
      };
      later.prototype = new later_prototype();

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param Array firstArg
         */
        _myTrait_.all = function (firstArg) {

          var args;
          if (this.isArray(firstArg)) {
            args = firstArg;
          } else {
            args = Array.prototype.slice.call(arguments, 0);
          }
          // console.log(args);
          var targetLen = args.length,
              rCnt = 0,
              myPromises = [],
              myResults = new Array(targetLen);

          return this.then(function () {

            var allPromise = _promise();
            if (args.length == 0) {
              allPromise.resolve([]);
            }
            args.forEach(function (b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function (v) {
                  myResults[index] = v;
                  rCnt++;
                  if (rCnt == targetLen) {

                    allPromise.resolve(myResults);
                  }
                }, function (v) {
                  allPromise.reject(v);
                });
              } else {
                allPromise.reject('Not list of promises');
              }
            });

            return allPromise;
          });
        };

        /**
         * @param function collectFn
         * @param array promiseList
         * @param Object results
         */
        _myTrait_.collect = function (collectFn, promiseList, results) {

          var args;
          if (this.isArray(promiseList)) {
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

          return this.then(function () {

            var allPromise = _promise();
            args.forEach(function (b, index) {
              if (b.then) {
                // console.log("All, looking for ", b, " state = ", b._state);
                myPromises.push(b);

                b.then(function (v) {
                  rCnt++;
                  isReady = collectFn(v, myResults);
                  if (isReady && !noMore || noMore == false && targetLen == rCnt) {
                    allPromise.resolve(myResults);
                    noMore = true;
                  }
                }, function (v) {
                  allPromise.reject(v);
                });
              } else {
                allPromise.reject('Not list of promises');
              }
            });

            return allPromise;
          });
        };

        /**
         * @param function fn
         */
        _myTrait_.fail = function (fn) {
          return this.then(null, fn);
        };

        /**
         * @param float withValue
         */
        _myTrait_.fulfill = function (withValue) {
          // if(this._fulfilled || this._rejected) return;

          if (this._rejected) return;
          if (this._fulfilled && withValue != this._stateValue) {
            return;
          }

          var me = this;
          this._fulfilled = true;
          this._stateValue = withValue;

          var chCnt = this._childPromises.length;

          while (chCnt--) {
            var p = this._childPromises.shift();
            if (p._onFulfill) {
              try {
                var x = p._onFulfill(withValue);
                // console.log("Returned ",x);
                if (typeof x != 'undefined') {
                  p.resolve(x);
                } else {
                  p.fulfill(withValue);
                }
              } catch (e) {
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
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (onFulfilled, onRejected) {
          // 0 = pending
          // 1 = fullfilled
          // 2 = error

          this._state = 0;
          this._stateValue = null;
          this._isAPromise = true;
          this._childPromises = [];

          if (this.isFunction(onFulfilled)) this._onFulfill = onFulfilled;
          if (this.isFunction(onRejected)) this._onReject = onRejected;

          if (!onRejected && this.isFunction(onFulfilled)) {

            var me = this;
            later().asap(function () {
              onFulfilled(function (v) {
                me.resolve(v);
              }, function (v) {
                me.reject(v);
              });
            });
          }
        });

        /**
         * @param float t
         */
        _myTrait_.isFulfilled = function (t) {
          return this._state == 1;
        };

        /**
         * @param float t
         */
        _myTrait_.isPending = function (t) {
          return this._state == 0;
        };

        /**
         * @param bool v
         */
        _myTrait_.isRejected = function (v) {
          return this._state == 2;
        };

        /**
         * @param function fn
         */
        _myTrait_.onStateChange = function (fn) {

          if (!this._listeners) this._listeners = [];

          this._listeners.push(fn);
        };

        /**
         * @param Object withReason
         */
        _myTrait_.reject = function (withReason) {

          // if(this._rejected || this._fulfilled) return;

          // conso

          if (this._fulfilled) return;
          if (this._rejected && withReason != this._rejectReason) return;

          this._state = 2;
          this._rejected = true;
          this._rejectReason = withReason;
          var me = this;

          var chCnt = this._childPromises.length;
          while (chCnt--) {
            var p = this._childPromises.shift();

            if (p._onReject) {
              try {
                p._onReject(withReason);
                p.reject(withReason);
              } catch (e) {
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
        };

        /**
         * @param Object reason
         */
        _myTrait_.rejectReason = function (reason) {
          if (reason) {
            this._rejectReason = reason;
            return;
          }
          return this._rejectReason;
        };

        /**
         * @param Object x
         */
        _myTrait_.resolve = function (x) {

          // console.log("Resolving ", x);

          // can not do this many times...
          if (this._state > 0) return;

          if (x == this) {
            // error
            this._rejectReason = 'TypeError';
            this.reject(this._rejectReason);
            return;
          }

          if (this.isObject(x) && x._isAPromise) {

            //
            this._state = x._state;
            this._stateValue = x._stateValue;
            this._rejectReason = x._rejectReason;
            // ...
            if (this._state === 0) {
              var me = this;
              x.onStateChange(function () {
                if (x._state == 1) {
                  // console.log("State change");
                  me.resolve(x.value());
                }
                if (x._state == 2) {
                  me.reject(x.rejectReason());
                }
              });
            }
            if (this._state == 1) {
              // console.log("Resolved to be Promise was fulfilled ", x._stateValue);
              this.fulfill(this._stateValue);
            }
            if (this._state == 2) {
              // console.log("Relved to be Promise was rejected ", x._rejectReason);
              this.reject(this._rejectReason);
            }
            return;
          }
          if (this.isObject(x) && x.then && this.isFunction(x.then)) {
            // console.log("Thenable ", x);
            var didCall = false;
            try {
              // Call the x.then
              var me = this;
              x.then.call(x, function (y) {
                if (didCall) return;
                // we have now value for the promise...
                // console.log("Got value from Thenable ", y);
                me.resolve(y);
                didCall = true;
              }, function (r) {
                if (didCall) return;
                // console.log("Got reject from Thenable ", r);
                me.reject(r);
                didCall = true;
              });
            } catch (e) {
              if (!didCall) this.reject(e);
            }
            return;
          }
          this._state = 1;
          this._stateValue = x;

          // fulfill the promise...
          this.fulfill(x);
        };

        /**
         * @param float newState
         */
        _myTrait_.state = function (newState) {
          if (typeof newState != 'undefined') {
            this._state = newState;
          }
          return this._state;
        };

        /**
         * @param function onFulfilled
         * @param function onRejected
         */
        _myTrait_.then = function (onFulfilled, onRejected) {

          if (!onRejected) onRejected = function () {};

          var p = new _promise(onFulfilled, onRejected);
          var me = this;

          if (this._state == 1) {
            later().asap(function () {
              me.fulfill(me.value());
            });
          }
          if (this._state == 2) {
            later().asap(function () {
              me.reject(me.rejectReason());
            });
          }
          this._childPromises.push(p);
          return p;
        };

        /**
         * @param float t
         */
        _myTrait_.triggerStateChange = function (t) {
          var me = this;
          if (!this._listeners) return;
          this._listeners.forEach(function (fn) {
            fn(me);
          });
          // one-timer
          this._listeners.length = 0;
        };

        /**
         * @param float v
         */
        _myTrait_.value = function (v) {
          if (typeof v != 'undefined') {
            this._stateValue = v;
            return this;
          }
          return this._stateValue;
        };
      })(this);
    };

    var _promise = function _promise(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _promise) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != _promise._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new _promise(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _promise._classInfo = {
      name: '_promise'
    };
    _promise.prototype = new _promise_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var _localDB_prototype = function _localDB_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return Object.prototype.toString.call(t) === '[object Array]';
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      // the subclass definition comes around here then

      // The class definition is here...
      var dbTable_prototype = function dbTable_prototype() {
        // Then create the traits and subclasses for this class here...

        // trait comes here...

        (function (_myTrait_) {
          var _eventOn;
          var _commands;

          // Initialize static variables here...

          /**
           * @param float t
           */
          _myTrait_.guid = function (t) {

            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          };

          /**
           * @param float t
           */
          _myTrait_.isArray = function (t) {
            return Object.prototype.toString.call(t) === '[object Array]';
          };

          /**
           * @param float fn
           */
          _myTrait_.isFunction = function (fn) {
            return Object.prototype.toString.call(fn) == '[object Function]';
          };

          /**
           * @param float t
           */
          _myTrait_.isObject = function (t) {
            return t === Object(t);
          };
        })(this);

        (function (_myTrait_) {

          // Initialize static variables here...

          /**
           * @param float mode
           * @param float usingIndex
           * @param float actionFn
           */
          _myTrait_._cursorAction = function (mode, usingIndex, actionFn) {

            var prom = _promise();

            var trans = this._db.transaction(this._table, mode);
            var store = trans.objectStore(this._table);
            var cursorRequest;

            if (usingIndex) {

              var singleKeyRange, indexName;

              // BUG or FEATURE: currently accepts only one key like
              // { folderName : "data" };
              for (var n in usingIndex) {
                if (usingIndex.hasOwnProperty(n)) {
                  indexName = n;
                  singleKeyRange = IDBKeyRange.only(usingIndex[n]);
                }
              }

              if (indexName) {
                var index = store.index(indexName); // open using the index only
                cursorRequest = index.openCursor(singleKeyRange);
              } else {
                prom.reject('invalid index key');
                return;
              }
            } else {
              cursorRequest = store.openCursor();
            }

            trans.oncomplete = function (evt) {
              prom.resolve(true);
            };

            cursorRequest.onerror = function (error) {
              console.log(error);
            };

            cursorRequest.onsuccess = function (evt) {
              var cursor = evt.target.result;
              if (cursor) {
                actionFn(cursor);
                cursor['continue']();
              }
            };

            return prom;
          };

          /**
           * @param float rows
           */
          _myTrait_.addRows = function (rows) {

            var prom = _promise();

            var transaction = this._db.transaction([this._table], 'readwrite');

            var me = this;
            // Do something when all the data is added to the database.
            transaction.oncomplete = function (event) {
              // console.log("Writing into "+me._table+" was successfull");
              prom.resolve(true);
            };

            transaction.onerror = function (event) {
              prom.reject(event);
            };

            var objectStore = transaction.objectStore(this._table);
            for (var i in rows) {
              var request = objectStore.add(rows[i]);
              request.onsuccess = function (event) {};
            }

            return prom;
          };

          /**
           * @param float t
           */
          _myTrait_.clear = function (t) {

            var prom = _promise();
            var transaction = this._db.transaction(this._table, 'readwrite');
            var objectStore = transaction.objectStore(this._table);
            var request = objectStore.clear();
            request.onerror = function (event) {
              prom.fail(event.target.errorCode);
            };
            request.onsuccess = function (event) {
              prom.resolve(true);
            };

            return prom;
          };

          /**
           * @param float t
           */
          _myTrait_.count = function (t) {
            var prom = _promise();
            var transaction = this._db.transaction([this._table], 'readonly');

            transaction.objectStore(this._table).count().onsuccess = function (e) {
              prom.resolve(e.target.result);
            };

            return prom;
          };

          /**
           * @param function fn
           * @param float usingIndex
           */
          _myTrait_.forEach = function (fn, usingIndex) {

            return this._cursorAction('readonly', usingIndex, function (cursor) {
              fn(cursor.value, cursor);
            });
          };

          /**
           * @param float key
           */
          _myTrait_.get = function (key) {

            var prom = _promise();
            var transaction = this._db.transaction(this._table, 'readonly');
            var objectStore = transaction.objectStore(this._table);
            var request = objectStore.get(key);

            request.onerror = function (event) {
              // Handle errors!
              console.log('Could not get ', key);
              prom.fail(event.target.errorCode);
            };
            request.onsuccess = function (event) {
              prom.resolve(request.result);
            };

            return prom;
          };

          /**
           * @param float usingIndex
           */
          _myTrait_.getAll = function (usingIndex) {

            var items = [],
                me = this;

            return _promise(function (result, fail) {
              me._cursorAction('readonly', usingIndex, function (cursor) {
                items.push(cursor.value);
              }).then(function () {
                result(items);
              }).fail(fail);
            });
          };

          if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
          if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
          _myTrait_.__traitInit.push(function (db, tableName) {

            this._db = db;
            this._table = tableName;
          });

          /**
           * @param float usingIndex
           */
          _myTrait_.readAndDelete = function (usingIndex) {
            var items = [],
                me = this;

            return _promise(function (result, fail) {
              me._cursorAction('readwrite', usingIndex, function (cursor) {
                items.push(cursor.value);
                cursor['delete'](); // remove the key and continue...
              }).then(function () {
                result(items);
              }).fail(fail);
            });
          };

          /**
           * @param Object usingIndex  - optional : { keyName : valueString}
           */
          _myTrait_.remove = function (usingIndex) {
            var me = this;

            return _promise(function (result, fail) {
              me._cursorAction('readwrite', usingIndex, function (cursor) {
                cursor['delete'](); // remove the key and continue...
              }).then(function () {
                result(true);
              }).fail(fail);
            });
          };

          /**
           * @param float key
           * @param float data
           */
          _myTrait_.update = function (key, data) {
            var prom = _promise();
            var me = this;
            var transaction = this._db.transaction([this._table], 'readwrite');
            var objectStore = transaction.objectStore(this._table);
            try {
              var request = objectStore.get(key);
              request.onerror = function (event) {
                if (!request.result) {
                  me.addRows([data]).then(function () {
                    prom.resolve(data);
                  });
                  return;
                }
                prom.fail(event.target.errorCode);
              };
              request.onsuccess = function (event) {
                if (!request.result) {
                  me.addRows([data]).then(function () {
                    prom.resolve(data);
                  });
                  return;
                }
                var requestUpdate = objectStore.put(data);
                requestUpdate.onerror = function (event) {
                  // Do something with the error
                  prom.fail('update failed ');
                };
                requestUpdate.onsuccess = function (event) {
                  // Success - the data is updated!
                  prom.resolve(data);
                };
              };
            } catch (e) {
              return this.addRows([data]);
            }

            return prom;
          };
        })(this);
      };

      var dbTable = function dbTable(a, b, c, d, e, f, g, h) {
        var m = this,
            res;
        if (m instanceof dbTable) {
          var args = [a, b, c, d, e, f, g, h];
          if (m.__factoryClass) {
            m.__factoryClass.forEach(function (initF) {
              res = initF.apply(m, args);
            });
            if (typeof res == 'function') {
              if (res._classInfo.name != dbTable._classInfo.name) return new res(a, b, c, d, e, f, g, h);
            } else {
              if (res) return res;
            }
          }
          if (m.__traitInit) {
            m.__traitInit.forEach(function (initF) {
              initF.apply(m, args);
            });
          } else {
            if (typeof m.init == 'function') m.init.apply(m, args);
          }
        } else return new dbTable(a, b, c, d, e, f, g, h);
      };
      // inheritance is here

      dbTable._classInfo = {
        name: 'dbTable'
      };
      dbTable.prototype = new dbTable_prototype();

      (function (_myTrait_) {
        var _initDone;
        var _dbList;
        var _db;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_._initDB = function (t) {

          if (_db) return;
          // if you want experimental support, enable browser based prefixes
          _db = window.indexedDB; //  || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

          _initDone = true;

          _dbList = _localDB('sys.db', {
            tables: {
              databases: {
                createOptions: {
                  keyPath: 'name'
                } }
            }
          });
        };

        /**
         * @param float fn
         */
        _myTrait_.clearDatabases = function (fn) {

          _dbList.then(function () {
            var dbs = _dbList.table('databases');
            dbs.forEach(function (data, cursor) {
              if (fn(data)) {
                _db.deleteDatabase(data.name);
                cursor['delete']();
              }
            });
          });
        };

        /**
         * @param float t
         */
        _myTrait_.getDB = function (t) {
          return this._db;
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (dbName, options) {

          if (this._db) return;
          this._initDB();

          if (!dbName) {
            return;
          }

          var me = this;

          var request = _db.open(dbName, 4);

          request.onerror = function (event) {
            // Do something with request.errorCode!
            console.error(event.target.errorCode);
          };
          request.onsuccess = function (event) {
            // Do something with request.result!
            _dbList.then(function () {
              var dbs = _dbList.table('databases');
              dbs.addRows([{
                name: dbName
              }]);
            });
            me._db = event.target.result;
            me.resolve(true);
          };
          request.onupgradeneeded = function (event) {

            var db = event.target.result;
            me._db = db;

            if (options && options.tables) {
              for (var n in options.tables) {
                if (options.tables.hasOwnProperty(n)) {
                  var opts = options.tables[n];
                  // Create another object store called "names" with the autoIncrement flag set as true.   
                  var objStore = db.createObjectStore(n, opts.createOptions);

                  if (opts.indexes) {
                    for (var iName in opts.indexes) {
                      if (opts.indexes.hasOwnProperty(iName)) {
                        var iData = opts.indexes[iName];
                        objStore.createIndex(iName, iName, iData);
                      }
                    }
                  }
                }
              }
            }
          };
        });

        /**
         * @param float name
         */
        _myTrait_.table = function (name) {
          return dbTable(this._db, name);
        };
      })(this);
    };

    var _localDB = function _localDB(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _localDB) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != _localDB._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new _localDB(a, b, c, d, e, f, g, h);
    };
    // inheritance is here _promise

    _localDB_prototype.prototype = _promise.prototype;

    _localDB._classInfo = {
      name: '_localDB'
    };
    _localDB.prototype = new _localDB_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var memoryFsFolder_prototype = function memoryFsFolder_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return Object.prototype.toString.call(t) === '[object Array]';
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float fileName
         */
        _myTrait_._isFile = function (fileName) {
          var fold = this._pathObj;
          if (typeof fold[fileName] != 'undefined' && !this.isObject(fold[fileName])) return true;
          return false;
        };

        /**
         * @param float name
         */
        _myTrait_._isFolder = function (name) {
          var fold = this._pathObj;
          if (typeof fold[name] != 'undefined' && this.isObject(fold[name])) return true;
          return false;
        };

        /**
         * @param float fileName
         * @param float data
         */
        _myTrait_.appendFile = function (fileName, data) {
          var p,
              me = this;
          return _promise(function (result, fail) {
            var fold = me._pathObj;

            if (typeof data != 'string') {
              // can not write anything else than strings
              fail({
                result: false,
                text: 'Only string writes are accepted'
              });
              return;
            }

            if (me._isFile(fileName)) {
              fold[fileName] += data;
              result({
                result: true
              });
            } else {
              result({
                result: false,
                text: 'File does not exist'
              });
            }
          });
        };

        /**
         * @param float dirName
         */
        _myTrait_.createDir = function (dirName) {
          var p,
              me = this;
          return _promise(function (result, fail) {
            var fold = me._pathObj;
            if (!me._isFile(dirName) && !me._isFolder(dirName)) {
              fold[dirName] = {};
            } else {
              fail({
                result: false,
                text: 'Creating directory failed'
              });
              return;
            }
            result({
              result: true
            });
          });
        };

        /**
         * @param float obj
         */
        _myTrait_.fromData = function (obj) {
          var me = this;
          //this._server = server;
          //this._pathObj = pathObj;
          return _promise(function (result, fail) {
            if (!me._pathObj) {
              me._pathObj = {};
            }
            var all = [];
            var myProm = _promise();

            for (var n in obj) {
              if (me.isObject(obj[n])) {
                if (!me._pathObj[n] || !me._isFolder(n)) {
                  me._pathObj[n] = {};
                }
                var po = memoryFsFolder(me._server, me._pathObj[n]);
                all.push(po.fromData(obj[n]));
              } else {
                if (obj[n] === true) {} else {
                  me._pathObj[n] = obj[n];
                }
              }
            }

            myProm.all(all).then(function () {
              result(true);
            }).fail(fail);
            myProm.resolve(true);
          });
        };

        /**
         * @param Object dirName
         */
        _myTrait_.getSubFolderObj = function (dirName) {

          if (this.isObject(this._pathObj[dirName])) {
            return memoryFsFolder(this._server, this._pathObj[dirName]);
          }
        };

        /**
         * @param float t
         */
        _myTrait_.getTree = function (t) {
          var treePromise = this.toData({
            getData: false
          });
          return treePromise;
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (server, pathObj) {

          this._server = server;
          this._pathObj = pathObj;
        });

        /**
         * @param float fileName
         */
        _myTrait_.isFile = function (fileName) {
          var p,
              me = this;
          return _promise(function (result, fail) {
            result(me._isFile(fileName));
          });
        };

        /**
         * @param function filter
         */
        _myTrait_.listFiles = function (filter) {

          var p,
              me = this;
          return _promise(function (result, fail) {
            var fold = me._pathObj;
            var list = [];
            for (var n in fold) {
              if (me._isFile(n)) list.push(n);
            }
            result(list);
          });
        };

        /**
         * @param float filter
         */
        _myTrait_.listFolders = function (filter) {

          var p,
              me = this;
          return _promise(function (result, fail) {
            var fold = me._pathObj;
            var list = [];
            for (var n in fold) {
              if (me._isFolder(n)) list.push(n);
            }
            result(list);
          });
        };

        /**
         * @param string fileName
         * @param float fn
         */
        _myTrait_.readFile = function (fileName, fn) {
          var p,
              me = this;
          return _promise(function (result, fail) {
            var fold = me._pathObj;
            if (me._isFile(fileName)) {
              result(fold[fileName]);
              return;
            }
            fail('File does not exist');
          });
        };

        /**
         * @param float fileName
         */
        _myTrait_.removeFile = function (fileName) {
          var p,
              me = this;
          return _promise(function (result, fail) {
            var fold = me._pathObj;
            if (me._isFile(fileName)) {
              delete fold[fileName];
            }
            result({
              result: true
            });
          });
        };

        /**
         * @param Object options
         * @param String notUsed
         */
        _myTrait_.toData = function (options, notUsed) {
          var _rootDir = this._rootDir;
          var me = this;

          var options = options || {};

          var fileFilter = options.fileFilter,
              dirFilter = options.dirFilter;

          if (typeof options.getData == 'undefined') options.getData = true;

          return _promise(function (result, fail) {

            var o = {};
            me.listFiles().then(function (list) {
              var cnt = list.length,
                  done = 0,
                  waiting = _promise();
              list.forEach(function (n) {
                if (fileFilter) {
                  if (!fileFilter(n)) {
                    done++;
                    if (done == cnt) waiting.resolve(true);
                    return;
                  }
                }
                if (options.getData) {
                  me.readFile(n).then(function (data) {
                    o[n] = data;
                    done++;
                    if (done == cnt) waiting.resolve(true);
                  });
                } else {
                  o[n] = true;
                  done++;
                  if (done == cnt) waiting.resolve(true);
                }
              });
              if (cnt == 0) waiting.resolve(true);
              return waiting;
            }).then(function () {
              return me.listFolders();
            }).then(function (list) {
              var cnt = list.length,
                  done = 0,
                  waiting = _promise();
              list.forEach(function (dirName) {
                if (dirFilter) {
                  if (!dirFilter(dirName)) {
                    done++;
                    if (done == cnt) waiting.resolve(true);
                    return;
                  }
                }
                var newF = me.getSubFolderObj(dirName);
                newF.toData(fileFilter, dirFilter).then(function (data) {
                  o[dirName] = data;
                  done++;
                  if (done == cnt) waiting.resolve(true);
                });
              });
              if (cnt == 0) waiting.resolve(true);
              return waiting;
            }).then(function () {
              result(o);
            }).fail(function () {
              result({});
            });
          });
        };

        /**
         * @param float fileName
         * @param float fileData
         */
        _myTrait_.writeFile = function (fileName, fileData) {
          var p,
              me = this;
          return _promise(function (result, fail) {
            var fold = me._pathObj;
            if (typeof fileData != 'string') {
              // can not write anything else than strings
              fail({
                result: false,
                text: 'Only string writes are accepted'
              });
              return;
            }
            if (!me._isFolder(fileName)) {
              fold[fileName] = fileData;
            } else {
              fail({
                result: false,
                text: 'Modifying the file failed'
              });
              return;
            }
            result({
              result: true
            });
          });
        };
      })(this);
    };

    var memoryFsFolder = function memoryFsFolder(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof memoryFsFolder) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != memoryFsFolder._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new memoryFsFolder(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    memoryFsFolder._classInfo = {
      name: 'memoryFsFolder'
    };
    memoryFsFolder.prototype = new memoryFsFolder_prototype();

    (function () {
      if (typeof define !== 'undefined' && define !== null && define.amd != null) {
        __amdDefs__['memoryFsFolder'] = memoryFsFolder;
        this.memoryFsFolder = memoryFsFolder;
      } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
        module.exports['memoryFsFolder'] = memoryFsFolder;
      } else {
        this.memoryFsFolder = memoryFsFolder;
      }
    }).call(new Function('return this')());

    // the subclass definition comes around here then

    // The class definition is here...
    var fsServerMemory_prototype = function fsServerMemory_prototype() {
      // Then create the traits and subclasses for this class here...

      (function (_myTrait_) {
        var _servers;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_._initServers = function (t) {
          if (!_servers) {
            _servers = {};
          }
        };

        /**
         * @param float t
         */
        _myTrait_.getRootFolder = function (t) {
          var me = this;
          return memoryFsFolder(me, me._fsData);
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (serverName, createFrom) {
          this._serverName = serverName;
          this._initServers();
          this._fsData = createFrom;
        });
      })(this);
    };

    var fsServerMemory = function fsServerMemory(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof fsServerMemory) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != fsServerMemory._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new fsServerMemory(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    fsServerMemory._classInfo = {
      name: 'fsServerMemory'
    };
    fsServerMemory.prototype = new fsServerMemory_prototype();

    (function () {
      if (typeof define !== 'undefined' && define !== null && define.amd != null) {
        __amdDefs__['fsServerMemory'] = fsServerMemory;
        this.fsServerMemory = fsServerMemory;
      } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
        module.exports['fsServerMemory'] = fsServerMemory;
      } else {
        this.fsServerMemory = fsServerMemory;
      }
    }).call(new Function('return this')());

    // the subclass definition comes around here then

    // The class definition is here...
    var nodeFsFolder_prototype = function nodeFsFolder_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return Object.prototype.toString.call(t) === '[object Array]';
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      (function (_myTrait_) {
        var fs;
        var path;

        // Initialize static variables here...

        /**
         * @param float dirName
         */
        _myTrait_._mkDir = function (dirName) {
          if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, 502, function (err) {});
          }
        };

        /**
         * @param float fileName
         * @param float data
         * @param float fn
         */
        _myTrait_.appendFile = function (fileName, data, fn) {
          var _rootDir = this._rootDir;
          var me = this;

          return _promise(function (result, fail) {

            if (typeof data != 'string') {
              // can not write anything else than strings
              fail({
                result: false,
                text: 'Only string writes are accepted'
              });
              return;
            }
            fileName = path.basename(fileName);
            var filePath = _rootDir + '/' + fileName;

            fs.appendFile(filePath, data, function (err) {
              if (err) {
                fail(err);
                return;
              }
              result({
                result: true,
                text: 'File written'
              });
            });
          });
        };

        /**
         * @param float dirName
         */
        _myTrait_.createDir = function (dirName) {

          var _rootDir = this._rootDir;
          var me = this;

          return _promise(function (result, fail) {
            // TODO: Should check if the directory is really under this diretory
            // basname is trying to normalize, but should be tested.
            var dirN = path.basename(dirName);
            me._mkDir(_rootDir + '/' + dirN);
            result({
              result: true,
              text: 'Directory created'
            });
          });
        };

        /**
         * @param float obj
         */
        _myTrait_.fromData = function (obj) {

          // Create new directories...
          var me = this;
          var _rootDir = this._rootDir;

          return _promise(function (result, fail) {
            var all = [];
            var myProm = _promise();

            for (var n in obj) {

              if (n.indexOf('..') >= 0) {
                fail('.. symbol is not allowed in the file or path names');
                return;
              }

              var name = path.basename(n);
              if (me.isObject(obj[name])) {
                (function () {
                  var dirDone = _promise();
                  all.push(dirDone);
                  me.createDir(name).then(function () {
                    var newF = me.getSubFolderObj(name);
                    return newF.fromData(obj[name]);
                  }).then(function () {
                    dirDone.resolve();
                  }).fail(function () {
                    dirDone.resolve();
                  });
                })();
              } else {
                if (typeof obj[name] == 'string') {
                  all.push(me.writeFile(name, obj[name]));
                }
              }
            }
            myProm.all(all).then(function () {
              result(true);
            }).fail(fail);
            myProm.resolve(true);
          });
        };

        /**
         * @param float dirName
         */
        _myTrait_.getSubFolderObj = function (dirName) {
          return nodeFsFolder(this._rootDir + '/' + dirName);
        };

        /**
         * @param float t
         */
        _myTrait_.getTree = function (t) {
          return this.toData({
            getData: false
          });
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (dirName) {
          this._rootDir = dirName;

          if (!dirName) {
            throw ' The directory must be specified ';
            return;
          }

          if (!fs) {
            fs = require('fs');
            path = require('path');
          }
        });

        /**
         * @param float fileName
         */
        _myTrait_.isFile = function (fileName) {

          var _rootDir = this._rootDir;
          var me = this;

          return _promise(function (result, fail) {
            fileName = path.basename(fileName);

            fs.stat(_rootDir + '/' + fileName, function (err, stats) {
              if (err || !stats.isFile()) result(false);
              result(true);
            });
          });
        };

        /**
         * @param function filter
         */
        _myTrait_.listFiles = function (filter) {
          var _rootDir = this._rootDir;
          var me = this;

          return _promise(function (result, fail) {
            // Then we list the directory's file here...
            fs.readdir(_rootDir, function (err, files) {
              if (err) {
                fail(err);
                return;
              }

              var cnt = files.length,
                  list = [];
              if (cnt == 0) result(list);

              files.forEach(function (file) {
                fs.stat(_rootDir + '/' + file, function (err, stats) {
                  // stats.isDirectory() would be alternative
                  if (!err && stats.isFile()) list.push(file);
                  cnt--;
                  if (cnt == 0) result(list);
                });
              });
            });
          });
        };

        /**
         * @param float filter
         */
        _myTrait_.listFolders = function (filter) {
          var _rootDir = this._rootDir;
          var me = this;

          return _promise(function (result, fail) {
            // Then we list the directory's file here...
            fs.readdir(_rootDir, function (err, files) {

              console.log(files);
              if (err) {
                fail(err);
                return;
              }

              var cnt = files.length,
                  list = [];
              if (cnt == 0) result(list);

              files.forEach(function (file) {
                fs.stat(_rootDir + '/' + file, function (err, stats) {
                  // stats.isFiles() would be alternative
                  if (!err && stats.isDirectory()) {
                    console.log('Dir ' + file);
                    list.push(file);
                  }
                  cnt--;
                  if (cnt == 0) {
                    console.log('Cnt == 0');
                    result(list);
                  }
                });
              });
            });
          });
        };

        /**
         * @param string fileName
         * @param float fn
         */
        _myTrait_.readFile = function (fileName, fn) {
          var _rootDir = this._rootDir;
          var me = this;

          return _promise(function (result, fail) {
            fileName = path.basename(fileName);
            fs.readFile(_rootDir + '/' + fileName, 'utf8', function (err, data) {
              if (err) {
                fail(err);
                return;
              }
              result(data);
            });
          });
        };

        /**
         * @param function options
         * @param function notUsed
         */
        _myTrait_.toData = function (options, notUsed) {
          var _rootDir = this._rootDir;
          var me = this;

          var options = options || {};

          var fileFilter = options.fileFilter,
              dirFilter = options.dirFilter;

          if (typeof options.getData == 'undefined') options.getData = true;

          return _promise(function (result, fail) {

            var o = {};
            me.listFiles().then(function (list) {
              var cnt = list.length,
                  done = 0,
                  waiting = _promise();
              list.forEach(function (n) {
                if (fileFilter) {
                  if (!fileFilter(n)) {
                    done++;
                    if (done == cnt) waiting.resolve(true);
                    return;
                  }
                }
                if (options.getData) {
                  me.readFile(n).then(function (data) {
                    o[n] = data;
                    done++;
                    if (done == cnt) waiting.resolve(true);
                  });
                } else {
                  o[n] = true;
                  done++;
                  if (done == cnt) waiting.resolve(true);
                }
              });
              if (cnt == 0) waiting.resolve(true);
              return waiting;
            }).then(function () {
              return me.listFolders();
            }).then(function (list) {
              var cnt = list.length,
                  done = 0,
                  waiting = _promise();
              list.forEach(function (dirName) {
                if (dirFilter) {
                  if (!dirFilter(dirName)) {
                    done++;
                    if (done == cnt) waiting.resolve(true);
                    return;
                  }
                }
                var newF = me.getSubFolderObj(dirName);
                newF.toData(fileFilter, dirFilter).then(function (data) {
                  o[dirName] = data;
                  done++;
                  if (done == cnt) waiting.resolve(true);
                });
              });
              if (cnt == 0) waiting.resolve(true);
              return waiting;
            }).then(function () {
              result(o);
            }).fail(function () {
              result({});
            });
          });
        };

        /**
         * @param string fileName
         * @param float fileData
         * @param float fn
         */
        _myTrait_.writeFile = function (fileName, fileData, fn) {
          var _rootDir = this._rootDir;
          var me = this;

          return _promise(function (result, fail) {

            if (typeof fileData != 'string') {
              // can not write anything else than strings
              fail({
                result: false,
                text: 'Only string writes are accepted'
              });
              return;
            }

            fileName = path.basename(fileName);
            fs.writeFile(_rootDir + '/' + fileName, fileData, function (err, data) {
              if (err) {
                fail(err);
                return;
              }
              result({
                result: true,
                text: 'File written'
              });
            });
          });
        };
      })(this);
    };

    var nodeFsFolder = function nodeFsFolder(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof nodeFsFolder) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != nodeFsFolder._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new nodeFsFolder(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    nodeFsFolder._classInfo = {
      name: 'nodeFsFolder'
    };
    nodeFsFolder.prototype = new nodeFsFolder_prototype();

    (function () {
      if (typeof define !== 'undefined' && define !== null && define.amd != null) {
        __amdDefs__['nodeFsFolder'] = nodeFsFolder;
        this.nodeFsFolder = nodeFsFolder;
      } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
        module.exports['nodeFsFolder'] = nodeFsFolder;
      } else {
        this.nodeFsFolder = nodeFsFolder;
      }
    }).call(new Function('return this')());

    // the subclass definition comes around here then

    // The class definition is here...
    var indexedDBFsFolder_prototype = function indexedDBFsFolder_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {
        var _eventOn;
        var _commands;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return Object.prototype.toString.call(t) === '[object Array]';
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      (function (_myTrait_) {
        var _instances;

        // Initialize static variables here...

        if (!_myTrait_.hasOwnProperty('__factoryClass')) _myTrait_.__factoryClass = [];
        _myTrait_.__factoryClass.push(function (server, pathString) {

          var id = server.getID() + pathString;

          if (!_instances) {
            _instances = {};
          }

          if (_instances[id]) {
            return _instances[id];
          } else {
            _instances[id] = this;
          }
        });

        /**
         * Simple helper, Later this function might be doing checking for duplicate // or similar mistakes in the path name
         * @param float fileName
         */
        _myTrait_._filePath = function (fileName) {

          var str = this._path + '/' + fileName;
          str = str.replace('//', '/');
          return str;
        };

        /**
         * @param float fileName
         */
        _myTrait_._isFile = function (fileName) {
          var me = this;
          return _promise(function (result, failure) {
            me._loadFiles().then(function (list) {
              for (var i = 0; i < list.length; i++) {
                if (list[i].name == fileName) {
                  result(true);
                  return;
                }
              }
              result(false);
            }).fail(failure);
          });
        };

        /**
         * @param float name
         */
        _myTrait_._isFolder = function (name) {
          var me = this;
          return _promise(function (result, failure) {
            name = me._normalize(me._path + '/' + name + '/');
            me._loadFolders().then(function (list) {
              for (var i = 0; i < list.length; i++) {
                if (list[i].name == name) {
                  result(true);
                  return;
                }
              }
              result(false);
            }).fail(failure);
          });
        };

        /**
         * @param float str
         */
        _myTrait_._lastPath = function (str) {

          var parts = str.split('/');

          var str = parts.pop();
          while (parts.length > 0) {
            if (str.length > 0) return str;
            str = parts.pop();
          }
          return str;
        };

        /**
         * @param float t
         */
        _myTrait_._loadFiles = function (t) {

          var local = this._db,
              me = this;

          return _promise(function (result) {

            /*
            if(me._fileCache) {
            result(me._fileCache);
            }*/

            me._server.then(function () {
              local.table('files').getAll({
                folderName: me._path
              }).then(function (res) {
                me._fileCache = res;
                result(me._fileCache);
              });
            });
          });
        };

        /**
         * @param float t
         */
        _myTrait_._loadFolders = function (t) {
          var local = this._db,
              me = this;

          return _promise(function (result) {
            /*
            if(me._folderCache) {
            result(me._folderCache);
            }*/

            me._server.then(function () {
              local.table('folders').getAll({
                parentFolder: me._path
              }).then(function (res) {
                me._folderCache = res;
                result(me._folderCache);
              });
            });
          });
        };

        /**
         * @param float pathName
         */
        _myTrait_._normalize = function (pathName) {
          var str = pathName.replace('//', '/');
          return str;
        };

        /**
         * @param float fileName
         */
        _myTrait_._removeFileFromCache = function (fileName) {
          if (this._fileCache) {
            for (var i = 0; i < this._fileCache.length; i++) {
              if (this._fileCache[i].name == fileName) {
                this._fileCache.splice(i, 1);
                return;
              }
            }
          }
        };

        /**
         * @param float name
         */
        _myTrait_._removeFolderFromCache = function (name) {
          if (this._folderCache) {
            for (var i = 0; i < this._fileCache.length; i++) {
              if (this._folderCache[i].name == name) {
                this._folderCache.splice(i, 1);
                return;
              }
            }
          }
        };

        /**
         * @param float fileName
         * @param float data
         */
        _myTrait_.appendFile = function (fileName, data) {

          var p,
              me = this;
          var local = this._db,
              server = this._server;

          return _promise(function (result, fail) {

            if (typeof data != 'string') {
              // can not write anything else than strings
              fail({
                result: false,
                text: 'Only string writes are accepted'
              });
              return;
            }

            server.then(function () {
              return me._isFile(fileName);
            }).then(function (isFile) {
              if (!isFile) {
                return local.table('files').addRows([{
                  name: fileName,
                  folderName: me._path
                }]);
              } else {
                return 'OK';
              }
            }).then(function () {
              return local.table('fileWrites').addRows([{
                filePath: me._filePath(fileName),
                data: data
              }]);
            }).then(function () {
              // all should be ready...
              result({
                result: true,
                text: 'file ' + fileName + ' written'
              });
            }).fail(fail);
          });
        };

        /**
         * @param float dirName
         */
        _myTrait_.createDir = function (dirName) {
          var p,
              me = this;
          var local = this._db,
              server = this._server;

          return _promise(function (result, fail) {

            server.then(function () {
              return me._isFolder(dirName);
            }).then(function (isFolder) {
              if (!isFolder) {
                var row = {
                  name: me._normalize(me._path + dirName + '/'),
                  parentFolder: me._path
                };
                return local.table('folders').addRows([row]);
              } else {
                return 'OK';
              }
            }).then(function () {

              result({
                result: true,
                text: 'folder ' + dirName + ' created'
              });
            }).fail(fail);
          });
        };

        /**
         * @param float obj
         */
        _myTrait_.fromData = function (obj) {

          // Create new directories...
          var me = this;
          var local = this._db,
              server = this._server;

          return _promise(function (result, fail) {
            var all = [];
            var myProm = _promise();

            server.then(function () {
              for (var n in obj) {

                if (n.indexOf('..') >= 0) {
                  fail('.. symbol is not allowed in the file or path names');
                  return;
                }

                var name = a;
                if (me.isObject(obj[name])) {
                  (function () {
                    var dirDone = _promise();
                    all.push(dirDone);
                    me.createDir(name).then(function () {
                      var newF = me.getSubFolderObj(name);
                      return newF.fromData(obj[name]);
                    }).then(function () {
                      dirDone.resolve();
                    }).fail(function () {
                      dirDone.resolve();
                    });
                  })();
                } else {
                  if (typeof obj[name] == 'string') {
                    all.push(me.writeFile(name, obj[name]));
                  }
                }
              }
              myProm.all(all).then(function () {
                result(true);
              }).fail(fail);
              myProm.resolve(true);
            });
          });
        };

        /**
         * @param Object dirName
         */
        _myTrait_.getSubFolderObj = function (dirName) {

          var subPath = this._normalize(this._path + dirName + '/');
          return indexedDBFsFolder(this._server, subPath);
        };

        /**
         * @param float t
         */
        _myTrait_.getTree = function (t) {
          var treePromise = this.toData({
            getData: false
          });
          return treePromise;
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (server, pathString) {

          this._server = server;
          this._path = pathString;
          this._db = server.getDb();
        });

        /**
         * @param float fileName
         */
        _myTrait_.isFile = function (fileName) {
          var p,
              me = this;
          return _promise(function (result, fail) {
            result(me._isFile(fileName));
          });
        };

        /**
         * @param function filter
         */
        _myTrait_.listFiles = function (filter) {

          var p,
              me = this;
          var local = this._db,
              server = this._server;

          return _promise(function (result, fail) {
            server.then(function () {
              me._loadFiles().then(function (list) {
                var res = [];
                list.forEach(function (data) {
                  res.push(data.name);
                });
                result(res);
              });
            }).fail(fail);
          });
        };

        /**
         * @param float filter
         */
        _myTrait_.listFolders = function (filter) {
          var p,
              me = this;
          var local = this._db,
              server = this._server;

          return _promise(function (result, fail) {
            server.then(function () {
              me._loadFolders().then(function (list) {
                var res = [];
                list.forEach(function (data) {
                  res.push(data.name);
                });
                result(res);
              });
            }).fail(fail);
          });
        };

        /**
         * @param string fileName
         * @param Object notUsed
         */
        _myTrait_.readFile = function (fileName, notUsed) {
          var p,
              me = this;
          var local = this._db,
              server = this._server;

          return _promise(function (result, fail) {

            server.then(function () {
              return me._isFile(fileName);
            }).then(function (isFile) {
              if (!isFile) {
                throw 'The file does not exist';
              } else {
                return 'OK';
              }
            }).then(function () {
              // remove the old write from the file table
              return local.table('fileWrites').getAll({
                filePath: me._filePath(fileName)
              });
            }).then(function (list) {
              var str = '';
              list.forEach(function (write) {
                str += write.data;
              });
              result(str);
            }).fail(fail);
          });
        };

        /**
         * @param float fileName
         */
        _myTrait_.removeFile = function (fileName) {
          var p,
              me = this;
          var local = this._db,
              server = this._server;

          return _promise(function (result, fail) {

            var bIsFile = false;
            server.then(function () {
              return me._isFile(fileName);
            }).then(function (isFile) {
              bIsFile = isFile;
              if (!isFile) {
                return 'OK';
              } else {
                return local.table('fileWrites').remove({
                  filePath: me._filePath(fileName)
                });
              }
            }).then(function () {
              if (bIsFile) {
                // {name: "README.TXT", folderName: "/"}
                return local.table('files')._cursorAction('readwrite', {
                  folderName: me._path
                }, function (cursor) {
                  var data = cursor.value;
                  if (data.name == fileName) {
                    cursor['delete'](); // remove the file if
                    me._removeFileFromCache(fileName);
                  }
                });
              } else {
                return 'OK';
              }
            }).then(function () {
              // all should be ready...
              result({
                result: true,
                text: 'file ' + fileName + ' removed'
              });
            }).fail(fail);
          });
        };

        /**
         * @param Object options
         * @param String notUsed
         */
        _myTrait_.toData = function (options, notUsed) {

          var me = this;

          var options = options || {};

          var fileFilter = options.fileFilter,
              dirFilter = options.dirFilter;

          if (typeof options.getData == 'undefined') options.getData = true;

          return _promise(function (result, fail) {

            var o = {};
            me.listFiles().then(function (list) {
              var cnt = list.length,
                  done = 0,
                  waiting = _promise();

              list.forEach(function (n) {
                if (fileFilter) {
                  if (!fileFilter(n)) {
                    done++;
                    if (done == cnt) waiting.resolve(true);
                    return;
                  }
                }
                if (options.getData) {
                  me.readFile(n).then(function (data) {
                    o[n] = data;
                    done++;
                    if (done == cnt) waiting.resolve(true);
                  });
                } else {
                  o[n] = true;
                  done++;
                  if (done == cnt) waiting.resolve(true);
                }
              });
              if (cnt == 0) waiting.resolve(true);
              return waiting;
            }).then(function () {
              return me.listFolders();
            }).then(function (list) {
              var cnt = list.length,
                  done = 0,
                  waiting = _promise();
              list.forEach(function (dirName) {
                if (dirFilter) {
                  if (!dirFilter(dirName)) {
                    done++;
                    if (done == cnt) waiting.resolve(true);
                    return;
                  }
                }
                var subName = me._lastPath(dirName);
                var newF = me.getSubFolderObj(subName);
                newF.toData(fileFilter, dirFilter).then(function (data) {
                  o[subName] = data;
                  done++;
                  if (done == cnt) waiting.resolve(true);
                });
              });
              if (cnt == 0) waiting.resolve(true);
              return waiting;
            }).then(function () {
              result(o);
            }).fail(function () {
              result({});
            });
          });
        };

        /**
         * @param float fileName
         * @param float fileData
         */
        _myTrait_.writeFile = function (fileName, fileData) {
          var p,
              me = this;
          var local = this._db,
              server = this._server;

          return _promise(function (result, fail) {

            if (typeof fileData != 'string') {
              // can not write anything else than strings
              fail({
                result: false,
                text: 'Only string writes are accepted'
              });
              return;
            }

            server.then(function () {
              return me._isFile(fileName);
            }).then(function (isFile) {
              if (!isFile) {
                return local.table('files').addRows([{
                  name: fileName,
                  folderName: me._path
                }]);
              } else {
                return 'OK';
              }
            }).then(function () {
              // remove the old write from the file table
              return local.table('fileWrites').remove({
                filePath: me._filePath(fileName)
              });
            }).then(function () {
              return local.table('fileWrites').addRows([{
                filePath: me._filePath(fileName),
                data: fileData
              }]);
            }).then(function () {
              // all should be ready...
              result({
                result: true,
                text: 'file ' + fileName + ' written'
              });
            }).fail(fail);
          });
        };
      })(this);
    };

    var indexedDBFsFolder = function indexedDBFsFolder(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof indexedDBFsFolder) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != indexedDBFsFolder._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new indexedDBFsFolder(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    indexedDBFsFolder._classInfo = {
      name: 'indexedDBFsFolder'
    };
    indexedDBFsFolder.prototype = new indexedDBFsFolder_prototype();

    (function () {
      if (typeof define !== 'undefined' && define !== null && define.amd != null) {
        __amdDefs__['indexedDBFsFolder'] = indexedDBFsFolder;
        this.indexedDBFsFolder = indexedDBFsFolder;
      } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
        module.exports['indexedDBFsFolder'] = indexedDBFsFolder;
      } else {
        this.indexedDBFsFolder = indexedDBFsFolder;
      }
    }).call(new Function('return this')());

    // the subclass definition comes around here then

    // The class definition is here...
    var fsServerIndexedDB_prototype = function fsServerIndexedDB_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return Object.prototype.toString.call(t) === '[object Array]';
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == '[object Function]';
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {
          return t === Object(t);
        };
      })(this);

      (function (_myTrait_) {
        var _instances;

        // Initialize static variables here...

        if (!_myTrait_.hasOwnProperty('__factoryClass')) _myTrait_.__factoryClass = [];
        _myTrait_.__factoryClass.push(function (id) {
          if (!_instances) {
            _instances = {};
          }

          if (_instances[id]) {
            return _instances[id];
          } else {
            _instances[id] = this;
          }
        });

        /**
         * @param float t
         */
        _myTrait_.createFrom = function (t) {};

        /**
         * @param float t
         */
        _myTrait_.getDb = function (t) {
          return this._db;
        };

        /**
         * UUID for the server
         * @param float t
         */
        _myTrait_.getID = function (t) {

          if (!this._id) {
            this._id = this.guid();
          }
          return this._id;
        };

        /**
         * @param float t
         */
        _myTrait_.getRootFolder = function (t) {

          return indexedDBFsFolder(this, '/');
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (serverName, createFrom) {

          var me = this;
          this._serverName = serverName;
          this._dbName = 'vserver://' + serverName;
          this._db = _localDB(this._dbName, {
            tables: {
              folders: {
                createOptions: {
                  keyPath: 'name'
                },
                indexes: {
                  parentFolder: {
                    unique: false
                  }
                }
              },
              files: {
                createOptions: {
                  autoIncrement: true
                },
                indexes: {
                  folderName: {
                    unique: false
                  }
                }
              },
              fileWrites: {
                createOptions: {
                  autoIncrement: true
                },
                indexes: {
                  filePath: {
                    unique: false
                  }
                }
              }
            }
          });

          // make sure that there is at least the root folder ...
          this._db.then(function () {
            me._db.table('folders').count().then(function (cnt) {
              if (cnt >= 1) {

                me.resolve(true);
              } else {

                me._db.table('folders').addRows([{
                  name: '/'
                }]).then(function () {
                  me.resolve(true); // the root has been inserted
                });
              }
            });
          });
        });
      })(this);
    };

    var fsServerIndexedDB = function fsServerIndexedDB(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof fsServerIndexedDB) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != fsServerIndexedDB._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new fsServerIndexedDB(a, b, c, d, e, f, g, h);
    };
    // inheritance is here _promise

    fsServerIndexedDB_prototype.prototype = _promise.prototype;

    fsServerIndexedDB._classInfo = {
      name: 'fsServerIndexedDB'
    };
    fsServerIndexedDB.prototype = new fsServerIndexedDB_prototype();

    (function () {
      if (typeof define !== 'undefined' && define !== null && define.amd != null) {
        __amdDefs__['fsServerIndexedDB'] = fsServerIndexedDB;
        this.fsServerIndexedDB = fsServerIndexedDB;
      } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
        module.exports['fsServerIndexedDB'] = fsServerIndexedDB;
      } else {
        this.fsServerIndexedDB = fsServerIndexedDB;
      }
    }).call(new Function('return this')());

    // the subclass definition comes around here then

    // The class definition is here...
    var fsServerNode_prototype = function fsServerNode_prototype() {
      // Then create the traits and subclasses for this class here...

      (function (_myTrait_) {
        var _servers;

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_._initServers = function (t) {
          if (!_servers) {
            _servers = {};
          }
        };

        /**
         * @param float t
         */
        _myTrait_.getRootFolder = function (t) {

          // just a trivial security that the FS is not used for root folder
          var root = this._fsRoot;
          if (!root || root.length < 15 || root.indexOf('..') >= 0) {
            throw 'Invalid root folder';
            return false;
          }

          var me = this;
          return nodeFsFolder(me, me._fsRoot);
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (fsRoot, createFrom) {

          // trivial security check to prevent accidentally using system root or
          // directories close to it
          if (!fsRoot || fsRoot.length < 15 || fsRoot.indexOf('..') >= 0) {
            throw 'Invalid root folder';
            return false;
          }
          this._fsRoot = fsRoot;
        });
      })(this);
    };

    var fsServerNode = function fsServerNode(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof fsServerNode) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == 'function') {
            if (res._classInfo.name != fsServerNode._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == 'function') m.init.apply(m, args);
        }
      } else return new fsServerNode(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    fsServerNode._classInfo = {
      name: 'fsServerNode'
    };
    fsServerNode.prototype = new fsServerNode_prototype();

    (function () {
      if (typeof define !== 'undefined' && define !== null && define.amd != null) {
        __amdDefs__['fsServerNode'] = fsServerNode;
        this.fsServerNode = fsServerNode;
      } else if (typeof module !== 'undefined' && module !== null && module.exports != null) {
        module.exports['fsServerNode'] = fsServerNode;
      } else {
        this.fsServerNode = fsServerNode;
      }
    }).call(new Function('return this')());

    (function (_myTrait_) {

      // Initialize static variables here...

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty('__traitInit')) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (aclFile) {});
    })(this);
  };

  var localFs = function localFs(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof localFs) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == 'function') {
          if (res._classInfo.name != localFs._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == 'function') m.init.apply(m, args);
      }
    } else return new localFs(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  localFs._classInfo = {
    name: 'localFs'
  };
  localFs.prototype = new localFs_prototype();

  if (typeof define !== 'undefined' && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function('return this')());

// --- let's not ---

// console.log("Row ",i," written succesfully");