
define (require, exports, module) ->
	"use strict"
	
	console.log "initializing multireso extension..."
	
	LiveDevelopment = brackets.getModule "LiveDevelopment/LiveDevelopment"
	LiveDevMultiBrowser = brackets.getModule "LiveDevelopment/LiveDevMultiBrowser"
	LiveDevServerManager = brackets.getModule "LiveDevelopment/LiveDevServerManager"
	LiveDevelopmentUtils = brackets.getModule "LiveDevelopment/LiveDevelopmentUtils"
	ProjectManager = brackets.getModule "project/ProjectManager"
	UserServer = brackets.getModule "LiveDevelopment/Servers/UserServer"
	UserServer = UserServer.UserServer
	NativeApp = brackets.getModule "utils/NativeApp"
	PreferencesManager = brackets.getModule "preferences/PreferencesManager"
	NodeDomain = brackets.getModule "utils/NodeDomain"
	
	nodedomain = new NodeDomain "launcher", "/Applications/Brackets.app/Contents/www/LiveDevelopment/MultiBrowserImpl/launchers/node/LauncherDomain"
	
#	server = null
	
		
#	config = {
#		pathResolver: (abspath) ->
#			console.log "comparing #{abspath}"
#			root = "/Applications/Brackets.app/Contents/www/extensions/dev/multireso/"
#			if abspath.indexOf(root) is 0
#				abspath.slice root.length
#			else
#				abspath
#		root: "/Applications/Brackets.app/Contents/www/extensions/dev/multireso/"
#	}

#	LiveDevServerManager.registerServer {create: ->
#		_server = new UserServer config
#		console.log _server._baseUrl
#		console.log _server._pathResolver config.root
#		console.log LiveDevelopmentUtils.isStaticHtmlFileExt config.root
#		console.log LiveDevelopmentUtils.isServerHtmlFileExt config.root
#		_server
#	}, 50

	iconClicked = (event) ->
		multibrowser = PreferencesManager.getExtensionPrefs("livedev").get "multibrowser"
		if multibrowser
			if not LiveDevMultiBrowser.isActive()
				LiveDevMultiBrowser.setLauncher {
					launch: (url) ->
						NativeApp.openURLInDefaultBrowser "file:///Applications/Brackets.app/Contents/www/extensions/dev/multireso/index.html?launch_url=#{url}"
				}
				LiveDevMultiBrowser.open()
			else
				LiveDevMultiBrowser.close()
#		else
#			LiveDevelopment.open().done ->
#				console.log LiveDevelopment.getServerBaseUrl()
#				NativeApp.openURLInDefaultBrowser "file:///Applications/Brackets.app/Contents/www/extensions/dev/multireso/index.html"
#				LiveDevelopment.close()
		return
	
	icon = $("<a href=\"#\"></a>").on("click", iconClicked).appendTo $ "#main-toolbar .buttons"
	
	return