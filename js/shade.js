function Shade(){
	this.container = $("#container");
	this.template = 
	'<div class="shade fully hide" id="shade">'
	+'	<div class="mist fully"></div>'
	+'	<div class="mbox" id="box1">'
	+'		<div class="mtitle">'
	+'			如果创业者融资成功将在选择“支持”的观众中抽取一位送出创业公司一定比例的股份或期权。'
	+'		</div>'
	+'		<div class="slt sltl selected" data-support="1">支持</div>'
	+'		<div class="slt sltr" data-support="0">不看好</div>'
	+'		<div class="micon"></div>'
	+'		<input class="phone" id="phone" type="text" placeholder="请留下您的联系方式">'
	+'		<div class="border"></div>'
	+'		<div class="confirm" id="confirm">确认</div>'
	+'		<div class="cancel" id="cancel"></div>'
	+'	</div>'
	+'	<div class="mbox hide" id="box2">'
	+'		<div class="mone">如果创业者融资成功创业者将在选择“支持”的观众中抽取一位送出创业公司一定比例的股份或期权。</div>'
	+'		<div class="back" id="back"></div>'
	+'	</div>'
	+'</div>';

	this.init();	
}

Shade.prototype = {

	init : function(){
		var self = this;
		self.container.append(self.template);
		$("#shade").fadeIn("normal");
		this.bind();
	},

	bind : function(){
		var self = this;
		$("#confirm").on("click",function(){
			var phone = $("#phone").val().replace(/(^\s*)|(\s*$)/g, "");
			if(self.isValid(phone)){
				var id = $("#container").attr("data-id"),
					support = $(".slt.selected").attr("data-support");
					new Mask("投票成功");
					self.destroy();
				$.post("/support",{'pId':id,'support':support,'phone':phone},function(data){	
					
				});	
			}else{
				new Mask("电话号码不对，无法参与回报抽奖");
			}		
		});
		$("#cancel").on("click",function(){
			self.destroy();
		});
		$("#detail").on("click",function(){
			$("#box1").fadeOut("normal", function(){
				$("#box2").fadeIn("normal");
			});
		});
		$("#back").on("click",function(){
			$("#box2").fadeOut("normal", function(){
				$("#box1").fadeIn("normal");
			});
		});
		$(".slt").on("click",function(e){
			var btn = $(e.currentTarget);
			if(btn.hasClass("selected")) return;
			$(".slt.selected").removeClass("selected");
			btn.addClass("selected");
		});
	},

	isValid : function(val){
		if(!val) return false;
		if(isNaN(val)) return false;
		var len = val.toString().length;
		if(len != 11) return false;
		return true;
	},

	destroy : function(){
		var self = this;
		$("#shade").fadeOut("normal",function(){
			$("#shade").remove();
		});
	}
};