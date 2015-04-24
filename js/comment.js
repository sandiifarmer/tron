function Comment(cfg){
	this.cfg = cfg;
	this.container = $("#container");
	this.valve = true;
	this.template = 
	'<div class="shade fully hide" id="shade">'
	+'	<div class="mist fully"></div>'
	+'	<div class="cbox" id="cbox">'
	+'		<div class="ctitle">写评论</div>'
	+'		<textarea class="ccontent" id="content"></textarea>'
	+'		<div class="confirm" id="confirm">确认</div>'
	+'		<div class="cancel" id="cancel"></div>'
	+'	</div>'
	+'</div>';

	this.init();	
}

Comment.prototype = {

	init : function(){
		var self = this;
		self.container.append(self.template);
		$("#shade").fadeIn("normal");
		this.bind();
	},

	bind : function(){
		var self = this;
		$("#confirm").on("click",function(){
			if(!self.valve) return;
			self.valve = false;

			var content = $("#content").val().replace(/(^\s*)|(\s*$)/g, "");
			if(content.length > 100){
				new Mask("评论字数不能超过100字哦！");
				self.valve = true;
				return;
			}
			if(!content){
				new Mask("评论不能为空哦！");
				self.valve = true;
				return;
			}
			var pId = self.getParam("pId");
			if(!pId){
				return;
				self.valve = true;
			}

			var url = self.cfg.addComment,
				param = {};
			param.comment = content;
			param.phone = "";
			param.pId = pId;
			$.post(url, param, function(data){
				new Mask("评论提交成功");
				self.destroy();
				self.valve = true;
			});
	
		});
		$("#cancel").on("click",function(){
			self.destroy();
		});
	},

	getParam : function(str){ 
        var rs = new RegExp("(^|)"+str+"=([^\&]*)(\&|$)","gi").exec(location.search);
        if(rs){    
            return rs[2];    
        }else{
        	return "";
        }    
    },

	destroy : function(){
		var self = this;
		$("#shade").fadeOut("normal",function(){
			$("#shade").remove();
		});
	}
};