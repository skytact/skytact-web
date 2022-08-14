import DigestForm from "./DigestForm";
import DigestInput from "./DigestInput";
import DigestSubmit from "./DigestSubmit";
import DigestButton from "./DigestButton";
import DigestSpec from "./DigestSpec";

import CloudPhrase from "./CloudPhrase";

function SearchForm ({error, input, setInput, onSubmit}) {
	const greeting = "Привет! Здесь можно найти пользователя. Введи нужное тебе имя, например вот такое: #republichenko!"
	return (
		<>
		<DigestForm
			profil = "отмена"
			href = "/"
			error = {error}
			heading = "Поиск гиперкарты"
			onSubmit = {onSubmit}
		>
			<DigestSpec>
				<DigestInput 
					maxLen = "32" 
					defaultValue = {input()}
					placeholder = "здесь #имя_пользователя"
					onText = {(e) => {
						setInput(e.target.value);
					}}
				/>
				<DigestSubmit>
					<DigestButton
					>
						Поиск
					</DigestButton>
				</DigestSubmit>
			</DigestSpec>
		</DigestForm>
		<CloudPhrase message={greeting} />
		</>
	)
}

export default SearchForm;
