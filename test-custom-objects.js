var comboBox1;
var comboBox2;
var comboBox3;

function onBodyLoaded() {
	comboBox1 = new MultiSelectComboBox("comboBox1", "multiSelectComboBox_1")
	comboBox1.collapsedHeight = 3.0;
	comboBox1.expandedHeight = 15.0;
	comboBox1.addOption("option1");
	comboBox1.addOption("option2");
	comboBox1.addOption("option3");
	comboBox1.writeHtml();
	
	comboBox2 = new MultiSelectComboBox("comboBox2", "multiSelectComboBox_2");
	comboBox2.collapsedHeight = 2.0;
	comboBox2.expandedHeight = 10.0;
	comboBox2.backgroundColor = "pink";
	comboBox2.borderColor = "red";
	comboBox2.fontColor = "red";
	comboBox2.addOption("number 1");
	comboBox2.addOption("number 2");
	comboBox2.addOption("number 3");
	comboBox2.addOption("number 4");
	comboBox2.addOption("number 5");
	comboBox2.addOption("number 6");
	comboBox2.addOption("number 7");
	comboBox2.addOption("number 8");
	comboBox2.addOption("number 9");
	comboBox2.addOption("number 10");
	comboBox2.writeHtml();
	
	
	var expander1InnerHtml = 
		`
		<div>
			Expander Content Line 1
		</div>
		<br/>
		<div>
			Expander Content Line 2
		</div>
		<br/>
		<div>
			Expander Content Line 3
		</div>
		<br/>
		<div>
			Expander Content Line 4
		</div>
		<br/>
		<div>
			Expander Content Line 5
		</div>
		<br/>
		<div>
			Expander Content Line 6
		</div>
		<br/>
		<div>
			Expander Content Line 7
		</div>
		<br/>
		<div>
			Expander Content Line 8
		</div>
		<br/>
		<div>
			Expander Content Line 9
		</div>
		<br/>
		<div>
			Expander Content Line 10
		</div>
		`;
	
	expander1 = new Expander("expander1", "Expander Control", "expanderElement", expander1InnerHtml);
	expander1.writeHtml();

	var expanderButtonId = expander1.getButtonId();
	document.getElementById(expanderButtonId).style.fontSize = "1.5em";
}