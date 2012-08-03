$(document).ready(function(e) {
		$("#background_changer").find(".arrow").click(function(){
		   var $this = $(this);
		   if($this.data("status")!="1") {$this.data("status","1");}else{$this.data("status","0");}
		   $("#background_changer").stop().animate({"left":($this.data("status")=="1"?"0":"-174")+"px"}
		   ,"fast","easeInOutExpo",
			function(){
				$this.css("background-position","0px "+($this.data("status")=="1"?"-40":"0")+"px");	
			});
		   return false;
		});
	   	
		$("#background_patterns").find("a").click(function(){
			$("body").css("background-image","url(images/background/page_tile_"+$(this).attr("href")+".png)").css("background-repeat","repeat").css("background-attachment","").css("background-position","");;
			return false;
		});
		
		$("#background_images").find("a").click(function(){
			$("body").css("background-image","url(images/background/bg0"+$(this).attr("href")+".jpg)").css("background-repeat","no-repeat").css("background-attachment","fixed").css("background-position","center top");
			return false;
		});		
		
	  	$("#theme_roller_list").themeRoller();
	   
		$('#color_picker').ColorPicker({
			color: '#00ffff',
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				$('#color_picker').css('backgroundColor', '#' + hex);
				$('body').css('backgroundColor', '#' + hex).css("background-image","");
			}
		});
			   
	   
    });
	
	/*very simple accordion*/
	(function($){
		$.fn.extend({
			themeRoller: function() {
				
				return this.each(function() {
					$("li",this).each(function(index) {
	
						$("a:first-child",this).data("isopen","1");
						
						$("a:first-child",this).click(function(){
							$(this).parent().css("background-position","20px 0px");
							
							$(this).data("isopen",($(this).data("isopen")=="1"?"0":"1")).css("background-position","0px "+ ($(this).data("isopen")=="1"?"-19":"0") +"px");
							
							$("div",$(this).parent()).slideToggle("fast",function(){

							});

							return false;
						});
					});
					
					$(this).find("li>a:first").click(); //open color tab
					
				});
			}
		});
	})(jQuery);	   	