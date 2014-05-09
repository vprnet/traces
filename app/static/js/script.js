/**
 * @depends svg-support.js
 * @depends jquery.bxslider.js
 */

var VPR = VPR || {};

VPR.activeIndex = VPR.submissions.indexOf(VPR.activeSlide);

var slider = $('.bxslider').bxSlider({
  infiniteLoop: false,
  controls: false,
  startslide: VPR.activeIndex
});

$('#slider_next').click(function(event) {
    event.preventDefault();
    slider.goToNextSlide();
    return false;
});

$('#slider_prev').click(function(event) {
    event.preventDefault();
    slider.goToPrevSlide();
    return false;
});

VPR.slide = $('#' + VPR.activeSlide);
VPR.onDeck = $('#' + VPR.submissions[VPR.activeIndex + 2]);
VPR.getOnDeck = function() {
    if (VPR.activeIndex + 1 < VPR.submissions.length) {
        var onDeckID = VPR.submissions[VPR.activeIndex + 2];
        $.get('/' + onDeckID, function(data) {
            var onDeckSlide = $(data).find('#' + onDeckID);
            VPR.onDeck.replaceWith(onDeckSlide);
        });
    }
};

$(document).ready(function () {
    VPR.getOnDeck();
});
