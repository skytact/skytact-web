import { Show, createSignal } from "solid-js";

import page_style from "../modules/HyperCardTop.module.scss";

import QRcode from "../libs/qrcode-svg";

import defaultImage from "../icons/default.svg";
import qrcode from "../icons/qr.svg";
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

	//VALUES
	//src of image
	const imageSrc = card.data.photo != "__default" 
		? ('https://skytact-api.space:2728/view/' + card.data.photo)  
		: (defaultImage)
	//display value
	const displayNone = 
		(displayMode() != "edit" && (card.data.intro == "__default" || !card.data.intro)) 
			? {"display" : "none"} 
			: {"display": "block"};
	//get placeholder
	const placeholderValue =  displayMode() == "edit" ? "пару слов о себе" : "";
	//textarea disabled value
	const disabledValue =  displayMode() == "edit" ? false : true;
	//
	const cardIntro = card.data.intro == "__default" ?  "" : card.data.intro;
	console.log(card.data.intro);
	console.log(disabledValue);

	//ACTIONS
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

	//enable qr 
	const [qropen, setQRopen] = createSignal(false);
	const refer = "https://skytact.online/" + (card.head.host ? card.head.host+"/" : "" ) + card.data.nick;
	const qr = new QRcode({
		content: refer,
		join: true,
		container: "svg-viewbox",
		padding: 0,
		width: 228,
		height: 228,
		color: "#090909",
		background: "#fff",
	});
	const qr_img = qr.svg();
	
	//JSX OBJECT
	return (
		<div class = { page_style.HyperCardTop }>
			<div class = {page_style.MoreButtonBlock}>
				<button onclick = {e => window.location.href = '/s'}>
					<img src = {more} />
				</button>
			</div>
			<div class = {page_style.ImageBlock}>
				<button>
					<img 
						src = { imageSrc } 
						style = {`${verticalImg() ? "width: 180px;" : "height: 180px"}`}
						onload = { onLoadAvatar }
					/>
					{displayMode() == "edit" && 
					<input 
						type = "file"
						accept = "image/png, image/jpeg, image/jpg, image/svg+xml"
						onchange = { onChangePhoto }
					/>
					}
				</button>
			</div>
			<div class = {page_style.ButtonBlock}>
				<button
					onclick = {e => {
						setQRopen(!qropen());
						console.log(qropen());
					}}
				>
					<img src = {qrcode} />
				</button>
			</div> 
			{qropen() &&
			<button 
				class = {page_style.QRmodal}
				onclick = {e => {
					setQRopen(!qropen());
					console.log(qropen());
				}}
				style = {qropen() ? "opacity: 1;" : "display: none;"}
			>
				<div class = {page_style.QRbox}>
					<h1>#{card.data.nick}</h1>
					<div class = {page_style.QR} innerHTML = {qr_img} />
					<div>QR by <a href="https://www.npmjs.com/package/qrcode-svg">qrcode-svg</a></div>
				</div>
			</button>}
			<div class = {page_style.MessageBlock} style = { displayNone }>
				<Show when = {displayMode() == "edit"} fallback = {
					<div class = {page_style.MessageBox}>
						{ cardIntro }
					</div>
				}>
					<textarea
						class = {page_style.MessageBox}
						rows="3"
						maxlength="60"
						onfocus = { e => ({}) }
						onfocusout = { focusOut }
						placeholder = { placeholderValue }
					>
						{ cardIntro }
					</textarea>
				</Show>
			</div>
		</div>
	)
}

export default HyperCardTop;
