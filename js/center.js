function Center(id){
	this.node = $(id);
	this.container = $("#container");
	
	this.init();
}

Center.prototype = {
	init : function(){
		var self = this,
			cW = self.container.width(),
			nW = self.node.width(),
			mL = (cW - nW) / 2;
		self.node.css({marginLeft : mL});
	}
};