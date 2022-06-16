import { Link } from "solid-app-router";
import page_styles from "../modules/List.module.scss"
//libs
import parseLink from "../libs/parseLink";

function List ({list = () => []}) {
	//
	return (
		<div class={page_styles.List}>
			{/*<div class={page_styles.HeadingList}>
				{/*<h1>отметились ({list().length})</h1>}
			</div>*/}
			<For each = {list()} fallback= {<div style = "color: #b0b0b0;" class= {page_styles.ListNode}>{"пока нет отметок"}</div>}>
				{
					(user) => (
						<span class= {page_styles.ListNode}>
							<Link href= "#"
								onClick = {e => {
									const [host, name] = parseLink(user.ref);
									e.preventDefault();
									window.location.replace("/" + name);
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
