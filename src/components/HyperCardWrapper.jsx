import {children} from "solid-js";

import page_style from "../modules/HyperCardWrapper.module.scss";

//return function
function HyperCardWrapper (props) {
	const background = props.card.style || "#CA2132";
	const responsed = children(() => props.children);
	return (
		<div class = {page_style.HyperCardWrapper} style = {{"background-color": background }}>
			<div class = {page_style.Child}>
				{ responsed() }
			</div>
		</div>	
	);
}

export default HyperCardWrapper;
