
define (require, exports, module) ->
	"use strict"

	LiveDevMultiBrowser = brackets.getModule "LiveDevelopment/LiveDevMultiBrowser"
	LiveDevelopment = brackets.getModule "LiveDevelopment/LiveDevelopment"
	DefaultLauncher = brackets.getModule "LiveDevelopment/MultiBrowserImpl/launchers/Launcher"
	NativeApp = brackets.getModule "utils/NativeApp"
	PreferencesManager = brackets.getModule "preferences/PreferencesManager"
	ExtensionUtils = brackets.getModule "utils/ExtensionUtils"
	console.log ExtensionUtils.getModulePath module, ""
	console.log ExtensionUtils.getModuleUrl module, "www/"

	iconClicked = (event) ->
		multibrowser = PreferencesManager.getExtensionPrefs("livedev").get "multibrowser"
		if multibrowser
			if not LiveDevMultiBrowser.isActive()
				icon.css "backgroundPosition", "0px -24px"
				LiveDevMultiBrowser.setLauncher {
					launch: (url) ->
						NativeApp.openURLInDefaultBrowser "file://#{ExtensionUtils.getModulePath module}www/index.html?launch_url=#{url}"
				}
				LiveDevMultiBrowser.open()
			else
				icon.css "backgroundPosition", "0px 0px"
				LiveDevMultiBrowser.close()
				LiveDevMultiBrowser.setLauncher DefaultLauncher
#		else
#			LiveDevelopment.open().done ->
#				console.log LiveDevelopment.getServerBaseUrl()
#				NativeApp.openURLInDefaultBrowser "file:///Applications/Brackets.app/Contents/www/extensions/dev/multireso/index.html"
#				LiveDevelopment.close()
		return
	
	icon = $("<a href=\"#\"></a>").css({
		backgroundImage: "url(file://#{ExtensionUtils.getModulePath module}button-sprites.svg)"
		backgroundPosition: "0px 0px"
	}).on("click", iconClicked).appendTo $ "#main-toolbar .buttons"
	
	return
