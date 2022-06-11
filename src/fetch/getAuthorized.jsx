import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
import useData from "../libs/useData";
//
const getAuthorizedQuery = (name) => 
	`
		{
			authorized(name: "${name}")
		}
	`;

//
const getAuthorized = async () => {
	//get link from storage
	const [link, token] = useData();
	//
	if (!link || !token) return false;
	//parse link
	const [host, name] = parseLink(link);
	//build query
	const query = getAuthorizedQuery(name);
	try {
		//fetch data
		const data = await Fetching(host, query, token);
		//check for argument
		return typeof data.authorized == "boolean" 
			? data.authorized 
			: Promise.reject("something went wrong!");
	} 
	catch (err) {
		//catch error
		return Promise.reject(err);
	}
}
//
export default getAuthorized;
