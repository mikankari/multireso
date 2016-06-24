settings_div = null
preview_div = null
done_button = null
tabs = null
iframes = null

resolutions = null

init = (event) ->
	settings_div = $ "#settings"
	preview_div = $ "#preview"

	done_button = $ "#navigation-done"
	done_button.on "change", doneClicked

	tabs = $ "#preview .tab"

	iframes = $ "#preview iframe"
	iframes.attr "src", window.launch_url

	delete_button = $ "#settings .delete"
	delete_button.on "click", (event) ->
		selectedOptions = $ "#settings .resolutions option:selected"
		selectedOptions.remove()

	add_button = $ "#settings .add"
	add_button.on "click", (event) ->
		width = $ "#settings .width"
			.val()
		height = $ "#settings .height"
			.val()

		return if width < 100 || height < 100

		new_option = $ "<option value=\"#{width} x #{height}\">#{width} x #{height}</option>"
			.appendTo $ "#settings .resolutions"

	resolutions = []

	doneClicked()

doneClicked = (event) ->
	if done_button.is ":checked"
		done_button.next().text "Back"
		settings_div.hide()
		preview_div.show()

		options = $ "#settings .resolutions option"
		resolutions = for value in options.get()
			split = value.value
				.split " x "
			{
				width: split[0]
				height: split[1]
			}

		for value, key in tabs.get()
			value = $ value
			value.empty()
			for value2, key2 in resolutions
				$ "<input type=\"radio\" name=\"frame#{key}-tab\" id=\"frame#{key}-tab#{key2}\" data-frame=\"#{key}\" data-resolution=\"#{key2}\">"
					.on "change", (event) ->
						frame_index = $ event.target
							.attr "data-frame"
						resolution_index = $ event.target
							.attr "data-resolution"
						iframes.eq frame_index
							.width resolutions[resolution_index].width
							.height resolutions[resolution_index].height
					.appendTo value

				$ "<label for=\"frame#{key}-tab#{key2}\">#{value2.width} x #{value2.height}</label>"
					.appendTo value

			$ "#frame#{key}-tab#{key}"
				.click()
	else
		done_button.next().text "Start!"
		preview_div.hide()
		settings_div.show()

$ init
