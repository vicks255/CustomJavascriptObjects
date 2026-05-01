/* DOCUMENTATION ==================================================================================
	PROPERTIES
		#name:			string name of the Object
		#parentDivId:	string Id of the <div> element in the HTML document to turn into a MultiSelectComboBox
		#optionMap:		Map of checkbox names
		
	METHODS
		addOption(optionName):				adds a checkbox option
		removeOption(optionName):			removes a checkbox option
		getValue(optionName):				gets the .checked value of a checkbox(true or false)
		getAllValues():						returns an array of [optionName, .checked]
		setValue(optionName, isChecked):	sets the .checked property of the specified checkbox
		setAllValues(isChecked):			sets the .checked property for all checkboxes
		updateState():						updates the expanded/collapsed state based on the isExpanded property
		checkUncheckAll():					updates the values of all options based on the value of the All option
		writeHtml():						writes the .innerHtml of the specified <div> to create the
												MultiSelectComboBox.
*================================================================================================*/

class MultiSelectComboBox {
	constructor(name, parentDivId) {
		// Private Properties
		this.#optionMap = new Map();
		
		// Properties
		this.name = name;
		this.parentDivId = parentDivId;
		
		// Dimensions
		this.collapsedHeight = 1.0;
		this.expandedHeight = 5.0;
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
		if (hasLink == null) { document.head.appendChild(link); }

		this.addOption("All");
	}
	
	
	// PRIVATE PROPERTIES -------------------------------------------------------------------------
	#optionMap;
	
	
	// PUBLIC PROPERTIES --------------------------------------------------------------------------
	name;
	parentDivId;
	collapsedHeight;
	expandedHeight;
	isExpanded;
	
	backgroundColor;
	fontColor;
	borderWidth;
	borderColor;
	borderStyle;
	
	
	// PRIVATE METHODS ----------------------------------------------------------------------------
	#updateState() {
		if(this.isExpanded) {
			document.getElementById(this.name).style.overflow = "clip";
	
			var div = document.getElementById(`${this.name}_optionsDiv`);
			div.style.height = `${this.collapsedHeight}vh`;
			div.style.overflow = "clip";
			div.style.borderStyle = "none";
			div.style.zIndex = 0;
	
			var icon = document.getElementById(`${this.name}_icon`);
			icon.innerText = "arrow_drop_down";
		}
		else {
			document.getElementById(this.name).style.overflow = "visible";
	
			var div = document.getElementById(`${this.name}_optionsDiv`);
			div.style.height = `${this.expandedHeight}vh`;
			div.style.overflow = "auto";
			div.style.borderStyle = this.borderStyle;
			div.style.borderWidth = `${this.borderWidth}px`;
			div.style.zIndex = 9999;
	
			var icon = document.getElementById(`${this.name}_icon`);
			icon.innerText = "arrow_drop_up";
		}
		
