import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
import useData from "../libs/useData";
//
const getContactQuery = (name, pubk, link, code) => {
	return `
		mutation {
			contact(name: "${name}", pubk: "${pubk}", link: "${link}", code: "${code}")
		}
	`;
}
//
const getContact = async (h, name, pubk, code) => {
	const [host] = parseLink(h + "/" + name);
	const [link, token] = useData();
	if (!link) return Promise.reject("no link!");
	const query = getContactQuery(name, pubk, link, code);
	try {
		const answ = await Fetching(host, query);
		return answ && answ.errors == undefined ? answ.contact : answ.errors[0].message;
	} catch (err) {
		return Promise.reject(err);
	}
}
export default getContact;
