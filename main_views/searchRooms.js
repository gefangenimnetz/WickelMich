var serviceUrl = 'https://mongolab.com/api/1/databases/wickelmich/collections/locations?apiKey=4dbe5e5a50f0458d3ca398cc&limit=20';
var xhr = Ti.Network.createHTTPClient();
 
xhr.onerror = function(e)
{
  Ti.UI.createAlertDialog({title: 'Network Error', message: 'Unable to retrieve data.'}).show();
  Ti.API.info('NETWORK ERROR ' + e.error);
};
 
xhr.setTimeout(30000);
 
xhr.openPath = function()
{
  this.open('GET', serviceUrl);
  this.send();
};

// create table view
var roomsTable = Titanium.UI.createTableView();

// set event listener for click on table row
roomsTable.addEventListener('click', function(e) {
	Ti.UI.createAlertDialog({title: e.name, message: e.message}).show();
});

// add roomsTable view to the window
Ti.UI.currentWindow.add(roomsTable);

function createRow(room) {
	var row = Ti.UI.createTableViewRow({
		hasDetail: true
	});
	
	rowTitle = Ti.UI.createLabel({
		text: room.title
	});
	row.add(rowTitle);
	
	rowDistance = Ti.UI.createLabel({
		text: room.loc
	});
	row.add(rowDistance);
	
	return row;
}

xhr.onload = function() {
	if (this.responseData != '[]') {
		try {
			var rooms_objects = JSON.parse(this.responseText);
		}
		catch(e) {
			Ti.UI.createAlertDialog({title: e.name, message: e.message}).show();
			Ti.API.debug(this.responseData);
			return;
		}
		
		var rooms = [];
		
		for (var i=0; i<=rooms_objects.length; i++) {
			Ti.API.info(this.rooms_objects[i]);
			row = createRow({
				title: rooms_objects[i].title,
				loc: rooms_objects[i].loc
			});
			rooms.push(row);
		}
	}
};

xhr.openPath();