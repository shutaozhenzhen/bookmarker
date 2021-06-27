const {
    contextBridge,
    ipcRenderer
} = require("electron")

contextBridge.exposeInMainWorld(
    "renderer", {
		'shell_open':(url)	=>{
			ipcRenderer.send('shell_open',url)
		}
    }
)