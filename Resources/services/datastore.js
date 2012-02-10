
exports.getToDoList = function() {
	
	var toDoList = [];
	
	var db = Ti.Database.open("ToDoDB");
	db.execute("CREATE TABLE IF NOT EXISTS todos(id INTEGER, title TEXT, location TEXT, alarm INTEGER, dueDate TEXT)");
	var result = db.execute("SELECT * FROM todos");
	for (var i=0; i < result.rowCount; i++) {
		var dettagli = {};
		dettagli.title = result.fieldByName("title");
		dettagli.location = result.fieldByName("location");
		dettagli.alarm = result.fieldByName("alarm");
		dettagli.dueDate = result.fieldByName("dueDate");
		dettagli.hasChild = true;
		toDoList.push(dettagli);
		result.next();
	}
	db.close();
	return toDoList;
};

exports.saveToDo = function(todo) {
	var db = Ti.Database.open("ToDoDB");
	db.execute("INSERT INTO todos(title, location, alarm, dueDate) VALUES (?, ?, ?, ?)", todo.title, todo.location, todo.alarm, todo.dueDate)
	db.close();
}
