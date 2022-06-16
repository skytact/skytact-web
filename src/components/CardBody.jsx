import { For, Show, createSignal, createEffect } from "solid-js";
import { Portal } from "solid-js/web";
import { Link } from "solid-app-router";
import Modal from "./Modal";
import ChangeNameModal from "./ChangeNameModal";
import QRcodeModal from "./QRcodeModal";
import BreezeButton from "./BreezeButton";

import uploadImage from "../fetch/uploadImage";
import getUpdnote from "../fetch/getUpdnote";

import page_styles from "../modules/CardBody.module.scss";

import default_img from "../icons/default.svg";
import refresh from "../icons/refresh.svg";
import edit from "../icons/edit.svg";

//
import addnote from "../icons/addnotes.svg";
import view from "../icons/view.svg";

//icons bar
import info from "../icons/iconBar/info.svg";
import link from "../icons/iconBar/link.svg";
import email from "../icons/iconBar/email.svg";
import phone from "../icons/iconBar/phone.svg";
import crypto from "../icons/iconBar/crypto.svg";
import locate from "../icons/iconBar/locate.svg";

//iconprop
import lock from "../icons/iconBar/lock.svg";
import open from "../icons/iconBar/open.svg";
import down from "../icons/iconBar/down.svg";
import up from "../icons/iconBar/up.svg";
import prop from "../icons/iconBar/prop.svg";
import copy from "../icons/iconBar/copy.svg";
import trash from "../icons/iconBar/trash.svg";


const iconStock = {
	"info": info,
	"link": link,
	"email": email,
	"phone": phone,
	"crypto": crypto,
	"locate": locate,
};

const prepareImage = (base64) => new Promise((resolve, reject) => {
	//
	const sizeOfFile = base64.length;
	let scalar = 1;
	if (sizeOfFile < 1e5) {
		scalar = 0.9;
	} else if (sizeOfFile < 1e6) {
		scalar = 0.6
	} else if (sizeOfFile < 3e6) {
		scalar = 0.3;
	} else if (sizeOfFile < 1e7) {
		scalar = 0.1;
	} else {
		reject("max size of Image must be < 8MB"); //reject error
	}
	//if svg format
	if (base64.substr(0, 26) == 'data:image/svg+xml;base64,' && sizeOfFile < 1e5) {
		resolve(base64);
	}
	//
	const canvas = document.createElement('canvas');
	const img = document.createElement('img');
	//
	img.onload = () => {
		//minimize image by canvas
		//set dimention
		const h = img.height || 24;
		const w = img.width  || 24;
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, w, h);
		resolve(canvas.toDataURL('image/jpeg', scalar));
	}
	img.onerror = (err) => {
		reject(err);
	}
	img.src = base64;
});

function Avatar ({mode = "view", host = "skytact-api.space", photo = () => "", setPhoto = f => f}) {
	const [error, setError] = createSignal("");
	const [verticalImg, setVerticalImg] = createSignal(false);
	//
	const onChange = e => {
		//
		const file = e.target.files[0];
		const reader = new FileReader();
		//
		reader.onload = function (event) {
			//
			const original = new Image();
			original.src = event.target.result;
			prepareImage(original.src)
				.then(res => uploadImage(res))
				.then(res => {
					setPhoto(res);
					window.location.reload();
				})
				.catch(err => {
					console.log(err);
					setError("ошибка доступа к файлу!");
				});
		}
		reader.readAsDataURL(file);
	}
	//
	const onLoadAvatar = event => {
		const w = event.target.naturalWidth || 240;
		const h = event.target.naturalHeight || 240;
		setVerticalImg(w < h);
	}
	//
	const onError = err => {
		//
		setPhoto("__default");
	}
	//
  	return (
		<div id = "qwerty" class={page_styles.Avatar}>
			{error() && 
			<span style = "position: absolute; color: red; top: -30px; left: -50%; width: 200%; text-align: center;">
				{error()}
			</span>}
			<div>
				{photo() && 
					<img 
						src = {'https://skytact-api.space:2728/view/' + photo()} 
						style = {`${verticalImg() ? "max-width: 100%" : "max-height: 100%;"}`}
						onload = { onLoadAvatar }
						onerror = { onError }
					/>
				}
				{(!photo() || photo() == "__default") && <img src= {default_img} style = {"max-width: 100%;"} />}
			</div>
			{mode == "edit" && 
			<button>
				<div>
					<img src = {refresh} />
					<input 
						type = "file" 
						onChange = { onChange }
						accept="image/png, image/jpeg, image/jpg, image/svg+xml" 
					/>
				</div>
			</button> }
		</div>
	);
}

