// Create a class and extended it from the MAF.system.SidebarView
var mainView = new MAF.Class({
    Extends: MAF.system.SidebarView,
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
        log(status);
    	// this.elements.status.setText(status);
    	// this.show('status');
    },
    // When closing the application make sure you unreference your objects and arrays
    destroyView: function() {
        // this.stopVideo();
    },
    setTorrent: function(data) {
        MAF.messages.store('torrent', data);
        this.elements.torrentFiles.changeDataset(data.files, true);
    },
    playVideo: function(data) {

        MAF.application.loadView('view-playerView', data);
    },
    createWs: function(retry) {
        var view = this;
        view.setStatus('Wait for connection');

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
