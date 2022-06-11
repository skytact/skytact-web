import parseLink from "../libs/parseLink";
import useData from "../libs/useData";

const uploadImage = async (img) => {
	const [link, token] = useData();
	const [host, name] = parseLink(link);
	if (!link || !token || !name) return Promise.reject('ошибка доступа!');
	//
	console.log(name);
	const answ = await fetch('https://skytact-api.space:2728/load', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
				'Accept': '*/*',
				'authorization': token || "",
				'byuser': name,
			},
			body: img
		})
		.then(res => res.json())
		.catch(err => console.log(err));

	//
	console.log(answ);
	//
	return answ.error ? Promise.reject('ошибка запроса данных') : answ.data;
}

export default uploadImage;
