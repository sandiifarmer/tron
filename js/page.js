function Page(data){
	this.data = data;
	this.page = 0;
	this.max = data.length;
	this.valve = 1;
	this.time = 200;
	this.container = $("#container");

	this.init();
	this.bind();
}

Page.prototype = {

	init : function(){
		var self = this;
		self.turn(1);
	},

	bind : function(){
		var self = this;
		$("#prev").on("click",function(){
			self.turn(self.page - 1);
		});
		$("#next").on("click",function(){
			self.turn(self.page + 1);
		});
	},

	turn : function(page){
		var self = this;

		if(page <= 0 || page > self.max || page == self.page) return;
		if(!self.valve) return;
		self.valve = 0;
		setTimeout(function(){
			self.valve = 1;
			self.value = 2;
			self.page = page;
		}, self.time);

		var dat = self.data[page - 1],
			status = self.getStatus(dat);
		$("#title").text(dat.title);
		$("#ltime").text(dat.time);
		$("#status").text(status);
		$("#pic").css({backgroundImage : "url("+ dat.pic +")"});
		$("#link").attr({href : dat.url});
		new Center("#ltitle");
		new Center("#ltime");
	},

	getStatus : function(dat){
		var self = this,
			now = new Date().getTime(),
			sta = dat.startTime,
			end = dat.endTime;
		if(now > end) return "活动结束";
		if(now < sta) return "即将开始"; 
		if(now < end && now > sta) return "正在进行"; 		
	}
};