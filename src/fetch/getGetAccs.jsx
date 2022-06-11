import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
import useData from "../libs/useData";
//
const getGetAccsQuery = (name, address) => {
	return `
		{
			getaccs(name: "${name}", address: "${address}")
		}	
	`;
};
//
const getGetAccs = async (addr) => {
	const [link, token] = useData();
	if (!link) return false;
	const [host, name] = parseLink(link);
	const query = getGetAccsQuery(name, addr);
	try {
		const answ = await Fetching(host, query);
		return answ.getaccs;
	} catch (err) {
		return Promise.resolve(false);
	}
}

export default getGetAccs;
