import {Link, Navigate} from "solid-app-router";
import {createSignal, createEffect} from "solid-js";
import {createStore} from "solid-js/store";
import AuthorZone from "../components/AuthorZone";
import AddNoteForm from "../components/AddNoteForm";

function __N$ () {
	return (
		<AuthorZone fallback = {<div>fallback</div>}>
			<AddNoteForm />
		</ AuthorZone>
	);
}

export default __N$;
