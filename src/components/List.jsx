import { Link } from "solid-app-router";
import page_styles from "../modules/List.module.scss"
//libs
import parseLink from "../libs/parseLink";

function List ({list = () => []}) {
	//
	return (
		<div class={page_styles.List}>
			<div class={page_styles.HeadingList}>
				<h1>отметились ({list().length})</h1>
			</div>
			<For each = {list()} fallback= {<div class= {page_styles.ListNode}>{"пока нет отметок"}</div>}>
				{
					(user) => {
						const [host, name] = parseLink(user.ref);
						return (
							<span class= {page_styles.ListNode}>
								<Link href= {"/" + name}
									onClick = {e => {
										e.preventDefault();
										window.location.replace("/" + name);
									}}
								>
									#{name}
								</Link>
							</span>
						) 
					}
				}
			</For>
		</div>
	)
}

export default List;
