// Create a class and extended it from the MAF.system.SidebarView
var mainView = new MAF.Class({
    Extends: MAF.system.FullscreenView,
    ClassName: 'mainView',
    initialize: function() {
        var view = this;
        view.parent(); // Call super class constructor
        MAF.mediaplayer.init(); // Initialize mediaplayer
    },
    // Create your view template
    createView: function() {
        // Reference to the current view
        var view = this;
        view.createWs();
        var logo = view.elements.logo = new MAF.element.Image({
            source: '/Images/logo.png',
            styles: {
                height: 150 * 0.75,
                width: 200 * 0.75,
                hOffset: (view.width - 200 * 0.75) / 2
            }
        }).appendTo(view);
        view.elements.status = new MAF.element.Text({
            anchorStyle: 'center',
            label: 'Sarmale',
            styles: {
                // hOffset: 15,
                fontSize: 26,
                opacity: 0,
                vAlign: 'bottom',
                hAlign: 'center'
            }
        }).appendTo(view);
        view.elements.wait = new MAF.element.Image({
            source: '/Images/wait.png',
            styles: {
                height: 32,
                width: 313,
                vOffset: 840,
                opacity: 0,
                hOffset: (view.width - 313) / 2
            }
        }).appendTo(view);
        view.elements.loader = new MAF.element.Text({
            anchorStyle: 'center',
            label: FontAwesome.get(['circle-o-notch', 'spin']),
            styles: {
                hOffset: 25,
                vOffset: 0,
                fontSize: 75,
                opacity: 0
            },
            methods: {
            	hide: function () {
            		var id = 'loader';
            		if (true === this.retrieve(id)) {
			            this.eliminate(id);
			            this.animate({
			                opacity: 0,
			                duration: 0.1
			            });
			        }
            	},
            	show: function () {
            		var id = 'loader';
			        if (true !== this.retrieve(id)) {
			            this.store(id, true);
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
            events: {
                onFocus: function() {
                    this.setStyle('backgroundColor', Theme.getStyles('BaseFocus', 'backgroundColor'));
                },
                onBlur: function() {
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
            cellCreator: function() {
                var cell = new MAF.element.GridCell({
                    styles: this.getCellDimensions(),
                    events: {
                        onSelect: function() {
                            var idx = this.getCellIndex();
                            var torrent = MAF.messages.fetch('torrent');
                            var torrentType = torrent.files[idx].type;

                            if (torrentType.indexOf('video') === 0 ||
                            	torrentType.indexOf('audio') === 0
                            ) {
	                            view.playVideo({
	                                url: torrent.magnet,
	                                index: idx
	                            });
                            } else {
                            	view.setStatus('cannot play that format');
                            }
                        },
                        onFocus: function() {
                            this.animate({
                                backgroundColor: '#8101b1',
                                duration: 0.3,
                                scale: 1.05
                            });
                        },
                        onBlur: function() {
                            this.animate({
                                backgroundColor: null,
                                duration: 0.3,
                                scale: 1
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
                        hAlign: 'center',
                        anchorStyle: 'left',
                        wrap: true,
                        hOffset: 30,
                        vOffset: 10
                    }
                }).appendTo(cell);
                return cell;
            },
            cellUpdater: function(cell, data) {
                var name = data.name;
                if (name.length > 35) {
                    name = name.substr(0, 35) + '...';
                }

                var icon = FontAwesome.get(['file', 'fw']);
                if (data.type.indexOf('video') === 0) {
                    icon = FontAwesome.get(['play-circle-o', 'fw']);
                }

                cell.title.setText($_(icon + ' ' + name));
            }
        }).appendTo(view);
        scroller.attachToSource(view.elements.torrentFiles);
        var onStateChange = function(event) {
            var state = event && event.payload && event.payload.newState,
                states = MAF.mediaplayer.constants.states;
            log(state);
            switch (state) {
                case states.PLAY:
                    view.elements.loader.hide();
                    break;
            }
        };
        onStateChange.subscribeTo(MAF.mediaplayer, 'onStateChange');
    },
    setStatus: function(status) {
    	// this.elements.status.setText(status);
    	// this.show('status');
    },
    // When closing the application make sure you unreference your objects and arrays
    destroyView: function() {
        this.stopVideo();
    },
    setTorrent: function(data) {
        MAF.messages.store('torrent', data);
        this.elements.torrentFiles.changeDataset(data.files, true);
    },
    playVideo: function(data) {
        var view = this;
        // log(this);
        // log(this.elements);
        view.elements.loader.show();
        view.stopVideo();
        if (view.playedVideos !== 1) {
            view.playedVideos = 1;

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
            // b.controls.intervalText.setStyles({
            //     hOffset: 0,
            //     vOffset: 0
            // });
            // b.controls.durationText.setStyles({
            //     hOffset: 0,
            //     vOffset: 0
            // });
            // var playerControls = new MAF.control.MediaTransportOverlay({
            //     fadeTimeout: false,
            //     theme: false,
            //     forwardseekButton: true,
            //     backwardseekButton: true,
            //     events: {
            //         onTransportButtonPress: function(event) {
            //             var timeindex;
            //             switch (event.payload.button) {
            //                 case 'forward':
            //                     event.stop();
            //                     MAF.mediaplayer.control.seek(60);
            //                     break;
            //                 case 'rewind':
            //                     event.stop();
            //                     timeindex = MAF.mediaplayer.player && MAF.mediaplayer.player.currentTimeIndex || null;
            //                     if (timeindex && (timeindex - (60 * 1000)) < 0 && MAF.mediaplayer.playlist.currentIndex > 0) {
            //                         MAF.mediaplayer.playlist.previousEntry();
            //                     } else if (view.visible && MAF.mediaplayer.player.currentPlayerState === MAF.mediaplayer.constants.states.PLAY) {
            //                         MAF.mediaplayer.control.seek(-60);
            //                     }
            //                     break;
            //                 case 'forwardseek':
            //                     event.stop();
            //                     MAF.mediaplayer.control.forward();
            //                     break;
            //                 case 'backwardseek':
            //                     event.stop();
            //                     timeindex = MAF.mediaplayer.player && MAF.mediaplayer.player.currentTimeIndex || null;
            //                     if (timeindex && (timeindex - (600 * 1000)) < 0 && MAF.mediaplayer.playlist.currentIndex > 0) {
            //                         MAF.mediaplayer.playlist.previousEntry();
            //                     } else {
            //                         MAF.mediaplayer.control.rewind();
            //                     }
            //                     break;
            //                 case 'stop':
            //                     if (!view.frozen) {
            //                         MAF.application.previousView();
            //                     }
            //                     break;
            //             }
            //         }
            //     }
            // }).appendTo(view);
        }
        // Add a new playlist with the video to the player
        var videoUrl = 'http://api.iflix.io/?action=play&index=' + data.index + '&magnet=' + data.url;
        // var videoUrl = 'http://video.metrological.com/aquarium.mp4';
        var playlist = new MAF.media.Playlist();
        playlist.addEntryByURL(videoUrl);
        MAF.mediaplayer.playlist.set(playlist);
        // Start the video playback
        setTimeout(function() {
        	console.log('can start');
        	MAF.mediaplayer.playlist.start();
        }, 2000);
    },
    stopVideo: function() {
    	console.log('stopVideo');
    	console.log(this);
        MAF.mediaplayer.control.pause();
        MAF.mediaplayer.control.stop();
        // MAF.mediaplayer.playlist.clearEntries();
    },
    status: {
    	waitConn: 'Wait for connection'
    },
    createWs: function(retry) {
        var view = this;
        view.setStatus(view.status.waitConn);

        var ws = new WebSocket('ws://api.iflix.io:5445');
        if (ws) {
            ws.onopen = function() {
                log('WS OPENED');
                // view.hideStatus();
            }.bind(view);
            ws.onmessage = function(msg) {
                var data = JSON.parse(msg.data);
                switch (data.action) {
                    case 'play':
                        view.playVideo(data);
                        break;
                    case 'details':
                        view.stopVideo();
                        view.setTorrent(data);
                        break;
                }
            }.bind(view);
            ws.onclose = function() {
                view.createWs();
                log('WS CLOSED');
            }.bind(view);
        } else {
            retry = typeof(retry) !== 'undefined' ? retry + 1 : 1;
            setTimeout(view.createWs, 2000 * retry);
        }
    }
});
