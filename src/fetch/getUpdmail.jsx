import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
import useData from "../libs/useData";

const getUpdmailQuery = (name, mail, code) => {
	return `
		mutation {
			updmail(name: "${name}", mail: "${mail}", code: "${code}")
		}
	`
}

const getUpdmail = async (mail, code) => {
	if (!mail || !code) return Promise.reject("заполните обязательные поля!")
	const [link, token] = useData();
	if (!link || !token) return Promise.reject("войдите в систему!");
	const [host, name] = parseLink(link);
	if (!host || !name) return Promise.reject("войдите в систему!");
	const query = getUpdmailQuery(name, mail, code);
	try {
		const answ = await Fetching(host, query, token);
		return answ.updmail != undefined ? answ.updmail : Promsie.reject("неизвестная ошибка!");
	} catch (err) {
		return Promise.reject(err);
	}
}

export default getUpdmail;
