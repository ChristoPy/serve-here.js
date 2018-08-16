# serve-here.js

Serve static files over HTTP

# Installation

```shell
npm install serve-here.js -g```

# Usage

Importing
```javascript
const ServeHereServer = require ("serve-here.js");
```

Running the server
```javascript
const Server = new ServeHereServer ();
Server.Start ();
```

Configuring the server
```javascript
const Server = new ServeHereServer ({

	root: "/my-site",   // Default is "./" (Not required)
	port: 4000,         // Default is 8000 (Not required)
	index: "test.html"  // Default is "index.html/" (Not required)
});
```

Stoping the server
```javascript
Server.Stop ();
```

# Version
1.0.2