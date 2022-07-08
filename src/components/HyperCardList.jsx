import { createSignal, For, createEffect } from "solid-js";
import { Link } from "solid-app-router";
import page_styles from "../modules/HyperCardList.module.scss"
//libs
import parseLink from "../libs/parseLink";

//
import cloud from "../icons/default.svg";

function HyperCardList ({
	permission = "guest",
	displayMode = "view",
	card = {}
}) {
	const [list, setList] = createSignal(card.list);
	
	const link1 = card.list.length > 0 
		? 'https://skytact-api.space:2728/view/' + card.list[0].key + '.jpeg'
		: false;
	const link2 = card.list.length > 1 
		? 'https://skytact-api.space:2728/view/' + card.list[1].key + '.jpeg'
		: false;
	const link3 = card.list.length > 2
		? 'https://skytact-api.space:2728/view/' + card.list[2].key + '.jpeg'
		: false;
	const link4 = card.list.length > 3
		? 'https://skytact-api.space:2728/view/' + card.list[3].key + '.jpeg'
		: false;
	//
	const onError = (e) => {
		e.target.src = cloud;
	}
	//
	const onClick = (e, n) => {
		e.preventDefault();
		window.location.replace("/" + name);
	}

	let total = card.list.length;
	createEffect(() => {
		if(card) total = card.list.length;
	})
	//
	return (
		<div class={page_styles.List}>
			<div>
				<h3 class = {page_styles.ListHeading}>здесь были</h3>
				<For each = {card.list} fallback = {<div></div>}>
					{
						(user, i) => {	
							console.log(user);
							const [host, name] = parseLink(user.ref);
							const nameLink = card.list.length >= i()
									? 'https://skytact-api.space:2728/view/' + user.key + '.jpeg'
									: false;
							
							//
							return (
								<Show when = {total - i() < 5} fallback = {<div></div>}>
									<div 
										class= {page_styles.ListImage} 
										onclick = {e => {
											e.preventDefault();
											window.location.replace("/" + name);
										}}
										style = { (i() > total - 1) ? "animation-play-state: running;" : "opacity: 1;"}
									>
										<img src = {nameLink} onerror = { onError }/>
									</div>
								</Show>
							);
						}
					}
				</For>
			</div>
		</div>
	)
}

export default HyperCardList;

/*<For each = {list()} fallback= {<div class= {page_styles.ListNode}>{"пока нет отметок"}</div>}>
				{
					(user, index) => {
						const [host, name] = parseLink(user.ref);
						const linkers = 'https://skytact-api.space:2728/view/' + user.key + '.jpeg';
						//Au2FQQEdriv5Eio8cM86xVfunrwXHPBcuM6y6gKcY.jpeg
						return (
							<div 
								class = {page_styles.ListImage}
								onClick = {e => {
									e.preventDefault();
									window.location.replace("/" + name);
								}}
							>
								<img src = {linkers} onerror = { onError }/>
							</div>
						) 
					}
				}
			</For>*/
