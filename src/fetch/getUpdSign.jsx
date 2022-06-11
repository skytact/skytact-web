import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
import useData from "../libs/useData";

const getUpdSignQuery = (name, address) => {
	return `
		mutation {
			updsign(name: "${name}", address: "${address}")
		}
	`
}

const getUpdSign = async (addr) => {
	const [link, token] = useData();
	if (!link || !token) return ["", ""];
	const [host, name] = parseLink(link);
	const query = getUpdSignQuery(name, addr);
	try {
		const answ = await Fetching(host, query, token);
		return answ.updsign;
	} catch (err) {
		return Promise.resove(["", ""]);
	}
}
//
export default getUpdSign;
