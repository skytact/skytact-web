import {Show, For, createSignal} from "solid-js";

import getUpdnote from "../fetch/getUpdnote";
import getAddnote from "../fetch/getAddnote";

import page_styles from "../modules/HyperCardBody.module.scss";

//hypercard body
function HyperCardBody ({
	permission = "guest",
	displayMode = () => "view",
	card = {},
	changeCard = (card) => ({}),
	move = f => f,
	setMoving = f => f
}) {
	const commonHeightOfNote = 110;

	//form data
	const [formInput, setFormInput] = createSignal({
		line: "",
		text: ""
	});
	//notes list
	const [notes, setNotes] = createSignal(card.data.notes);
	//moving mode
	//const [moving, setMoving] = createSignal(false);
	//draggable element
	const [position, setPosition] = createSignal(false);
	const [drag, setDraggable] = createSignal(false);
	const [dragIndex, setDragIndex] = createSignal(false);
	const [swapIndex, setSwapIndex] = createSignal(false);

	//rocket animation
	const [rocket, setRocket] = createSignal(false);
	const [lastNotePhrase, setLastNotePhrase] = createSignal(false);
	
	//update note fetch query
	const useUpdNote = async (item, act) => {
		try {
			const answ = await getUpdnote(item, act);
			if (Array.isArray(answ)) return answ;
			else return Promise.reject(answ);
		} catch (err) {
			return Promise.reject('error');
		}
	}

	//add note fetch query
	const useAddnote = async (note) => {
		try {
			const answ = await getAddnote(note);
			return answ;
		} catch (err) {
			return Promise.reject('err');
		}
	}

	//swapping notes
	const swappingNotes = async (drag, swap, noteArr) => {
		//console.log(drag, swap);
		//
		if (drag == swap || (swap < 0 || drag < 0)) return;
		//
		let action = drag < swap ? "down" : "up";
		let start = drag;
		let finit = swap;
		let inc = start > finit ? -1 : 1; 
		let cNotes = noteArr;
		//
		for (let i = start; i != finit; i = i*1 + inc*1 ) {
			cNotes = await useUpdNote(cNotes[i].item, action);
			//console.log(cNotes);
		}
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

	//check for link pattern
	const  isLink = (line) => {
		const parseLine = line;
		const patternLink = 
		/(ftp|ssh|http|https):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
		//
		
		return parseLine.match(patternLink);
	}

	const updateStyles = el => {
		if (el.style.zIndex == '7') {
			//set default
			el.style.transition = 'transform .6s, top .2s';
			el.style.zIndex = '1';
			el.style.transform = 'scale(1.0)';
		}
		else {
			//set draggable style
			el.style.transition = 'transform .6s';
			el.style.zIndex = '7';
			el.style.transform = 'scale(1.1)';
		}
	}

	function StartMove (e) {
		e.preventDefault();
		//get start position
		const positionStart = e.clientY || e.touches[0].clientY;
		setPosition(positionStart);
		//set control of moving
		document.onmouseup = OverStop;
		document.ontouchend = OverStop;
		document.onmousemove = OverMove;	
		document.ontouchmove = OverMove;
		
		setTimeout(() => {
			if (!position()) return;
			//get position
			const posY = position();
			
			//check position diff
			const diff = Math.abs(positionStart - posY);
			//return if scrolling
			if (diff > 23) {
				setPosition(false);
				document.onmousemove = null;	
				document.ontouchmove = null;
				return;
			}

			//set position
			setPosition(posY);

			//inform user
			console.log('start');
			//set moving mode
			setMoving(true);

			//create dragging element
			updateStyles(e.target);
			setDraggable(e.target);
	
			//set indexes
			const index = Math.floor(e.target.offsetTop/commonHeightOfNote);
			setDragIndex(index);
			setSwapIndex(index);
	
			//set events
			document.onmouseup = StopMove;
			document.ontouchend = StopMove;
			document.onmousemove = OnMove;	
			document.ontouchmove = OnMove;
		}, 500);
	}

	function OverMove (e) {
		const posY = e.clientY || e.changedTouches[0].clientY;
		setPosition(posY);
	}

	function OverStop (e) {
		//null
		setMoving(false);
		setPosition(false);
		document.onmouseup = null;
		document.ontouchend = null;
		document.onmousemove = null;
		document.ontouchmove = null;
	}

	function OnMove (e) {
		e.preventDefault();
		//get coordinates

		//
		console.log('moving');

		//change element position
		const draggable = drag();

		//calc diff of position
		const posY = e.clientY || e.changedTouches[0].clientY;
		const dy = position() - posY;
		setPosition(posY);
		//get top of draggable element
		const top = draggable.offsetTop - dy;
		draggable.style.top = top + "px";

		//notes list
		const total = notes().length;
		
		//get current index
		const currentIndex = Math.floor((top + commonHeightOfNote/2)/commonHeightOfNote);
		//remove zone
		if (top < -80 && top > -180) {
			draggable.style.transform = 'scale(0.8)';
			setSwapIndex(-1);
			return;
		} else {
			draggable.style.transform = 'scale(1.1)';
		}

		//check current Index
		if (currentIndex != swapIndex() && currentIndex >= 0 && currentIndex < total) {
			//get list of notes
			const notesList = draggable.parentElement.children;
			//chenge indexes
			for (let i = 0; i < total; ++i) {
				//get offset top
				const tempTop = notesList[i].offsetTop;
				//get position-index of element
				const tempIndex = Math.floor((tempTop + commonHeightOfNote/2)/commonHeightOfNote);
				if (tempIndex == currentIndex && i != dragIndex()) {
					notesList[i].style.top = (currentIndex > swapIndex())
						? (tempTop - commonHeightOfNote) + "px"
						: (tempTop + commonHeightOfNote) + "px";
				}
			}
			//chenge swap index
			setSwapIndex(currentIndex);
		}
	}

	function StopMove (e) {
		e.preventDefault();
		//
		console.log('stop');
		//remove draggable
		const draggable = drag();

		//remove event
		if (swapIndex() === -1) {
			draggable.style.transform = 'scale(0.1)';
			setDraggable(false);
			onChangeNotes(notes()[dragIndex()].item, "remove");
			//const cNotes = notes().filter((n, i) => i != dragIndex());
			//setNotes([...cNotes]);
			//clear data
			setTimeout(() => {setMoving(false);}, 500);
			setPosition(false);
			document.onmouseup = null;
			document.ontouchend = null;
			document.onmousemove = null;
			document.ontouchmove = null;
			return;
		}

		//update style
		updateStyles(draggable);
		setDraggable(false);
		
		//update notes
		const iDrag = dragIndex();
		const iSwap = swapIndex();
		//
		//
		const cNotes = JSON.parse(JSON.stringify(notes()));
		if (iDrag != iSwap) {
			//delete draggable element from array
			const fNotes = cNotes.filter((n, i) => i != iDrag);
			fNotes.splice(iSwap, 0, cNotes[iDrag]);
			setNotes([...fNotes]);
			swappingNotes(iDrag, iSwap, cNotes);
		} else {
			setNotes([...cNotes]);
		}
		//clear data
		setMoving(false);
		document.onmouseup = null;
		document.ontouchend = null;
		document.onmousemove = null;
		document.ontouchmove = null;
	}
	
	return (
		<div 
			class = {page_styles.HyperCardBody} 
			style = { rocket() 
				? "margin-bottom: 120px; transition: margin-bottom 1s;" 
				: "margin-bottom: 14px; transition: none;"}
		>
			{ (rocket() && notes()) && 
			<div class = {page_styles.Rocket}>
				{lastNotePhrase()}
			</div> }
			<Show when = { !move() } fallback = {
				<div
					class = { page_styles.DeleteZone }
				>
					<span>удаление</span>
				</div>
			}>
				<div
					class = { page_styles.AddNoteForm }
				>
					<form onsubmit = {e => {e.preventDefault()}}>
						<span> добавьте запись </span>
						<input 
							placeholder = "здесь подпись"
							oninput = {e => {
								setFormInput({
									text: e.target.value,
									line: formInput().line
								});
							}}
							value = { formInput().text }
						/>
						<input 
							placeholder = "ссылка, почта, телефон..."
							style = {{"color": "#f9f9f9", "font-size": "16px"}}
							oninput = {e => {
								setFormInput({
									line: e.target.value,
									text: formInput().text
								});						
							}}
							value = { formInput().line }
						/>
						<div 
							class = { page_styles.AddNoteButton }
							style = { formInput().text && formInput().line ? "height: 100%; opacity: 1;" : "height: 0px; opacity: 0;"}
							onclick = {e => {
								e.preventDefault();
								const myText = formInput().text;
								const myLine = formInput().line;

								setFormInput({text: "", line: ""});

								//create note
								const myNote = {
									icon: "info",
									text: myText,
									line: myLine,
									lock: false,
								}

								//add new note
								if (myText && myLine) useAddnote(myNote)
									.then(res => {
										//
										myNote.item = res;
									
										//start rocket animation
										setRocket(true);
										setLastNotePhrase(myLine);
										
										//
										setTimeout(() => { 
											setNotes([...notes(), myNote]);	
											setRocket(false) 
										}, 900);
									})
									.catch(err => {
										console.log(err);
									});
							}}
						>
							<button><div></div></button>
						</div>
					</form>
				</div>
			</Show>
			<div 
				style = { "height: " + (notes().length * commonHeightOfNote)*1 + "px" }
				class = { page_styles.NotesList }
			>
				<For each = { notes() } fallback= { <div></div> }>
					{
						
						(note, index) => (
							<div 
								style = { 
									"top: " + (index() * commonHeightOfNote)*1 + "px;" +
									"height: " + commonHeightOfNote + "px;"
								}
								class = { page_styles.NoteItem }							
								onmousedown = { StartMove }
								ontouchstart = { StartMove }
							>
								<div class = { page_styles.NoteBox }>
									<p class = { page_styles.NoteDescription }>
										{note.text}
									</p>
									<p 
										style = { isLink(note.line) ? "text-decoration: underline;" : "text-decoration: none" }
										class = { page_styles.NoteLink }
									>
										{note.line}
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
