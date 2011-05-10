Ti.Geolocation.preferredProvider = "gps";

Ti.include("../lib/version.js");
if (isIPhone3_2_Plus()) {
	Ti.Geolocation.purpose = L('searchRooms_gps-purpose');
}

Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Ti.Geolocation.getCurrentPosition(function(e) {
	Ti.API.info("received geo response");
    if (e.error) {
        alert(e.error);
        return;
    }
 
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
});



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
		hasChild: true,
		height: 55
	});
	
	var rowTitle = Ti.UI.createLabel({
		text: room.name,
		font: {fontWeight:'bold',fontSize:15},
		left: 10,
		top: -16
	});
	row.add(rowTitle);
	
	var rowDistance = Ti.UI.createLabel({
		//text: room.loc,
		text: 'ca. 75 Meter',
		font: {fontSize: 12},
		color: '#7f7f7f',
		left: 10,
		bottom: -18
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
		
		for (var i=0; i<rooms_objects.length; i++) {
			row = createRow(rooms_objects[i]);
			rooms.push(row);
		}
		roomsTable.setData(rooms);
	}
};

xhr.openPath();