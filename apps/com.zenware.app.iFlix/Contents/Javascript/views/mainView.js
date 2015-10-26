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

        var ws = new WebSocket('ws://api.iflix.io:5445');
		if (ws) {
			ws.onopen = function() {
				log('WS OPENED');
			};
			ws.onmessage = function (msg) {
				var data = JSON.parse(msg.data);
				log(data);
				switch (data.action) {
					case 'play':
						view.elements.loader.hide();
						playVideo(view, data);
						break;
					case 'details':
						view.setTorrent(data);
						break;
				}
			};
			ws.onclose = function() {
				log('WS CLOSED');
			};
		} else {
			// retry++;
			// setTimeout(init, reconnect * retry);
		}

        var logo = view.elements.logo = new MAF.element.Image({
            source: '/Images/logo.png',
            styles: {
                height: 150,
                width: 200,
                hOffset: (view.width - 200) / 2
            }
        }).appendTo(view);
        view.elements.wait = new MAF.element.Image({
            source: '/Images/wait.png',
            styles: {
                height: 32,
                width: 313,
                vOffset: 840,
                hOffset: (view.width - 313) / 2
            }
        }).appendTo(view);
        view.elements.loader = new MAF.element.Text({
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
                	if (true === this.retrieve('loader')) {
                		this.eliminate('loader');
                		this.animate({
	                        opacity: 0,
	                        duration: .2,
	                        events: {
	                            onAnimationEnded: function () {
	                                this.setText('')
	                            }
	                        }
	                    });
                	}
                },
                show: function () {
                	if (true !== this.retrieve('loader')) {
                		this.store('loader', true);
                		this.setText(FontAwesome.get(['circle-o-notch', 'spin']));
                		this.animate({
	                        opacity: 1,
	                        duration: 0.2
	                    });
                	}
                }
            }
        }).appendTo(view);

		var scroller = new MAF.control.ScrollIndicator({
			theme: false,
			styles: {
				width: 23,
				height: view.height - logo.outerHeight,
				vOffset: logo.outerHeight,
				hAlign: 'right'
			},
			events:{
				onFocus: function () {
					this.setStyle('backgroundColor', Theme.getStyles('BaseFocus', 'backgroundColor'));
				},
				onBlur: function () {
					this.setStyle('backgroundColor', null);
				}
			}
		}).appendTo(view);

		view.elements.torrentFiles = new MAF.element.Grid({
			rows: 12,
			columns: 1,
			orientation: 'vertical',
			styles: {
				width: view.width - scroller.width,
				height: view.height - logo.outerHeight,
				vOffset: logo.outerHeight
			},
			cellCreator: function () {
				var cell = new MAF.element.GridCell({
					styles: this.getCellDimensions(),
					events:{
						onSelect: function () {
							var idx = this.getCellIndex();
							var torrent = MAF.messages.fetch('torrent');
							log(torrent);

							playVideo(view, {
								url: torrent.magnet,
								index: idx
							});
							log('onSelect GridCell', idx);
						},
						onFocus: function () {
							this.animate({
								backgroundColor: '#8101b1',
								duration: 0.3,
								// scale: 1.2
							});
						},
						onBlur: function () {
							this.animate({
								backgroundColor: null,
								duration: 0.3,
								// scale: 1.0
							});
						}
					}
				});

				cell.title = new MAF.element.Text({
					styles: {
						width: cell.width,
						height: cell.height,
						color: 'white',
						fontSize: 23,
						anchorStyle: 'left',
						wrap: true,
						hOffset: 30,
						vOffset: 10,
					}
				}).appendTo(cell);

				return cell;
			},
			cellUpdater: function (cell, data) {
				var name = data.name;
				if (name.length > 35) {
					name = name.substr(0, 35) + '...';
				}

				var icon = FontAwesome.get(['file', 'fw']);
				if (data.type.indexOf('video') === 0) {
					icon = FontAwesome.get(['play-circle-o', 'fw']);
				}

				cell.title.setText($_(icon + ' ' + name));
				log(data);
			}
		}).appendTo(view);

		scroller.attachToSource(view.elements.torrentFiles);
    },

    // When closing the application make sure you unreference your objects and arrays
    destroyView: function () {
    	stopVideo();
    },

    setTorrent: function (data) {
    	MAF.messages.store('torrent', data);
		this.elements.torrentFiles.changeDataset(data.files, true);
    }
});

var playVideo = function (parent, data) {
	stopVideo();

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
    }).appendTo(parent);

    // Add a new playlist with the video to the player
    var entry = new MAF.media.PlaylistEntry({
        url: 'http://api.iflix.io/?action=play&index=' + data.index + '&magnet=' + data.url,
        asset: new MAF.media.Asset('iFlix Video')
    });
    MAF.mediaplayer.playlist.set(new MAF.media.Playlist().addEntry(entry));
    // Start the video playback
    MAF.mediaplayer.playlist.start();
};

var stopVideo = function () {
    MAF.mediaplayer.control.stop();
}