function FullName ({mode = "view", fullname, views = 0}) {
	//get fullname
	const viewK = Math.floor(views/1000);
	const viewM = Math.floor(viewK/1000);
	const viewStr = viewM > 0 
		? (viewM + '.' + Math.floor(viewK%1000/100) + 'M')
		: (viewK > 0 ? (viewK + '.' + Math.floor(views%1000/100) + 'K') : (views));
	//
	return (
		<div class= {page_styles.FullName}>
			<Show when = {fullname() && mode == "edit"} >
				<div class = {page_styles.AddButton}>
					<button 
						class = {page_styles.ChangeFromButton}
						onClick = {() => {
							event.preventDefault();
							const modal = document.getElementById("changeFullName");
							modal.style.display = "block";
					}}>
						изменить
					</button>
				</div> 
			</Show>
			<div class= {page_styles.Fname}> {fullname()} </div>
			<div class= {page_styles.Views}> 
				<div>
					<img src={view} />
					<span>{viewStr}</span> 
				</div>
			</div>
		</div>
	);
}

function Intro({mode = "view", intro}) {
	//get intro
	return (
		<>
			<Show when= {mode == "edit" && !intro()} fallback= {<div></div>}>
				<div class = {page_styles.DefaultIntro}>
					<button onClick = {() => {
						event.preventDefault();
						const modal = document.getElementById("changeFullName");
						modal.style.display = "block";
					}}>
						<div>Добавь имя и статус здесь.</div>
					</button>
				</div>
			</Show>
			<Show when= {intro()} fallback= {<div></div>}>
				<div class = {page_styles.Intro}>
					<div class = {page_styles.IntroText}>
						<span>{intro()}</span>
					</div>
					{ mode == "edit" && 
						<div class={page_styles.IntroChange}>
							<button onClick = {() => {
								event.preventDefault();
								const modal = document.getElementById("changeFullName");
								modal.style.display = "block";
							}}>
								<img src={edit} />
							</button>
						</div>
					}
				</div>
			</Show>
		</>
	);
}

function Notes ({ mode = "view", notes = () => [], onChangeNotes = f => f}) {
	const size = notes().length;
	const [clip, setClip] = createSignal(-1);
	return (
		<For each = {notes()} fallback = {<div></div>}>
			{
				(note, i) => (
					<div class = {page_styles.NoteWrapper}>
						<Show when = {mode == "edit"} fallback = {
							<ViewBar 
								index = {i()}
								clip = { clip } 
								setClip = { setClip }
								icon= {note.icon} 
								copypaste = {note.line} 
							/>
						}>
							<EditBar 
								index = {i()}
								size = {size}
								item = { note.item }
								icon = { note.icon } 
								lockd = { note.lock } 
								onChangeNotes = { onChangeNotes }
							/>
						</Show>
						<Note note= {note} />
					</div>
				)
			}
		</For>
	);
}

function Note ({ note = {}}) {
	return (
		<div class = {page_styles.Note}>
			<Line line= {note.line} />
			<Text text= {note.text} />
		</div>
	)
}

