# jayFuzz - File system emulator, wrapper and storage for memory, indexedDB and node.js

Why?

The system servers for following purposes:

1. To simulate filesystem read / write operations and persistence in client and server side using memory, node.js or IndexedDB as storage
2. To serialize small chunks of filesystem to JSON format
3. To unserialize small chunks of JSON file into filesystem

Since the filsesystem can be packaged (a bit like `tar` in linux, but in JSON) it is quick to set up a test environment.

Since the FS export is into JSON, you can also manipulate the filesystem using common JavaScript operation on libraries like lodash.

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








