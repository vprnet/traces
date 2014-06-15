if (window.location.href.indexOf("127.0.0.1") >= 0) {
    window.DEBUG = true;
} else {
    window.DEBUG = false;
}

var VPR = VPR || {},
    slider = $('.bxslider'),
    next = $('#slider_next'),
    prev = $('#slider_prev');

VPR.activeIndex = typeof VPR.submissions !== 'undefined' ? VPR.submissions.indexOf(VPR.startSlide) : null;

slider.bxSlider({
    infiniteLoop: false,
    controls: false,
    adaptiveHeight: true,
    adaptiveHeightSpeed: 1,
    touchEnabled: true,
    startSlide: VPR.activeIndex
});

$('#home_link').click(function(event) {
    event.preventDefault();
    var newState;

    if (DEBUG) {
        newState = '/';
    } else {
        newState = '/apps/sandbox/';
    }

    VPR.loadSlide(1);
    if (VPR.activeIndex === slider.getSlideCount() - 1) {
        next.fadeIn();
    }

    History.pushState({slide: 1}, null, newState);
});


next.click(function(event) {
    event.preventDefault();
    // Landing page served from root, it's submission[i] == ''
    var newState = VPR.submissions[VPR.activeIndex + 1];

    if (DEBUG) {
        if (newState === 'landing') { newState = '/'; }
    } else {
        if (newState === 'landing') { newState = '/apps/sandbox/'; }
    }

    if (VPR.activeIndex === 0) {
        prev.fadeIn();
    } else if (VPR.activeIndex === slider.getSlideCount() -2) {
        next.fadeOut();
    }

    if ( VPR.activeIndex < slider.getSlideCount() - 1 ) {
        History.pushState({slide: VPR.activeIndex + 1}, null, newState);
    }

});

prev.click(function(event) {
    event.preventDefault();
    var newState = VPR.submissions[VPR.activeIndex - 1];

    if (DEBUG) {
        if (newState === 'landing') { newState = '/'; }
    } else {
        if (newState === 'landing') { newState = '/apps/sandbox/'; }
    }

    if (VPR.activeIndex === 1) {
        prev.fadeOut();
    } else if (VPR.activeIndex === slider.getSlideCount() -1) {
        next.fadeIn();
    }

    if ( VPR.activeIndex > 0 ) {
        History.pushState({slide: VPR.activeIndex - 1}, null, newState);
    }
});


VPR.updateModal = function() {
    console.log('click');

    var modalImg = $('#tracesModal img'),
        imageSrc = $(this).attr('data_src');

    // if no image on active slide
    if (!modalImg.length) {
        console.log("no image in modal");
        var newImage = $('<img>').attr('src', imageSrc);
        $('#tracesModal .modal-content').append(newImage);
    // else, update image src
    } else {
        console.log("image already in modal");
        modalImg.attr('src', imageSrc);
    }
    $('#tracesModal').modal();
};


History.Adapter.bind(window, 'statechange', function () {
    var state = History.getState();
    VPR.activeIndex = state.data.slide;


    if (VPR.activeIndex === 1) {
        $('h1').fadeOut(500);
    } else {
        $('h1').fadeIn();
    }

    slider.goToSlide(VPR.activeIndex);
    VPR.getAdjacentSlides();
});

VPR.loadSlide = function (idx) {
    var slideID = VPR.submissions[idx],
        slideURL = slideID,
        getUrl;

    if (slideID === 'landing') { slideURL = ''; }

    if (DEBUG) {
        getURL = '/' + slideURL;
    } else {
        getURL = '/apps/sandbox/' + slideURL;
    }

    // If the slide does not have any content
    if (!$('#' + slideID).children().length) {
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
                adaptiveHeight: true,
                adaptiveHeightSpeed: 1,
                startSlide: VPR.activeIndex
            });

            // register events for dynamic content
            $('i.modal_toggle').click(VPR.updateModal);

            var audioDiv = $('#' + slideID + ' div.play_audio');
            audioDiv.click(VPR.playAudio);
            VPR.canPlay(audioDiv);
            $('.share_story_pill').click(VPR.slideToShare);

            if (slideID === 'landing') {
                $('#share_link').click(VPR.slideToShare);
            }
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
    swipeText.transition({x: 80, delay: 900}, 500)
        .transition({x: -80}, 500)
        .transition({x: 0}, 500);
};

VPR.init = function() {
    VPR.getAdjacentSlides();
    $('body').addClass('loaded');
    if (VPR.activeIndex === 1) { $('h1').hide(); }
    if (VPR.activeIndex === 0) { prev.hide(); }
    if (VPR.activeIndex === slider.getSlideCount() - 1) { next.hide(); }

    // register events on page load
    $('div.play_audio').click(VPR.playAudio);
    $('i.modal_toggle').click(VPR.updateModal);
    $('#share_link').click(VPR.slideToShare);
    $('.share_story_pill').click(VPR.slideToShare);
    VPR.swipeAction();
    var audioDivs = $('div.play_audio').each( function() {
        VPR.canPlay($(this));
    });
};

$(document).ready(function () {
    VPR.init();
});
