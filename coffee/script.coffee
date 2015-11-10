top = null
top_editmode = null
checker = null
iframes = null
tabs = null
styleeditor_textarea = null
target = null
resolutions = null

init = (event) ->
	top = document.querySelector "#top"
	
	top_done = document.querySelector "#top_done"
	top_done.addEventListener "change", topDoneClicked, false
	
	top_editmode = document.querySelector "#top_editmode"
	top_editmode.addEventListener "change", topEditmodeClicked, false
	
	checker = document.querySelector "#checker"
	
	iframes = [
		document.querySelector "#checker .first iframe"
		document.querySelector "#checker .second iframe"
	]
	tabs = [
		document.querySelector "#checker .first .tab"
		document.querySelector "#checker .second .tab"
	]
	
	styleeditor_textarea = document.querySelector "#styleeditor_textarea"
	CodeMirror.fromTextArea styleeditor_textarea, {mode: "css", lineNumbers: true}
	
	top_delete = document.querySelector "#top_delete"
	top_delete.addEventListener "click", (event) ->
		top_resolutions = document.querySelector "#top_resolutions"
		option = top_resolutions.options[top_resolutions.selectedIndex]
		top_resolutions.removeChild option
		return
	, false
	top_add = document.querySelector "#top_add"
	top_add.addEventListener "click", (event) ->
		top_width = document.querySelector "#top_width"
		top_height = document.querySelector "#top_height"
		width = top_width.value;
		height = top_height.value;
		if width < 100
			return
		else if height < 100
			return
		option = document.createElement "option"
		option.value = width + " x " + height
		option.innerHTML = width + " x " + height
		top_resolutions = document.querySelector "#top_resolutions"
		top_resolutions.appendChild option
		return
	, false
	
	styleeditor = document.querySelector "#styleeditor"
	styleeditor.addEventListener "dragend", (event) ->
		for key, value of {
			left: "#{event.pageX - 0}px"
			top: "#{event.pageY - 0}px"
		} then styleeditor.style[key] = value
	, false
	styleeditor_close = document.querySelector "#styleeditor_close"
	styleeditor_close.addEventListener "click", (event) ->
		top_editmode.click();
	,false
	
	topDoneClicked {target: top_done}
	topEditmodeClicked {target: top_editmode}
	
	target = window.location.search.substring "?launch_url=".length
	resolutions = []
	
#	for frame in iframes
#		frame.src = target
	top_target = document.querySelector "#top_target"
	top_target.value = target
	return

topDoneClicked = (event) ->
#	validation code here
	top_done = event.target
	if top_done.checked
		top_done.nextSibling.innerHTML = "Back"
		top.style.display = "none"
		checker.style.display = "block"
		top_editmode.nextSibling.style.display = "inline"
		
		top_target = document.querySelector "#top_target"
		target = top_target.value
		top_resolutions = document.querySelector "#top_resolutions"
		resolutions = for option in top_resolutions.options
			split = option.value.split " x "
			{width: split[0], height: split[1]}
		for frame_value, frame_index in iframes
			while tabs[frame_index].hasChildNodes() then tabs[frame_index].removeChild tabs[frame_index].lastChild
			for resolution_value, resolution_index in resolutions
				radio = document.createElement "input"
				radio.type = "radio"
				radio.name = "frame#{frame_index}-tab"
				radio.id = "frame#{frame_index}-tab-#{resolution_index}"
				radio.setAttribute "data-frame", frame_index
				radio.setAttribute "data-resolution", resolution_index
				radio.addEventListener "change", (event) =>
					updateFrameSize event.target.getAttribute("data-frame"), event.target.getAttribute("data-resolution")
					return
				, false
				tabs[frame_index].appendChild radio
				label = document.createElement "label"
				label.htmlFor = "frame#{frame_index}-tab-#{resolution_index}"
				label.innerHTML = "<div>#{resolution_value.width} x #{resolution_value.height}</div>"
				tabs[frame_index].appendChild label
			frame_value.src = target
			console.log "frame#{frame_index}-tab-#{frame_index}"
			document.querySelector("#frame#{frame_index}-tab-#{frame_index}").click()
	else
		top_done.nextSibling.innerHTML = "Check!"
		top.style.display = "block"
		checker.style.display = "none"
		top_editmode.nextSibling.style.display = "none"
		if top_editmode.checked then top_editmode.click()
	return

topEditmodeClicked = (event) ->
	
	if event.target.checked
		styleeditor.style.display = "block"
	else
		styleeditor.style.display = "none"
	return

updateFrameSize = (frame_index, resolution_index) ->
	iframe = iframes[frame_index]
	resolution = resolutions[resolution_index]
	for key, value of {
		width: "#{resolution.width}px"
		height: "#{resolution.height}px"
	} then iframe.style[key] = value

window.addEventListener "DOMContentLoaded", init, false