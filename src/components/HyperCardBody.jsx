import {Show, For, createSignal} from "solid-js";

import getUpdnote from "../fetch/getUpdnote";
import getAddnote from "../fetch/getAddnote";

import page_styles from "../modules/HyperCardBody.module.scss";

import addnote from "../icons/addnote.svg";
import lock from "../icons/lock.svg";
import global_link from "../icons/link.svg";

//hypercard body
function HyperCardBody ({
	permission = "guest",
	displayMode = () => "view",
	card = {},
	onChangeCard = (card) => ({}),
	move = f => f,
	setMoving = f => f
}) {
	const commonHeightOfNote = 110;

	//form data
	const [formInput, setFormInput] = createSignal({
		line: "",
		text: "",
		lock: false
	});
	//notes list
	const [notes, setNotes] = createSignal(card.data.notes);
	const changeNotes = (card, notes) => {
		const data = JSON.parse(JSON.stringify(card.data));
		data.notes = notes;
		onChangeCard({...card, data})
	}
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
	const [rocketIsLock, setRocketIsLock] = createSignal(false);
	
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
		}
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
		//check display mode
		if (displayMode() != "edit") return;
		e.preventDefault();
		
		//get start position
		const positionStart = e.clientY || e.touches[0].clientY;
		setPosition(positionStart);
		
		//set control of moving
		document.onmouseup = OverStop;
		document.ontouchend = OverStop;
		document.onmousemove = OverMove;	
		document.ontouchmove = OverMove;
		
		//set timeout for mousedown
		setTimeout(() => {
			if (!position()) return;
			//get position
			const posY = position();
			
			//check position diff
			const diff = Math.abs(positionStart - posY);
			//return if scrolling
			if (diff > 23) {
				setPosition(false);
				setMoving(false);
				document.onmousemove = null;	
				document.ontouchmove = null;
				return;
			}

			//set position
			setPosition(posY);

			//set moving mode
			setMoving(true);

			//inform user
			console.log('start');

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
	//
	const faviconSrc = link => {
		const url = new URL(link);
		return 'http://www.google.com/s2/favicons?domain=' + url.hostname;
	}
	
	//notes().length && console.log('notes' + notes()[1].lock);
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
				{displayMode() == "edit" && rocketIsLock() &&
				<div class = {page_styles.NoteLockIcon}>
					<img src = {lock} />
				</div>
				}
			</div> }
			{ displayMode() == "edit" &&
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
						<div class = {page_styles.AddNoteSecurity}>
							<span> видно всем </span>
							<input 
								type = "checkbox" 
								name = "security" 
								onchange = {e => {
									console.log(e.target.value);
									setFormInput({
										line: formInput().line,
										text: formInput().text,
										lock: !formInput().lock
									});
								}}
								checked = { !formInput().lock }
							/>
							<label>
							</label>
						</div>
						<input 
							type = "text"
							placeholder = "здесь подпись"
							oninput = {e => {
								setFormInput({
									text: e.target.value,
									line: formInput().line,
									lock: formInput().lock
								});
							}}
							value = { formInput().text }
						/>
						<input 
							type = "text"
							placeholder = "ссылка, почта, телефон..."
							style = {{"color": "#f9f9f9", "font-size": "16px"}}
							oninput = {e => {
								setFormInput({
									line: e.target.value,
									text: formInput().text,
									lock: formInput().lock
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
								const myLock = formInput().lock;
								setFormInput({text: "", line: "", lock: formInput().lock});

								//create note
								const myNote = {
									icon: "info",
									text: myText,
									line: myLine,
									lock: myLock,
								}

								//add new note
								if (myText && myLine) useAddnote(myNote)
									.then(res => {
										//
										myNote.item = res;
									
										//start rocket animation
										setRocket(true);
										setLastNotePhrase(myLine);
										setRocketIsLock(myLock);
										
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
							<button><img src={addnote} /></button>
						</div>
					</form>
				</div>
			</Show>
			}
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
								<div style = {displayMode() == "view" && "pointer-events: auto;"} class = { page_styles.NoteBox }>
									<p class = { page_styles.NoteDescription }>
										{note.text}
									</p>
									<p 
										style = { displayMode() == "view" && "moz-user-select: text; -webkit-user-select: text; user-select: text;"}
										class = { page_styles.NoteLink }
										onclick = {e => {
											isLink(note.line) ?	window.open(note.line, '_blank') : false;						
										}}
									>
										<span 
											style = {{
												"text-decoration": isLink(note.line) ? "underline" : "none",
												"user-select": displayMode() == "view" ? "text" : "none",
												"-moz-user-select": displayMode() == "view" ? "text" : "none",
												"-webkit-user-select": displayMode() == "view" ? "text" : "none"
											}}
										>
											{note.line}
										</span>
									</p>
									{isLink(note.line) && 
									<div class = {page_styles.NoteFaviIcon}> 
										<img 
											src = {faviconSrc(note.line)} 
											onerror = {e => { e.target.src = global_link; }}
										/>
									</div>}
									{displayMode() == "edit" && note.lock &&
									<div class = {page_styles.NoteLockIcon}>
										<img src = {lock} />
									</div>
									}
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
