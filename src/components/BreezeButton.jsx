import {children, createSignal} from "solid-js";
import page_styles from "../modules/BreezeButton.module.scss";
import contacts from "../icons/contacts.svg";

function BreezeButton (props) {
	const resolved = children(() => props.children);
	const w = props.width || "50px";
	const h = props.height || "50px";
	return (
		<button 
			class = {page_styles.BreezeButton}
			onClick = {props.onSubmit}
		>
			<div class = {props.state() && page_styles.AfterClick } style = { `width: ${w}; height: ${h};`}>
				<div 
					style = {props.color && 
						`background-color: ${props.color};`
					}
					class = {`${page_styles.RoundBlock} ${page_styles.Round1}` }>
				</div>
				<div 
					style = {props.color && `background-color: ${props.color};`}
					class = {`${page_styles.RoundBlock} ${page_styles.Round2}`}>
				</div>
				<div 
					style = {props.color && `background-color: ${props.color};`}
					class = {`${page_styles.RoundBlock} ${page_styles.Round3}`}>								
				</div>
				<p class = {page_styles.Title}>
					{ resolved() }
				</p>
			</div>
		</button>
	);
}

export default BreezeButton;
