/* DOCUMENTATION ==================================================================================
	PROPERTIES
		name:				string name of the Object
		divId:				string Id of the <div> element in the HTML document to turn into a MultiSelectComboBox
		collapsedHeight:	integer value in px
		expandedHeight:		integer value in px
		isExpanded:			boolean state of the object, true = expanded, false = collapsed
		optionMap:			Map of checkbox names
		
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
	constructor(name, divId) {
		this.name = name;
		this.divId = divId;
		this.collapsedHeight = 30;
		this.expandedHeight = 150;
		this.isExpanded = false;
		this.optionMap = new Map();
		this.addOption("All");
		
		// Create the link to Google icons
		var link = document.createElement('link');
		link.rel = "stylesheet";
		link.href = `https://fonts.googleapis.com/icon?family=Material+Icons`;
		
		// If the document head does not have a link to Google icons, add it.
		var hasLink = document.head.querySelector(`link[href="${link.href}"][rel="${link.rel}"]`)
		if(hasLink == null) {
			document.head.appendChild(link);
		}
	}
	
	
	addOption(optionName) {
		if(this.optionMap.has(optionName) == true) {return false; }
		
		this.optionMap.set(optionName, `${this.name}_${optionName}`);
		return true;
	}
	
	
	removeOption(optionName) {
		if(this.optionMap.has(optionName) == false) { return false; }
		
		this.optionMap.delete(optionName);
		return true;
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
	
	
	updateState() {
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
			div.style.borderStyle = "solid";
			div.style.borderWidth = "1px";
			div.style.borderColor = "black";
	
			var icon = document.getElementById(`${this.name}_icon`);
			icon.innerText = "arrow_drop_up";
		}
		
		this.isExpanded = !this.isExpanded;
	}
	
	
	checkUncheckAll() {
		// Iterate through all of the options and match their value to the all value.
		var isAllChecked = document.getElementById(this.optionMap.get("All")).checked;
		for(const [key, value] of this.optionMap) {
			document.getElementById(value).checked = isAllChecked;
		}
	}
	
	
	writeHtml() {
		if(document.getElementById(this.divId) == null) {
			throw new Error("DOM does not contain a div to write html to.");
		}
		
		// Build the html for the checkbox inputs
		var fontHeight = `${this.collapsedHeight * 0.8}px`;
		var optionString = "";
		for(const [key, value] of this.optionMap) {
			optionString += `
							<input id="${value}" type="checkbox" value="${key}" style="height: ${fontHeight}; width: ${fontHeight};">
							<label style="font-size: ${fontHeight}">${key}</label>
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
									 background-color: LightGray;
									 border-width: 1px;
									 border-style: solid;
									 border-color: black;"
						 >
							<div
								id="${this.name}_optionsDiv"
								style= "background-color: LightGray;
										width: 90%;
										height: ${this.collapsedHeight}px;
										z-index: 9999;"
							>
								${optionString}
							</div>
							
							<i
								id="${this.name}_icon"
								class="material-icons"
								style="font-size: ${this.collapsedHeight}px;"
							>
								arrow_drop_down
							</i>
						 </div>
						 `;
		
		// Set the html of the specified <div> element and set the event listener for expanding/collapsing
		document.getElementById(this.divId).innerHTML = htmlString;
		document.getElementById(`${this.name}_icon`).addEventListener("click", this.updateState.bind(this, this.name));
		
		// Set the event handler for the All checkbox changed event
		var itemName = this.optionMap.get("All");
		document.getElementById(this.optionMap.get("All")).addEventListener("change", this.checkUncheckAll.bind(this, this.name));
	}
}