
//
import page_styles from "../modules/DigestIconsRadio.module.scss";
//
import info from "../icons/iconBar/info.svg";
import link from "../icons/iconBar/link.svg";
import phone from "../icons/iconBar/phone.svg";
import email from "../icons/iconBar/email.svg";
import locate from "../icons/iconBar/locate.svg";
import crypto from "../icons/iconBar/crypto.svg";
//
function DigestIconsRadio ({setIcon = f => f}) {
	return (
		<div class = {page_styles.DigestRadio}>
			<label class = {page_styles.Element}>
				<input 
					name = "iconBar" 
					type= "radio" 
					checked= "checked"
					value= "info" 
					onInput= {setIcon}
				/>
				<div>
					<img src = {info} />
				</div>
			</label>
			<label class = {page_styles.Element}>
				<input 
					name = "iconBar" 
					type= "radio" 
					value= "link" 
					onInput= {setIcon}
				/>
				<div>
					<img src = {link} />
				</div>
			</label>
			<label class = {page_styles.Element}>
				<input 
					name = "iconBar" 
					type= "radio" 
					value= "phone" 
					onInput= {setIcon}
				/>
				<div>
					<img src = {phone} />
				</div>
			</label>
			<label class = {page_styles.Element}>
				<input 
					name = "iconBar" 
					type= "radio" 
					value= "email" 
					onInput= {setIcon}
				/>
				<div>
					<img src = {email} />
				</div>
			</label>
			<label class = {page_styles.Element}>
				<input 
					name = "iconBar" 
					type= "radio" 
					value= "crypto" 
					onInput= {setIcon}
				/>
				<div>
					<img src = {crypto} />
				</div>
			</label>
			<label class = {page_styles.Element}>
				<input 
					name = "iconBar" 
					type= "radio"
					value= "locate" 
					onInput= {setIcon} 
				/>
				<div>
					<img src = {locate} />
				</div>
			</label>
		</div>
	)
}

export default DigestIconsRadio;
