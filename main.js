define(function(require, exports, module) {
  "use strict";
  var DefaultLauncher, ExtensionUtils, LiveDevMultiBrowser, LiveDevelopment, NativeApp, PreferencesManager, icon, iconClicked;
  LiveDevMultiBrowser = brackets.getModule("LiveDevelopment/LiveDevMultiBrowser");
  LiveDevelopment = brackets.getModule("LiveDevelopment/LiveDevelopment");
  DefaultLauncher = brackets.getModule("LiveDevelopment/MultiBrowserImpl/launchers/Launcher");
  NativeApp = brackets.getModule("utils/NativeApp");
  PreferencesManager = brackets.getModule("preferences/PreferencesManager");
  ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
  console.log(ExtensionUtils.getModulePath(module, ""));
  console.log(ExtensionUtils.getModuleUrl(module, "www/"));
  iconClicked = function(event) {
    var multibrowser;
    multibrowser = PreferencesManager.getExtensionPrefs("livedev").get("multibrowser");
    if (multibrowser) {
      if (!LiveDevMultiBrowser.isActive()) {
        icon.css("backgroundPosition", "0px -24px");
        LiveDevMultiBrowser.setLauncher({
          launch: function(url) {
            return NativeApp.openURLInDefaultBrowser("file://" + (ExtensionUtils.getModulePath(module)) + "www/index.html?launch_url=" + url);
          }
        });
        LiveDevMultiBrowser.open();
      } else {
        icon.css("backgroundPosition", "0px 0px");
        LiveDevMultiBrowser.close();
        LiveDevMultiBrowser.setLauncher(DefaultLauncher);
      }
    }
  };
  icon = $("<a href=\"#\"></a>").css({
    backgroundImage: "url(file://" + (ExtensionUtils.getModulePath(module)) + "button-sprites.svg)",
    backgroundPosition: "0px 0px"
  }).on("click", iconClicked).appendTo($("#main-toolbar .buttons"));
});
