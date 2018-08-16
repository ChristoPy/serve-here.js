#!/usr/bin/env node
const Server = require ("./../source/server.js");
const Commander = require ("commander");

Commander
	.option ("-f, --folder <folder>", "The folder where run the server")
	.option ("-p, --port <port>", "The port where the server will listen")
	.option ("-i, --index <index>", "The name of the file to be loaded when the user enters '/'")
	.action (() => {

		const MyServer = new Server (Commander);
		MyServer.Start ();
	})
	.parse (process.argv);