		this.isExpanded = !this.isExpanded;
	}
	
	#checkUncheckAll() {
		// Iterate through all of the options and match their value to the all value.
		var isAllChecked = document.getElementById(this.#optionMap.get("All")).checked;
		for(const [key, value] of this.#optionMap) {
			document.getElementById(value).checked = isAllChecked;
		}
	}
	
	
	// PUBLIC METHODS -----------------------------------------------------------------------------
	getOptionMap() {
		// Returns a copy of the optionMap
		
		return this.#optionMap;
	}
	
	addOption(optionName) {
		// Add a new option to the optionMap
		
		if(optionName == null || optionName == "") {
			throw new Error("optionName cannot be null or empty.");
		}
		
		if(this.#optionMap.has(optionName) == true) {
			throw new Error(`The optionMap already has an option named ${optionName}`);
		}
		
		this.#optionMap.set(optionName, `${this.name}_${optionName}`);
	}
	
	removeOption(optionName) {
		// Remove an option from the optionMap
		
		if(optionName == null || optionName == "") {
			throw new Error(`optionName cannot be null or empty.`);
		}
		
		if(this.#optionMap.has(optionName) == false) {
			throw new Error(`The optionMap does not contain an option named ${optionName}`);
		}
		
		this.#optionMap.delete(optionName);
	}
	
	hasOption(optionName) {
		// Returns true if the optionMap contains the optionName, false if not.
		
		if(this.#optionMap.has(optionName)) { return true; }
		return false;
	}
	
	sortOptions() {
		// Sort the options in the optionMap alphabetically
		
		var sortedArray = [...this.#optionMap].sort((a, b) => {
		return a[0].localeCompare(b[0]); });
		
		if(this.hasOption("All")) {
			var allOption = this.#optionMap["All"];
			this.#optionMap = new Map();
			this.addOption("All", allOption);
			for(const value of sortedArray){
				if(value[0] != "All") {
					this.addOption(value[0], value[1]);
				}
			}
		}
		else {
			this.#optionMap = new Map(sortedArray);
		}
	}
	
	getValue(option) {
		// Returns the checked value of an option
		
		if(document.getElementById(this.name) == null) {
			throw new Error("Document model does not contain a div.");
		}
		
		return document.getElementById(this.#optionMap.get(option)).checked;
	}
	
	setValue(optionName, isChecked) {
		// Sets the isChecked property of an option
		
		if(document.getElementById(this.name) == null) {
			throw new Error("Document model does not contain a div.");
		}
		
		document.getElementById(this.#optionMap[optionName]).checked = isChecked;
	}
	
	getAllValues() {
		// Returns an array of [optionName, isChecked] for all options in the optionMap
		
		if(document.getElementById(this.name) == null) {
			throw new Error("Document model does not contain a div.");
		}
		
		var selectedOptions = [];
		for(const [key, value] of this.#optionMap) {
			selectedOptions.push([ { optionName: key, isChecked: document.getElementById(value).isChecked } ]);
		}
		return selectedOptions;
	}
	
	setAllValues(isChecked) {
		// Sets the isChecked property of all options to the value
		
		for(const [key, value] of this.#optionMap) {
			document.getElementById(value).checked = isChecked;
		}
	}
	
	addCheckBoxChangedEventListener(optionName, eventHandler) {
		// Adds a change event handler to allow an action to be performed when an option is checked/unchecked
		
		if(this.#optionMap.has(optionName) == false) {
			throw new Error("The optionMap does not contain an option name ${optionName}");
		}
		
		document.getElementById(`${this.#optionMap.get(optionName)}`).addEventListener("change", eventHandler);
	}
	
	writeHtml() {
		// Writes the output HTML specified by the parentDivId property
		
		if(document.getElementById(this.parentDivId) == null) {
			throw new Error("DOM does not contain a div to write html to.");
		}
		
		// Build the html for the checkbox inputs
		var optionString = "";
		var fontHeight = `${this.collapsedHeight * 0.7}vh`;
		for(const [key, value] of this.#optionMap) {
			optionString +=
			`
			<input id="${value}"
				type="checkbox"
				value="${key}"
				style="height: ${fontHeight};
					   width: ${fontHeight};"
			>
			<label style="height: ${this.collapsedHeight}
						  font-size: ${fontHeight};
				          color: ${this.fontColor};
						  white-space: nowrap;
						  font-weight: normal;"
			>
				${key}
			</label>
			<br>
			`;
		}
		
		// Build the html for the MultiSelectComboBox
		var htmlString = `
						 <div
							id = "${this.name}"
							style = "display: flex;
									 justify-direction: row;
									 height: ${this.collapsedHeight}vh;
									 width: 100%;
									 overflow: clip;
									 background-color: ${this.backgroundColor};
									 border-width: ${this.borderWidth}px;
									 border-style: ${this.borderStyle};
									 border-color: ${this.borderColor};
									 white-space: nowrap;
									 text-align: left;
									 border-radius: 5px;"
						 >
							<div
								id="${this.name}_optionsDiv"
								style= "background-color: ${this.backgroundColor};
										width: 90%;
										height: ${this.collapsedHeight}vh;
										borderStyle: none;"
							>
								${optionString}
							</div>
							
							<i
								id="${this.name}_icon"
								class="material-icons"
								style="font-size: ${fontHeight}vh; color: ${this.fontColor}"
							>
								arrow_drop_down
							</i>
						 </div>
						 `;
		
		// Set the html of the specified <div> element
		document.getElementById(this.parentDivId).innerHTML = htmlString;
		
		// Setup the required event handlers
		document.getElementById(`${this.name}_icon`).addEventListener("click", this.#updateState.bind(this, this.name));
		document.getElementById(this.#optionMap.get("All")).addEventListener("change", this.#checkUncheckAll.bind(this, this.name));
	}
}