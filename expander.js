class expander {
	constructor(name, buttonText, parentDivId, expanderContent) {
		this.name = name;
		this.buttonText = buttonText;
		this.parentDivId = parentDivId;
		this.expanderContent = expanderContent;
		this.isExpanded = true;
	}
	
	
	// PRIVATE PROPERTIES -------------------------------------------------------------------------
	#buttonHeight;
	#buttonHeightInPx;
	#expandedHeight;
	#expandedDisplay;
	#parentExpandedHeight;
	
	
	// PUBLIC PROPERTIES --------------------------------------------------------------------------
	name;
	buttonText;
	parentDivId;
	expanderContent;
	isExpanded;
	contentClass;
	cssClass;
	
	
	// PRIVATE METHODS ----------------------------------------------------------------------------
	#updateState(id) {
		if(this.isExpanded) {
			// get the state of the container objects to be modified when collapsed in order to restore them
			this.#buttonHeight         = document.getElementById(`${this.name}-button`).style.height;
			this.#buttonHeightInPx     = document.getElementById(`${this.name}`-button).getBoundingClientRect().height;
			this.#expandedHeight       = document.getElementById(id).style.height;
			this.#expandedDisplay      = document.getElementById(this.name).style.display;
			this.#parentExpandedHeight = document.getElementById(this.parentDivId).style.height;
		
			// collapse the container
			document.getElementById(id).style.visibility = "hidden";
			document.getElementById(id).style.height = "1px";
			document.getElementById(this.parentDivId).style.height = `${this.#buttonHeightInPx}px`;
			document.getElementById(`${this.name}-button`).style.height = "100%";
			document.getElementById(`${this.name}-div`).style.display = "inline-flex";
		}
		else {
			// restore the container objects to their original state
			document.getElementById(this.parentDivId).style.height = this.#parentExpandedHeight;
			document.getElementById(id).style.height = this.#expandedHeight;
			document.getElementById(id).style.visibility = "visible";
			document.getElementById(this.name).style.display = this.#expandedDisplay;
			document.getElementById(`${this.name}-div`).style.height = this.#expandedDisplay;
			document.getElementById(`${this.name}-button`).style.height = this.#buttonHeight;
			document.getElementById(id).style.visibility = "visible";
		}
		
		this.isExpanded = !this.isExpanded;
	}
	
	
	// PUBLIC METHODS -----------------------------------------------------------------------------
	writeHtml() {
		var htmlString = 
		`
		<div id="${this.name}" class="${this.cssClass}">
			<button
				id="${this.name}-button"
				class="expander-button">
			>
							
			<br>
							
			<div
				id="${this.name}-div"
				class="${this.contentClass}"
			>
				${this.expanderContent}
			</div>
		</div>
		`
		
		document.getElementById(this.parentDivId).innerHTML = htmlString;
		document.getElementById(`${this.name}-button`).addEventListener("click", this.#updateState.bind(this, `${this.name}-div`));
	}
}