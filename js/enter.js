function Enter(){
	this.btn = $("#enter");
	this.pic = $("#link");
	this.time = $("#ltime");

	this.init();
}

Enter.prototype = {

	init : function(){
		var self = this,
			top = self.pic.offset().top + self.pic.height(),
			btm = this.time.offset().top;
		if(btm - top > 40){
			self.btn.show();
			self.bind();
		}
	},

	bind : function(){
		var self = this;
		self.btn.on("click", function(){
			var url = self.pic.attr("href");
			location.href = url;
		});
	}

};