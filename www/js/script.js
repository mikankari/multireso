(function() {
  var doneClicked, done_button, iframes, init, preview_div, resolutions, settings_div, tabs;

  settings_div = null;

  preview_div = null;

  done_button = null;

  tabs = null;

  iframes = null;

  resolutions = null;

  init = function(event) {
    var add_button, delete_button;
    settings_div = $("#settings");
    preview_div = $("#preview");
    done_button = $("#navigation-done");
    done_button.on("change", doneClicked);
    tabs = $("#preview .tab");
    iframes = $("#preview iframe");
    iframes.attr("src", window.launch_url);
    delete_button = $("#settings .delete");
    delete_button.on("click", function(event) {
      var selectedOptions;
      selectedOptions = $("#settings .resolutions option:selected");
      return selectedOptions.remove();
    });
    add_button = $("#settings .add");
    add_button.on("click", function(event) {
      var height, new_option, width;
      width = $("#settings .width").val();
      height = $("#settings .height").val();
      if (width < 100 || height < 100) {
        return;
      }
      return new_option = $("<option value=\"" + width + " x " + height + "\">" + width + " x " + height + "</option>").appendTo($("#settings .resolutions"));
    });
    resolutions = [];
    return doneClicked();
  };

  doneClicked = function(event) {
    var key, key2, options, split, value, value2, _i, _j, _len, _len1, _ref, _results;
    if (done_button.is(":checked")) {
      done_button.next().text("Back");
      settings_div.hide();
      preview_div.show();
      options = $("#settings .resolutions option");
      resolutions = (function() {
        var _i, _len, _ref, _results;
        _ref = options.get();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          split = value.value.split(" x ");
          _results.push({
            width: split[0],
            height: split[1]
          });
        }
        return _results;
      })();
      _ref = tabs.get();
      _results = [];
      for (key = _i = 0, _len = _ref.length; _i < _len; key = ++_i) {
        value = _ref[key];
        value = $(value);
        value.empty();
        for (key2 = _j = 0, _len1 = resolutions.length; _j < _len1; key2 = ++_j) {
          value2 = resolutions[key2];
          $("<input type=\"radio\" name=\"frame" + key + "-tab\" id=\"frame" + key + "-tab" + key2 + "\" data-frame=\"" + key + "\" data-resolution=\"" + key2 + "\">").on("change", function(event) {
            var frame_index, resolution_index;
            frame_index = $(event.target).attr("data-frame");
            resolution_index = $(event.target).attr("data-resolution");
            return iframes.eq(frame_index).width(resolutions[resolution_index].width).height(resolutions[resolution_index].height);
          }).appendTo(value);
          $("<label for=\"frame" + key + "-tab" + key2 + "\">" + value2.width + " x " + value2.height + "</label>").appendTo(value);
        }
        _results.push($("#frame" + key + "-tab" + key).click());
      }
      return _results;
    } else {
      done_button.next().text("Start!");
      preview_div.hide();
      return settings_div.show();
    }
  };

  $(init);

}).call(this);
