import parseLink from "./parseLink";

const Fetching = async (host, query, token = false) => {
	//get fetch answer
	const answ = (host && query) 
		? (await fetch("https://skytact-api.space:2727/api", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'authorization': token || ""
			},
			body: JSON.stringify({query})
		})
			.then(res=>res.json())
			.catch(err=>console.log('err:' + err)))
		: { errors: [ {message: "session failed!"} ]};
	//return getting data
	return answ.data 
		? Promise.resolve(answ.data) 
		: answ.errors 
			? Promise.reject(answ.errors[0].message)
			: Promise.reject("detect unknown error!");
}

export default Fetching;
