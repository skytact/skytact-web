import { Link } from "solid-app-router";
import page_styles from "../modules/List.module.scss"
//libs
import parseLink from "../libs/parseLink";

function List ({list = () => []}) {
	//
	return (
		<div class={page_styles.List}>
			<div class={page_styles.HeadingList}>
				<h1>знакомства {list().length}</h1>
			</div>
			<For each = {list()} fallback= {<div style = "color: #b0b0b0;" class= {page_styles.ListNode}>{"пока пусто :)"}</div>}>
				{
					(user) => (
						<span class= {page_styles.ListNode}>
							<Link href= "#"
								onClick = {e => {
									const [host, name] = parseLink(user.ref);
									e.preventDefault();
									window.location.replace("/c/" + name);
									//window.location.reload();
								}}
							>
								#{parseLink(user.ref)[1]}
							</Link>
						</span>
					) 
				}
			</For>
		</div>
	)
}

export default List;
