/**
 * @depends svg-support.js
 * @depends jquery.bxslider.js
 */

var VPR = VPR || {};

VPR.activeIndex = VPR.submissions.indexOf(VPR.activeSlide);

var slider = $('.bxslider').bxSlider({
  infiniteLoop: false,
  controls: false,
  startSlide: VPR.activeIndex - 1
});

$('#slider_next').click(function(event) {
    event.preventDefault();
    slider.goToNextSlide();
    ++VPR.activeIndex;
    VPR.getOnDeck(VPR.activeIndex);
    return false;
});

$('#slider_prev').click(function(event) {
    event.preventDefault();
    slider.goToPrevSlide();
    --VPR.activeIndex;
    VPR.getPrevSlide(VPR.activeIndex);
    return false;
});

VPR.slide = $('#' + VPR.activeSlide);

VPR.onDeck = function(idx) {
    if (typeof VPR.submissions[idx + 2] !== undefined) {
        return $('#' + VPR.submissions[idx + 2]);
    } else {
        return false;
    }
};

VPR.getOnDeck = function(idx) {
    if (idx + 2 < VPR.submissions.length) {
        var onDeckID = VPR.submissions[idx + 2];
        if (!VPR.onDeck(idx).find('h2').length) {
            $.get('/' + onDeckID, function(data) {
                var onDeckSlide = $(data).find('#' + onDeckID);
                VPR.onDeck(idx).replaceWith(onDeckSlide);
            });
        }
    }
};

VPR.prevSlide = function(idx) {
    if (typeof VPR.submissions[idx - 1] !== undefined) {
        return $('#' + VPR.submissions[idx - 1]);
    } else {
        return false;
    }
};

VPR.getPrevSlide = function(idx) {
    if (idx > 1) {
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


$(document).ready(function () {
    VPR.getPrevSlide(VPR.activeIndex);
    VPR.getOnDeck(VPR.activeIndex);
});
