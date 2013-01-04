
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
			right: 60,
			hintText: "inserisci una location",
			borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		
		var locationBtn = Ti.UI.createButton({
			image: 'location.png',
			right: 10,
			height: 40,
			width: 40,
			//borderWidth: 1
		})
		
		locationView.add(locationLbl);
		locationView.add(locationTxt);
		locationView.add(locationBtn);
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
			//color: "orange",
			//backgroundColor:"orange"
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
		
		dueDateWin.fireEvent("mionuovoevento", {});
		
		
		var iv = Ti.UI.createImageView({
			image: 'todo.png',
			width: 120,
			height: 100,
			top: 10
		});
		win.add(iv);
		
		var addToDoBtn = Ti.UI.createButton({
			title: "Aggiungi to do",
			top: 10,
			width: 150,
			height: 40
		});
		
		win.add(addToDoBtn);
		
		
		// aggiungo il "comportamento" (behaviour)
		
		iv.addEventListener('click', function() {
			Ti.Media.openPhotoGallery({
				allowEditing: true,
				error: function(e) {
					alert("Si è verificato un errore:" + JSON.stringify(e));
				},
				cancel: function() {},
				success: function(e) {
					iv.image = e.media;
				}
			});
			
		});
		
		locationBtn.addEventListener('click', function() {
			var ToDoMapWindow = require('ui/MapWindow');
			var mw = new ToDoMapWindow(locationTxt.value, function(address) {
				locationTxt.value = address;
			});
			//mw.addEventListener('locationFound', function())
			mw.open({modal:true});
			
			
		});
		
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
		//Ti.App.addEventListener("changeDate", function(e) {
		Ti.App.addEventListener("changeDate", function(e) {
			dueDateBtn.title = String.formatDate(e.newDate, "medium");
		});
		
		// aggiunge una nuova todo alla todolist
		addToDoBtn.addEventListener('click', function() {
			if (titleTxt.value === "") {
				alert("Inserisci almeno il titolo!");
				return;
			}
			var filename = titleTxt.value.replace(/ /g, "_") + '_' + new Date().getTime() + '.jpg';
			if (!(iv.image === "todo.png")) {
				Ti.API.info(filename);
				var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, filename);
				f.write(iv.image);
			}
			
			
			var event = {
				title: titleTxt.value,
				location: locationTxt.value,
				alarm: alarmSwitch.value,
				dueDate: dueDateBtn.title,
				filename: filename
			};
			
			
			Ti.App.fireEvent("newToDoCreation", event);
		});
		
		// aggiorna la window con la todo selezionata nella todo list
		Ti.App.addEventListener("updateToDoWindow", function(e) {
			titleTxt.value = e.title;
			locationTxt.value = e.location;
			alarmSwitch.value = e.alarm;
			dueDateBtn.title = e.dueDate;
			Ti.API.info(e.dueDate);
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
