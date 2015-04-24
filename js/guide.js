function Guide(){
	this.container = $("#container");
	this.guide = $('<div class="guide" id="guide"></div>');

	this.init();
}

Guide.prototype = {

	init : function(){
		var self = this,
			template = 	
			'<div class="guideMask"></div>'
			+'<div class="guideText">'
			+'	<p>点击页面右上角</p>'
			+'	<p>分享到微信朋友圈</p>'
			+'</div>'
			+'<div class="hand" id="hand"></div>';
		self.guide.append(template);
		self.container.append(self.guide);
		self.anim();
		self.bind();
	},

	anim : function(){
		var self = this,
			hand = $("#hand");
		hand.show();
		setInterval(function(){
			hand.css({top : 50});			
			setTimeout(function(){
				hand.animate({top: 0}, 500);
			}, 250);
		}, 1000);
	},

	bind : function(){
		var self = this;
		self.guide.on("click", function(){
			self.guide.remove();
		});
	}
};