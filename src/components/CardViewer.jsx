import {Show} from "solid-js";
//
import CardBarViewer from "../components/CardBarViewer";
import CardBodyViewer from "../components/CardBodyViewer";
import List from "../components/List";
import FootCard from "../components/FootCard";
//
import page_styles from "../modules/CardViewer.module.scss";
//
function CardViewer ({ permission = "guest", card = {}}) {
	return (
		<div class={page_styles.CardViewer}>
			<CardHeadViewer 
				permission = {permission} 
				nick = {card.data.nick} 
				head = {card.head}
			/>
			<CardBodyViewer 
				data = {card.data}
				head = {card.head}
			/>
			<List list= {card.list} contacts= {card.head.party} />
			<FootCard />
		</div>
	)
}
//
export default CardViewer;
