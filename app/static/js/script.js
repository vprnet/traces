/**
 * @depends svg-support.js
 * @depends jquery.bxslider.js
 */

var VPR = VPR || {};

var slider = $('.bxslider').bxSlider({
  infiniteLoop: false,
  controls: false
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


VPR.activeIndex = VPR.submissions.indexOf(VPR.activeSlide);

VPR.getPrevious = function() {
    var prevSlug = VPR.submissions[(VPR.activeIndex - 1)];
    $.get('/' + prevSlug, function(data) {
        VPR.prevSlide = $(data).find('#' + prevSlug);
        VPR.prevSlide.insertBefore('#' + VPR.activeSlide);
    });
};

$(document).ready(function () {
    VPR.getPrevious();
});
