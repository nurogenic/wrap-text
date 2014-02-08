;(function ( $, w, d, undefined ) {
	
	// Namespacing
	w.don = w.don || {};

	don.wrapText = function(opts){
		
		if(opts.container.length)
			this.init(opts);

		return this;
	};

	don.wrapText.prototype = {
		init: function(opts){
			var defaults = {
				find: '&', 					// Text to find
				container: '', 				// Class or ID to find the above text
				tag: '<span>', 				// Tag to wrap the found elment in
				tagClass: 'wrapped-text',	// Class the wrapped container will have
				place: 'wrap'				// wrap, before, after
			};

			this.options = $.extend(defaults, opts);

			// caching my values
			this.find 		= this.options.find,
			this.container 	= $(this.options.container),
			this.tag 		= this.options.tag,
			this.tagClass 	= this.options.tagClass,
			this.place		= this.options.place;

			// caches original copy for destory
			this.originalCopy = this.container.html();

			// Place container before, after or wrap the found element in the container
			if(this.place === 'before'){
				this.placeBefore();
			} else if(this.place == 'after') {
				this.placeAfter();
			} else {
				this.wrap();
			}
		},

		// Creates new element from options
		createElement: function(el){
			var newEl = $(this.tag)
							.addClass(this.tagClass)
							.text(el);

			console.log(this.tagClass);

			return newEl;
		},

		// Finds element and wraps it in desired tag
		wrap: function(){
			var newEl = this.createElement(this.find);
			var regEx = new RegExp(this.find, 'g');
			var newCopy = this.container.text().replace( regEx, '<div class="dummy-div"></div>');
			this.container.html(newCopy);

			$('.dummy-div').wrap(newEl).remove();
		},

		// Finds elment and places tag before it
		placeBefore: function(){
			var newEl = this.createElement('');
			var regEx = new RegExp(this.find, 'g');
			var newCopy = this.container.text().replace( regEx, '<div class="dummy-div"></div>'+this.find);
			this.container.html(newCopy);
			$('.dummy-div').wrap(newEl).remove();
		},

		// Finds elment and places tag after it
		placeAfter: function(){
			var newEl = this.createElement('');
			var regEx = new RegExp(this.find, 'g');
			var newCopy = this.container.text().replace( regEx, this.find+'<div class="dummy-div"></div>');
			this.container.html(newCopy);
			$('.dummy-div').wrap(newEl).remove();
		},

		// updates with new options
		update: function(opts){
			this.destroy();
			this.init(opts);
		},

		// restores to original text
		destroy: function(){
			this.container.html(this.originalCopy);
		}
	};

})( jQuery, window, document );