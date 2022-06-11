import Fetching from "../libs/fetching";
import parseLink from "../libs/parseLink";
//
const getGetcardQuery = (name, pubk = "", code = "", accs = "") => {
	return `
		mutation {
			getcard(name: "${name}", pubk: "${pubk}", code: "${code}", accs: "${accs}") {
				address
				head {
					views
					hash
					party
					nonce
				}
				data {
					nick
					fname
					intro
					photo
					notes {
						item
						icon
						line
						text
						lock
					}
					style
				}
				list {
					ref
				}
				pack
			}
		}
	`;
}
const getGetcard = async (h, n, pubk = "", code = "", accs = "") => { // return object or error string
	//parsing to get correct data
	const [host, name] = parseLink(h + '/' + n);
	//get query
	const query = getGetcardQuery(name, pubk, code, accs);
	try {
		const data = await Fetching(host, query);
		return data.getcard ? data.getcard : Promise.reject("something went wrong!");
	} catch(err) {
		return Promise.reject(err);
	}
}
//
export default getGetcard;
