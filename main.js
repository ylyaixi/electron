//app 模块，它控制应用程序的事件生命周期。
//BrowserWindow 模块，它创建和管理应用程序窗口。
const { app, BrowserWindow } = require('electron')
// 在你文件顶部导入 Node.js 的 path 模块
const path = require('node:path')

//添加一个createWindow()方法来将index.html加载进一个新的BrowserWindow实例。
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      //预加载脚本
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        devTools: true // 确保开发者工具未被禁用
      }
    })
  
    win.loadFile('index.html')

  }

//调用createWindow()函数来打开您的窗口
//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口。 您可以通过使用 app.whenReady() API来监听此事件
app.whenReady().then(() => {
    createWindow()
  })

//在Windows和Linux上，关闭所有窗口通常会完全退出一个应用程序
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()  //macOS(darwin) 
  })
//如果没有窗口打开则打开一个窗口 (macOS)
app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })