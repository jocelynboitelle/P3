import Reservation from "./Reservation.js";

export default class ReservationDetailComponent {
    // dom reference
    stationNameElement;
    stationAddressElement;
    lastNameElement;
    firstNameElement;
    statusReservationElement;
    timeElement;
    cancelReservationButtonElement;

    // data
    reservationData;

    // timer
    timerReference;

    // interact with dom
    reservationLabel;
    isCancelButtonVisible;
    isTimerVisibile;

    constructor() {
        this.stationNameElement = document.getElementById('name-station');
        this.stationAddressElement = document.getElementById('address-station');
        this.lastNameElement = document.getElementById('last-name');
        this.firstNameElement = document.getElementById('first-name');
        this.statusReservationElement = document.getElementById('status-reservation');
        this.timeElement = document.getElementById('time');
        this.cancelReservationButtonElement = document.getElementById('cancel-reservation');

        this.cancelReservationButtonElement.onclick = () => this.cancelReservation();


        const data = JSON.parse(sessionStorage.getItem('reservation'));

        if (data != null) {
            this.setReservation(data);
        }

        this.updateDisplay();
    }

    updateDisplay() {
        if (this.reservationData) {
            this.reservationLabel = 'Vélo réservé à la station "' + this.reservationData.nameStation + '" par ' + this.reservationData.firstName + ' ' + this.reservationData.lastName;
            this.isCancelButtonVisible = true;
            this.isTimerVisibile = true;
            this.startTimer();
        } else {
            this.reservationLabel = 'Pas de réservation';
            this.isCancelButtonVisible = false;
            this.isTimerVisibile = false;
        }
        this.refreshDom();
    }

    refreshDom() {
        this.statusReservationElement.innerHTML = this.reservationLabel;
        this.cancelReservationButtonElement.style.display =  this.isCancelButtonVisible ? 'flex': 'none';
        this.timeElement.style.display = this.isTimerVisibile ? 'flex': 'none';
    }

    cancelReservation() {
        this.reservationData = null;
        clearInterval(this.timerReference);
        sessionStorage.removeItem('reservation');
        this.updateDisplay();
    }
    
    startTimer() {
        this.timerReference = setInterval(() => {
            const now = new Date().getTime();
            const distance = this.reservationData.dateLimit - now;


            if (distance <= 0) {
                this.cancelReservation();
                this.isTimerVisibile = false;
            }

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.timeElement.innerHTML = minutes + "m " + seconds + "s ";
        }, 1000);
    }
    
    setReservation(reservation) {
        this.reservationData = reservation;
    }

    createReservation() {
        this.cancelReservation();

        const reservation = new Reservation();
        reservation.nameStation = this.stationNameElement.innerHTML;
        reservation.addressStation = this.stationAddressElement.innerHTML;
        reservation.lastName = this.lastNameElement.value;
        reservation.firstName = this.firstNameElement.value;

        const dateLimite = new Date().getTime() + 1200000;
        reservation.dateLimit = dateLimite.toString();

        sessionStorage.setItem('reservation', JSON.stringify(reservation));
        this.setReservation(reservation);
        this.updateDisplay();
    }
}
