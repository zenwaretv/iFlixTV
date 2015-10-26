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

        var client=new WebSocket("ws://api.iflix.io:5445");
        var self=this;
        client.onmessage=function(message){
            console.log(message.data);
           var data = JSON.parse(message.data);
            if(data.action==="play"){
                self.elements.loader.hide();
                playVideo(self,data);
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

var playVideo = function (parremt, data) {
    var a = this;
    b = (new MAF.control.MediaTransportOverlay({
        ClassName: "YTOverlay",
        theme: !1,
        buttonOrder: ["rewindButton", "playButton", "forwardButton"],
        buttonOffset: 200,
        buttonSpacing: 100,
        fadeTimeout: 6,
        playButton: !0,
        stopButton: !1,
        rewindButton: !0,
        forwardButton: !0,
        styles: {
        }
    })).appendTo(parremt);
    b.progressBar.setStyle("height", 5);
    b.controls.troth.setStyle("height", 5);
    // Add a new playlist with the video to the player
    var entry = new MAF.media.PlaylistEntry({
        url: 'http://api.iflix.io/?action=play&index='+data.index+'&magnet='+data.url,
        asset: new MAF.media.Asset('iFlix Video')
    });
    MAF.mediaplayer.playlist.set(new MAF.media.Playlist().addEntry(entry));
    // Start the video playback
    MAF.mediaplayer.playlist.start();
};