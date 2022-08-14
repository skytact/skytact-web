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
	//create list and set reverse list array
	const [list, setList] = createSignal(card.list);
	setList(JSON.parse(JSON.stringify(card.list)).reverse());
	//get length of array
	let total = card.list.length;
	//
	const onError = (e) => {
		e.target.src = cloud;
	}
	//
	const onClick = (e, n) => {
		e.preventDefault();
		window.location.replace("/" + name);
	}
	
	createEffect(() => {
		if(card) {
			//change values of array
			total = card.list.length;
			setList(JSON.parse(JSON.stringify(card.list)).reverse());
		}
	});
	//
	return (
		<div class={page_styles.List}>
			<div>
				{ list().length && <h3 class = {page_styles.ListHeading}>здесь были ({list().length}+)</h3> }
				<For each = {list()} fallback = {<div></div>}>
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
										style = { (i() >= total - 1) ? "animation-play-state: running;" : "opacity: 1;"}
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
