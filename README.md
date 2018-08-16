# serve-here.js

Serve static files over HTTP

# Installation

```shell
npm install serve-here.js -g
```

# Importing

```javascript
const ServeHereServer = require ("serve-here.js");
```

# Running

Code:
```javascript
const Server = new ServeHereServer ();
Server.Start ();
```

CLI:
```shell
serve-here
```

# Configuring

Code:
```javascript
const Server = new ServeHereServer ({

	folder: "/my-site",   // Default is "./" (Not required)
	port: 4000,           // Default is 8000 (Not required)
	index: "test.html"    // Default is "index.html/" (Not required)
});
```

CLI
```shell
serve-here -folder "/my-site" -port 4000 -index "test.html"
```

# Stoping
```javascript
Server.Stop ();
```

# Version
1.1.1