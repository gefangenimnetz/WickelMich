// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({id:'tabGroup1'});

var topBarBackgroundImage = "images/topBar@2x.png";

//
// create "Search rooms" tab
//
var searchRooms = Titanium.UI.createWindow({
	url: 'main_views/searchRooms.js',
	titleid: 'searchRooms_title',
	barImage: topBarBackgroundImage
});

var tab_searchRooms = Titanium.UI.createTab({
	icon: 'images/tabs/tabbarIcon_searchRooms.png',
    titleid: 'searchRooms_title',
    window:searchRooms
});

//
// create "Add room" tab
//
var addRoom = Titanium.UI.createWindow({
    url:'main_views/addRoom.js',
    titleid:'addRoom_title',
	barImage: topBarBackgroundImage
});
var tab_addRoom = Titanium.UI.createTab({
    icon:'images/tabs/tabbarIcon_addRoom.png',
    titleid:'addRoom_title',
    window:addRoom
});

//
// create "See profile" tab
//
var profile = Titanium.UI.createWindow({
    url:'main_views/profile.js',
    titleid:'profile_title',
	barImage: topBarBackgroundImage
});
var tab_profile = Titanium.UI.createTab({
    icon:'images/tabs/tabbarIcon_profile.png',
    titleid:'profile_title',
    window:profile
});


//
//  add tabs
//
tabGroup.addTab(tab_searchRooms);
tabGroup.addTab(tab_addRoom);
tabGroup.addTab(tab_profile);


// open tab group
tabGroup.open();