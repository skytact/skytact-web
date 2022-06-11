import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";

const getRecoverQuery = (name, mail, code, npwd) => {
	return `
		mutation {
			recover(name: "${name}", mail: "${mail}", code: "${code}", npwd: "${npwd}")
		}
	`
}

const getRecover = async (link, mail, code, npwd) => {
	if (!mail) return Promise.reject("эл. почта отсутствует!");
	const [host, name] = parseLink(link);
	if (!host || !name) return Promise.reject("имя отсутствует!");
	//
	const query = getRecoverQuery(name, mail, code, npwd);
	try {
		const answ = await Fetching(host, query);
		return answ.recover != undefined ? answ.recover : Promise.reject("ошибка на сервере!");
	} catch (err) {
		//
		return Promise.reject(err);
	}
}

export default getRecover;
