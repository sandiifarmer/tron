function Turn(data){
	this.data = data;
	this.page = 1;
	this.max = this.data.length;
	this.container = $("#container");
	this.box = $("#box");
	this.dur = 500;
	this.valve = true;

	this.init();
	this.bind();
}

Turn.prototype = {

	init : function(){
		var self = this;
		self.enterReadyPage(1);
	},

	bind : function(){
		var self = this;
		document.body.addEventListener("touchmove", function(e){
			e.preventDefault();
			e.stopPropagation();
		});

		var el = self.container;
		var deltaY = 0;
		el.on("touchstart", function(e){
			if(!self.valve) return;
			var staY = e.originalEvent.touches[0].clientY;
			var staTime = e.originalEvent.timeStamp;
			el.on("touchmove", function(e){
				var nowY = e.originalEvent.touches[0].clientY;
				deltaY = nowY - staY;
				$("#entry" + self.page).css({top : deltaY});
			});
			el.on("touchend", function(e){
				var endTime = e.originalEvent.timeStamp;
				var deltaTime = endTime - staTime;
				console.log(Math.abs(deltaY));
				if(Math.abs(deltaY) < 80){
					self.turnBack();
				}else{
					self.turnPage(deltaY);
				}
				deltaY = 0;
				el.off("touchmove");
				el.off("touchend");
			});
		});
	},

	turnBack : function(){
		var self = this;
		$("#entry" + self.page).animate({top : 0}, self.dur / 2);
	},

	turnPage : function(deltaY){
		var self = this;
		if(deltaY > 0) self.prev();
		else self.next();
	},

	prev : function(){
		var self = this;
		if(self.page > 1) self.turn(self.page - 1);
		else self.turnBack();
	},

	next : function(){
		var self = this;
		if(self.page < self.max) self.turn(self.page + 1);
		else self.turnBack();
	},

	turn : function(page){
		var self = this;		
		if(page == self.page) return;
		if(page <= 0) return;
		if(page > self.max) return;
		if(!self.valve) return;
		self.valve = false;

		self.removeNowPage(page);
		self.enterReadyPage(page);

		setTimeout(function(){
			self.page = page;
			self.valve = true;
		}, self.dur);
	},

	removeNowPage : function(page){
		var self = this,
			entry = $("#entry" + self.page);
		if(page > self.page) var t = "-150%";
		if(page < self.page) var t = "150%";
		entry.animate({top : t}, self.dur, function(){
			entry.hide();				
		});
	},

	enterReadyPage : function(page){
		var self = this,
			readyPage = $("#entry" + page);
		if(!readyPage || !readyPage.length){
			self.append(page);
			readyPage = $("#entry" + page);
		}
		if(page > self.page) var t = "150%";
		if(page < self.page) var t = "-150%";
		readyPage.css({
			top : t,
		}).show();
		readyPage.animate({top : 0}, self.dur);

		self.fix(page);		
	},

	append : function(page){
		var self = this,
			dat = self.data[page - 1],
			status = self.getStatus(dat),
			template = 
			'<div class="lentry" id="entry'+ page +'">'
			+'	<div class="ltitle" id="ltitle'+ page +'">'
			+'		<div class="ltitlel"></div>'
			+'		<span>'+ dat.title +'</span>'
			+'		<div class="ltitler"></div>'
			+'	</div>'
			+'	<a class="lpic" target="_self" href="'+ dat.url +'">'
			+'		<div class="lframe"></div>'
			+'		<div class="lboxf">'
			+'			<div class="lboxs">'
			+'				<div class="lboxt" style="background-image:url('+ dat.pic +');"></div>'
			+'			</div>'
			+'		</div>'
			+'		<div class="picborder">'
			+'			<img src="./tron/img/dbpframe.png">'
			// +'			<img src="../img/dbpframe.png">'
			+'		</div>'
			+'	</a>'
			+'	<div class="enterbox">'
			+'		<a class="enter" target="_self" href="'+ dat.url +'" id="enter'+ page +'">'
			+'			<div>'+ status +'</div>'
			+'		</a>'
			+'	</div>'
			+'	<div class="ltimes hide" id="ltimes'+ page +'">往期项目</div>'
			+'</div>';
		self.box.append(template);
	},

	getStatus : function(dat){
		var self = this,
			now = new Date().getTime(),
			sta = dat.startTime,
			end = dat.endTime;
		if(now > end) return "活动结束";
		if(now < sta) return "即将开始"; 
		if(now < end && now > sta) return "正在进行"; 		
	},

	fix : function(page){
		var self = this;
		if(self.container.height() > 450){
			$("#logo").show();
		}
		if(self.container.height() > 600){
			$("#enter" + page).css({display : "block"});
		}
		
		var now = new Date().getTime(),
			dat = self.data[page - 1],
			end = dat.endTime;
		if(now > end){
			$("#ltimes" + page).show();
		}

		// $("#ltime").text(self.data[page - 1].time);
		new Center("#ltitle" + page);
	}
};