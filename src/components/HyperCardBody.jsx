import {Show, For, createSignal} from "solid-js";

import getUpdnote from "../fetch/getUpdnote";
import getAddnote from "../fetch/getAddnote";

import page_styles from "../modules/HyperCardBody.module.scss";

function HyperCardBody ({
	permission = "guest",
	displayMode = () => "view",
	card = {},
	changeCard = (card) => ({})
}) {

	const [formInput, setFormInput] = createSignal({
		line: "",
		text: ""
	});
	const [dragCell, setDragCell] = createSignal(false);
	const [swapCell, setSwapCell] = createSignal(false);
	const [notes, setNotes] = createSignal(card.data.notes);
	const [overRemove, setOverRemove] = createSignal(false);
	const [rocket, setRocket] = createSignal(false);

	let currentNote = notes();
	
	//
	const useUpdNote = async (item, act) => {
		try {
			const answ = await getUpdnote(item, act);
			if (Array.isArray(answ)) return answ;
			else return Promise.reject(answ);
		} catch (err) {
			return Promise.reject('error');
		}
	}

	//
	const useAddnote = async (note) => {
		try {
			const answ = await getAddnote(note);
			return answ;
		} catch (err) {
			return Promise.reject('err');
		}
	}

	const SwappingNotes = async (drag, swap) => {
		console.log(drag, swap);
		//
		if (drag == swap || (swap < 0 || drag < 0)) return;
		//
		let action = drag < swap ? "down" : "up";
		let start = drag;
		let finit = swap;
		let inc = start > finit ? -1 : 1; 
		let cNotes = notes();
		//
		for (let i = start; i != finit; i = i*1 + inc*1 ) {
			cNotes = await useUpdNote(cNotes[i].item, action);
			console.log(cNotes);
		}
		//
		setNotes([...cNotes]);
	}
 
	//
	const onChangeNotes = (item, act) => {
		//
		useUpdNote(item, act)
			.then(res => {
				res.sort((a,b) => a.item - b.item);
				setNotes([...res]);
			})
			.catch(err => {
				console.log(err);
			})
	}

	function onInput (text, line) {
		setFormInput({
			text,
			line
		});
	}

	function onDragStart (e) {
		e.dataTransfer.setData('text/plain', e.target.id);
		setDragCell(e.target.id.substr(5));
		setTimeout(() => {
			//set style after drag object
	        e.target.style.opacity = '0';
	    }, 0);
	}

	function onDragEnd (e) {
		const draggableID = e.dataTransfer.getData('text/plain');
		const draggable = document.getElementById(draggableID);
		//restore styles of elem
		draggable.style.opacity = '1';
		const height = draggable.offsetHeight;
		//console

		const drag = dragCell() - 1;
		const swap = swapCell() - 1;

		
		//const topElem = overRemove() ? ((swap - drag)*height) : '0';
		const topElem =  overRemove() 
			? (-1*(notes().length)*height)
			: (drag < 0 || swap < 0)
				? '0px' : (swap - drag) * height;
		
		console.log(drag, swap, topElem);
		draggable.style.top = topElem + 'px';
	
		setTimeout(() => {
			setDragCell(false);
			setSwapCell(false);
		}, 600);
		
		if (!overRemove()) SwappingNotes(drag, swap);
		
		//
		setOverRemove(false);
	}

	function onDragLeave (e) {
		e.preventDefault();
	}

	function onDragEnter (e) {
		e.preventDefault();
		const swapID = e.target.id.substr(5);
		if (dragCell() != swapID) 
			setSwapCell(swapID);
		
		if (e.target.style.top) {
			//
			e.target.style.top = '';
		} else {
			//
			const height = e.target.offsetHeight;
			//
			if (dragCell() != swapCell()) {
				//
				e.target.style.top = dragCell() < swapCell() ? (-1*height + 'px') : (height + 'px');
			}
		}
	}

	function onDragOver (e) {
		e.preventDefault();
	}

	function onDrop (e) {
		e.preventDefault();
		const draggableID = e.dataTransfer.getData('text/plain');
		const draggable = document.getElementById(draggableID);
		e.target.style.transform = 'scale(1.0)';
	}

	function isLink (line) {
		const parseLine = line;
		const patternLink = 
		/(ftp|ssh|http|https):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
		//
		
		return parseLine.match(patternLink);
	}

	
	return (
		<div class={page_styles.HyperCardBody}>
			{rocket() && <div class = {page_styles.NoteRocket}></div>}
			{displayMode() == "edit" && 
			<Show when = {!dragCell()} fallback = {
				<div 
					class = {page_styles.RmNote}
					ondragenter = {e => {
						e.preventDefault();
						e.target.style.transform = 'scale(1.1)';
						setOverRemove(true);
					}}
					ondragleave = {e => {
						e.preventDefault();
						e.target.style.transform = 'scale(1.0)';
						setOverRemove(false);
					}}
					ondragover = {e => {
						e.preventDefault();
					}}
					ondrop = {e => {
						e.preventDefault();
						//
						const draggableID = e.dataTransfer.getData('text/plain');
						const draggable = document.getElementById(draggableID);
						draggable.style.opacity = '1';
						draggable.style.transform = 'scale(0.1)';
						const removeItem = notes()[dragCell() - 1].item;
						onChangeNotes(removeItem, "remove");
					}}
				>
					удалить запись
				</div>
			}>
				<div class = {page_styles.AddNoteForm}>
					<form>
						<span>добавить запись</span>
						<input 
							type="text" 
							placeholder="заголовок"
							oninput = {e => onInput(e.target.value, formInput().line)}
							value = {formInput().text}
						/>
						<input 
							style ="color: #f9f9f9"
							type="text" 
							placeholder="ссылка, телефон, почта, ..."
							oninput = {e => onInput(formInput().text, e.target.value)}
							value = {formInput().line}
						/>
						<div 
							style = {formInput().text ? "height: 100%; opacity: 1;" : "height: 0%; opacity: 0;"}
							class = {page_styles.AddNoteButton}
						>
							<button
								type = "submit"
								onclick = {e => {
									e.preventDefault();
									if (!formInput().text) return;
									if (formInput().text.length > 70) return;
									if (formInput().line.length > 90) return;

									const new_note = {
										icon: "info",
										text: formInput().text,
										line: formInput().line,
									}
									
									useAddnote(new_note)
										.then(res => {
											console.log(res);
											new_note.item = res;
											setNotes([...notes(), new_note]);
											setFormInput({text: "", line: ""});

											//add rocket effect of new note
											setRocket(true);
											setTimeout(() => {
												setRocket(false);
											}, 600);
										})
										.catch(err => {
											console.log(err);
										});
								}}
							>
								<div></div>
							</button>
						</div>
					</form>
				</div>
			</Show>}
			<div class = {page_styles.ListPlace}>
				<For each = {notes()} fallback= {<div></div>}>
					{
						
						(note, index) => (
							<div
								id = {"note_" + (index()+1)*1}
								class = { page_styles.NoteBlock }
								draggable = { displayMode() == "edit" ? "true" : "false" }
								ondragstart = { onDragStart }
								ondragend = { onDragEnd }
								ondragleave = { onDragLeave }
								ondragenter = { onDragEnter }
								onClick = {e => {
									if(isLink(note.line)) {
										window.location.href = note.line;
									}
								}}
							>
								<div>
									<p>{note.text}</p>
									<p class = {page_styles.NoteLine}>
										{ (isLink(note.line))
											? (<a href = {note.line}>{note.line}</a>)
											: note.line
										}
									</p>
								</div>
							</div>
						)
					}
				</For>
			</div>
		</div>
	)
}

export default HyperCardBody;
