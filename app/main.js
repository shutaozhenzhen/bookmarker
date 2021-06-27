const {
	app,
	BrowserWindow,
	ipcMain,
	shell
} = require('electron')
const path = require('path')
let mainWindow = null
app.on('ready', () => {
	console.log('Hello from Electron.')
	mainWindow = new BrowserWindow({
		webPreferences: {
			preload: path.join(__dirname, "preload.js")
		}
	})
	//mainWindow.webContents.openDevTools()
	mainWindow.webContents.loadFile(path.join(__dirname,'index.html'))
})
ipcMain.on('shell_open',(event,args)=>{
	shell.openExternal(args)
})