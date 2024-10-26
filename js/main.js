let isSliding = false;
let firstSlideDuration = 60000; // 60 seconds
let otherSlidesDuration = 45000; // 45 seconds
let currentSlideIndex = 0;

function setSlideInterval() {
    let interval = currentSlideIndex === 0 ? firstSlideDuration : otherSlidesDuration;
    setTimeout(() => {
        $('#carouselExampleIndicators').carousel('next');
    }, interval);
}

// Custom slide control
$('#carouselExampleIndicators').on('slid.bs.carousel', function (event) {
    currentSlideIndex = $(event.relatedTarget).index();
    setSlideInterval();
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
