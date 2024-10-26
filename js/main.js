let isSliding = false;
let firstSlideDuration = 60000; // 20 seconds
let otherSlidesDuration = 45000; // 15 seconds
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
