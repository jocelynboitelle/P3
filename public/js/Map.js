export default class Map {
    map;

    infoStationElement;
    stationNameElement;
    stationAddressElement;
    stationAvailableBikesElement;
    infoStationClosedElement;
    mapElement;

    marker;
    mapParameters;
    velibApi;
    velib;
    velibSelected;

    constructor(resources) {

        this.infoStationElement = $('#info-station');
        this.stationNameElement = document.getElementById('name-station');
        this.stationAddressElement = document.getElementById('address-station');
        this.stationAvailableBikesElement = document.getElementById('available-bikes');
        this.infoStationClosedElement = document.getElementById('info-station-closed');
        this.mapElement = document.getElementById('map');

        this.velibApi = resources.velibApi;
        this.mapParameters = resources.mapParameters;
        this.velib = '/P3/public/img/bicycle.png';
        this.velibSelected = '/P3/public/img/bicycle_shop.png';
        this.marker = null;

        this.initMap();
    }

    createIcon(url, size) {
        const icon = {
            url: url,
            scaledSize: new google.maps.Size(size, size)
        }

        return icon;
    }

    setMarker(marker) {
        if (this.marker != null) {
            const icon = this.createIcon(this.velib, 30);
            this.marker.setIcon(icon);
        }
        const iconSelected = this.createIcon(this.velibSelected, 42);
        marker.setIcon(iconSelected);
        this.marker = marker;
    }

    addEventOnStation(station, marker) {

        marker.addListener('click', () => {
            console.log(marker);
            this.setMarker(marker);

            this.stationNameElement.innerHTML = 'Station: ' + station.name;
            this.stationAddressElement.innerHTML = 'Adresse: ' + station.address;
            this.stationAvailableBikesElement.innerHTML = 'Vélib\' disponibles: ' + station.available_bikes;
            this.infoStationElement.animate({ width: 'show', height: 'show' });
            this.infoStationClosedElement.onclick = () => { this.infoStationElement.animate({ width: 'hide', height: 'hide' }) };
        });        
    }

    setVisibleMarker(marker) {
        this.map.addListener('zoom_changed', () => {
            const zoomLevel = this.map.getZoom();
            
            if (zoomLevel < 14)
                marker.setVisible(false);
            else
                marker.setVisible(true);
        });    
    }

    putStation(station) {

        const marker = new google.maps.Marker({
            position: station.position,
            map: this.map,
            title: station.name,
            icon: this.createIcon(this.velib, 30)
        });
        this.setVisibleMarker(marker);
                
        return marker;
    }

    putStations(stations) {

        stations.forEach(station => {
            if (station.status == "OPEN" && station.available_bikes > 0) {
                const marker = this.putStation(station);
                this.addEventOnStation(station, marker);
            }
        });
    }

    initMap() {

        this.map = new google.maps.Map(this.mapElement, this.mapParameters);
        getApi(this.velibApi, (stations) => { this.putStations(stations) });
        this.infoStationElement.hide();
    }
}
