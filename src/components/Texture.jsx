import texture_styles from "../modules/Texture.module.scss";

function Texture (props) {
	return (
		<div class={texture_styles.Texture}>
			{props.children}
		</div>
	)
} 

export default Texture;