function ViewBar({ index = 0, clip = () => -1, setClip = f => f, icon = "info", copypaste = "" }) {
	let stableIcon = iconStock[icon];
	return (
		<div class = {page_styles.IconBar}>
			<div>
				<button>
					<img src={stableIcon} />
				</button>
			</div>
			<div>
				<button onClick = {e => {
					e.preventDefault();
					navigator.clipboard.writeText(copypaste);
					setClip(index);
				}}>
					<img src={copy} />
				</button>
			</div>
			{clip() == index && <span>copied!</span>}
		</div>
	);
}
//
function EditBar({ 
	index = 0, 
	size = 0, 
	item = 0, 
	icon = "info", 
	lockd = false, 
	onChangeNotes = f => f
}) {
	let stableIcon = iconStock[icon];
	const [props, setProps] = createSignal(false);
	return (
		<div class = {page_styles.IconBar}>
			<div>
				<button onClick = {() => {
					setProps(false);
				}}>
					<img src={stableIcon} />
				</button>
			</div>
			<Show when = {lockd}>
				<div>
					<button onClick = {() => {
						//on lock
						onChangeNotes(item, "lock");
					}}><img src={lock} /></button>	
				</div>
			</Show>
			<Show when = {props()} fallback = {
				<div>
					<button onClick = {() => {setProps(true)}} >
						<img src = {prop} />
					</button>
				</div>
			}>
				<div>
					{ !lockd &&
						<button onClick = {() => {
							onChangeNotes(item, "lock");
						}}><img src={open} /></button>
					}
					{ index > 0 &&
						<button onClick = {() => {
							onChangeNotes(item, "up");
						}}><img src={up} /></button>
					}
					{ index < size - 1 &&
						<button onClick = {() => {
							onChangeNotes(item, "down");
						}}><img src={down} /></button>
					}
					<button onClick = {() => {
						onChangeNotes(item, "remove");
					}}><img src={trash} /></button>
				</div>
			</Show>
			
		</div>
	);
}

function Line({line}) {
	const parseLine = line;
	const patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	const patternLink = 
	/(ftp|ssh|http|https):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
	//
	
	const testLink = parseLine.match(patternLink);
	return (
		<div class = {page_styles.Line}>
			{(testLink) 
				? <a href={parseLine}>{parseLine}</a>
				: parseLine
			}
		</div>
	);
}

function Text({text}) {
	const parseText = text;
	return (
		<div class= {page_styles.Text}>
			{parseText}
		</div>	
	);
}

function AddNote ({}) {
	return (
		<div class = {page_styles.AddNote}>
			<Link href="/n">
				<img src={addnote} />
				<div>добавить запись</div>
			</Link>
		</div>
	)
}

const useUpdNote = async (item, act) => {
	const answ = await getUpdnote(item, act);
	if (Array.isArray(answ)) return answ;
	else return Promise.reject(answ);
}

function CardBody ({ mode = "view", data = {}, head = {}}) {
	//
	const [photo, setPhoto] = createSignal(data.photo != "__default" && data.photo);
	const [fullname, setFullname] = createSignal(data.fname != "__default" && data.fname);
	const [intro, setIntro] = createSignal(data.intro != "__default" && data.intro);
	const [notes, setNotes] = createSignal([...data.notes]);
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
	const setName = () => {
		console.log(fullname());
		setFullname(fullname());
	}
	const setStatus = () => {
		console.log(intro());
		setIntro(intro());
	}
	createEffect(() => {
		if (photo()) console.log('ph:'+photo());
	})
	//
	return (
		<div class={page_styles.CardBody}>
			<Avatar mode = { mode } host = {head.host} photo = {photo} setPhoto = {setPhoto} />
			<FullName mode = { mode } fullname = {fullname} views = {head.views}/>
			<Intro mode = { mode } intro = {intro} />
			<Notes mode = { mode } notes = {notes} onChangeNotes = {onChangeNotes}/>
			<Show when = {mode == "edit"}>
				<ChangeNameModal 
					name = {fullname} 
					status = {intro} 
					setName = {(name) => setFullname(name)}
					setStatus = {(status) => setIntro(status)}
				/>
				<AddNote />
			</Show>
			<QRcodeModal host = {head.host} nick = {data.nick} />
		</div>
	);
}

export default CardBody;
