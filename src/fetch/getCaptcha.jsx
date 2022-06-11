import Fetching from "../libs/fetching";
import parseLink from "../libs/parseLink";

const getCaptchaQuery = () => {
	return `
		{
			captcha {
				text
				svg
			}
		}
	`;
}

const getCaptcha = async (h) => {
	//parsing for get correct host name.
	const [host] = parseLink(h+"/default");
	const query = getCaptchaQuery();
	try {
		const answ = await Fetching(host, query);
		return answ.captcha;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
}

export default getCaptcha;
