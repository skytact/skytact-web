import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
//
const getOverlapQuery = (name) => 
`
	{
		overlap(name: "${name}")
	}
`;
//
const getOverlap = async (link) => {
	const [host, name] = parseLink(link);
	const query = getOverlapQuery(name);
	try {
		const data = await Fetching(host, query);
		return data.overlap;
	} catch (err) {
		return Promise.reject(err);
	}
}	
//
export default getOverlap;
