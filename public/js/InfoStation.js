export default class InfoStation {

    stationNameElement;
    reservationButtonElement;
    reservationElement;
    cancelButtonElement;

    constructor() {

        this.stationNameElement = document.getElementById('name-station');
        this.reservationButtonElement = document.getElementById('reservation-button');
        this.reservationElement = document.getElementById('reservation');
        this.cancelButtonElement = document.getElementById('cancel');

        this.reservationButtonElement.onclick = () => this.getSignature();
        this.cancelButtonElement.onclick = () => this.cancel();

        this.reservationElement.style.display = 'none';
    }

    getSignature() {
        if (this.stationNameElement.innerHTML === '') {
        }
        else {
            this.reservationElement.style.display = 'flex';
        }
    }

    cancel() {
        this.reservationElement.style.display = 'none';
    }
}
