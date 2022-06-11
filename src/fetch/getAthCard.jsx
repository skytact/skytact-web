//content
import parseLink from "../libs/parseLink";
import Fetching from "../libs/fetching";
//
const getAthCardQuery = (name, pwd) => 
	`
		mutation {
				athcard(name: "${name}", pwd: "${pwd}") {
					address
					pack
				}
		}
	`;

//

const getAthCard = async (link, passwd) => {
	const [host, name] = parseLink(link);
	const query = getAthCardQuery(name, passwd);
	try {
		const data = await Fetching(host, query);
		if (data.athcard) {
			localStorage.setItem("__set$", data.athcard.pack[2]);
			localStorage.setItem("__log$", host + "/" + name);
			return data.athcard.pack[2] ? true : "internal server Error!!";
		} else {
			return Promise.reject("something went wrong!");
		}
	}
	catch (err) {
		return Promise.reject(err);
	}
}

export default getAthCard;
