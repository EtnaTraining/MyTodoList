
exports.getToDoList = function(udid, callback) {
	
	var toDoList = [];
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		var resp = JSON.parse(this.responseText);
		toDoList = resp.data;
		callback(toDoList);
	}
	xhr.onerror = function(e) {
		alert(e);
	}
	xhr.open('GET', 'http://todolist.nodester.com/' + udid)
	xhr.send();
};

exports.saveToDo = function(udid, todo) {
	var xhr = Ti.Network.createHTTPClient();

	xhr.onerror = function(e) {
		alert(e);
	}
	xhr.open('POST', 'http://todolist.nodester.com/' + udid)
	xhr.send(todo);
}
