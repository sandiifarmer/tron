function GetComment(cfg){
	this.cfg = cfg;
	this.page = 1;
	this.pageSize = 10;
	this.pId = this.getParam("pId");
	this.hasMore = true;
	this.valve = true;
	this.box = $("#commentBox");
	this.loading = '<div class="loading" id="loading"></div>';	

	this.box.empty();
	this.request();
	this.bind();
}

GetComment.prototype = {

	bind : function(){
		var self = this;
		self.box.on("touchend", function(){
			var oH = self.box.height(),
				iH = document.getElementById("commentBox").scrollHeight,
				sT = $("#commentBox").scrollTop();
			if(oH + sT > iH - 5) self.run();
		});
	},

	run : function(){
		var self = this;
		if(!self.hasMore) return;
		if(!self.valve) return;
		self.request()
	},

	request : function(){
		var self = this,
			url = self.getUrl();
		self.valve = false;
		self.box.append(self.loading);
		$.get(url, function(data){
			self.valve = true;
			$("#loading").remove();
			if(data.code != 200) return;
			self.renderTotal(data.content.totalElements);
			var content = data.content.content;
			if(!content.length){
				self.hasMore = false;
			}else{
				self.loop(content);
				self.page++;
			}
		},"json");
	},

	renderTotal : function(num){
		var self = this;
		$("#totalComment").text("共"+ num +"条评论");
	},

	loop : function(content){
		var self = this,
			len = content.length;
		for(var i = 0; i < len; i++){
			self.single(content[i]);
		}	
	},

	single : function(dat){
		var self = this,
			timeStr = self.getTimeStr(dat.createTime),
			template = 
			'<div class="cone" data-id="'+ dat.id +'">'
			+'	<div class="cinfo">'
			+'		<div class="cicon">'
			+'			<img src="'+ self.cfg.iconUrl +'">'
			+'		</div>'
			+'		<div class="cname">'+ dat.area +'观众</div>'
			+'		<div class="ctime">'+ timeStr +'</div>'
			+'	</div>'
			+'	<div class="ctext">'+ dat.comment +'</div>'
			+'</div>';
		self.box.append(template);	
	},

	getParam : function(str){ 
        var rs = new RegExp("(^|)"+str+"=([^\&]*)(\&|$)","gi").exec(location.search);
        if(rs){    
            return rs[2];    
        }else{
        	return "";
        }    
    },

    getUrl : function(){
    	var self = this,
    		url = this.cfg.getComment;
    	url += self.pId;
    	url += "/";
    	url += self.page;
    	url += "/";
    	url += self.pageSize;
    	return url;
    },

    getTimeStr : function(thenStamp){
    	var self = this,
    		then = new Date(thenStamp),
    		str = then.toLocaleDateString();
    	return str;		
    }

};