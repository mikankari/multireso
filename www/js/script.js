(function() {
  var checker, iframes, init, resolutions, tabs, target, top, topDoneClicked, topEditmodeClicked, top_editmode, updateFrameSize;

  top = null;

  top_editmode = null;

  checker = null;

  iframes = null;

  tabs = null;

  target = null;

  resolutions = null;

  init = function(event) {
    var top_add, top_delete, top_done, top_target;
    top = document.querySelector("#top");
    top_done = document.querySelector("#top_done");
    top_done.addEventListener("change", topDoneClicked, false);
    checker = document.querySelector("#checker");
    iframes = [document.querySelector("#checker .first iframe"), document.querySelector("#checker .second iframe")];
    tabs = [document.querySelector("#checker .first .tab"), document.querySelector("#checker .second .tab")];
    top_delete = document.querySelector("#top_delete");
    top_delete.addEventListener("click", function(event) {
      var option, top_resolutions;
      top_resolutions = document.querySelector("#top_resolutions");
      option = top_resolutions.options[top_resolutions.selectedIndex];
      top_resolutions.removeChild(option);
    }, false);
    top_add = document.querySelector("#top_add");
    top_add.addEventListener("click", function(event) {
      var height, option, top_height, top_resolutions, top_width, width;
      top_width = document.querySelector("#top_width");
      top_height = document.querySelector("#top_height");
      width = top_width.value;
      height = top_height.value;
      if (width < 100) {
        return;
      } else if (height < 100) {
        return;
      }
      option = document.createElement("option");
      option.value = width + " x " + height;
      option.innerHTML = width + " x " + height;
      top_resolutions = document.querySelector("#top_resolutions");
      top_resolutions.appendChild(option);
    }, false);
    topDoneClicked({
      target: top_done
    });
    target = window.location.search.substring("?launch_url=".length);
    resolutions = [];
    top_target = document.querySelector("#top_target");
    top_target.value = target;
  };

  topDoneClicked = function(event) {
    var frame_index, frame_value, label, option, radio, resolution_index, resolution_value, split, top_done, top_resolutions, top_target, _i, _j, _len, _len1;
    top_done = event.target;
    if (top_done.checked) {
      top_done.nextSibling.innerHTML = "Back";
      top.style.display = "none";
      checker.style.display = "block";
      top_target = document.querySelector("#top_target");
      target = top_target.value;
      top_resolutions = document.querySelector("#top_resolutions");
      resolutions = (function() {
        var _i, _len, _ref, _results;
        _ref = top_resolutions.options;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          option = _ref[_i];
          split = option.value.split(" x ");
          _results.push({
            width: split[0],
            height: split[1]
          });
        }
        return _results;
      })();
      for (frame_index = _i = 0, _len = iframes.length; _i < _len; frame_index = ++_i) {
        frame_value = iframes[frame_index];
        while (tabs[frame_index].hasChildNodes()) {
          tabs[frame_index].removeChild(tabs[frame_index].lastChild);
        }
        for (resolution_index = _j = 0, _len1 = resolutions.length; _j < _len1; resolution_index = ++_j) {
          resolution_value = resolutions[resolution_index];
          radio = document.createElement("input");
          radio.type = "radio";
          radio.name = "frame" + frame_index + "-tab";
          radio.id = "frame" + frame_index + "-tab-" + resolution_index;
          radio.setAttribute("data-frame", frame_index);
          radio.setAttribute("data-resolution", resolution_index);
          radio.addEventListener("change", (function(_this) {
            return function(event) {
              updateFrameSize(event.target.getAttribute("data-frame"), event.target.getAttribute("data-resolution"));
            };
          })(this), false);
          tabs[frame_index].appendChild(radio);
          label = document.createElement("label");
          label.htmlFor = "frame" + frame_index + "-tab-" + resolution_index;
          label.innerHTML = "<div>" + resolution_value.width + " x " + resolution_value.height + "</div>";
          tabs[frame_index].appendChild(label);
        }
        frame_value.src = target;
        console.log("frame" + frame_index + "-tab-" + frame_index);
        document.querySelector("#frame" + frame_index + "-tab-" + frame_index).click();
      }
    } else {
      top_done.nextSibling.innerHTML = "Check!";
      top.style.display = "block";
      checker.style.display = "none";
    }
  };

  topEditmodeClicked = function(event) {
    if (event.target.checked) {
      styleeditor.style.display = "block";
    } else {
      styleeditor.style.display = "none";
    }
  };

  updateFrameSize = function(frame_index, resolution_index) {
    var iframe, key, resolution, value, _ref, _results;
    iframe = iframes[frame_index];
    resolution = resolutions[resolution_index];
    _ref = {
      width: "" + resolution.width + "px",
      height: "" + resolution.height + "px"
    };
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      _results.push(iframe.style[key] = value);
    }
    return _results;
  };

  window.addEventListener("DOMContentLoaded", init, false);

}).call(this);
