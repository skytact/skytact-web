import {children, createSignal} from "solid-js";
import html from "solid-js/html";
import Modal from "./Modal";
import FootCard from "./FootCard";
import QRcode from "../libs/qrcode-svg";

import copy from "../icons/iconBar/copy.svg";
import close from "../icons/close.svg";
import view from "../icons/view.svg";


import page_styles from "../modules/QRcodeModal.module.scss";

function QRcodeModal({host = "", nick = "republichenko"}) {
	const refer = "https://skytact.online/" + (host ? host+"/" : "" ) + nick;
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
	const [clip, setClip] = createSignal(false);
	return (
		<Modal id="qrcodeView" style = {`display: ${display()}`}>
			<div class = {page_styles.Header}>
				<button onClick = {e => {
					e.preventDefault();
					setClip(false);
					document.getElementById("qrcodeView").style.display = "none";
				}}>
					<img src={close} />
				</button>
			</div>
			<h2 class = {page_styles.Heading}>#{ nick }</h2>
			<div class = {page_styles.QR} innerHTML = {qr_img} />
			<div class = {page_styles.AutorLink}>QR by <a href="https://www.npmjs.com/package/qrcode-svg">qrcode-svg</a></div>
			<h2 class = {page_styles.Heading}> OR </h2>
			<div class = {page_styles.Copy} 
				onClick = {e => {
					e.preventDefault();
					setClip(true);
					navigator.clipboard.writeText(refer);
			}}>
				<div class = {page_styles.Img} >
					<img src = {copy} />
				</div>
				<div class = {page_styles.Txt}>
					{!clip() && <h2>copy and send link</h2>}
					{clip() && <h2>copied!</h2>}
				</div>
				<input type="hidden" value = {refer} />
			</div>
			<FootCard />
			</Modal>
	)
}

export default QRcodeModal;
