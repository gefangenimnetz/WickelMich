

// create table view data object
var rooms = [
	{title:'Rathaus', hasDetail:true},
	{title:'Marktplatz', hasChild:true},
	{title:'Rathaus', hasChild:true}
];

// create table view
var roomsTable = Titanium.UI.createTableView({
	data:rooms
});

// add table view to the window
Titanium.UI.currentWindow.add(roomsTable);