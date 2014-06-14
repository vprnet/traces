var VPR = VPR || {};

VPR.audioPaused = true;

VPR.fadeController = function(icon, state) {
    icon.fadeOut(200, function() {
        icon.attr('class', 'play_icon icon ion-ios7-' + state);
    });
    icon.fadeIn(200);
};

VPR.playAudio = function() {
    var audioLink = $(this),
        audio = audioLink.children('audio')[0],
        icon = audioLink.find('i.icon');

    if (VPR.audioPaused) {
        audio.play();
        VPR.audioPaused = false;
        VPR.fadeController(icon, 'pause');
    } else {
        audio.pause();
        VPR.audioPaused = true;
        VPR.fadeController(icon, 'play');
    }

    audio.addEventListener('ended', function() {
        audio.currentTime = 0;
        VPR.audioPaused = true;
        VPR.fadeController(icon, 'play');
    });
};

VPR.canPlay = function(audioDiv) {
    if (!audioDiv.length) {
        return false;
    } else {
        var audio = audioDiv.children('audio')[0],
            icon = audioDiv.find('i.icon');

        audio.addEventListener('canplay', function() {
            VPR.fadeController(icon, 'play');
        });
    }
};
