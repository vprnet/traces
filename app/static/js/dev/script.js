if (window.location.href.indexOf("127.0.0.1") >= 0) {
    window.DEBUG = true;
} else {
    window.DEBUG = false;
}

if (window.location.hash == '#close_window') {
    window.close();
}

var VPR = VPR || {},
    slider = $('.bxslider'),
    next = $('#slider_next'),
    prev = $('#slider_prev');

VPR.activeIndex = typeof VPR.submissions !== 'undefined' ? VPR.submissions.indexOf(VPR.startSlide) : null;

VPR.sliderOptions = {
    infiniteLoop: false,
    controls: false,
    adaptiveHeight: true,
    adaptiveHeightSpeed: 1000,
    touchEnabled: false,
    startSlide: VPR.activeIndex,
    onSlideBefore: function(el, oldIndex, newIndex) {
        VPR.updateSlide(newIndex);
        $('body').animate({ scrollTop: 0 }, 200);
    }
};



slider.bxSlider(VPR.sliderOptions);

VPR.updateSlide = function(newIndex) {
    var newState = VPR.submissions[newIndex],
        title = newState.toTitleCase().replace(/-/g, ' ');


    if (DEBUG) {
        if (newState === 'landing') {
            newState = '/';
            title = "What's Your Story?";
        } else if (newState === 'share') {
            title = "Share Your Story";
        }
    } else {
        if (newState === 'landing') { newState = '/apps/traces/'; }
    }

    if (newIndex === 0) {
        prev.fadeOut();
    } else {
        prev.fadeIn();
    }
    if (newIndex === slider.getSlideCount() -1) {
        next.fadeOut();
    } else {
        next.fadeIn();
    }

    var pageTitle = "VPR's Traces Project: " + title + " | VPR";

    History.pushState({slide: newIndex}, pageTitle, newState);
};


VPR.updateModal = function() {
    var modalImg = $('#tracesModal img'),
        imageSrc = $(this).attr('data_src');

    // if no image on active slide
    if (!modalImg.length) {
        var newImage = $('<img>').attr('src', imageSrc);
        $('#tracesModal .modal-content').append(newImage);
    // else, update image src
    } else {
        modalImg.attr('src', imageSrc);
    }
    $('#tracesModal').modal();
};


History.Adapter.bind(window, 'statechange', function () {
    var state = History.getState(),
        audioDiv = $('div.play_audio');

    if (audioDiv.length) {
        audioDiv.each(function() {
            var icon = $(this).find('i.icon');
            $(this).children('audio')[0].pause();
            VPR.toggleController(icon, 'play');
        });
    }

    VPR.activeIndex = state.data.slide;

    if (VPR.activeIndex === 1) {
        $('h1').fadeOut(500);
    } else {
        $('h1').fadeIn();
    }

    VPR.loadSlide(VPR.activeIndex);
    slider.goToSlide(VPR.activeIndex);
    VPR.getAdjacentSlides();
});


if ($('html').hasClass('touch')) {
    console.log('touch');
    $('body').swipe({
        swipeRight: function() {
            slider.goToPrevSlide();
            $('.chevrons').addClass('invisible');
        },
        swipeLeft: function() {
            slider.goToNextSlide();
            $('.chevrons').addClass('invisible');
        },
        threshold: 50
    });
}

VPR.loadSlide = function (idx) {
    var slideID = VPR.submissions[idx],
        slideURL = slideID,
        getUrl;

    if (slideID === 'landing') { slideURL = ''; }

    if (DEBUG) {
        getURL = '/' + slideURL;
    } else {
        getURL = '/apps/traces/' + slideURL;
    }

    // If the slide does not have any content
    if ($('#' + slideID).children().length <= 1) {
        // Load the page of the slide with AJAX
        $.get(getURL, function(data) {
            // grab the slide from the returned page content
            var slide = $(data).find('#' + slideID);
            // replace the slide container with the actual slide content
            $('#' + slideID).replaceWith(slide);
            // reload the slider to recalculate heights
            slider.reloadSlider({
                infiniteLoop: false,
                controls: false,
                touchEnabled: false,
                adaptiveHeight: true,
                adaptiveHeightSpeed: 1000,
                startSlide: VPR.activeIndex,
                onSlideBefore: function(el, oldIndex, newIndex) {
                    VPR.updateSlide(newIndex);
                    $('body').animate({ scrollTop: 0 }, 200);
                }
            });

            // register events for dynamic content
            VPR.registerClicks();
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

VPR.swipeAction = function() {
    var swipeText = $('p.swiper_prompt');
    swipeText.transition({x: 60, delay: 2000}, 500)
        .transition({x: -40}, 500)
        .transition({x: 0}, 500);
};

VPR.registerClicks = function() {
    $('#home_link').click(function(event) {
        event.preventDefault();
        slider.goToSlide(1);
    });

    $('#explore_link').click(function(event) {
        event.preventDefault();
        slider.goToNextSlide();
    });

    next.click(function(event) {
        event.preventDefault();
        slider.goToNextSlide();
    });

    prev.click(function(event) {
        event.preventDefault();
        slider.goToPrevSlide();
    });

    $('#share_link').click(function(event) {
        event.preventDefault();
        slider.goToSlide(0);
    });

    $('.share_story_pill').click(function(event) {
        event.preventDefault();
        slider.goToSlide(0);
    });

    $('a.about_project').each(function() {
        $(this).click(function(event) {
            event.preventDefault();
            slider.goToSlide(1);
        });
    });

    $('i.modal_toggle').click(VPR.updateModal);

    VPR.audioDivs = $('div.play_audio').each( function() {
        VPR.canPlay($(this));
    });
};


VPR.init = function() {
    VPR.getAdjacentSlides();
    $('#page_container').addClass('loaded');
    if (VPR.activeIndex === 1) { $('h1').hide(); }
    if (VPR.activeIndex === 0) { prev.hide(); }
    if (VPR.activeIndex === slider.getSlideCount() - 1) { next.hide(); }

    // register events on page load
    VPR.swipeAction();
    VPR.registerClicks();
};

$(document).ready(function () {
    VPR.init();
});
