/*************** INIT ***************/

const path = "public/img/";
const images = ["alaska.jpg", "bears.jpg", "husky.jpg", "lac.jpg", "wolf.jpg"];
const playingButton = document.getElementById('playing');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const length = images.length;
const timer = 5000;

let index = 1;
let playing = true;
let slideInterval = setInterval(nextSlide, timer);

document.slide.src = path + images[0];

/*************** FUNCTION ***************/

function nextSlide() {
    document.slide.src = path + images[index];
    index = (index + 1) % length;
}

function pauseSlides() {
    let icon = document.getElementsByClassName('fa-pause');
    icon[0].className = " fas fa-play fa-3x ";
    index = index - 1;
	playing = false;
	clearInterval(slideInterval);
}

function playSlides(){
    let icon = document.getElementsByClassName('fa-play');
    icon[0].className = " fas fa-pause fa-3x ";
    index = index + 1;
	playing = true;
	slideInterval = setInterval(nextSlide, timer);
}

/*************** ONCLICK ***************/

playingButton.onclick = function() {
    if (playing)
        pauseSlides();
    else
        playSlides();
};

nextButton.onclick = function () {
    index = (index + 1) % length;
    document.slide.src = path + images[index];
};

prevButton.onclick = function () {
    index = index - 1;
    if (index < 0)
        index = length - 1;
    document.slide.src = path + images[index];
};
