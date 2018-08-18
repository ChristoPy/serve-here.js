const HTTP = require ("http");
const FileSystem = require ("fs");
const {ConfigureFilePath, ConfigureHead} = require ("./response.js");


class Server {

	constructor (Options = {}) {

		this.Options = {

			RootFolder: Options.folder ? process.cwd () + Options.folder : process.cwd (),
			IndexFile: Options.index || "index.html",
			Port: Options.port || 8000
		};

		this.Server = HTTP.createServer ((Request, Response) => {

			const ReceivedRequest = Date.now ();


			const FilePath = ConfigureFilePath (this.Options, Request.url);

			console.log (`[${new Date ().toLocaleString ()}] | [...] ${Request.url}`);

			FileSystem.readFile (FilePath, function (SomeError, Data) {

				if (!SomeError) {

					Response.writeHead (200, ConfigureHead (FilePath));
					Response.end (Data, "utf-8");

					console.log (`[${new Date ().toLocaleString ()}] | [200] ${Request.url} | [${Date.now () - ReceivedRequest}ms]`);
				}
				else {

					if (SomeError.code === "ENOENT") {

						Response.writeHead (404);
						Response.end ();

						console.log (`[${new Date ().toLocaleString ()}] | [404] ${Request.url}`);
					}
					else {

						Response.writeHead (500);
						Response.end ();

						console.log (`[${new Date ().toLocaleString ()}] | ${Request.url}`);
						console.log (`Internal Server Error: ${SomeError.code}`);
					}
				}
			});
		});
	}

	Start () {

		this.Server.listen (this.Options.Port);
		console.log (`Serving files of ${this.Options.RootFolder} at port ${this.Options.Port}`);
	}

	Stop () {

		console.log ("Server stoped")
		process.exit ();
	}
}

module.exports = Server;