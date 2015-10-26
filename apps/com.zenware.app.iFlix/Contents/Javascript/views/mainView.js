// Create a class and extended it from the MAF.system.SidebarView
var mainView = new MAF.Class({
    Extends: MAF.system.SidebarView,

    ClassName: 'mainView',

    initialize: function () {
        // Reference to the current view
        var view = this;
        view.parent(); // Call super class constructor
        MAF.mediaplayer.init(); // Initialize mediaplayer
    },

    // Create your view template
    createView: function () {
        // Reference to the current view

        var client = new WebSocket("ws://api.iflix.io:5445");
        var self = this;
        client.onmessage = function (message) {
            console.log(message.data);
            var data = JSON.parse(message.data);
            if (data.action === "play") {
                playVideo(self, data);
                console.log(data.url)
            }
        };

        var view = this;
        var logo = new MAF.element.Image({
            source: '/images/logo.png',
            styles: {
                height: 150,
                width: 200,
                hOffset: (view.width - 200) / 2
            }
        }).appendTo(view);
        var wait = new MAF.element.Image({
            source: '/images/wait.png',
            styles: {
                height: 32,
                width: 313,
                vOffset: 840,
                hOffset: (view.width - 313) / 2
            }
        }).appendTo(view);
        this.elements.loader = (new MAF.element.Text({
            anchorStyle: "center",
            label: FontAwesome.get(["circle-o-notch"]),
            styles: {
                width: 400,
                height: 400,
                hOffset: 49,
                vOffset: 540,
                hOffset: (view.width - 400) / 2,
                fontSize: 150,
                opacity: 0,
                transform: "translateZ(0)"
            },
            methods: {
                hide: function () {
                    !0 === this.retrieve("spinning") && (this.eliminate("spinning"), this.animate({
                        opacity: 0,
                        duration: .2,
                        events: {
                            onAnimationEnded: function () {
                                this.setText("")
                            }
                        }
                    }))
                },
                show: function () {
                    !0 !== this.retrieve("spinning") && (this.store("spinning", !0), this.setText(FontAwesome.get(["circle-o-notch", "spin"])), this.animate({
                        opacity: 1,
                        duration: .2
                    }))
                }
            }
        })).appendTo(this);

    },

    // When closing the application make sure you unreference your objects and arrays
    destroyView: function () {
        MAF.mediaplayer.control.stop();
    }
});

var playVideo = function (parrent, data) {
    var playerControls = new MAF.control.MediaTransportOverlay({
        fadeTimeout: false,
        theme: false,
        forwardseekButton: true,
        backwardseekButton: true,
        events: {
            onTransportButtonPress: function (event) {
                var timeIndex;
                switch (event.payload.button) {
                    case 'forward':
                        event.stop();
                        MAF.mediaplayer.control.seek(60);
                        break;
                    case 'rewind':
                        event.stop();
                        timeindex = MAF.mediaplayer.player && MAF.mediaplayer.player.currentTimeIndex || null;
                        if (timeindex && (timeindex - (60 * 1000)) < 0 && MAF.mediaplayer.playlist.currentIndex > 0) {
                            MAF.mediaplayer.playlist.previousEntry();
                        } else if (view.visible && MAF.mediaplayer.player.currentPlayerState === MAF.mediaplayer.constants.states.PLAY) {
                            MAF.mediaplayer.control.seek(-60);
                        }
                        break;
                    case 'forwardseek':
                        event.stop();
                        MAF.mediaplayer.control.forward();
                        break;
                    case 'backwardseek':
                        event.stop();
                        timeindex = MAF.mediaplayer.player && MAF.mediaplayer.player.currentTimeIndex || null;
                        if (timeindex && (timeindex - (600 * 1000)) < 0 && MAF.mediaplayer.playlist.currentIndex > 0) {
                            MAF.mediaplayer.playlist.previousEntry();
                        } else {
                            MAF.mediaplayer.control.rewind();
                        }
                        break;
                    case 'stop':
                        if (!view.frozen) {
                            MAF.application.previousView();
                        }
                        break;
                }
            }
        }
    }).appendTo(parrent);
    // Add a new playlist with the video to the player
    var entry = new MAF.media.PlaylistEntry({
        url: 'http://api.iflix.io/?action=play&index=' + data.index + '&magnet=' + data.url,
        asset: new MAF.media.Asset('iFlix Video')
    });
    MAF.mediaplayer.playlist.set(new MAF.media.Playlist().addEntry(entry));
    // Start the video playback
    MAF.mediaplayer.playlist.start();
};