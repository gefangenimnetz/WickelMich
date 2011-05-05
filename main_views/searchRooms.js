var rooms = [];
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() {
	rooms_objects = JSON.parse(this.responseText);
	rooms.push({title: rooms_objects[0].name, hasDetail: true});
	
	// create table view
	var roomsTable = Titanium.UI.createTableView({
		data:rooms
	});
	
	// add table view to the window
	Titanium.UI.currentWindow.add(roomsTable);
};
xhr.onerror = function(e) {
	Ti.API.info('in utf-8 error for GET with QS:' + e.error);
};
xhr.open("GET","https://mongolab.com/api/1/databases/wickelmich/collections/locations?apiKey=4dbe5e5a50f0458d3ca398cc&limit=20");
xhr.send();