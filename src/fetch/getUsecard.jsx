import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
import useData from "../libs/useData";
//query
const getUsecardQuery = (name) => {
	return `
		mutation {
			usecard(name: "${name}") {
				address
				head {
					views
					hash
					party
					nonce
					pass
					pubk
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
					key
					ref
				}
				pack
			}
		}
	`;
}
const getUsecard = async () => { // return object or error string
	const [link, token] = useData();
	if (!token || !link) return Promise.reject(false);
	const [host, name] = parseLink(link);
	const query = getUsecardQuery(name);
	try {
		const data = await Fetching(host, query, token);
		if (data.usecard && data.usecard.pack) {
			//
			localStorage.setItem("__set$", data.usecard.pack[2]);
			return data.usecard;
		}
		return Promise.reject("something went wrong!");
	} catch (err) {
		return Promise.reject(err);
	}
}
export default getUsecard;
