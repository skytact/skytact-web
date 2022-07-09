import DigestForm from "./DigestForm";
import DigestInput from "./DigestInput";
import DigestSubmit from "./DigestSubmit";
import DigestButton from "./DigestButton";
import DigestSpec from "./DigestSpec";

function SearchForm ({error, input, setInput, onSubmit}) {
	return (
		<DigestForm
			profil = "отмена"
			href = "/"
			error = {error}
			heading = "Поиск аккаунта"
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
	)
}

export default SearchForm;
