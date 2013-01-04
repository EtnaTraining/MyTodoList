function ListToDoWindow() {
	
		// inizializzazione tramite properties
		//var todoList = Ti.App.Properties.getList("todolist", []);
	
		// inizializzazione todolist via db
		var datastore = require('/services/datastore');
		var todoList = datastore.getToDoList();
		
		// inizializzaione todolist via rete
		/*var net = require('/services/net2');
		var todoList = [];
		net.getToDos(function(lista) {
			Ti.API.info(lista);
			var todoList = lista;
			//todoListTableView.data = todoList;
			todoListTableView.setData(todoList);
		}); */		
		
		//Ti.API.info(todoList);
		var udid = Ti.Platform.id;
		//var todoList = [];
		
		var win = Ti.UI.createWindow({
			title: "Elenco ToDOs"
		});
		
		var todoListTableView = Ti.UI.createTableView({
			data: todoList,
			editable: true
		});
		win.add(todoListTableView);
		
		// inizializza la todo list
		

		
		
		
		/* load from network
		var net = require('/services/net');
				net.getToDoList(udid, function(todolist) {
					todoList = todolist;
					todoListTableView.setData(todoList);
				});
				*/
		
		
		
		// aggiunge una riga della tabella con una nuova todo
		Ti.App.addEventListener("newToDoCreation", function(e) {
			var todo = {
				title: e.title,
				location: e.location,
				alarm: e.alarm,
				dueDate: e.dueDate,
				filename: e.filename,
				hasChild: true
			};
			todoList.push(todo);
			todoListTableView.appendRow(todo);
			
			// salvataggio sulla property
			//Ti.App.Properties.setList("todolist", todoList);
			
			// salvataggio sul db
			datastore.saveToDo(todo);
			// salvataggio in rete
			//net.saveToDo(todo);
			
			
			//net.saveToDo(udid, todo);	
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
