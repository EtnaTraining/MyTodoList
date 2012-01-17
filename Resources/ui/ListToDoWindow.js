function ListToDoWindow() {
	
		//var todoList = [];	
		var win = Ti.UI.createWindow({
			title: "Elenco ToDOs"
		});
		
		var todoListTableView = Ti.UI.createTableView();
		win.add(todoListTableView);
		
		
		// aggiunge una riga della tabella con una nuova todo
		Ti.App.addEventListener("newToDoCreation", function(e) {
			var todo = {
				title: e.title,
				location: e.location,
				alarm: e.alarm,
				dueDate: e.dueDate,
				hasChild: true
			};
			//todoList.push(todo);
			todoListTableView.appendRow(todo);
			//todoListTableView.setData(todoList);
			Ti.App.fireEvent('switchTab', {tab:1});
		});
		
		// aggiorna la finestra newtodo con i valori della todo selezionata
		todoListTableView.addEventListener('click', function(e) {
			Ti.App.fireEvent("updateToDoWindow", {
				title: e.rowData.title,
				location: e.rowData.location,
				alarm: e.rowData.alarm,
				dueDate: e.rowData.dueDate
			});
		});
	
		return win;
}
		
module.exports = ListToDoWindow;
