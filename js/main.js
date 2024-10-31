let isSliding = false;
let firstSlideDuration = 60000; // 60 seconds
let otherSlidesDuration = 45000; // 45 seconds
let currentSlideIndex = 0;
let slideTimeout; // Declare a variable to hold the timeout reference

function setSlideInterval() {
    // Clear the existing timeout if there is one
    if (slideTimeout) {
        clearTimeout(slideTimeout);
    }

    let interval = currentSlideIndex === 0 ? firstSlideDuration : otherSlidesDuration;

    slideTimeout = setTimeout(() => {
        $('#carouselExampleIndicators').carousel('next');
    }, interval);
}

// Custom slide control
$('#carouselExampleIndicators').on('slid.bs.carousel', function (event) {
    currentSlideIndex = $(event.relatedTarget).index();
    setSlideInterval(); // Reset the interval whenever a new slide is shown
});

// Synchronize both carousels without infinite loop
$('#carouselExampleIndicators').on('slide.bs.carousel', function (event) {
    if (!isSliding) {
        isSliding = true;
        $('#menuCarousel2').carousel(event.to).on('slid.bs.carousel', function () {
            isSliding = false;
        });
    }
});

$('#menuCarousel2').on('slide.bs.carousel', function (event) {
    if (!isSliding) {
        isSliding = true;
        $('#carouselExampleIndicators').carousel(event.to).on('slid.bs.carousel', function () {
            isSliding = false;
        });
    }
});

// Set the initial interval for the first slide
setSlideInterval();

// Generate QR code for the menu URL
const qrCodeUrl = "https://icy-hill-0ec54941e.5.azurestaticapps.net/"; // Your menu URL

let qrcode = new QRCode(document.getElementById("qrcode"), {
    text: qrCodeUrl,    // URL to be embedded in the QR code
    width: 200,         // Width of the QR code
    height: 200,        // Height of the QR code
    colorDark: "#000000", // Dark color for the QR code
    colorLight: "#ffffff", // Light color (background)
    correctLevel: QRCode.CorrectLevel.H // Error correction level
});

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
        document.getElementById('fullscreenIcon').style.display = 'none';
        document.getElementById('exitFullscreenIcon').style.display = 'inline-block';
    }
}

function exitFullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        document.getElementById('fullscreenIcon').style.display = 'inline-block';
        document.getElementById('exitFullscreenIcon').style.display = 'none';
    }
}

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.getElementById('fullscreenIcon').style.display = 'inline-block';
        document.getElementById('exitFullscreenIcon').style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const videoSlide = document.getElementById('videoSlide');
    const carousel = $('#carouselExampleIndicators');

    // Pause carousel auto-cycling and play video when the video slide is shown
    carousel.on('slid.bs.carousel', function (event) {
        if ($(event.relatedTarget).find('video').length > 0) {
            // Pause carousel auto-cycling and play the video
            carousel.carousel('pause');
            videoSlide.play().catch(err => {
                console.error(`Error playing the video: ${err}`);
            });
        } else {
            // Resume carousel auto-cycling if not on the video slide
            setSlideInterval();
        }
    });

    // Resume carousel auto-cycling when the video ends
    videoSlide.addEventListener('ended', function () {
        carousel.carousel('next');
    });
});
