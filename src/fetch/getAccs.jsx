import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
//
const getGetaccsQuery = (name, addr) => 
`
	{
		getaccs(name: "${name}", address: "${addr}")
	}
`;
//
const getAccs = async (link, address) => {
	//parse link
	const [host, name] = parseLink(link);
	//build query
	const query = getGetaccsQuery(name, address);
	try {
		const data = await Fetching(host, query);
		return data.getaccs ? data.getaccs : Promise.reject("something went wrong");
	}
	catch (err) {
		return Promise.reject(err);
	}
}	
//
export default getAccs;
