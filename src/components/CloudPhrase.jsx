import { Show, createSignal } from  "solid-js";
import page_styles from "../modules/CloudPhrase.module.scss";

import cloudc from "../icons/cloud-close.svg";
import cloudo from "../icons/cloud-open.svg";

function CloudPhrase({message}) {
	//current message
	const rithm = [0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0];
	const [phrase, setPhrase] = createSignal("");
	const [throat, setThroat] = createSignal(true);
	const [count, setCount] = createSignal(0);
	
	//timer interval
	setTimeout(() => {
		const animationTime = setInterval(() => {
			if (count() <= message.length) {
				const selectPos = rithm[count()%20];
				setCount(count() + 1);
				setPhrase(message.substr(0, count()));
				setThroat(selectPos);
			} else setThroat(true);
		}, 100);
	}, 2000);
	
	return (
		<div class = {page_styles.Box}>
			<div>
				<div class = {page_styles.MessageBox}>
						<span>
							{phrase()}
						</span>
				</div>
				<div class = {page_styles.ImageBox}>
					<Show when = {throat()} fallback = {
						<img src = {cloudo} />
					}>
						<img src = {cloudc} />
					</Show>
				</div>
			</div>
		</div>	
	);
}


export default CloudPhrase;
