
function MapWindow(location, _callback) {
	
	var win = Ti.UI.createWindow({
		backgroundColor: "white"
	});
	
	var closeBtn = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.DONE
	});
	win.rightNavButton = closeBtn;
	
	var mapview = Ti.Map.createView({
		regionFit: true,
		animate: true,
		mapType: Titanium.Map.STANDARD_TYPE,
		userLocaion: true
	});
	
	var annotation = Ti.Map.createAnnotation({
		pincolor:Titanium.Map.ANNOTATION_RED,
		animate:true
	});
	
	mapview.addAnnotation(annotation);
	win.add(mapview);
	
	Ti.Geolocation.purpose = "geolocalizzare le tue todos";
	if (Ti.Geolocation.locationServicesEnabled && location == "") {
		Ti.Geolocation.getCurrentPosition(function(e) {
			Ti.API.info(JSON.stringify(e));
			mapview.region = {
				latitude: e.coords.latitude, 
				longitude: e.coords.longitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01
			};
			//win.fireEvent('locationFound', e.coords)
			annotation.latitude = e.coords.latitude;
			annotation.longitude = e.coords.longitude;
			Ti.Geolocation.reverseGeocoder(e.coords.latitude, e.coords.longitude, function(e) {
				_callback(e.places[0].address);
			});
		})	
	} else {
		Ti.Geolocation.forwardGeocoder(location, function(e) {
			Ti.API.info(location);
			Ti.API.info(JSON.stringify(e));
			mapview.region = {
				latitude: e.latitude, 
				longitude: e.longitude,
				latitudeDelta: 0.1,
				longitudeDelta: 0.1
			};
			annotation.latitude = e.latitude;
			annotation.longitude = e.longitude;
			annotation.s
		});
	} 
	
	closeBtn.addEventListener('click', function() {
		annotation = null;
		mapview = null;
		win.close();
	})
	
	return win;
	
}

module.exports = MapWindow;
