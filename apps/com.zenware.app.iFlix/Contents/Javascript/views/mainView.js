var isPlayable = function (type) {
    return type.indexOf('video') === 0 ||
        type.indexOf('audio') === 0;
}

// Create a class and extended it from the MAF.system.SidebarView
var mainView = new MAF.Class({
    Extends: MAF.system.SidebarView,
    ClassName: 'mainView',
    initialize: function() {
        var view = this;
        view.parent(); // Call super class constructor
    },
    // Create your view template
    createView: function() {
        // Reference to the current view
        var view = this;

        var logo = view.elements.logo = new MAF.element.Image({
            source: '/Images/logo.png',
            styles: {
                height: 150 * 0.75,
                width: 200 * 0.75,
                hOffset: (view.width - 200 * 0.75) / 2
            }
        }).appendTo(view);
        var status = view.elements.status = new MAF.element.Text({
            anchorStyle: 'center',
            label: 'Sarmale',
            styles: {
                // hOffset: 15,
                width: '80%',
                fontSize: 26,
                opacity: 1,
                vAlign: 'bottom',
                hAlign: 'center',
                transform: 'translateZ(0)'
            }
        }).appendTo(view);
        // view.elements.wait = new MAF.element.Image({
        //     source: '/Images/wait.png',
        //     styles: {
        //         height: 32,
        //         width: 313,
        //         vOffset: 840,
        //         opacity: 0,
        //         hOffset: (view.width - 313) / 2
        //     }
        // }).appendTo(view);
        view.elements.loader = new MAF.element.Text({
            anchorStyle: 'center',
            label: FontAwesome.get(['circle-o-notch', 'spin']),
            styles: {
                hOffset: 35,
                vOffset: 0,
                fontSize: 80,
                opacity: 0,
                // transform: 'translateZ(0)'
            },
            methods: {
            	hide: function () {
            		var id = 'loader';
                    log('almost hide', id);
            		// if (true === this.retrieve(id)) {
                        log('should hide', id);
			            this.eliminate(id);
			            this.animate({
			                opacity: 0,
			                duration: 0.1
			            });
			        // }
            	},
            	show: function () {
            		var id = 'loader';
                    log('almost show', id);
                    log(this.retrieve(id));
			        // if (true !== this.retrieve(id)) {
                        log('should show', id);
			            this.store(id, true);
			            this.animate({
			                opacity: 1,
			                duration: 0.2
			            });
			        // }
            	}
            }
        }).appendTo(view);
        this.elements.loader.show();
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
                height: view.height - logo.outerHeight - status.outerHeight,
                vOffset: logo.outerHeight
            },
            cellCreator: function() {
                var cell = new MAF.element.GridCell({
                    styles: this.getCellDimensions(),
                    events: {
                        onSelect: function() {
                            var index = this.title.retrieve('index');
                            var torrent = MAF.messages.fetch('torrent');
                            view.playVideo({
                                url: torrent.magnet,
                                index: index
                            });
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
                cell.title.store('index', data.index);
            }
        }).appendTo(view);
        scroller.attachToSource(view.elements.torrentFiles);

        // Create web socket connection
        view.createWs();
    },
    // When closing the application make sure you unreference your objects and arrays
    destroyView: function() {
        // this.stopVideo();
    },
    setTorrent: function(data) {
        MAF.messages.store('torrent', data);
        data.files = data.files.map(function (item, idx) {
            item.index = idx;

            return item;
        }).filter(function (item) {
            return isPlayable(item.type);
        });
        this.elements.torrentFiles.changeDataset(data.files, true);
    },
    playVideo: function(data) {
        var view = this;
        var torrent = MAF.messages.fetch('torrent');
        var torrentType = torrent.files[data.index].type;

        if (isPlayable(torrentType)) {
            MAF.application.loadView('view-playerView', data);
        } else {
            view.elements.status.setText('Cannot play that format');
        }
    },
    createWs: function(retry) {
        var view = this;
        view.elements.status.setText('Waiting for connection');

        var ws = new WebSocket('ws://api.iflix.io:5445');
        if (ws) {
            ws.onopen = function() {
                log('WS OPENED');
                // view.hideStatus();

                view.elements.status.setText('Waiting for data from phone');
            };
            ws.onmessage = function(msg) {
                log(msg);
                view.elements.status.setText('');
                view.elements.loader.hide();
                var data = JSON.parse(msg.data);
                switch (data.action) {
                    case 'play':
                        view.playVideo(data);
                        break;
                    case 'details':
                        view.setTorrent(data);
                        break;
                }
            };
            ws.onclose = function() {
                view.createWs();
                log('WS CLOSED');
            };
        } else {
            retry = typeof(retry) !== 'undefined' ? retry + 1 : 1;
            setTimeout(view.createWs, 2000 * retry);
        }
    }
});
