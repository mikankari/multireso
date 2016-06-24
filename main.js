(function() {
  define(function(require, exports, module) {
    "use strict";
    var DefaultDialogs, DefaultLauncher, Dialogs, ExtensionUtils, FileSystem, FileUtils, LiveDevMultiBrowser, NativeApp, PreferencesManager, changedIconStatus, createIcon, icon, iconClicked, root_path, root_url, start, stop;
    LiveDevMultiBrowser = brackets.getModule("LiveDevelopment/LiveDevMultiBrowser");
    DefaultLauncher = brackets.getModule("LiveDevelopment/MultiBrowserImpl/launchers/Launcher");
    NativeApp = brackets.getModule("utils/NativeApp");
    PreferencesManager = brackets.getModule("preferences/PreferencesManager");
    ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    Dialogs = brackets.getModule("widgets/Dialogs");
    DefaultDialogs = brackets.getModule("widgets/DefaultDialogs");
    FileSystem = brackets.getModule("filesystem/FileSystem");
    FileUtils = brackets.getModule("file/FileUtils");
    root_path = ExtensionUtils.getModulePath(module).replace(/\ /g, "%20");
    root_url = ["file://", brackets.platform === "win" ? "/" : void 0, root_path].join("");
    start = function() {
      LiveDevMultiBrowser.setLauncher({
        launch: function(url) {
          var file;
          file = FileSystem.getFileForPath("" + (ExtensionUtils.getModulePath(module)) + "www/js/config.js");
          return FileUtils.writeText(file, "window.launch_url=\"" + url + "\";", true).done(function() {
            return NativeApp.openURLInDefaultBrowser("" + root_url + "www/index.html");
          });
        }
      });
      return LiveDevMultiBrowser.open();
    };
    stop = function() {
      LiveDevMultiBrowser.close();
      return LiveDevMultiBrowser.setLauncher(DefaultLauncher);
    };
    iconClicked = function(event) {
      var multibrowser;
      multibrowser = PreferencesManager.getExtensionPrefs("livedev").get("multibrowser");
      if (multibrowser) {
        if (!LiveDevMultiBrowser.isActive()) {
          start();
        } else {
          stop();
        }
      } else {
        Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_ERROR, "Not supported", "Currently it works only for the Experimental Live Preview.<br>Please select the \"Enable Experimental Live Preview\" from \"File\" menu.");
      }
    };
    changedIconStatus = function() {
      if (LiveDevMultiBrowser.isActive()) {
        return icon.css("backgroundPosition", "0px -24px");
      } else {
        return icon.css("backgroundPosition", "0px 0px");
      }
    };
    createIcon = function() {
      return $("<a href=\"#\"></a>").css({
        backgroundImage: "url(" + root_url + "button-sprites.svg)",
        backgroundPosition: "0px 0px"
      }).on("click", iconClicked).appendTo($("#main-toolbar .buttons"));
    };
    icon = createIcon();
    LiveDevMultiBrowser.on("statusChange", changedIconStatus);
  });

}).call(this);
