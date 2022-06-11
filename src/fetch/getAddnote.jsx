import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
import useData from "../libs/useData";
//
const getAddnoteQuery = (name, { icon, line, text = "", lock = false }) => 
`
	mutation {
		addnote(name: "${name}", input: {
			icon: "${icon}"
			line: "${line}"
			text: "${text}"
			lock: ${lock}
		})
	}
`;
//
const getAddnote = async (note) => {
	const [link, token] = useData();
	if (!link) return Promise.reject("ошибка прав доступа!")
	const [host, name] = parseLink(link);
	const query = getAddnoteQuery(name, note);
	try {
		const data = await Fetching(host, query, token);
		return data.addnote ? data.addnote : Promise.reject("something went wrong!");
	}
	catch (err) {
		return Promise.reject(err);
	}
}	

export default getAddnote;
