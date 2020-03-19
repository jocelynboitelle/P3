const path = "public/img/";
const images = ["alaska.jpg", "bears.jpg", "husky.jpg", "lac.jpg", "wolf.jpg"];
const playingButton = document.getElementById('playing');

let index = 0;
let playing = true;
let slideInterval = setInterval(nextSlide, 1000);

function nextSlide() {
    document.slide.src = path + images[index];
    index = (index + 1) % images.length;
}

function pauseSlideshow(){
	playingButton.innerHTML = 'Play';
	playing = false;
	clearInterval(slideInterval);
}

function playSlideshow(){
	playingButton.innerHTML = 'Pause';
	playing = true;
	slideInterval = setInterval(nextSlide, 1000);
}

playingButton.onclick = function() {
    if (playing)
        pauseSlideshow();
    else
        playSlideshow();
};
