import {Show, createSignal} from "solid-js";
//
import ErrorLine from "../components/ErrorLine";
import DigestWrap from "../components/DigestWrap";
import CardHeader from "../components/CardHeader";
import CardBody from "../components/CardBody";
import List from "../components/List";
//
import clearData from "../libs/clearData";
//
import page_styles from "../modules/CardScene.module.scss";
//
function CardScene ({ permission = "guest", mode = "view", card = {}}) {
	const [error, setError] = createSignal("");
	const [list, setList] = createSignal(card.list || []);
	const head = card.head || false;
	const data = card.data || false;
	if (!head || !data) { 
		setError("неизвестная ошибка");
		clearData();
	}
	const party = card.head ? card.head.party :  0;
	const host = card.head ? card.head.host : "127.0.0.1";
	const nick = card.data ? card.data.nick : "";
	const updateContactList = (contact) => {
		setList([contact, ...list()]);
	}
	return (
		<Show when = {!error()} fallback = {<ErrorLine error = {error} />}>
			<DigestWrap>
				<CardHeader 
					mode = {mode} 
					permission = {permission} 
					host = { host } 
					nick = { nick } 
					upc = { card.pack[4] }
					onList = { updateContactList }
				/>
				<CardBody 
					mode = { mode } 
					data = { data } 
					head = { head } 
				/>
				<List list = { list } contacts = { party } />
			</DigestWrap>
		</Show>
	)
}
//
export default CardScene;
