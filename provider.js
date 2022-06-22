/**
 * This is an example of Google provider rewitten with some custom polygons added.
 * Note - is not ready to go example, its just demontstration of logic behind the process.
 */
window.JetEngineMapsProvider = function() {

	this.initMap = function( container, settings ) {

		settings = settings || {};
		
		if ( ! settings.mapTypeId ) {
			settings.mapTypeId = google.maps.MapTypeId.ROADMAP;
		}
		
		let map = new google.maps.Map( container, settings );

		const polygon1 = new google.maps.Polygon( {
			paths: [
				{ lat: 46.9583783, lng: 31.9589272 }, 
				{ lat: 46.9521683, lng: 31.9729176 }, 
				{ lat: 46.949356, lng: 32.0002975 }, 
				{ lat: 46.9491216, lng: 32.0208969 }, 
				{ lat: 46.9625375, lng: 32.0356598 }, 
				{ lat: 46.9745445, lng: 32.0180645 }, 
				{ lat: 46.9758329, lng: 31.9722309 }, 
				{ lat: 46.9583783, lng: 31.9589272 }
			],
			strokeColor: '#fbc02d',
			strokeOpacity: 1,
			strokeWeight: 4,
			fillColor: '#fbc02d',
			fillOpacity: .4,
		} );

		const polygon2 = new google.maps.Polygon( {
			paths: [
				{ lat: 46.9583783, lng: 31.9732609 }, 
				{ lat: 46.9554492, lng: 31.9780674 }, 
				{ lat: 46.9521683, lng: 31.9997826 }, 
				{ lat: 46.9524026, lng: 32.0161762 }, 
				{ lat: 46.9600772, lng: 32.024931 }, 
				{ lat: 46.9686878, lng: 32.0141163 }, 
				{ lat: 46.970562, lng: 31.9820156 }, 
				{ lat: 46.9583783, lng: 31.9732609 }
			],
			strokeColor: '#cddc39',
			strokeOpacity: 1,
			strokeWeight: 4,
			fillColor: '#cddc39',
			fillOpacity: .4,
		} );

		polygon1.setMap( map );
		polygon2.setMap( map );
		
		return map;
	}

	this.initBounds = function() {
		return new google.maps.LatLngBounds();
	}

	this.fitMapBounds = function( data ) {

		data.map.fitBounds( bounds );

		var listener = google.maps.event.addListener( data.map, 'idle', function() {
			if ( ! data.marker.getMap() ) {
				JetEngineMaps.fitMapToMarker( data.marker, data.markersClusterer );
			}
			google.maps.event.removeListener( listener );
		} );
	}

	this.addMarker = function( data ) {
		data.position = new google.maps.LatLng( data.position.lat, data.position.lng );
		return new RichMarker( data );
	}

	this.removeMarker = function( marker ) {
		marker.setMap( null );
	}

	this.addPopup = function( data ) {
		return new JetGMInfoBox( {
			position: new google.maps.LatLng( data.position.lat, data.position.lng ),
			maxWidth: data.width,
			boxClass: "jet-map-box",
			zIndex: null,
			pixelOffset: new google.maps.Size( 0 - data.width / 2, 0 - data.offset ),
			alignBottom: true,
			infoBoxClearance: new google.maps.Size( 10, 10 ),
			pane: "floatPane",
			enableEventPropagation: true,
		} );
	}

	this.markerOnClick = function( map, data, callback ) {

		data = data || {};

		data.map    = map;
		data.shadow = false;

		google.maps.event.addListener( map, "click", ( event ) => {

			data.position = {
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
			};

			if ( callback ) {
				callback( this.addMarker( data ) );
			}

		} );
	}

	this.closePopup = function( infoBox, callback ) {
		google.maps.event.addListener( infoBox, 'closeclick', callback );
	}

	this.openPopup = function( trigger, callback ) {
		google.maps.event.addListener( trigger, 'click', callback );
	}

	this.getMarkerPosition = function( marker, toJSON ) {
		toJSON = toJSON || false;

		if ( toJSON ) {
			return marker.position.toJSON();
		} else {
			return marker.position;
		}
		
	}

	this.getMarkerCluster = function( data ) {
		return new MarkerClusterer(
			data.map,
			data.markers,
			{ imagePath: data.clustererImg }
		);
	}

	this.addMarkers = function( markerCluster, markers ) {
		markerCluster.addMarkers( markers );
	}

	this.removeMarkers = function( markerCluster, markers ) {
		markerCluster.removeMarkers( markers );
	}

	this.setAutoCenter = function( data ) {

		data.map.fitBounds( data.bounds );

		if ( data.settings.maxZoom ) {

			var listener = google.maps.event.addListener( data.map, 'idle', function() {

				if ( data.map.getZoom() > data.settings.maxZoom ) {
					data.map.setZoom( data.settings.maxZoom );
				}

				google.maps.event.removeListener( listener );

			} );
		}
	}

}