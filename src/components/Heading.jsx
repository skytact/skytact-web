import heading_styles from "../modules/Heading.module.scss";

function Heading (props) {
	const {header, title} = props;
	return (
		<div class={heading_styles.Heading}>
			<h1>{header}</h1>
			<h3>{title}</h3>
		</div>
	)
}

export default Heading;
