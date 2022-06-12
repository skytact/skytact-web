import Fetching from "../libs/fetching";
import parseLink from "../libs/parseLink";

const getIsfreeQuery = (upcode) => {
	return `
		{
			isfree(upcode: "${upcode}")
		}
	`;
}

const getIsfree = async (h, upcode) => {
	if (!upcode) return Promise.reject("ошибка соединения с сервером!");
	const [host] = parseLink(h + "/default");
	//
	const query = getIsfreeQuery(upcode);
	try {
		const answ = await Fetching(host, query);
		return answ.isfree;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
}

export default getIsfree;
