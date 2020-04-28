import User from "./User.js";

export default class Canvas {
    
    reservationClass;

    reservationElement;
    lastNameElement;
    firstNameElement;
    canvasElement;
    submitButtonElement;
    eraseButtonElement;

    context;
    signature;
    painting;
    x;
    y;

    constructor(reservationClass) {
        this.reservationClass = reservationClass;
        this.reservationElement = document.getElementById('reservation');
        this.lastNameElement = document.getElementById('last-name');
        this.firstNameElement = document.getElementById('first-name');
        this.canvasElement = document.getElementById('canvas');
        this.submitButtonElement = document.getElementById('submit');
        this.eraseButtonElement = document.getElementById('erase');

        this.submitButtonElement.onclick = () => this.submit();
        this.eraseButtonElement.onclick = () => this.erase();
        
        this.context = this.canvasElement.getContext('2d');

        const user = JSON.parse(localStorage.getItem('user'));

        if (user != null) {
            this.setUser(user);
        }
        
        this.init();
    }
    
    setUser(user) {
        this.firstNameElement.value = user.firstName;
        this.lastNameElement.value = user.lastName;
    }

    updateLocalStorage() {
        const user = new User();
        user.firstName = this.firstNameElement.value;
        user.lastName = this.lastNameElement.value;

        localStorage.setItem('user', JSON.stringify(user));
    }

    erase() {
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.signature = false;
    }

    checkValidation() {
        if (this.lastNameElement.value != "" &&
            this.firstNameElement.value != "" &&
            this.signature == true)
        return true;
        return false;
    }

    submit() {
        if (this.checkValidation()) {
            this.updateLocalStorage();
            this.reservationElement.style.display = 'none';
            
            this.reservationClass.createReservation();
        }
        else
            console.log('element manquant ! ');
    }

    isPainting(event) {
        if (!this.signature)
            this.signature = true;
        this.painting = true;
        this.draw(event)
    }

    isPaintingFinished() {
        this.painting = false;
        this.context.beginPath();
    }
    
    getMousePos(event) {
        this.x = event.clientX - this.context.canvas.offsetLeft - 2;
        this.y = event.clientY - this.context.canvas.offsetTop - 2;
    }

    draw(event) {
        if (this.painting) {

            this.context.lineCap = "round";
            this.getMousePos(event);
            
            this.context.lineTo(this.x, this.y);
            this.context.stroke();
            this.context.beginPath();
            this.context.moveTo(this.x, this.y);
        }
    }

    updateDisplay() {
        
    }
    
    init() {
        this.erase();
        this.canvasElement.addEventListener('mousemove', (event) => {
            this.draw(event)
        });
        this.canvasElement.addEventListener('mousedown', () => { this.isPainting(event) });
        this.canvasElement.addEventListener('mouseup', () => { this.isPaintingFinished() });
    }
}
