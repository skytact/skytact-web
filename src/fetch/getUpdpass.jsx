import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
import useData from "../libs/useData";

//
const getUpdpassQuery = (name, pwd, updpwd) => {
	return `
		mutation {
			updpass(name: "${name}", pwd: "${pwd}", updpwd: "${updpwd}")
		}
	`
}

//
const getUpdpass = async (pwd, updpwd) => {
	const [link, token] = useData();
	if (!link || !token) return Promise.reject("нет доступа!");
	const [host, name] = parseLink(link);
	const query = getUpdpassQuery(name, pwd, updpwd);
	try {
		//
		const answ = await Fetching(host, query, token);
		console.log(answ);
		return typeof answ.updpass == "boolean" 
			? answ.updpass 
			: Promise.reject("неизвестная ошибка");
	} catch (err) {
		//
		return Promise.reject(err);
	}
}

export default getUpdpass;
