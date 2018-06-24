const HTTP = require ("http");
const Path = require ("path");
const FS = require ("fs");

let ServerRootFolder;

const ConfigureMIMEType = FilePath => {

	const FileExtension = String (Path.extname (FilePath)).toLowerCase ();

	const MIMETypes = {
		".html": "text/html",
		".js": "text/javascript",
		".css": "text/css",
		".json": "application/json",
		".png": "image/png",
		".jpg": "image/jpg",
		".gif": "image/gif",
		".svg": "image/svg+xml"
	};

	return {"Content-Type": MIMETypes[FileExtension] || "application/octet-stream"};
}

const ConfigureFilePath = FilePath => {

	if (FilePath === "/") {

		FilePath = `${ServerRootFolder}/index.html`;
	} else {

		const Slash = FilePath.split ("")[FilePath.split ("").length - 1] === "/";

		FilePath = (Slash ? `${ServerRootFolder}${FilePath.slice (0, -1)}` : `${ServerRootFolder}${FilePath}`);
	}

	return FilePath;
}


const Server = HTTP.createServer ((Request, Response) => {

	let FilePath = ConfigureFilePath (Request.url);


	console.log (FilePath);


	FS.readFile (FilePath, function (SomeError, Data) {

		if (!SomeError) {

			Response.writeHead (200, ConfigureMIMEType (FilePath));
			Response.end (Data, "utf-8");
		}
		else {

			if (SomeError.code == "ENOENT") {

				FS.readFile ("./404.html", function (SomeError, Data) {
					Response.writeHead (200, ConfigureMIMEType ("./404.html"));
					Response.end (Data, "utf-8");
				});
			}
			else {

				Response.writeHead (500);
				Response.end ();

				console.log (`Internal Server Error: ${SomeError.code}`);
			}
		}
	});
});


module.exports.Start = (RootFolder, Port = 8000) => {

	if (!RootFolder) {

		throw new Error ("RootFolder must be especified");
	}

	ServerRootFolder = RootFolder;
	Server.listen (Port);
};
module.exports.Stop = () => process.exit ();