//
import useContactData from "../libs/useContactData"; 
import getGetAddr from "../fetch/getGetAddr";
import getUpdSign from "../fetch/getUpdSign";
import getContact from "../fetch/getContact";
//
const usePromContact = async () => {
	try {
		//get contact data
		const [host, nick] = useContactData();
		console.log(host, nick);
		if (!nick) return Promise.resolve(false);
		//required
		const addr = await getGetAddr(host, nick);
		const [pubk, sign] = await getUpdSign(addr) || ["", ""];
		const contact = await getContact(host, nick, pubk, sign);
		return Promise.resolve(true);
	} catch (err) {
		//
		console.log(err);
		return Promise.resolve(false);
	}
}

export default usePromContact;
