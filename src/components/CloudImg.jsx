
import page_styles from "../modules/CloudImg.module.scss"

import cloud from "../icons/cloud.svg";

function CloudImg ({top = "0", startPosition = "36", reverse = false}) {
	console.log(reverse);
	return (
		<div class = {page_styles.CloudBlock} style = {`top: ${top};`}>
			<div>
				<img 
					src = {cloud} 
					class = { page_styles.CloudAnimation } 
					style = {`
						animation-duration: ${startPosition}s;
						animation-direction:${reverse ? "reverse" : "normal"};
					`}
				/>
			</div>
		</div>
	)
}

export default CloudImg;
