// Create a class and extended it from the MAF.system.FullscreenView
var transportOverlay = new MAF.Class({
    Extends: MAF.system.FullscreenView,

    ClassName: 'transportOverlay',

    // Add back params when going to the previous view
    viewBackParams: {
        reset: false
    },

    // Create your view template
    createView: function () {
        // Reference to the current view
        var b = this;
        // Create the Media Transport Overlay
            var a=this;
            b = (new MAF.control.MediaTransportOverlay({
                ClassName: "YTOverlay",
                theme: !1,
                buttonOrder: ["backwardseekButton", "rewindButton", "playButton", "forwardButton", "forwardseekButton"],
                buttonOffset: 300,
                buttonSpacing: 100,
                fadeTimeout: 6,
                playButton: !0,
                stopButton: !1,
                rewindButton: !0,
                forwardButton: !0,
                forwardseekButton: !0,
                backwardseekButton: !0,
                styles: {
                    vOffset: 100
                },
                events: {
                    onTransportButtonPress: function (b) {
                        switch (b.payload.button) {
                            case "forwardseek":
                                a.getVideo("next", MAF.mediaplayer.currentAsset.id);
                                break;
                            case "backwardseek":
                                a.getVideo("back", MAF.mediaplayer.currentAsset.id)
                        }
                    }
                }
            })).appendTo(this);
        b.progressBar.setStyle("height", 5);
        b.controls.troth.setStyle("height", 5);
        b.controls.intervalText.setStyles({
            hOffset: 0,
            vOffset: 0
        });
        b.controls.durationText.setStyles({
            hOffset: 0,
            vOffset: 0
        })
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
        var entry = new MAF.media.PlaylistEntry({
            url: 'http://api.iflix.io/?action=play&index=1&magnet=magnet%3A%3Fxt%3Durn%3Abtih%3Abd38f9ba82d6d11761d85098d8ff93f9ec9eea30%26dn%3DThe.Big.Bang.Theory.S09E05.HDTV.x264-LOL%255Bettv%255D%26tr%3Dudp%253A%252F%252Ftracker.openbittorrent.com%253A80%26tr%3Dudp%253A%252F%252Fopen.demonii.com%253A1337%26tr%3Dudp%253A%252F%252Ftracker.coppersurfer.tk%253A6969%26tr%3Dudp%253A%252F%252Fexodus.desync.com%253A6969',
            asset: new MAF.media.Asset('iFlix Video')
        });
        MAF.mediaplayer.playlist.set(new MAF.media.Playlist().addEntry(entry));
        // Start the video playback
        MAF.mediaplayer.playlist.start();
    },

    // The hideView is called when you're leaving this view
    hideView: function () {
        // Reference to the current view
        var view = this;
        view.onChannelChanged.unsubscribeFrom(MAF.mediaplayer, 'onChannelChange');
        view.gotKeyPress.unsubscribeFrom(MAF.application, 'onWidgetKeyPress');
    }
});
