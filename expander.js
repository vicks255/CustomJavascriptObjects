class Expander {
	constructor(name, buttonText, parentDivId, expanderContent) {
		this.name = name;
		this.buttonText = buttonText;
		this.parentDivId = parentDivId;
		this.expanderContent = expanderContent;
		this.isExpanded = true;

		// Create a link to Google icons
		var link = document.createElement('link');
		link.rel = "stylesheet";
		link.href = `https://fonts.googleapis.com/icon?family=Material+Icons`;

		// If the document head does not have a link to Google icons, add it.
		var hasLink = document.head.querySelector(`link[href="${link.href}"][rel="${link.rel}"]`)
		if (hasLink == null) { document.head.appendChild(link); }
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
		/* Updates the state and associate properties (i.e. expands or collapses the container) */

		if(this.isExpanded) {
			// get the state of the container objects to be modified when collapsed in order to restore them
			this.#buttonHeight         = document.getElementById(`${this.name}-button`).style.height;
			this.#buttonHeightInPx     = document.getElementById(`${this.name}-button`).getBoundingClientRect().height;
			this.#expandedHeight       = document.getElementById(id).clientHeight;
			this.#expandedDisplay      = document.getElementById(id).style.display;
			this.#parentExpandedHeight = document.getElementById(this.parentDivId).style.height;
		
			// collapse the container
			document.getElementById(id).style.visibility = "hidden";
			document.getElementById(id).style.height = "1px";
			document.getElementById(this.parentDivId).style.height = `${this.#buttonHeightInPx}px`;
			document.getElementById(`${this.name}-button`).style.height = "100%";
			document.getElementById(`${this.name}-icon`).innerText = "arrow_drop_down";
		}
		else {
			// restore the container objects to their original state
			document.getElementById(this.parentDivId).style.height = this.#parentExpandedHeight;
			document.getElementById(id).style.height = `${this.#expandedHeight}px`;
			document.getElementById(id).style.visibility = "visible";
			document.getElementById(`${this.name}-icon`).innerText = "arrow_drop_up";
		}
		
		this.isExpanded = !this.isExpanded;
	}
	
	
	// PUBLIC METHODS -----------------------------------------------------------------------------
	writeHtml() {
		/* Generates the HTML Contont and adds it to the parent container in the document object model */

		var htmlString = 
		`
		<div id="${this.name}" class="${this.cssClass}">
			<button
				id="${this.name}-button"
				class="expander-button"
				style="width: 100%;"
			>
				<i id="${this.name}-icon"
				   class="material-icons"
			       style="font-size: 3.5vh;
						  color: ${this.fontColor};
						  cursor: pointer; "
				>
					arrow_drop_up
				</i>
				${this.buttonText}
			</button>
							
			<br>
							
			<div
				id="${this.name}-div"
				class="${this.contentClass}"
				style="border-color: black;
					   border-width: 1px;
					   border-style: solid;
					   background-color: "white";
					   width: 100%;"
			>
				${this.expanderContent}
			</div>
		</div>
		`
		
		document.getElementById(this.parentDivId).innerHTML = htmlString;
		document.getElementById(`${this.name}-button`).addEventListener("click", this.#updateState.bind(this, `${this.name}-div`));
	}


	getElementId() {
		/* Returns the id of the highest level div generated in order to adjust its css properties  */

		return this.name;
	}


	getButtonId() {
		/* Returns the id of the button in order to adjust its css properties  */

		return `${this.name}-button`;
	}


	getContentDivId() {
		/* Returns the id of the content in order to adust its css properties  */

		return `${this.name}-div`;
	}
}