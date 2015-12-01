define(function(require, exports, module) {
  "use strict";
  var DefaultDialogs, DefaultLauncher, Dialogs, ExtensionUtils, FileSystem, FileUtils, LiveDevMultiBrowser, LiveDevelopment, NativeApp, PreferencesManager, getModuleUrl, icon, iconClicked;
  LiveDevMultiBrowser = brackets.getModule("LiveDevelopment/LiveDevMultiBrowser");
  LiveDevelopment = brackets.getModule("LiveDevelopment/LiveDevelopment");
  DefaultLauncher = brackets.getModule("LiveDevelopment/MultiBrowserImpl/launchers/Launcher");
  NativeApp = brackets.getModule("utils/NativeApp");
  PreferencesManager = brackets.getModule("preferences/PreferencesManager");
  ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
  Dialogs = brackets.getModule("widgets/Dialogs");
  DefaultDialogs = brackets.getModule("widgets/DefaultDialogs");
  FileSystem = brackets.getModule("filesystem/FileSystem");
  FileUtils = brackets.getModule("file/FileUtils");
  getModuleUrl = function() {
    if (brackets.platform === "win") {
      return ExtensionUtils.getModuleUrl(module);
    } else {
      return "file://" + (ExtensionUtils.getModulePath(module));
    }
  };
  iconClicked = function(event) {
    var multibrowser;
    multibrowser = PreferencesManager.getExtensionPrefs("livedev").get("multibrowser");
    if (multibrowser) {
      if (!LiveDevMultiBrowser.isActive()) {
        icon.css("backgroundPosition", "0px -24px");
        LiveDevMultiBrowser.setLauncher({
          launch: function(url) {
            var file, promise;
            file = FileSystem.getFileForPath("" + (ExtensionUtils.getModulePath(module)) + "www/js/config.js");
            console.log(file);
            promise = FileUtils.writeText(file, "window.launch_url=\"" + url + "\";", true);
            return promise.done((function(_this) {
              return function() {
                return NativeApp.openURLInDefaultBrowser("" + (getModuleUrl()) + "www/index.html");
              };
            })(this));
          }
        });
        LiveDevMultiBrowser.open();
      } else {
        icon.css("backgroundPosition", "0px 0px");
        LiveDevMultiBrowser.close();
        LiveDevMultiBrowser.setLauncher(DefaultLauncher);
      }
    } else {
      Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_ERROR, "つくってない", "現在は試験ライブプレビューのみで動作します。<br>メニューのファイルから「試験ライブプレビューを有効にする」にチェックを入れて下さい。");
    }
  };
  icon = $("<a href=\"#\"></a>").css({
    backgroundImage: "url(" + (getModuleUrl()) + "button-sprites.svg)",
    backgroundPosition: "0px 0px"
  }).on("click", iconClicked).appendTo($("#main-toolbar .buttons"));
});
