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
        var audio = audioDiv.children('audio')[0],
            icon = audioDiv.find('i.icon');

        audio.addEventListener('canplay', function() {
            console.log('canplay');
            VPR.toggleController(icon, 'play');
            audioDiv.click(VPR.playAudio);
        });
    }
};
