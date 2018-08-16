const Path = require ("path");
const MIMETypes = require ("./mime-types.js");


module.exports.ConfigureFilePath = (Options, FilePath) => {

	const Slash = FilePath.split ("")[FilePath.split ("").length - 1] === "/";

	switch (FilePath) {

		case "/": return `${Options.RootFolder}/${Options.IndexFile}`;
		default: return (Slash ? `${Options.RootFolder}${FilePath.slice (0, -1)}` : `${Options.RootFolder}${FilePath}`);
	}
}

module.exports.ConfigureHead = FilePath => {

	const FileExtension = String (Path.extname (FilePath)).toLowerCase ().replace (".", "");

	return {"Content-Type": MIMETypes.Get (FileExtension)};
}