var VPR = VPR || {},
    slider = $('.bxslider'),
    next = $('#slider_next'),
    prev = $('#slider_prev');

VPR.activeIndex = typeof VPR.submissions !== 'undefined' ? VPR.submissions.indexOf(VPR.activeSlide) : null;

slider.bxSlider({
    infiniteLoop: false,
    controls: false,
    adaptiveHeight: true,
    startSlide: VPR.activeIndex
});

next.click(function(event) {
    event.preventDefault();
    // Landing page served from root, it's submission[i] == ''
    var newState = VPR.submissions[VPR.activeIndex + 1];
    if (newState === 'landing') { newState = '/'; }
    //if (newState === 'landing') { newState = '/apps/sandbox/'; }

    if ( VPR.activeIndex < slider.getSlideCount() - 1 ) {
        History.pushState({slide: VPR.activeIndex + 1}, null, newState);
    }
});

prev.click(function(event) {
    event.preventDefault();
    var newState = VPR.submissions[VPR.activeIndex - 1];
    if (newState === 'landing') { newState = '/'; }
    //if (newState === 'landing') { newState = '/apps/sandbox/'; }

    if ( VPR.activeIndex > 0 ) {
        History.pushState({slide: VPR.activeIndex - 1}, null, newState);
    }
});

History.Adapter.bind(window, 'statechange', function () {
    var state = History.getState();

    VPR.activeIndex = state.data.slide;

    slider.goToSlide(VPR.activeIndex);
    VPR.getAdjacentSlides();
});

VPR.loadSlide = function (idx) {
    var slideID = VPR.submissions[idx],
        slideURL = slideID;

    if (slideID === 'landing') { slideURL = ''; }

    // If the slide does not have any content
    if (!$('#' + slideID).children().length) {
        // Load the page of the slide with AJAX
        $.get('/' + slideURL, function(data) {
        //$.get('/apps/sandbox/' + slideURL, function(data) {
            // grab the slide from the returned page content
            var slide = $(data).find('#' + slideID);
            console.log(slide);
            // replace the slide container with the actual slide content
            $('#' + slideID).replaceWith(slide);
        });
    }
};

VPR.getAdjacentSlides = function() {
    var idx = VPR.activeIndex,
        next = idx + 2,
        prev = idx - 1;

    if (idx >= 1) {
        VPR.loadSlide(prev);
    }

    if (idx + 2 < VPR.submissions.length) {
        VPR.loadSlide(next);
    }
};

$(document).ready(function () {
    VPR.getAdjacentSlides();
    $('li').addClass('loaded');
    $('.chevron').addClass('loaded');
});
