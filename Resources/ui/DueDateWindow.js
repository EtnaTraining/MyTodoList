function DueDateWindow() {
		
		var win = Ti.UI.createWindow({
			modal: true,
			backgroundColor: "black",
			title: "please select a date"
		});
		
		var dueDatePicker = Ti.UI.createPicker({
			minDate: new Date(2009, 0, 1),
			maxDate: new Date(2013, 11, 31),
			value: new Date(),
			type: Ti.UI.PICKER_TYPE_DATE,
			top:20
		});
		
		win.add(dueDatePicker);
		
		var closeWinBtn = Ti.UI.createButton({
			title: "Close",
			bottom: 20,
			width: 120,
			height: 50
		});
		win.add(closeWinBtn);
		
		// aggiorna il testo del pulsate Entro il/Due Date
		dueDatePicker.addEventListener('change', function(e) {
			Ti.App.fireEvent("changeDate", {newDate: e.value});
		});
		
		// chiude la finestra al click sul pulsante Close
		closeWinBtn.addEventListener('click', function() {
			win.close();
			
		});
		
		win.addEventListener("mionuovoEvento", function() {
			Ti.API.info("ciao");
		});
		
		
		return win;
		
}

module.exports = DueDateWindow;
	
