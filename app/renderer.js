const parser =new DOMParser()
const linksSection = document.querySelector('.links')
const errorMessage = document.querySelector('.error-message')
const newLinkForm = document.querySelector('.new-link-form')
const newLinkUrl = document.querySelector('.new-link-url')
const newLinkSubmit = document.querySelector('.new-link-submit')
const clearStorageButton = document.querySelector('.clear-storage')
const clearForm = () => {
	newLinkUrl.value = null;
}
newLinkUrl.addEventListener('keyup', () => {
	newLinkSubmit.disabled = !newLinkUrl.validity.valid
})
newLinkForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const url = newLinkUrl.value
	fetch(url)
		.then(reponse => reponse.text())
		.then(text=>parser.parseFromString(text,'text/html'))
		.then(nodes=>nodes.querySelector('title').innerText)
//		.then(console.log)
})