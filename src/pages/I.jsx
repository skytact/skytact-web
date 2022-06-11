import { createSignal } from "solid-js";
import AuthorZone from "../components/AuthorZone";
import DigestScene from "../components/DigestScene";

const useNotices = () => {
	return Promose.resolve("notes");
}

function __I$ () {
	return (
		<DigestScene profil = "обратно" heading = "Обновления">
			<div>Notification</div>
		</DigestScene>
	);
}
export default __I$;
