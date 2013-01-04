
var uuid = Ti.App.Properties.getString('uuid',"");
if (uuid === "") {
	uuid = Titanium.Platform.createUUID();
	Ti.App.Properties.setString('uuid', uuid);
}



exports.getToDos = function(_callback) {
	
	var client = Ti.Network.createHTTPClient();
	client.onload = function(e) {
		Ti.API.info(client.responseText);
		//return 	client.responseText;	
		return _callback(client.responseText);
	};
	client.onerror = function(e) {
		
	};
	client.open('GET', "http://todolist2.nodester.com/" + uuid);
	client.send();
	
	
};

exports.saveToDo = function(todo) {
	var client = Ti.Network.createHTTPClient();
	client.onerror = function(e) {
		
	};
	client.open('POST', "http://todolist2.nodester.com/" + uuid);
	client.send(todo);
};
