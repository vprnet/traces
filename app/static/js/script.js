var VPR = VPR || {},
    slider = $('.bxslider'),
    next = $('#slider_next'),
    prev = $('#slider_prev');

VPR.activeIndex = typeof VPR.submissions !== 'undefined' ? VPR.submissions.indexOf(VPR.activeSlide) : null;

slider.bxSlider({
    infiniteLoop: false,
    controls: false,
    startSlide: VPR.activeIndex
});

next.click(function(event) {
    event.preventDefault();

    if ( VPR.activeIndex < slider.getSlideCount() - 1 ) {
        History.pushState({slide: VPR.activeIndex + 1}, null, VPR.submissions[VPR.activeIndex + 1]);
    }
});

prev.click(function(event) {
    event.preventDefault();

    if ( VPR.activeIndex > 0 ) {
        History.pushState({slide: VPR.activeIndex - 1}, null, VPR.submissions[VPR.activeIndex - 1]);
    }
});

History.Adapter.bind(window, 'statechange', function () {
    var state = History.getState();

    VPR.activeIndex = state.data.slide;

    slider.goToSlide(VPR.activeIndex);
    VPR.getAdjacentSlides();
});

VPR.loadSlide = function (idx) {
    var slideID = VPR.submissions[idx];

    // If the slide does not have any content
    if (!$('#' + slideID).children().length) {
        // Load the page of the slide with AJAX
        $.get('/' + slideID, function(data) {
            // grab the slide from the returned page content
            var slide = $(data).find('#' + slideID);
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
});
