
define (require, exports, module) ->
	"use strict"

	LiveDevMultiBrowser = brackets.getModule "LiveDevelopment/LiveDevMultiBrowser"
	DefaultLauncher = brackets.getModule "LiveDevelopment/MultiBrowserImpl/launchers/Launcher"
	NativeApp = brackets.getModule "utils/NativeApp"
	PreferencesManager = brackets.getModule "preferences/PreferencesManager"
	ExtensionUtils = brackets.getModule "utils/ExtensionUtils"
	Dialogs = brackets.getModule "widgets/Dialogs"
	DefaultDialogs = brackets.getModule "widgets/DefaultDialogs"
	FileSystem = brackets.getModule "filesystem/FileSystem"
	FileUtils = brackets.getModule "file/FileUtils"
	
	root_path = ExtensionUtils.getModulePath module
		.replace /\ /g, "%20"
	
	root_url = [
		"file://"
		"/" if brackets.platform is "win"
		root_path
	].join ""
	
	start = ->
		LiveDevMultiBrowser.setLauncher {
			launch: (url) ->
				file = FileSystem.getFileForPath "#{ExtensionUtils.getModulePath module}www/js/config.js"
				FileUtils.writeText file, "window.launch_url=\"#{url}\";", true
					.done ->
						NativeApp.openURLInDefaultBrowser "#{root_url}www/index.html"
		}
		LiveDevMultiBrowser.open()
	
	stop = ->
		LiveDevMultiBrowser.close()
		LiveDevMultiBrowser.setLauncher DefaultLauncher
	
	iconClicked = (event) ->
		multibrowser = PreferencesManager.getExtensionPrefs "livedev"
			.get "multibrowser"
		if multibrowser
			if not LiveDevMultiBrowser.isActive()
				start()
			else
				stop()
		else
			Dialogs.showModalDialog DefaultDialogs.DIALOG_ID_ERROR,
				"Not supported",
				"Currently it works only for the Experimental Live Preview.<br>Please select the \"Enable Experimental Live Preview\" from \"File\" menu."
		return
	
	changedIconStatus = ->
		if LiveDevMultiBrowser.isActive()
			icon.css "backgroundPosition", "0px -24px"
		else
			icon.css "backgroundPosition", "0px 0px"
	
	createIcon = ->
		$ "<a href=\"#\"></a>"
			.css {
				backgroundImage: "url(#{root_url}button-sprites.svg)"
				backgroundPosition: "0px 0px"
			}
			.on "click", iconClicked
			.appendTo $ "#main-toolbar .buttons"
	
	icon = createIcon()
	LiveDevMultiBrowser.on "statusChange", changedIconStatus
	
	return
