var comboBox1;
var comboBox2;
var cbox3;

function onBodyLoaded() {
	comboBox1 = new MultiSelectComboBox("comboBox1", "multiSelectComboBox_1")
	comboBox1.collapsedHeight = 30;
	comboBox1.addOption("option1");
	comboBox1.addOption("option2");
	comboBox1.addOption("option3");
	comboBox1.writeHtml();
	
	comboBox2 = new MultiSelectComboBox("comboBox2", "multiSelectComboBox_2");
	comboBox2.collapsedHeight = 20;
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
	
	cbox3 = new MultiSelectComboBox("cbox3", "cbox_3");
	cbox3.collapsedHeight = 15;
	cbox3.writeHtml();
}