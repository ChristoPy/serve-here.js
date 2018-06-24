# serve-here.js
Serve static files over HTTP

# Installation
```npm install serve-here.js --save```

# Usage
```
// Get the static server.
const Server = require ("./Server.js");

// Start the server in the current path and on port 3000 (default is 8000).
Server.Start (__dirname, 3000);

// Stop the server.
Server.Stop ();
```

# Dependencies
none