const {shell}=require('electron')
const parser = new DOMParser()
const linksSection = document.querySelector('.links')
const errorMessage = document.querySelector('.error-message')
const newLinkForm = document.querySelector('.new-link-form')
const newLinkUrl = document.querySelector('.new-link-url')
const newLinkSubmit = document.querySelector('.new-link-submit')
const clearStorageButton = document.querySelector('.clear-storage')
const renderLinks = () => {
	linksSection.innerHTML = Object.keys(localStorage).map(key => `
<div class="link">
<h3>${localStorage.getItem(key)}</h3>
<p>
<a href="${key}">${key}</a>
</p>
</div>
`).join('')
}
renderLinks()
newLinkUrl.addEventListener('keyup', () => {
	newLinkSubmit.disabled = !newLinkUrl.validity.valid
})
newLinkForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const url = newLinkUrl.value
	fetch(url)
		.then(reponse => {
			if (reponse.ok) {
				return reponse
			} else {
				throw new Error(`Status code of ${reponse.status}
				${reponse.statusText}`)
			}
		})
		.then(reponse => reponse.text())
		.then(text => parser.parseFromString(text, 'text/html'))
		.then(nodes => nodes.querySelector('title').innerText)
		.then(title => localStorage.setItem(url, title))
		.then(() => newLinkUrl.value = null)
		.then(() => newLinkSubmit.disabled = true)
		.then(renderLinks)
		.catch(error => {
			errorMessage.innerHTML = `
		There is an issue adding "${url}": ${error.message}
		`.trim()
			setTimeout(() => {
				errorMessage.innerHTML = null
			}, 5000)
		})
})
clearStorageButton.addEventListener('click', () => {
	localStorage.clear()
	renderLinks()
})
linksSection.addEventListener('click',(event)=>{
	if(event.target.href){
		event.preventDefault()
		shell.openExternal(event.target.href)
	}
})