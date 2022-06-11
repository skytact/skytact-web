import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
import useData from "../libs/useData";

const getUpdcardQuery = (name, param, data) => {
	return `
		mutation {
			updcard(name: "${name}", param: "${param}", data: "${data}")
		}
	`
}

const getUpdcard = async (param, value) => {
	//
	const [link, token] = useData();
	if (!link || !token) return Promise.reject("ошибка доступа");
	const [host, nick] = parseLink(link);
	const query = getUpdcardQuery(nick, param, value);
	try {
		//
		const answ = await Fetching(host, query, token);
		if (typeof answ.updcard == "boolean") return answ.updcard;
		throw new Error('incorrect response');
	}
	catch (err) {
		//
		return Promise.reject(err);
	}
}

export default getUpdcard;
