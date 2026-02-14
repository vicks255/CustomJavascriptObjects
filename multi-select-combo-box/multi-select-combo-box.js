/* DOCUMENTATION ==================================================================================
	PROPERTIES
		name:		name of the Object
		divId:		Id of the <div> element in the HTML document to turn into a MultiSelectComboBox
		optionMap:	Map of checkbox names
		
	METHODS
		addOption(optionName):		adds a checkbox option
		removeOption(optionName):	removes a checkbox option
		getValue(optionName):		gets the .checked value of a checkbox(true or false)
		getAllValues():				returns an array of [optionName, .checked]
		writeHtml():				writes the .innerHtml of the specified <div> to create the
										MultiSelectComboBox.
*================================================================================================*/

class MultiSelectComboBox {
	constructor(name, divId) {
		this.name = name;
		this.divId = divId;
		this.minHeight = 30;
		this.maxHeight = 150;
		this.expanded = false;
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
		
		this.optionMap.set(optionName, `${this.name}_${optionName}_${this.optionMap.length - 1}`);
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
		
		return document.getElementById(this.optionMap[option]).checked;
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
	
	
	update_state() {
		if(this.expanded) {
			document.getElementById(this.name).style.overflow = "clip";
	
			var div = document.getElementById(`${this.name}_optionsDiv`);
			div.style.height = "100%";
			div.style.overflow = "clip";
			div.style.borderStyle = "none";
	
			var icon = document.getElementById(`${this.name}_icon`);
			icon.innerText = "arrow_drop_down";
		}
		else {
			document.getElementById(this.name).style.overflow = "visible";
	
			var div = document.getElementById(`${this.name}_optionsDiv`);
			div.style.height = "500%";
			div.style.overflow = "auto";
			div.style.borderStyle = "solid";
			div.style.borderWidth = "1px";
			div.style.borderColor = "black";
	
			var icon = document.getElementById(`${this.name}_icon`);
			icon.innerText = "arrow_drop_up";
		}
		
		this.expanded = !this.expanded;
	}
	
	
	writeHtml() {
		if(document.getElementById(this.divId) == null) {
			throw new Error("DOM does not contain a div to write html to.");
		}
		
		var elementHight = document.querySelector(this.divId);
		var optionString = "";
		for(const [key, value] of this.optionMap) {
			optionString += `
							<input id="${value}" type="checkbox" value="${key}">
							<label style="font-size: 100%">${key}</label>
							<br>
							`;
		}
		
		var htmlString = `
						 <div
							id = "${this.name}"
							style = "position: relative;
									 display: flex;
									 justify-direction: row;
									 height: 100%;
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
										height: 80%;
										z-index: 9999;"
							>
								${optionString}
							</div>
							
							<i
								id="${this.name}_icon"
								class="material-icons"
							>
								arrow_drop_down
							</i>
						</div>
						`;
			
		document.getElementById(this.divId).innerHTML = htmlString;
		document.getElementById(`${this.name}_icon`).addEventListener("click", this.update_state.bind(this, this.name));
	}
}