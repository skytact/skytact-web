import { Show, children } from "solid-js";
import { Link } from "solid-app-router";

import AddButton from "./AddButton";

import QRcode from "../libs/qrcode-svg";

import cardHeader_styles from "../modules/CardHeader.module.scss";
import cardHeaderButton_styles from "../modules/CardHeaderButton.module.scss";

import close from "../icons/close.svg";
import settings from "../icons/settings.svg";
import contacts from "../icons/contacts.svg";
import addnotes from "../icons/addnotes.svg";
import notice from "../icons/notice.svg";
import qr from "../icons/qr.svg";
import edit from "../icons/edit.svg";

//function 

function CardHeaderButton ({ linkPath, iconPath }) {
	return (
		<div class = { cardHeaderButton_styles.ButtonWrapper }>
			<button class = { cardHeaderButton_styles.LinkWrapper }>
				<Link href = {linkPath}>
					<img src= {iconPath} />
				</Link>
			</button>
		</div>
	)
}

function CardHeader ({
	permission = "guest",
	mode = "view",
	host = "",
	nick = "",
	upc = "", 
	onList = f => f,
}) {
	return (
		<header class = { cardHeader_styles.Header }>
			<Show when = {mode == "view"} fallback = {
				<>
					<div class = {cardHeader_styles.Left}>
						<CardHeaderButton linkPath = "/s" iconPath = {settings} />
					</div> 
					<div class = {cardHeader_styles.Left}>
						<CardHeaderButton linkPath = "/c" iconPath = {contacts} />
					</div> 
					<div class = { cardHeader_styles.NickEdit }>
						#{nick}
					</div>
				</>
			}>
				<div class = { cardHeader_styles.Nick }>
					#{nick}
				</div>
				<Show when = {permission == "owner"} fallback = {
					<div class = {cardHeader_styles.Left}>
						{/*<CardHeaderButton linkPath = "/l" iconPath = {close} />*/}
					</div> 
				}>
					<div class = {cardHeader_styles.Left}>
						<CardHeaderButton linkPath = "/l" iconPath = {edit} />
					</div> 
				</Show>
			</Show>
			{ permission == "owner" &&
			<div 
				class = { cardHeader_styles.QR } 
				onClick = { event => {
					event.preventDefault();
					const modal = document.getElementById("qrcodeView");
					modal.style.display = "block";
				}}
			>
				<img src={qr} />
			</div> }
			<Show when = { mode == "view" } fallback = {
				<div class = {cardHeader_styles.Right}>
					<CardHeaderButton linkPath = "/n" iconPath = {addnotes} />
				</div> 
			}>
				<div class = { cardHeader_styles.Right }>
					<AddButton 
						permission = {permission} 
						host = {host} 
						nick = {nick} 
						upcode = {upc} 
						onList = { onList }
					/>
				</div> 
			</Show>
		</header>
	)
}

export default CardHeader;

