/* DOCUMENTATION ==================================================================================
	PROPERTIES
		name:			string name of the Object
		parentDivId:	string Id of the <div> element in the HTML document to turn into a MultiSelectComboBox
		optionMap:		Map of checkbox names
		
	METHODS
		addOption(optionName):		adds a checkbox option
		removeOption(optionName):	removes a checkbox option
		getValue(optionName):		gets the .checked value of a checkbox(true or false)
		getAllValues():				returns an array of [optionName, .checked]
		updateState():				updates the expanded/collapsed state based on the isExpanded property
		checkUncheckAll():			updates the values of all options based on the value of the All option
		writeHtml():				writes the .innerHtml of the specified <div> to create the
										MultiSelectComboBox.
*================================================================================================*/

class MultiSelectComboBox {
	constructor(name, parentDivId) {
		// Properties
		this.name = name;
		this.parentDivId = parentDivId;
		this.optionMap = new Map();
		this.addOption("All");
		
		// Dimensions
		this.collapsedHeight = 30;
		this.expandedHeight = 150;
		this.isExpanded = false;
		
		// Colors
		this.backgroundColor = "LightGray";
		this.fontColor = "black";
		
		// Borders
		this.borderWidth = "1";
		this.borderColor = "black";
		this.borderStyle = "solid";
		
		
		// Create a link to Google icons
		var link = document.createElement('link');
		link.rel = "stylesheet";
		link.href = `https://fonts.googleapis.com/icon?family=Material+Icons`;
		
		// If the document head does not have a link to Google icons, add it.
		var hasLink = document.head.querySelector(`link[href="${link.href}"][rel="${link.rel}"]`)
		if(hasLink == null) { document.head.appendChild(link); }
	}
	
	
	addOption(optionName) {
		if(this.optionMap.has(optionName) == true) {
			throw new Error(`The optionMap already has an option named ${optionName}`);
		}
		
		this.optionMap.set(optionName, `${this.name}_${optionName}`);
	}
	
	
	removeOption(optionName) {
		if(this.optionMap.has(optionName) == false) {
			throw new Error(`The optionMap does not contain an option named ${optionName}`);
		}
		
		this.optionMap.delete(optionName);
	}
	
	
	getValue(option) {
		if(document.getElementById(this.name) == null) {
			throw new Error("Document model does not contain a div.");
		}
		
		return document.getElementById(this.optionMap.get(option)).checked;
	}
	
	
	getAllValues() {
		if(document.getElementById(this.name) == null) {
			throw new Error("Document model does not contain a div.");
		}
		
		var selectedOptions = [];
		for(const [key, value] of this.optionMap) {
			selectedOptions.push([key, document.getElementById(value).checked]);
		}
	}
	
	
	#updateState() {
		if(this.isExpanded) {
			document.getElementById(this.name).style.overflow = "clip";
	
			var div = document.getElementById(`${this.name}_optionsDiv`);
			div.style.height = `${this.collapsedHeight}px`;
			div.style.overflow = "clip";
			div.style.borderStyle = "none";
	
			var icon = document.getElementById(`${this.name}_icon`);
			icon.innerText = "arrow_drop_down";
		}
		else {
			document.getElementById(this.name).style.overflow = "visible";
	
			var div = document.getElementById(`${this.name}_optionsDiv`);
			div.style.height = `${this.expandedHeight}px`;
			div.style.overflow = "auto";
			div.style.borderStyle = this.borderStyle;
			div.style.borderWidth = `${this.borderWidth}px`;
	
			var icon = document.getElementById(`${this.name}_icon`);
			icon.innerText = "arrow_drop_up";
		}
		
		this.isExpanded = !this.isExpanded;
	}
	
	
	#checkUncheckAll() {
		// Iterate through all of the options and match their value to the all value.
		var isAllChecked = document.getElementById(this.optionMap.get("All")).checked;
		for(const [key, value] of this.optionMap) {
			document.getElementById(value).checked = isAllChecked;
		}
	}
	
	
	writeHtml() {
		if(document.getElementById(this.parentDivId) == null) {
			throw new Error("DOM does not contain a div to write html to.");
		}
		
		// Build the html for the checkbox inputs
		var fontHeight = `${this.collapsedHeight * 0.8}px`;
		var optionString = "";
		for(const [key, value] of this.optionMap) {
			optionString += `
							<input id="${value}" type="checkbox" value="${key}" style="height: ${fontHeight}; width: ${fontHeight};">
							<label style="font-size: ${fontHeight};
										  color: ${this.fontColor};">
								${key}
							</label>
							<br>
							`;
		}
		
		// Build the html for the MultiSelectComboBox
		var htmlString = `
						 <div
							id = "${this.name}"
							style = "position: relative;
									 display: flex;
									 justify-direction: row;
									 height: ${this.collapsedHeight}px;
									 width: 100%;
									 overflow: clip;
									 background-color: ${this.backgroundColor};
									 border-width: ${this.borderWidth}px;
									 border-style: ${this.borderStyle};
									 border-color: ${this.borderColor};"
						 >
							<div
								id="${this.name}_optionsDiv"
								style= "background-color: ${this.backgroundColor};
										width: 90%;
										height: ${this.collapsedHeight}px;
										z-index: 9999;
										borderStyle: none;"
							>
								${optionString}
							</div>
							
							<i
								id="${this.name}_icon"
								class="material-icons"
								style="font-size: ${this.collapsedHeight}px; color: ${this.fontColor}"
							>
								arrow_drop_down
							</i>
						 </div>
						 `;
		
		// Set the html of the specified <div> element
		document.getElementById(this.parentDivId).innerHTML = htmlString;
		
		// Setup the required event handlers
		document.getElementById(`${this.name}_icon`).addEventListener("click", this.#updateState.bind(this, this.name));
		document.getElementById(this.optionMap.get("All")).addEventListener("change", this.#checkUncheckAll.bind(this, this.name));
	}
}