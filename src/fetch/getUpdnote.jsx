import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
import useData from "../libs/useData";
//
const getUpdnoteQuery = (name, item, act) => 
`
	mutation {
		updnote(name: "${name}", item: ${item}, act: "${act}") {
			item
			icon
			line
			text
			lock
		}
	}
`;
//
const getUpdnote = async (item, act) => {
	const [link, token] = useData();
	if (!link || !token) {
		return Promise.reject("ошибка доступа");
	}
	const [host, name] = parseLink(link);
	const query = getUpdnoteQuery(name, item, act);
	try {
		const data = await Fetching(host, query, token);
		return data.updnote;
	} catch (err) {
		return Promise.reject(err);
	}
}	
//
export default getUpdnote;
