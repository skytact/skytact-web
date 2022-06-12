import Fetching from "../libs/fetching";
import parseLink from "../libs/parseLink";

const getGetAddrQuery = (name) => {
	return `
		{
			getaddr(name: "${name}")
		}
	`
}

const getGetAddr = async (h, name) => {
	//parsing for to get correct hostname
	const [host] = parseLink(h + "/" + name);
	if (!host) return Promise.reject("parsing error: incorrect hostname or nick!");
	const query = getGetAddrQuery(name);
	try {
		const answ = await Fetching(host, query);
		return answ.getaddr;
	} catch (err) {
		return Promise.reject(err);
	}
}

export default getGetAddr;
