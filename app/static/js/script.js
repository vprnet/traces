var VPR = VPR || {};

VPR.activeIndex = typeof VPR.submissions !== 'undefined' ? VPR.submissions.indexOf(VPR.activeSlide) : null;

var slider = $('.bxslider').bxSlider({
    infiniteLoop: false,
    controls: false,
    startSlide: VPR.activeIndex
});

$('#slider_next').click(function(event) {
    event.preventDefault();
    if ( VPR.activeIndex < slider.getSlideCount() - 1 ) {
        VPR.activeIndex++;
        History.pushState(null, null, VPR.submissions[VPR.activeIndex]);
    }

    return false;
});

$('#slider_prev').click(function(event) {
    event.preventDefault();
    if ( VPR.activeIndex > 0 ) {
        VPR.activeIndex--;
        History.pushState(null, null, VPR.submissions[VPR.activeIndex]);
    }

    return false;
});

History.Adapter.bind(window, 'statechange', function () {
    slider.goToSlide(VPR.activeIndex);
    VPR.getNextSlide();
    VPR.getPrevSlide();
});

VPR.slide = $('#' + VPR.activeSlide);

VPR.onDeck = function(idx) {
    if (typeof VPR.submissions[idx + 2] !== undefined) {
        return $('#' + VPR.submissions[idx + 2]);
    } else {
        return false;
    }
};

VPR.prevSlide = function(idx) {
    if (typeof VPR.submissions[idx - 1] !== undefined) {
        return $('#' + VPR.submissions[idx - 1]);
    } else {
        return false;
    }
};

VPR.getPrevSlide = function() {
    var idx = VPR.activeIndex;
    if (idx >= 1) {
        var prevSlideID = VPR.submissions[idx - 1];
        if (!VPR.prevSlide(idx).find('h2').length) {
            // this own't work for index
            $.get('/' + prevSlideID, function(data) {
                var prevSlide = $(data).find('#' + prevSlideID);
                VPR.prevSlide(idx).replaceWith(prevSlide);
            });
        }
    }
};

VPR.getNextSlide = function() {
    var idx = VPR.activeIndex;
    if (idx + 2 < slider.getSlideCount()) {
        var onDeckID = VPR.submissions[idx + 2];
        if (!VPR.onDeck(idx).find('h2').length) {
            $.get('/' + onDeckID, function(data) {
                var onDeckSlide = $(data).find('#' + onDeckID);
                VPR.onDeck(idx).replaceWith(onDeckSlide);
            });
        }
    }
};


$(document).ready(function () {
    VPR.getNextSlide();
    VPR.getPrevSlide();
});
