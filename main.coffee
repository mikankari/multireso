
define (require, exports, module) ->
	"use strict"

	LiveDevMultiBrowser = brackets.getModule "LiveDevelopment/LiveDevMultiBrowser"
	LiveDevelopment = brackets.getModule "LiveDevelopment/LiveDevelopment"
	DefaultLauncher = brackets.getModule "LiveDevelopment/MultiBrowserImpl/launchers/Launcher"
	NativeApp = brackets.getModule "utils/NativeApp"
	PreferencesManager = brackets.getModule "preferences/PreferencesManager"
	ExtensionUtils = brackets.getModule "utils/ExtensionUtils"
	Dialogs = brackets.getModule "widgets/Dialogs"
	DefaultDialogs = brackets.getModule "widgets/DefaultDialogs"
	FileSystem = brackets.getModule "filesystem/FileSystem"
	FileUtils = brackets.getModule "file/FileUtils"
	
	root_path = ExtensionUtils.getModulePath module
	root_path = root_path.replace /\ /g, "%20"
	console.log "[multireso] #{root_path}"
	root_url = []
	root_url.push "file://"
	root_url.push "/" if brackets.platform is "win"
	root_url.push root_path
	root_url = root_url.join ""
	console.log "[multireso] #{root_url}"
	
	iconClicked = (event) ->
		multibrowser = PreferencesManager.getExtensionPrefs("livedev").get "multibrowser"
		if multibrowser
			if not LiveDevMultiBrowser.isActive()
				icon.css "backgroundPosition", "0px -24px"
				LiveDevMultiBrowser.setLauncher {
					launch: (url) ->
						file = FileSystem.getFileForPath "#{ExtensionUtils.getModulePath module}www/js/config.js"
						promise = FileUtils.writeText file, "window.launch_url=\"#{url}\";", true
						promise.done =>
							NativeApp.openURLInDefaultBrowser "#{root_url}www/index.html"
				}
				LiveDevMultiBrowser.open()
			else
				icon.css "backgroundPosition", "0px 0px"
				LiveDevMultiBrowser.close()
				LiveDevMultiBrowser.setLauncher DefaultLauncher
		else
			Dialogs.showModalDialog DefaultDialogs.DIALOG_ID_ERROR,
				"つくってない",
				"現在は試験ライブプレビューのみで動作します。<br>メニューのファイルから「試験ライブプレビューを有効にする」にチェックを入れて下さい。"
#			LiveDevelopment.open()
		return
	
	icon = $("<a href=\"#\"></a>").css({
		backgroundImage: "url(#{root_url}button-sprites.svg)"
		backgroundPosition: "0px 0px"
	}).on("click", iconClicked).appendTo $ "#main-toolbar .buttons"
	
	return
