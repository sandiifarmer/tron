function Arrow(){
	this.time = 2000;
	this.arrow = $("#arrow");

	this.init();
}

Arrow.prototype = {

	init : function(){
		var self = this;
		self.anim();
		setInterval(function(){
			self.anim();
		}, self.time);
	},

	anim : function(){
		var self = this;
		self.arrow.fadeIn(self.time / 2, function(){
			self.arrow.fadeOut(self.time / 2);
		});
	}
};