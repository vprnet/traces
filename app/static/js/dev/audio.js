if (document.createElement('audio').canPlayType) {
    if (!document.createElement('audio').canPlayType('audio/mpeg')) {
        var all_audio = $('div.play_audio');
        all_audio.attr("style", "display: none;");
        $('.no_audio_support').attr("style", "display: block");
    }
}

var VPR = VPR || {};

VPR.audioPaused = true;

VPR.toggleController = function(icon, state) {
    icon.attr('class', 'play_icon icon ion-ios7-' + state);
};

VPR.playAudio = function() {
    console.log('playAudio');
    var audioLink = $(this),
        audio = audioLink.children('audio')[0],
        icon = audioLink.find('i.icon');

    if (VPR.audioPaused) {
        audio.play();
        VPR.audioPaused = false;
        VPR.toggleController(icon, 'pause');
    } else {
        audio.pause();
        VPR.audioPaused = true;
        VPR.toggleController(icon, 'play');
    }

    audio.addEventListener('ended', function() {
        audio.currentTime = 0;
        VPR.audioPaused = true;
        VPR.toggleController(icon, 'play');
    });
};

VPR.canPlay = function(audioDiv) {
    if (!audioDiv.length) {
        return false;
    } else {
        if (!audioDiv.hasClass('can_play')) {
            var audio = audioDiv.children('audio')[0],
                icon = audioDiv.find('i.icon');

            if ($('html').hasClass('touch')) {
                VPR.toggleController(icon, 'play');
            } else {
                audio.addEventListener('canplay', function() {
                    VPR.toggleController(icon, 'play');
                });
            }
            audioDiv.click(VPR.playAudio);
            audioDiv.addClass('can_play');
        }
    }
};
