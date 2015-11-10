define(function(require, exports, module) {
  "use strict";
  var LiveDevMultiBrowser, LiveDevServerManager, LiveDevelopment, LiveDevelopmentUtils, NativeApp, NodeDomain, PreferencesManager, ProjectManager, UserServer, icon, iconClicked, nodedomain;
  console.log("initializing multireso extension...");
  LiveDevelopment = brackets.getModule("LiveDevelopment/LiveDevelopment");
  LiveDevMultiBrowser = brackets.getModule("LiveDevelopment/LiveDevMultiBrowser");
  LiveDevServerManager = brackets.getModule("LiveDevelopment/LiveDevServerManager");
  LiveDevelopmentUtils = brackets.getModule("LiveDevelopment/LiveDevelopmentUtils");
  ProjectManager = brackets.getModule("project/ProjectManager");
  UserServer = brackets.getModule("LiveDevelopment/Servers/UserServer");
  UserServer = UserServer.UserServer;
  NativeApp = brackets.getModule("utils/NativeApp");
  PreferencesManager = brackets.getModule("preferences/PreferencesManager");
  NodeDomain = brackets.getModule("utils/NodeDomain");
  nodedomain = new NodeDomain("launcher", "/Applications/Brackets.app/Contents/www/LiveDevelopment/MultiBrowserImpl/launchers/node/LauncherDomain");
  iconClicked = function(event) {
    var multibrowser;
    multibrowser = PreferencesManager.getExtensionPrefs("livedev").get("multibrowser");
    if (multibrowser) {
      if (!LiveDevMultiBrowser.isActive()) {
        LiveDevMultiBrowser.setLauncher({
          launch: function(url) {
            return NativeApp.openURLInDefaultBrowser("file:///Applications/Brackets.app/Contents/www/extensions/dev/multireso/index.html?launch_url=" + url);
          }
        });
        LiveDevMultiBrowser.open();
      } else {
        LiveDevMultiBrowser.close();
      }
    }
  };
  icon = $("<a href=\"#\"></a>").on("click", iconClicked).appendTo($("#main-toolbar .buttons"));
});
