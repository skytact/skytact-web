//content
const parseLink = (link = "") => {
	if (!link) return ["", ""];
	const args = link.split('/');
	let host = "skytact-api.space";
	let name = args[0];
	if (args.length == 2) {
		host = "skytact-api.space";
		name = args[1];
	}
	return [host, name];
}

export default parseLink;
