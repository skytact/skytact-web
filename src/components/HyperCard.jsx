//
import { Show, createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
//
import HyperCardWrapper from "./HyperCardWrapper";
import HyperCardTop from "./HyperCardTop";
import HyperCardBody from "./HyperCardBody";
import HyperCardList from "./HyperCardList";

//
function HyperCard ({ userPermission = "guest", initialMode = "view", initialCard  = {} }) {
	//
	const permission = userPermission;
	//create signal to change mode
	const [mode, setMode] = createSignal(initialMode); 
	//create store from initial object
	const [card, setCard] = createStore(initialCard);
	//
	const changeCard = card => {
		setCard(card);
	}
	//
	const onChangeMode = () => 
		mode == "view" ? "edit" : "view"
	//
	//
	return (
		<HyperCardWrapper card = { card } >
			<HyperCardTop 
				permission = { permission } 
				displayMode = { mode }
				card = { card }
				onChangeCard = { changeCard }
			/>
			<HyperCardBody 
				permission = { permission }
				displayMode = { mode }
				card = { card }
			/>
			<HyperCardList
				permission = { permission }
				card = { card }
			/>
		</HyperCardWrapper>
	);
}

export default HyperCard;
