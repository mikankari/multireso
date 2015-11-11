define(function(require, exports, module) {
  "use strict";
  var DefaultLauncher, LiveDevMultiBrowser, LiveDevelopment, NativeApp, PreferencesManager, icon, iconClicked;
  LiveDevMultiBrowser = brackets.getModule("LiveDevelopment/LiveDevMultiBrowser");
  LiveDevelopment = brackets.getModule("LiveDevelopment/LiveDevelopment");
  DefaultLauncher = brackets.getModule("LiveDevelopment/MultiBrowserImpl/launchers/Launcher");
  NativeApp = brackets.getModule("utils/NativeApp");
  PreferencesManager = brackets.getModule("preferences/PreferencesManager");
  iconClicked = function(event) {
    var multibrowser;
    multibrowser = PreferencesManager.getExtensionPrefs("livedev").get("multibrowser");
    if (multibrowser) {
      if (!LiveDevMultiBrowser.isActive()) {
        icon.css("backgroundPosition", "0px -24px");
        LiveDevMultiBrowser.setLauncher({
          launch: function(url) {
            return NativeApp.openURLInDefaultBrowser("file:///Applications/Brackets.app/Contents/www/extensions/dev/multireso/www/index.html?launch_url=" + url);
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
    backgroundImage: "url(file:///Applications/Brackets.app/Contents/www/extensions/dev/multireso/button-sprites.svg)",
    backgroundPosition: "0px 0px"
  }).on("click", iconClicked).appendTo($("#main-toolbar .buttons"));
});
