function Count(deadline){
	this.deadline = deadline;
	this.sec = 1000;
	this.min = this.sec * 60;
	this.hour = this.min * 60;
	this.date = this.hour * 24;

	this.loop();
}

Count.prototype = {

	loop : function(){
		var self = this;
		setInterval(function(){
			self.single();
		}, 1000);
	},

	single : function(){
		var self = this,
			now = new Date().getTime(),
			margin = self.deadline - now;

		var	date = Math.floor(margin / self.date);
		margin = margin % self.date;
		var	hour = Math.floor(margin / self.hour);
		margin = margin % self.hour;
		var	min = Math.floor(margin / self.min);
		margin = margin % self.min;
		var sec = Math.floor(margin / self.sec);

		$("#date").text(date);
		$("#hour").text(hour);
		$("#min").text(min);
		$("#sec").text(sec);
	}
};