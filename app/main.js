const { app, BrowserWindow } = require('electron')

let mainWindow = null
app.on('ready', () => {
	console.log('Hello from Electron.')
	mainWindow = new BrowserWindow()
})