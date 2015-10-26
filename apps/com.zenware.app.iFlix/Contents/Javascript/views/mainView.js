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


		var mediaTransportOverlayButton = view.controls.mediaTransportOverlayButton = new MAF.control.TextButton({
			label: $_('MediaTransportOverlay'),
			guid: 'mediaTransportOverlayButton',
			styles: {
				height: 80,
				width: 400,
				hOffset: (view.width - 400) / 2
			},
			textStyles: {
				anchorStyle: 'center'
			},
			events: {
				onSelect: function () {
					// Load the overlay view and start the playlist
					MAF.application.loadView('view-transportOverlay');
				}
			}
		}).appendTo(view);
	},

	// When closing the application make sure you unreference your objects and arrays
	destroyView: function () {
		MAF.mediaplayer.control.stop();
	}
});
