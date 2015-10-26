// Create a class and extended it from the MAF.system.FullscreenView
var playerView = new MAF.Class({
    Extends: MAF.system.FullscreenView,

    ClassName: 'playerView',

    // Add back params when going to the previous view
    viewBackParams: {
        reset: false
    },

    // Create your view template
    createView: function () {
        // Reference to the current view
        var view = this;
        // Create the Media Transport Overlay
        var playerControls = new MAF.control.MediaTransportOverlay({
            theme: false,
            buttonOrder: ['backwardseekButton', 'rewindButton', 'playButton', 'forwardButton', 'forwardseekButton'],
            // buttonOffset: 300,
            // buttonSpacing: 100,
            fadeTimeout: 0,
            playButton: true,
            stopButton: false,
            rewindButton: true,
            forwardButton: true,
            forwardseekButton: true,
            backwardseekButton: true,
            styles: {
                vOffset: 100,
                vAlign: 'bottom'
            }
        }).appendTo(view);
        playerControls.progressBar.setStyle('height', 5);
        playerControls.controls.troth.setStyle('height', 5);
    },

    gotKeyPress: function (event) {
        if (event.payload.key === 'stop')
            MAF.application.previousView();
    },

    // The channelChanged function is called when you change the channel of your TV
    onChannelChanged: function () {
        MAF.application.previousView();
    },

    // When view is created or returning to view the view is updated
    updateView: function () {
        // Reference to the current view
        var view = this;

        view.onChannelChanged.subscribeTo(MAF.mediaplayer, 'onChannelChange');
        view.gotKeyPress.subscribeTo(MAF.application, 'onWidgetKeyPress');

        // Add a new playlist with the video to the player
        var videoUrl = 'http://api.iflix.io/?action=play&index=' + this.persist.index + '&magnet=' + this.persist.url;
        var playlist = new MAF.media.Playlist();
        playlist.addEntryByURL(videoUrl);
        MAF.mediaplayer.playlist.set(playlist);
        // Start the video playback
        setTimeout(function () {
            console.log('can start');
            MAF.mediaplayer.playlist.start();
        }, 300);
    },

    // The hideView is called when you're leaving this view
    hideView: function () {
        // Reference to the current view
        var view = this;
        view.onChannelChanged.unsubscribeFrom(MAF.mediaplayer, 'onChannelChange');
        view.gotKeyPress.unsubscribeFrom(MAF.application, 'onWidgetKeyPress');
    }
});