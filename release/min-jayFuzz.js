(function(){var t={},n=function(){var n=function(){!function(t){t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this);var t=function(){!function(t){var n,e,i,r,o;t.add=function(t,n,i){if(n||i){var r;"[object Array]"===Object.prototype.toString.call(i)?r=i:(r=Array.prototype.slice.call(arguments,2),r||(r=[])),e.push([n,t,r])}else e.push(t)},t.after=function(t,n,e){e||(e="time"+(new Date).getTime()+Math.random(1e7)),r[e]={step:Math.floor(1e3*t),fn:n,nextTime:0,remove:!0}},t.asap=function(t){this.add(t)},t.every=function(t,n,e){e||(e="time"+(new Date).getTime()+Math.random(1e7)),r[e]={step:Math.floor(1e3*t),fn:n,nextTime:0}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){if(!n){this.polyfill();var t,a;if("undefined"!=typeof window){var t=window.requestAnimationFrame,a=window.cancelRequestAnimationFrame;["","ms","moz","webkit","o"].forEach(function(n){t||(t=window[n+"RequestAnimationFrame"],a=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"])})}t||(t=function(t){return setTimeout(t,16)}),a||(a=function(t){clearTimeout(t)}),e=[],i={},r={},o=[];var s=0,f=function(){for(var n,a=(new Date).getTime();n=e.shift();)"[object Array]"===Object.prototype.toString.call(n)?n[1].apply(n[0],n[2]):n();for(var u=0;u<o.length;u++){var c=o[u];c()}for(var l in i)if(i.hasOwnProperty(l)){var h=i[l];h[0](h[1]),delete i[l]}for(var l in r)if(r.hasOwnProperty(l)){var h=r[l];h.nextTime<a&&(h.remove?h.nextTime>0?(h.fn(),delete r[l]):h.nextTime=a+h.step:(h.fn(),h.nextTime=a+h.step)),h.until&&h.until<a&&delete r[l]}t(f),s=a};f(),n=!0}}),t.once=function(t,n,e){i[t]=[n,e]},t.onFrame=function(t){o.push(t)},t.polyfill=function(){},t.removeFrameFn=function(t){var n=o.indexOf(t);return n>=0?(t._onRemove&&t._onRemove(),o.splice(n,1),!0):!1}}(this)},n=function(t,e,i,r,o,a,s,f){var u,c=this;if(!(c instanceof n))return new n(t,e,i,r,o,a,s,f);var l=[t,e,i,r,o,a,s,f];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){u=t.apply(c,l)}),"function"==typeof u){if(u._classInfo.name!=n._classInfo.name)return new u(t,e,i,r,o,a,s,f)}else if(u)return u;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,l)}):"function"==typeof c.init&&c.init.apply(c,l)};n._classInfo={name:"later"},n.prototype=new t,function(t){t.all=function(t){var n;n=this.isArray(t)?t:Array.prototype.slice.call(arguments,0);var i=n.length,r=0,o=[],a=new Array(i);return this.then(function(){var t=e();return 0==n.length&&t.resolve([]),n.forEach(function(n,e){n.then?(o.push(n),n.then(function(n){a[e]=n,r++,r==i&&t.resolve(a)},function(n){t.reject(n)})):t.reject("Not list of promises")}),t})},t.collect=function(t,n,i){var r;r=this.isArray(n)?n:[n];var o=r.length,a=!1,s=!1,f=0,u=[],c=i||{};return this.then(function(){var n=e();return r.forEach(function(e){e.then?(u.push(e),e.then(function(e){f++,a=t(e,c),(a&&!s||0==s&&o==f)&&(n.resolve(c),s=!0)},function(t){n.reject(t)})):n.reject("Not list of promises")}),n})},t.fail=function(t){return this.then(null,t)},t.fulfill=function(t){if(!(this._rejected||this._fulfilled&&t!=this._stateValue)){this._fulfilled=!0,this._stateValue=t;for(var n=this._childPromises.length;n--;){var e=this._childPromises.shift();if(e._onFulfill)try{var i=e._onFulfill(t);"undefined"!=typeof i?e.resolve(i):e.fulfill(t)}catch(r){e.reject(r)}else e.fulfill(t)}this._state=1,this.triggerStateChange()}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,e){if(this._state=0,this._stateValue=null,this._isAPromise=!0,this._childPromises=[],this.isFunction(t)&&(this._onFulfill=t),this.isFunction(e)&&(this._onReject=e),!e&&this.isFunction(t)){var i=this;n().asap(function(){t(function(t){i.resolve(t)},function(t){i.reject(t)})})}}),t.isFulfilled=function(){return 1==this._state},t.isPending=function(){return 0==this._state},t.isRejected=function(){return 2==this._state},t.onStateChange=function(t){this._listeners||(this._listeners=[]),this._listeners.push(t)},t.reject=function(t){if(!(this._fulfilled||this._rejected&&t!=this._rejectReason)){this._state=2,this._rejected=!0,this._rejectReason=t;for(var n=this._childPromises.length;n--;){var e=this._childPromises.shift();if(e._onReject)try{e._onReject(t),e.reject(t)}catch(i){e.reject(i)}else e.reject(t)}this.triggerStateChange()}},t.rejectReason=function(t){return t?void(this._rejectReason=t):this._rejectReason},t.resolve=function(t){if(!(this._state>0)){if(t==this)return this._rejectReason="TypeError",void this.reject(this._rejectReason);if(this.isObject(t)&&t._isAPromise){if(this._state=t._state,this._stateValue=t._stateValue,this._rejectReason=t._rejectReason,0===this._state){var n=this;t.onStateChange(function(){1==t._state&&n.resolve(t.value()),2==t._state&&n.reject(t.rejectReason())})}return 1==this._state&&this.fulfill(this._stateValue),void(2==this._state&&this.reject(this._rejectReason))}if(this.isObject(t)&&t.then&&this.isFunction(t.then)){var e=!1;try{var n=this;t.then.call(t,function(t){e||(n.resolve(t),e=!0)},function(t){e||(n.reject(t),e=!0)})}catch(i){e||this.reject(i)}}else this._state=1,this._stateValue=t,this.fulfill(t)}},t.state=function(t){return"undefined"!=typeof t&&(this._state=t),this._state},t.then=function(t,i){i||(i=function(){});var r=new e(t,i),o=this;return 1==this._state&&n().asap(function(){o.fulfill(o.value())}),2==this._state&&n().asap(function(){o.reject(o.rejectReason())}),this._childPromises.push(r),r},t.triggerStateChange=function(){var t=this;this._listeners&&(this._listeners.forEach(function(n){n(t)}),this._listeners.length=0)},t.value=function(t){return"undefined"!=typeof t?(this._stateValue=t,this):this._stateValue}}(this)},e=function(t,n,i,r,o,a,s,f){var u,c=this;if(!(c instanceof e))return new e(t,n,i,r,o,a,s,f);var l=[t,n,i,r,o,a,s,f];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){u=t.apply(c,l)}),"function"==typeof u){if(u._classInfo.name!=e._classInfo.name)return new u(t,n,i,r,o,a,s,f)}else if(u)return u;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,l)}):"function"==typeof c.init&&c.init.apply(c,l)};e._classInfo={name:"_promise"},e.prototype=new n;var i=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this);var t=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){t._cursorAction=function(t,n,i){var r,o=e(),a=this._db.transaction(this._table,t),s=a.objectStore(this._table);if(n){var f,u;for(var c in n)n.hasOwnProperty(c)&&(u=c,f=IDBKeyRange.only(n[c]));if(!u)return void o.reject("invalid index key");var l=s.index(u);r=l.openCursor(f)}else r=s.openCursor();return a.oncomplete=function(){o.resolve(!0)},r.onerror=function(t){console.log(t)},r.onsuccess=function(t){var n=t.target.result;n&&(i(n),n.continue())},o},t.addRows=function(t){var n=e(),i=this._db.transaction([this._table],"readwrite");i.oncomplete=function(){n.resolve(!0)},i.onerror=function(t){n.reject(t)};var r=i.objectStore(this._table);for(var o in t){var a=r.add(t[o]);a.onsuccess=function(){}}return n},t.clear=function(){var t=e(),n=this._db.transaction(this._table,"readwrite"),i=n.objectStore(this._table),r=i.clear();return r.onerror=function(n){t.fail(n.target.errorCode)},r.onsuccess=function(){t.resolve(!0)},t},t.count=function(){var t=e(),n=this._db.transaction([this._table],"readonly");return n.objectStore(this._table).count().onsuccess=function(n){t.resolve(n.target.result)},t},t.forEach=function(t,n){return this._cursorAction("readonly",n,function(n){t(n.value,n)})},t.get=function(t){var n=e(),i=this._db.transaction(this._table,"readonly"),r=i.objectStore(this._table),o=r.get(t);return o.onerror=function(e){console.log("Could not get ",t),n.fail(e.target.errorCode)},o.onsuccess=function(){n.resolve(o.result)},n},t.getAll=function(t){var n=[],i=this;return e(function(e,r){i._cursorAction("readonly",t,function(t){n.push(t.value)}).then(function(){e(n)}).fail(r)})},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n){this._db=t,this._table=n}),t.readAndDelete=function(t){var n=[],i=this;return e(function(e,r){i._cursorAction("readwrite",t,function(t){n.push(t.value),t.delete()}).then(function(){e(n)}).fail(r)})},t.remove=function(t){var n=this;return e(function(e,i){n._cursorAction("readwrite",t,function(t){t.delete()}).then(function(){e(!0)}).fail(i)})},t.update=function(t,n){var i=e(),r=this,o=this._db.transaction([this._table],"readwrite"),a=o.objectStore(this._table);try{var s=a.get(t);s.onerror=function(t){return s.result?void i.fail(t.target.errorCode):void r.addRows([n]).then(function(){i.resolve(n)})},s.onsuccess=function(){if(!s.result)return void r.addRows([n]).then(function(){i.resolve(n)});var t=a.put(n);t.onerror=function(){i.fail("update failed ")},t.onsuccess=function(){i.resolve(n)}}}catch(f){return this.addRows([n])}return i}}(this)},n=function(t,e,i,r,o,a,s,f){var u,c=this;if(!(c instanceof n))return new n(t,e,i,r,o,a,s,f);var l=[t,e,i,r,o,a,s,f];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){u=t.apply(c,l)}),"function"==typeof u){if(u._classInfo.name!=n._classInfo.name)return new u(t,e,i,r,o,a,s,f)}else if(u)return u;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,l)}):"function"==typeof c.init&&c.init.apply(c,l)};n._classInfo={name:"dbTable"},n.prototype=new t,function(t){var e,i,o;t._initDB=function(){o||(o=window.indexedDB,e=!0,i=r("sys.db",{tables:{databases:{createOptions:{keyPath:"name"}}}}))},t.clearDatabases=function(t){i.then(function(){var n=i.table("databases");n.forEach(function(n,e){t(n)&&(o.deleteDatabase(n.name),e.delete())})})},t.getDB=function(){return this._db},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n){if(!this._db&&(this._initDB(),t)){var e=this,r=o.open(t,4);r.onerror=function(t){console.error(t.target.errorCode)},r.onsuccess=function(n){i.then(function(){var n=i.table("databases");n.addRows([{name:t}])}),e._db=n.target.result,e.resolve(!0)},r.onupgradeneeded=function(t){var i=t.target.result;if(e._db=i,n&&n.tables)for(var r in n.tables)if(n.tables.hasOwnProperty(r)){var o=n.tables[r],a=i.createObjectStore(r,o.createOptions);if(o.indexes)for(var s in o.indexes)if(o.indexes.hasOwnProperty(s)){var f=o.indexes[s];a.createIndex(s,s,f)}}}}}),t.table=function(t){return n(this._db,t)}}(this)},r=function(t,n,e,i,o,a,s,f){var u,c=this;if(!(c instanceof r))return new r(t,n,e,i,o,a,s,f);var l=[t,n,e,i,o,a,s,f];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){u=t.apply(c,l)}),"function"==typeof u){if(u._classInfo.name!=r._classInfo.name)return new u(t,n,e,i,o,a,s,f)}else if(u)return u;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,l)}):"function"==typeof c.init&&c.init.apply(c,l)};i.prototype=e.prototype,r._classInfo={name:"_localDB"},r.prototype=new i;var o=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){t._isFile=function(t){var n=this._pathObj;return"undefined"==typeof n[t]||this.isObject(n[t])?!1:!0},t._isFolder=function(t){var n=this._pathObj;return"undefined"!=typeof n[t]&&this.isObject(n[t])?!0:!1},t.appendFile=function(t,n){var i=this;return e(function(e,r){var o=i._pathObj;return"string"!=typeof n?void r({result:!1,text:"Only string writes are accepted"}):void(i._isFile(t)?(o[t]+=n,e({result:!0})):(o[t]=n,e({result:!0,text:"Created the file"})))})},t.createDir=function(t){var n=this;return e(function(e){var i=n._pathObj;n._isFile(t)||n._isFolder(t)||(i[t]={}),e({result:!0})})},t.findPath=function(t){"/"==t.charAt(0)&&(t=t.substring(0));var n=t.trim().split("/"),i=this;return e(function(t){if(!n[0])return void t(i);for(var e,r,o;e=n.shift();){if(!i)return void t(!1);r?r=r.then(function(t){return o=t,t?t.isFolder(e):!1}):(o=i,r=i.isFolder(e)),r=r.then(function(t){return t?o.getFolder(e):!1})}r.then(t)})},t.fromData=function(t){var n=this;return e(function(i,r){n._pathObj||(n._pathObj={});var o=[],a=e();for(var f in t)if(n.isObject(t[f])){n._pathObj[f]&&n._isFolder(f)||(n._pathObj[f]={});var u=s(n._server,n._pathObj[f]);o.push(u.fromData(t[f]))}else t[f]===!0||(n._pathObj[f]=t[f]);a.all(o).then(function(){i(!0)}).fail(r),a.resolve(!0)})},t.getFolder=function(t){return this.getSubFolderObj(t)},t.getSubFolderObj=function(t){return this.isObject(this._pathObj[t])?s(this._server,this._pathObj[t]):void 0},t.getTree=function(){var t=this.toData({getData:!1});return t},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n){this._server=t,this._pathObj=n}),t.isFile=function(t){var n=this;return e(function(e){e(n._isFile(t))})},t.isFolder=function(t){var n=this;return e(function(e){e(n._isFolder(t))})},t.linesToJsonArray=function(t){if(!t||"string"!=typeof t)return[];var n=t.split("\n"),e=[];return n.forEach(function(t){0!=t.trim().length&&e.push(JSON.parse(t))}),e},t.listFiles=function(){var t=this;return e(function(n){var e=t._pathObj,i=[];for(var r in e)t._isFile(r)&&i.push(r);n(i)})},t.listFolders=function(){var t=this;return e(function(n){var e=t._pathObj,i=[];for(var r in e)t._isFolder(r)&&i.push(r);n(i)})},t.readFile=function(t){var n=this;return e(function(e,i){var r=n._pathObj;return n._isFile(t)?void e(r[t]):void i("File does not exist")})},t.removeFile=function(t){var n=this;return e(function(e){var i=n._pathObj;n._isFile(t)&&delete i[t],e({result:!0,text:"file "+t+" removed"})})},t.toData=function(t){var n=(this._rootDir,this),t=t||{},i=t.fileFilter,r=t.dirFilter;return"undefined"==typeof t.getData&&(t.getData=!0),e(function(o){var a={};n.listFiles().then(function(r){var o=r.length,s=0,f=e();return r.forEach(function(e){return i&&!i(e)?(s++,void(s==o&&f.resolve(!0))):void(t.getData?n.readFile(e).then(function(t){a[e]=t,s++,s==o&&f.resolve(!0)}):(a[e]=!0,s++,s==o&&f.resolve(!0)))}),0==o&&f.resolve(!0),f}).then(function(){return n.listFolders()}).then(function(t){var o=t.length,s=0,f=e();return t.forEach(function(t){if(r&&!r(t))return s++,void(s==o&&f.resolve(!0));var e=n.getSubFolderObj(t);e.toData(i,r).then(function(n){a[t]=n,s++,s==o&&f.resolve(!0)})}),0==o&&f.resolve(!0),f}).then(function(){o(a)}).fail(function(){o({})})})},t.writeFile=function(t,n){var i=this;return e(function(e,r){var o=i._pathObj;return"string"!=typeof n?void r({result:!1,text:"Only string writes are accepted"}):i._isFolder(t)?void r({result:!1,text:"Modifying the file failed"}):(o[t]=n,void e({result:!0}))})}}(this)},s=function(t,n,e,i,r,o,a,f){var u,c=this;if(!(c instanceof s))return new s(t,n,e,i,r,o,a,f);var l=[t,n,e,i,r,o,a,f];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){u=t.apply(c,l)}),"function"==typeof u){if(u._classInfo.name!=s._classInfo.name)return new u(t,n,e,i,r,o,a,f)}else if(u)return u;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,l)}):"function"==typeof c.init&&c.init.apply(c,l)};s._classInfo={name:"memoryFsFolder"},s.prototype=new o,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.memoryFsFolder=s,this.memoryFsFolder=s):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.memoryFsFolder=s:this.memoryFsFolder=s}.call(new Function("return this")());var f=function(){!function(t){var n;t._initServers=function(){n||(n={})},t.getRootFolder=function(){var t=this;return s(t,t._fsData)},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n){this._serverName=t,this._initServers(),this._fsData=n||{},this.resolve(!0)})}(this)},u=function(t,n,e,i,r,o,a,s){var f,c=this;if(!(c instanceof u))return new u(t,n,e,i,r,o,a,s);var l=[t,n,e,i,r,o,a,s];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){f=t.apply(c,l)}),"function"==typeof f){if(f._classInfo.name!=u._classInfo.name)return new f(t,n,e,i,r,o,a,s)}else if(f)return f;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,l)}):"function"==typeof c.init&&c.init.apply(c,l)};f.prototype=e.prototype,u._classInfo={name:"fsServerMemory"},u.prototype=new f,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.fsServerMemory=u,this.fsServerMemory=u):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.fsServerMemory=u:this.fsServerMemory=u}.call(new Function("return this")());var c=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){var n,i;t._mkDir=function(t){if("string"!=typeof t)throw console.log(JSON.stringiry(t)),console.log("--- is not object"),"WRROR";n.existsSync(t)||n.mkdirSync(t,502,function(){})},t.appendFile=function(t,r){var o=this._rootDir;return e(function(e,a){if("string"!=typeof r)return void a({result:!1,text:"Only string writes are accepted"});t=i.basename(t);var s=o+"/"+t;n.appendFile(s,r,function(t){return t?void a(t):void e({result:!0,text:"File written"})})})},t.createDir=function(t){var n=this._rootDir,r=this;return e(function(e){var o=i.basename(t);r._mkDir(n+"/"+o),e({result:!0,text:"Directory created"})})},t.fromData=function(t){{var n=this;this._rootDir}return e(function(r,o){var a=[],s=e();for(var f in t){if(f.indexOf("..")>=0)return void o(".. symbol is not allowed in the file or path names");var u=i.basename(f);n.isObject(t[u])?!function(){var i=e();a.push(i),n.createDir(u).then(function(){var e=n.getSubFolderObj(u);return e.fromData(t[u])}).then(function(){i.resolve()}).fail(function(){i.resolve()})}():"string"==typeof t[u]&&a.push(n.writeFile(u,t[u]))}s.all(a).then(function(){r(!0)}).fail(o),s.resolve(!0)})},t.getFolder=function(t){return this.getSubFolderObj(t)},t.getSubFolderObj=function(t){return l(this._rootDir+"/"+t)},t.getTree=function(){return this.toData({getData:!1})},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){if(this._rootDir=t,!t)throw" The directory must be specified ";if("string"!=typeof t)throw" The directory must be string ";if(t.indexOf("..")>=0||t.indexOf("~")>=0)throw"The directory must not contain relative path parts";n||(n=require("fs"),i=require("path"))}),t.isFile=function(t){var r=this._rootDir;return e(function(e){t=i.basename(t),n.stat(r+"/"+t,function(t,n){return t||!n.isFile()?void e(!1):void e(!0)})})},t.isFolder=function(t){var r=this._rootDir;return e(function(e){t=i.basename(t),n.stat(r+"/"+t,function(t,n){return t||!n.isDirectory()?void e(!1):void e(!0)})})},t.linesToJsonArray=function(t){if(!t||"string"!=typeof t)return[];var n=t.split("\n"),e=[];return n.forEach(function(t){0!=t.trim().length&&e.push(JSON.parse(t))}),e},t.listFiles=function(){var t=this._rootDir;return e(function(e,i){n.readdir(t,function(r,o){if(r)return void i(r);var a=o.length,s=[];0==a&&e(s),o.forEach(function(i){n.stat(t+"/"+i,function(t,n){!t&&n.isFile()&&s.push(i),a--,0==a&&e(s)})})})})},t.listFolders=function(){var t=this._rootDir;return e(function(e,i){n.readdir(t,function(r,o){if(console.log(o),r)return void i(r);var a=o.length,s=[];0==a&&e(s),o.forEach(function(i){n.stat(t+"/"+i,function(t,n){!t&&n.isDirectory()&&(console.log("Dir "+i),s.push(i)),a--,0==a&&(console.log("Cnt == 0"),e(s))})})})})},t.readFile=function(t){var r=this._rootDir;return e(function(e,o){t=i.basename(t),n.readFile(r+"/"+t,"utf8",function(t,n){return t?void o(t):void e(n)})})},t.removeFile=function(t){var r=this._rootDir;return e(function(e,o){t=i.basename(t),n.unlink(r+"/"+t,function(n){return n?void o(n):void e({result:!0,text:"file "+t+" removed"})})})},t.toData=function(t){var n=(this._rootDir,this),t=t||{},i=t.fileFilter,r=t.dirFilter;return"undefined"==typeof t.getData&&(t.getData=!0),e(function(o){var a={};n.listFiles().then(function(r){var o=r.length,s=0,f=e();return r.forEach(function(e){return i&&!i(e)?(s++,void(s==o&&f.resolve(!0))):void(t.getData?n.readFile(e).then(function(t){a[e]=t,s++,s==o&&f.resolve(!0)}):(a[e]=!0,s++,s==o&&f.resolve(!0)))}),0==o&&f.resolve(!0),f}).then(function(){return n.listFolders()}).then(function(t){var o=t.length,s=0,f=e();return t.forEach(function(t){if(r&&!r(t))return s++,void(s==o&&f.resolve(!0));var e=n.getSubFolderObj(t);e.toData(i,r).then(function(n){a[t]=n,s++,s==o&&f.resolve(!0)})}),0==o&&f.resolve(!0),f}).then(function(){o(a)}).fail(function(){o({})})})},t.writeFile=function(t,r){var o=this._rootDir;return e(function(e,a){return"string"!=typeof r?void a({result:!1,text:"Only string writes are accepted"}):(t=i.basename(t),void n.writeFile(o+"/"+t,r,function(t){return t?void a(t):void e({result:!0,text:"File written"})}))})}}(this)},l=function(t,n,e,i,r,o,a,s){var f,u=this;if(!(u instanceof l))return new l(t,n,e,i,r,o,a,s);var c=[t,n,e,i,r,o,a,s];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,c)}),"function"==typeof f){if(f._classInfo.name!=l._classInfo.name)return new f(t,n,e,i,r,o,a,s)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,c)}):"function"==typeof u.init&&u.init.apply(u,c)};l._classInfo={name:"nodeFsFolder"},l.prototype=new c,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.nodeFsFolder=l,this.nodeFsFolder=l):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.nodeFsFolder=l:this.nodeFsFolder=l}.call(new Function("return this")());var h=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){var n;t.hasOwnProperty("__factoryClass")||(t.__factoryClass=[]),t.__factoryClass.push(function(t,e){var i=t.getID()+e;return n||(n={}),n[i]?n[i]:void(n[i]=this)}),t._filePath=function(t){var n=this._path+"/"+t;return n=n.replace("//","/")},t._isFile=function(t){var n=this;return e(function(e,i){n._loadFiles().then(function(n){for(var i=0;i<n.length;i++)if(n[i].name==t)return void e(!0);e(!1)}).fail(i)})},t._isFolder=function(t){var n=this;return e(function(e,i){t=n._normalize(n._path+"/"+t+"/"),n._loadFolders().then(function(n){for(var i=0;i<n.length;i++)if(n[i].name==t)return void e(!0);e(!1)}).fail(i)})},t._lastPath=function(t){for(var n=t.split("/"),t=n.pop();n.length>0;){if(t.length>0)return t;t=n.pop()}return t},t._loadFiles=function(){var t=this._db,n=this;return e(function(e){n._server.then(function(){t.table("files").getAll({folderName:n._path}).then(function(t){n._fileCache=t,e(n._fileCache)})})})},t._loadFolders=function(){var t=this._db,n=this;return e(function(e){n._server.then(function(){t.table("folders").getAll({parentFolder:n._path}).then(function(t){n._folderCache=t,e(n._folderCache)})})})},t._normalize=function(t){var n=t.replace("//","/");return n},t._onlyClearWrites=function(t){var n=this,i=this._db,r=this._server;return e(function(e,o){r.then(function(){return n._isFile(t)}).then(function(e){return e?"OK":i.table("files").addRows([{name:t,folderName:n._path}])}).then(function(){return i.table("fileWrites").remove({filePath:n._filePath(t)})}).then(function(){e({result:!0,text:"writes cleared"})}).fail(o)})},t._removeFileFromCache=function(t){if(this._fileCache)for(var n=0;n<this._fileCache.length;n++)if(this._fileCache[n].name==t)return void this._fileCache.splice(n,1)},t._removeFolderFromCache=function(t){if(this._folderCache)for(var n=0;n<this._fileCache.length;n++)if(this._folderCache[n].name==t)return void this._folderCache.splice(n,1)},t.appendFile=function(t,n){var i=this,r=this._db,o=this._server;return e(function(e,a){return"string"!=typeof n?void a({result:!1,text:"Only string writes are accepted"}):void o.then(function(){return i._isFile(t)}).then(function(n){return n?"OK":r.table("files").addRows([{name:t,folderName:i._path}])}).then(function(){return r.table("fileWrites").addRows([{filePath:i._filePath(t),data:n}])}).then(function(){e({result:!0,text:"file "+t+" written"})}).fail(a)})},t.createDir=function(t){var n=this,i=this._db,r=this._server;return e(function(e,o){r.then(function(){return n._isFolder(t)}).then(function(e){if(e)return"OK";var r={name:n._normalize(n._path+t+"/"),parentFolder:n._path};return i.table("folders").addRows([r])}).then(function(){e({result:!0,text:"folder "+t+" created"})}).fail(o)})},t.fromData=function(t){var n=this,i=(this._db,this._server);return e(function(r,o){var s=[],f=e();i.then(function(){for(var i in t){if(i.indexOf("..")>=0)return void o(".. symbol is not allowed in the file or path names");var u=a;n.isObject(t[u])?!function(){var i=e();s.push(i),n.createDir(u).then(function(){var e=n.getSubFolderObj(u);return e.fromData(t[u])}).then(function(){i.resolve()}).fail(function(){i.resolve()})}():"string"==typeof t[u]&&s.push(n.writeFile(u,t[u]))}f.all(s).then(function(){r(!0)}).fail(o),f.resolve(!0)})})},t.getFolder=function(t){return this.getSubFolderObj(t)},t.getSubFolderObj=function(t){var n=this._normalize(this._path+t+"/");return _(this._server,n)},t.getTree=function(){var t=this.toData({getData:!1});return t},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,n){this._server=t,this._path=n,this._db=t.getDb()}),t.isFile=function(t){var n=this;return e(function(e){e(n._isFile(t))})},t.isFolder=function(t){var n=this;return e(function(e){e(n._isFolder(t))})},t.linesToJsonArray=function(t){if(!t||"string"!=typeof t)return[];var n=t.split("\n"),e=[];return n.forEach(function(t){0!=t.trim().length&&e.push(JSON.parse(t))}),e},t.listFiles=function(){var t=this,n=(this._db,this._server);return e(function(e,i){n.then(function(){t._loadFiles().then(function(t){var n=[];t.forEach(function(t){n.push(t.name)}),e(n)})}).fail(i)})},t.listFolders=function(){var t=this,n=(this._db,this._server);return e(function(e,i){n.then(function(){t._loadFolders().then(function(t){var n=[];t.forEach(function(t){n.push(t.name)}),e(n)})}).fail(i)})},t.readFile=function(t){var n=this,i=this._db,r=this._server;return e(function(e,o){r.then(function(){return n._isFile(t)}).then(function(t){if(t)return"OK";throw"The file does not exist"}).then(function(){return i.table("fileWrites").getAll({filePath:n._filePath(t)})}).then(function(t){var n="";t.forEach(function(t){n+=t.data}),e(n)}).fail(o)})},t.removeFile=function(t){var n=this,i=this._db,r=this._server;return e(function(e,o){var a=!1;r.then(function(){return n._isFile(t)}).then(function(e){return a=e,e?i.table("fileWrites").remove({filePath:n._filePath(t)}):"OK"}).then(function(){return a?i.table("files")._cursorAction("readwrite",{folderName:n._path},function(e){var i=e.value;i.name==t&&(e.delete(),n._removeFileFromCache(t))}):"OK"}).then(function(){e({result:!0,text:"file "+t+" removed"})}).fail(o)})},t.toData=function(t){var n=this,t=t||{},i=t.fileFilter,r=t.dirFilter;return"undefined"==typeof t.getData&&(t.getData=!0),e(function(o){var a={};n.listFiles().then(function(r){var o=r.length,s=0,f=e();return r.forEach(function(e){return i&&!i(e)?(s++,void(s==o&&f.resolve(!0))):void(t.getData?n.readFile(e).then(function(t){a[e]=t,s++,s==o&&f.resolve(!0)}):(a[e]=!0,s++,s==o&&f.resolve(!0)))}),0==o&&f.resolve(!0),f}).then(function(){return n.listFolders()}).then(function(t){var o=t.length,s=0,f=e();return t.forEach(function(t){if(r&&!r(t))return s++,void(s==o&&f.resolve(!0));var e=n._lastPath(t),u=n.getSubFolderObj(e);u.toData(i,r).then(function(t){a[e]=t,s++,s==o&&f.resolve(!0)})}),0==o&&f.resolve(!0),f}).then(function(){o(a)}).fail(function(){o({})})})},t.writeFile=function(t,n){var i=this,r=this._db,o=this._server;return e(function(e,a){return"string"!=typeof n?void a({result:!1,text:"Only string writes are accepted"}):void o.then(function(){return i._isFile(t)}).then(function(n){return n?"OK":r.table("files").addRows([{name:t,folderName:i._path}])}).then(function(){return r.table("fileWrites").remove({filePath:i._filePath(t)})}).then(function(){return r.table("fileWrites").addRows([{filePath:i._filePath(t),data:n}])}).then(function(){e({result:!0,text:"file "+t+" written"})}).fail(a)})}}(this)},_=function(t,n,e,i,r,o,a,s){var f,u=this;if(!(u instanceof _))return new _(t,n,e,i,r,o,a,s);var c=[t,n,e,i,r,o,a,s];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,c)}),"function"==typeof f){if(f._classInfo.name!=_._classInfo.name)return new f(t,n,e,i,r,o,a,s)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,c)}):"function"==typeof u.init&&u.init.apply(u,c)};_._classInfo={name:"indexedDBFsFolder"},_.prototype=new h,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.indexedDBFsFolder=_,this.indexedDBFsFolder=_):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.indexedDBFsFolder=_:this.indexedDBFsFolder=_}.call(new Function("return this")());var d=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){var n;t.hasOwnProperty("__factoryClass")||(t.__factoryClass=[]),t.__factoryClass.push(function(t){return n||(n={}),n[t]?n[t]:void(n[t]=this)}),t.createFrom=function(){},t.getDb=function(){return this._db},t.getID=function(){return this._id||(this._id=this.guid()),this._id},t.getRootFolder=function(){return _(this,"/")},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){var n=this;this._serverName=t,this._dbName="vserver://"+t,this._db=r(this._dbName,{tables:{folders:{createOptions:{keyPath:"name"},indexes:{parentFolder:{unique:!1}}},files:{createOptions:{autoIncrement:!0},indexes:{folderName:{unique:!1}}},fileWrites:{createOptions:{autoIncrement:!0},indexes:{filePath:{unique:!1}}}}}),this._db.then(function(){n._db.table("folders").count().then(function(t){t>=1?n.resolve(!0):n._db.table("folders").addRows([{name:"/"}]).then(function(){n.resolve(!0)})})})})}(this)},v=function(t,n,e,i,r,o,a,s){var f,u=this;if(!(u instanceof v))return new v(t,n,e,i,r,o,a,s);var c=[t,n,e,i,r,o,a,s];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,c)}),"function"==typeof f){if(f._classInfo.name!=v._classInfo.name)return new f(t,n,e,i,r,o,a,s)
}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,c)}):"function"==typeof u.init&&u.init.apply(u,c)};d.prototype=e.prototype,v._classInfo={name:"fsServerIndexedDB"},v.prototype=new d,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.fsServerIndexedDB=v,this.fsServerIndexedDB=v):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.fsServerIndexedDB=v:this.fsServerIndexedDB=v}.call(new Function("return this")());var p=function(){!function(t){var n;t._initServers=function(){n||(n={})},t.getRootFolder=function(){var t=this._fsRoot;if(!t||t.length<15||t.indexOf("..")>=0)throw"Invalid root folder";var n=this;return l(n._fsRoot)},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){if(!t||t.length<15||t.indexOf("..")>=0)throw"Invalid root folder";this._fsRoot=t,this.resolve(!0)})}(this)},y=function(t,n,e,i,r,o,a,s){var f,u=this;if(!(u instanceof y))return new y(t,n,e,i,r,o,a,s);var c=[t,n,e,i,r,o,a,s];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){f=t.apply(u,c)}),"function"==typeof f){if(f._classInfo.name!=y._classInfo.name)return new f(t,n,e,i,r,o,a,s)}else if(f)return f;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,c)}):"function"==typeof u.init&&u.init.apply(u,c)};p.prototype=e.prototype,y._classInfo={name:"fsServerNode"},y.prototype=new p,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.fsServerNode=y,this.fsServerNode=y):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.fsServerNode=y:this.fsServerNode=y}.call(new Function("return this")()),function(t){t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){})}(this)},e=function(t,n,i,r,o,a,s,f){var u,c=this;if(!(c instanceof e))return new e(t,n,i,r,o,a,s,f);var l=[t,n,i,r,o,a,s,f];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){u=t.apply(c,l)}),"function"==typeof u){if(u._classInfo.name!=e._classInfo.name)return new u(t,n,i,r,o,a,s,f)}else if(u)return u;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,l)}):"function"==typeof c.init&&c.init.apply(c,l)};e._classInfo={name:"localFs"},e.prototype=new n,"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());