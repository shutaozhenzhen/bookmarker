const {
	app,
	BrowserWindow,
	ipcMain
} = require('electron')
const path = require('path')
let mainWindow = null
app.on('ready', () => {
	console.log('Hello from Electron.')
	mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	})
	//mainWindow.webContents.openDevTools()
	mainWindow.webContents.loadFile(path.join(__dirname,'index.html'))
	
})