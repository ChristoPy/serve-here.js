const Path = require ("path");
const MIMETypes = require ("./mime-types.js");

const HasMaliciousPath = (Options, ReceivedPath) => {

	const HasNullByte = ReceivedPath.indexOf('\0') !== -1;
	const HasPathTraversal = Path.join(Options.RootFolder, ReceivedPath).indexOf(Options.RootFolder) !== 0;

	if (HasNullByte || HasPathTraversal) {
		return true;
	}
};

module.exports.ConfigureFilePath = (Options, FilePath) => {

	const Slash = FilePath.split ("")[FilePath.split ("").length - 1] === "/";

	if (FilePath === "/") {
		return `${Options.RootFolder}/${Options.IndexFile}`;
	} else {
		const IsMalicious = HasMaliciousPath(Options, FilePath);

		if (IsMalicious) {
			return null;
		} else {
			return (Slash ? `${Options.RootFolder}${FilePath.slice (0, -1)}` : `${Options.RootFolder}${FilePath}`);
		}
	}
}

module.exports.ConfigureHead = FilePath => {

	const FileExtension = String (Path.extname (FilePath)).toLowerCase ().replace (".", "");

	return {"Content-Type": MIMETypes.Get (FileExtension)};
}