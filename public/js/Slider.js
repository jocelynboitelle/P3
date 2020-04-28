export default class Slider {

    path;
    images;
    timer;
    sizeTabImages;

    playingIcon;
    playingButton;
    nextButton;
    prevButton;
    slide;
    
    index;
    playing;
    setInterval;
    
    constructor(resources) {
        this.path = resources.path;
        this.images = resources.images;
        this.timer = resources.timer;
        this.sizeTabImages = resources.sizeTabImages;
        this.index = 0;
        
        this.playingIcon = document.getElementById('playing-icon');
        this.playingButton = document.getElementById('playing');
        this.nextButton = document.getElementById('next');
        this.prevButton = document.getElementById('prev');
        this.slide = document.getElementById('slide');
        
        this.playingButton.onclick = () => this.checkstatus();
        this.nextButton.onclick = () => this.nextSlide();
        this.prevButton.onclick = () => this.prevSlide();

        this.setImage();
        this.playSlide();
    }

    setImage() {
        this.slide.src = this.path + this.images[this.index];
    }

    checkstatus() {
        if (this.playing) {
            this.pauseSlide();
        }
        else {
            this.playSlide();
        }
    }

    nextSlide() {
        this.index = (this.index + 1) % this.sizeTabImages;
        this.setImage();
    }

    prevSlide() {
        this.index = this.index - 1;
        if (this.index < 0)
        this.index = this.sizeTabImages - 1;
        this.setImage();
    }
    
    pauseSlide() {
        this.playingIcon.className = "fas fa-play fa-3x";
        this.playing = false;
        clearInterval(this.setInterval);
    }
    
    playSlide() {
        this.playingIcon.className = "fas fa-pause fa-3x";
        this.playing = true;
        this.setInterval = setInterval(() => {
            requestAnimationFrame(() => this.nextSlide());
        }, this.timer);
    }
}
