import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";

const getDeliverQuery = (name, mail) => {
	return `
		mutation {
			deliver(name: "${name}", mail: "${mail}")
		}
	`
}

const getDeliver = async (link, mail) => {
	if (!mail) return Promise.reject("введите эл. почту!");
	const [host, name] = parseLink(link);
	if (!host || !name) return Promise.reject("введите имя!");
	const query = getDeliverQuery(name, mail);
	try {
		const answ = await Fetching(host, query);
		return answ.deliver != undefined ? answ.deliver : Promise.reject("проверьте данные!");
	} catch (err) {
		return Promise.reject(err);
	}
}

export default getDeliver;
