const MIMETypes = require ("./mime-types.js");


module.exports.ConfigureFilePath = (Options, FilePath) => {

	const Slash = FilePath.split ("")[FilePath.split ("").length - 1] === "/";

	switch (FilePath) {

		case "/": return `${Options.ServerRootFolder}/${Options.IndexFile}`;
		default: return (Slash ? `${Options.ServerRootFolder}${FilePath.slice (0, -1)}` : `${Options.ServerRootFolder}${FilePath}`);
	}
}

module.exports.ConfigureHead = FilePath => {

	const FileExtension = String (Path.extname (FilePath)).toLowerCase ();

	return {"Content-Type": MIMETypes.Get (FileExtension)};
}