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
        var view = this;
        var logo = new MAF.element.Image({
            source: '/images/logo.png',
            styles: {
                height: 150,
                width: 200,
                hOffset: (view.width - 200) / 2
            }
        }).appendTo(view);
        var logo = new MAF.element.Image({
            source: '/images/wait.png',
            styles: {
                height: 32,
                width: 313,
                vOffset:8git 40,
                hOffset: (view.width - 313) / 2
            }
        }).appendTo(view);


        var mediaTransportOverlayButton = view.controls.mediaTransportOverlayButton = new MAF.control.TextButton({
            label: $_('MediaTransportOverlay'),
            guid: 'mediaTransportOverlayButton',
            styles: {
                height: 80,
                width: 400,
                hOffset: (logo.width - 400) / 2
            },
            textStyles: {
                anchorStyle: 'center'
            },
            events: {
                onSelect: function () {
                    MAF.application.loadView('view-transportOverlay');
                }
            }
        });
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
        this.elements.loader.show()
    },

    // When closing the application make sure you unreference your objects and arrays
    destroyView: function () {
        MAF.mediaplayer.control.stop();
    }
});
