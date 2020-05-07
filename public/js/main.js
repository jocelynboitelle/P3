import Canvas from './Canvas.js';
import InfoStation from './InfoStation.js';
import Map from './Map.js';
import ReservationDetailComponent from './ReservationComponent.js';
import Slider from './Slider.js';

function init() {
    const sliderResources = {
        path: "public/img/",
        images: ["01.jpg", "02.jpg", "03.png", "04.jpg"],
        timer: 5000,
        sizeTabImages: 4
    }
    const mapResources = {
        velibApi: "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=b884174d1ad1c3b2c5d02f5da69f3a885a306a01",
        mapParameters: {
            zoom: 15,
            center: { lat: 43.604623, lng: 1.443812 }
        }
    }

    const slider = new Slider(sliderResources);
    const map = new Map(mapResources);
    const infoStation = new InfoStation();
    const reservation = new ReservationDetailComponent();
    const canvas = new Canvas(reservation);

}


window.onload = init;
