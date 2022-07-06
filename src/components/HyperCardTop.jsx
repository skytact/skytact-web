import { createSignal } from "solid-js";

import page_style from "../modules/HyperCardTop.module.scss";

import defaultImage from "../icons/default.svg";
import qr from "../icons/qr.svg";
import more from "../icons/more.svg";

//
import getUpdcard from "../fetch/getUpdcard";
import uploadImage from "../fetch/uploadImage";

//
const useUpdcard = async (text) => {
	try {
		//
		const answer = await getUpdcard("intro", text);
		return answer || Promise.reject(false);
	} catch (err) {
		//
		throw new Error("new error")
	}
}

//
const prepareImage = (base64) => new Promise((resolve, reject) => {
	//
	const sizeOfFile = base64.length;
	let scalar = 1;
	if (sizeOfFile < 1e5) {
		scalar = 0.9;
	} else if (sizeOfFile < 1e6) {
		scalar = 0.6
	} else if (sizeOfFile < 3e6) {
		scalar = 0.3;
	} else if (sizeOfFile < 1e7) {
		scalar = 0.1;
	} else {
		reject("max size of Image must be < 8MB"); //reject error
	}
	//if svg format
	if (base64.substr(0, 26) == 'data:image/svg+xml;base64,' && sizeOfFile < 1e5) {
		resolve(base64);
	}
	//
	const canvas = document.createElement('canvas');
	const img = document.createElement('img');
	//
	img.onload = () => {
		//minimize image by canvas
		//set dimention
		const h = img.height || 24;
		const w = img.width  || 24;
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, w, h);
		resolve(canvas.toDataURL('image/jpeg', scalar));
	}
	img.onerror = (err) => {
		reject(err);
	}
	img.src = base64;
});

//
function HyperCardTop ({
	permission = "guest",
	displayMode = "view",
	card = {},
	onChangeCard = (card) => ({})
}) {
	//avatar
	const [verticalImg, setVerticalImg] = createSignal(false);
	const onChangePhoto = (e) => {
		//
		const file = e.target.files[0];
		const reader = new FileReader();
		//
		reader.onload = function (event) {
			//
			const original = new Image();
			original.src = event.target.result;
			prepareImage(original.src)
				.then(res => uploadImage(res))
				.then(res => {
					window.location.reload();
				})
				.catch(err => {
					console.log(err);
					//setError("ошибка доступа к файлу!");
				});
		}
		reader.readAsDataURL(file);
	}
	//
	const onLoadAvatar = event => {
		const w = event.target.naturalWidth || 240;
		const h = event.target.naturalHeight || 240;
		setVerticalImg(w < h);
	}
	//textarea
	const focusIn = (e) => {
		e.preventDefault();
		e.target.value = card.data.intro;
	}
	const focusOut = (e) => {
		e.preventDefault();
		const data = {...card.data};
		if (data.intro == e.target.value) return;
		//change value
		data.intro = e.target.value;
		useUpdcard(data.intro)
			.then(res => {
				onChangeCard({...card, data});
			})
			.catch(err => {
				console.log(err);
			});
	}
	//
	return (
		<div class = { page_style.HyperCardTop }>
			<div class = {page_style.MoreButtonBlock}>
				<button>
					<img src = {more} />
				</button>
			</div>
			<div class = {page_style.ImageBlock}>
				<button>
					<span>Нажмите, чтобы добавить новое фото</span>
					<img 
						src = {'https://skytact-api.space:2728/view/' + card.data.photo } 
						style = {`${verticalImg() ? "width: 180px;" : "height: 180px"}`}
						onload = { onLoadAvatar }
					/>
					<input 
						type = "file"
						accept = "image/png, image/jpeg, image/jpg, image/svg+xml"
						onchange = {onChangePhoto}
					/>
				</button>
			</div>
			<div class = {page_style.ButtonBlock}>
				<button>
					<img src = {qr} />
				</button>
			</div>
			<div class = {page_style.MessageBlock}>
				<textarea
					rows="3"
					maxlength="60"
					onfocus = {e => ({})}
					onfocusout = {focusOut}
				>
					{card.data.intro || "нажми, чтобы изменить"}
				</textarea>
			</div>
		</div>
	)
}

export default HyperCardTop;
