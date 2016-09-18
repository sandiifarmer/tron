function Mask(text){
	this.text = text;
	this.dur = 1500;
	this.flag = null;
	this.container = $("#container");
	this.mask = $('<div class="mask" id="mask"></div>');
	this.cover = $('<div class="msCover"></div>');
	this.msText = $('<div class="msText">' + text + '</div>');

	this.show();
	this.auto();
	this.bind();
}

Mask.prototype = {

	show : function(){
		var self = this;
		self.mask.append(self.cover);
		self.mask.append(self.msText);
		self.container.append(self.mask);
	},

	hide : function(){
		var self = this;
		self.mask.remove();
	},

	auto : function(){
		var self = this;
		self.flag = setTimeout(function(){
			self.hide(); 
		}, self.dur);
	},

	bind : function(){
		var self = this;
		self.container.delegate(".mask", "click", function(){
			self.hide();
			clearTimeout(self.flag);
		});
	}
};