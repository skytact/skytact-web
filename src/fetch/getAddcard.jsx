import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
//
const getAddcardQuery = (name, pwd, upcode, text, hash) => {
	return `
		mutation {
			addcard(name: "${name}", pwd: "${pwd}", code: "${upcode}", text: "${text}", hash: "${hash}") {
				address
				head {
					host
				}
				data {
					nick
				}
				pack
			}
		}
	`;
}
//
const getAddcard = async (link, pwd, code, text = "", hash = "") => {
	const [host, name] = parseLink(link);
	if (!host || !name) return Promise.reject("incorrect name");
	const query = getAddcardQuery(name, pwd, code, text, hash);
	try {
		const answ = await Fetching(host, query);
		console.log(answ.addcard);
		if (answ.addcard) {
			localStorage.setItem("__log$", answ.addcard.head.host + '/' + answ.addcard.data.nick);
			localStorage.setItem("__set$", answ.addcard.pack[2]);
			return answ.addcard;
		}
		else Promise.reject("ошибка с получением данных!");
	} catch (err) {
		return Promise.reject(err);
	}
} 
export default getAddcard;
