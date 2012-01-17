function NewTodoWindow () {
		
		// costruzione UI
		var win = Ti.UI.createWindow({
			title: "New To Do",
			layout: 'vertical',
			backgroundColor: "white"
		});
		
		var titleView = Ti.UI.createView({
			top: 10,
			height: 40
		});
		
		var titleLbl = Ti.UI.createLabel({
			text: "Titolo",
			width: 'auto',
			font: {fontSize: 18},
			left: 10,
		});
		
		var titleTxt = Ti.UI.createTextField({
			left: 85,
			right: 10,
			hintText: "inserisci una todo",
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		
		titleView.add(titleLbl);
		titleView.add(titleTxt);
		win.add(titleView);
		
		var locationView = Ti.UI.createView({
			top: 10,
			height: 40
		});
		
		var locationLbl = Ti.UI.createLabel({
			text: "Location",
			width: 'auto',
			font: {fontSize: 18},
			left: 10,
		});
		
		var locationTxt = Ti.UI.createTextField({
			left: 85,
			right: 10,
			hintText: "inserisci una location",
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		
		locationView.add(locationLbl);
		locationView.add(locationTxt);
		win.add(locationView);
		
		var alarmView = Ti.UI.createView({
			top: 10,
			height: 45
		});
		
		var alarmLbl = Ti.UI.createLabel({
			text: "Allarme",
			width: 'auto',
			font: {fontSize: 18},
			left: 10,
		});
		
		var alarmSwitch = Ti.UI.createSwitch({
			left: 85,
			value: false
		});
		
		
		alarmView.add(alarmLbl);
		alarmView.add(alarmSwitch);
		win.add(alarmView);
		
		var dueDateView = Ti.UI.createView({
			top: 10,
			height: 40
		});
		
		var dueDateLbl = Ti.UI.createLabel({
			text: "Entro il",
			width: 'auto',
			font: {fontSize: 18},
			left: 10,
		});
		
		var dueDateBtn = Ti.UI.createButton({
			left: 85,
			title: "today",
			right: 10
		});
		
		dueDateView.add(dueDateLbl);
		dueDateView.add(dueDateBtn);
		win.add(dueDateView);
		
		var DueDateWindow = require('ui/DueDateWindow');
		var dueDateWin = new DueDateWindow();
		
		var addToDoBtn = Ti.UI.createButton({
			title: "Aggiungi to do",
			top: 20,
			width: 150,
			height: 80
		});
		
		win.add(addToDoBtn);
		
		
		// aggiungo il "comportamento" (behaviour)
		// nasconde la tastiera
		function hideKeyboard() {
			titleTxt.blur();
			locationTxt.blur();
		}
		
		// apre la finestra per la selezione della scadenza (data)
		dueDateBtn.addEventListener('click', function() {
			hideKeyboard();
			dueDateWin.open();
		});
		
		// cambia il testo del pulsante "Entro il/Due Date"
		Ti.App.addEventListener("changeDate", function(e) {
			dueDateBtn.title = String.formatDate(e.newDate, "medium");
		});
		
		// aggiunge una nuova todo alla todolist
		addToDoBtn.addEventListener('click', function() {
			if (titleTxt.value === "") {
				alert("Inserisci almeno il titolo!");
				return;
			}
			var event = {
				title: titleTxt.value,
				location: locationTxt.value,
				alarm: alarmSwitch.value,
				dueDate: dueDateBtn.title
			};
			Ti.App.fireEvent("newToDoCreation", event);
		});
		
		// aggiorna la window con la todo selezionata nella todo list
		Ti.App.addEventListener("updateToDoWindow", function(e) {
			titleTxt.value = e.title;
			locationTxt.value = e.location;
			alarmSwitch.value = e.alarm;
			dueDateBtn.title = e.dueDate;
			Ti.App.fireEvent('switchTab', {tab:0});
		});
		
		// nasconde la tastiere se si fa un click su lo switch 
		alarmSwitch.addEventListener('change', function() {
			hideKeyboard();
		});
		
		// nasconde la tastiere se si fa un click su un punto bianco 
		// della finestra
		win.addEventListener('click', function() {
			hideKeyboard();
		});
		
		return win;
		
}

module.exports = NewTodoWindow;
