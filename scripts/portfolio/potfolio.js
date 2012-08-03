/*
	- requires colorbox if enabled
	- addthis script will be automatically loaded
*/

var doNotRefresh = false; //gloval variable, can be set in gallery.js too

var enlargeLink = "";

var enlargeTitle = "";

var mouseOut = true;

function getPortfolioMeMainComponents(rand_name,type,p,e,s){
	var comp ='<div class="socializeMeDiv socializeMeDiv_'+type+'" id="'+rand_name+'">';
	comp+='<div class="socializeMeControls">';
	if(p) comp+='        <div class="play"><span>&nbsp;</span></div>';		
	if(e) comp+='        <div class="enlarge"><span>ENLARGE</span></div>';
	if(s) comp+='        <div class="share"><span>SHARE</span></div>';
	comp+='</div>';
	if(s){
		comp+='    <div class="shareBar">';
		comp+='			<div class="addthis_toolbox addthis_default_style" addthis:url="http://example.com" addthis:title="" addthis:description="" >';
		comp+='				<a class="addthis_button_preferred_1"></a>';
		comp+='				<a class="addthis_button_preferred_2"></a>';
		comp+='				<a class="addthis_button_preferred_7"></a>';
		comp+='				<a class="addthis_button_preferred_4"></a>';
		comp+='				<a class="addthis_button_preferred_5"></a>';		
		//comp+='				<a class="addthis_button_compact"></a>';
		comp+='			</div>';
		comp+='    </div>';
	}
	comp+='</div>';

	return comp;
}

var t;
function overlayControl()
{
	//console.log("%s", mouseOut, this);
	if(mouseOut){
		$(".socializeMeDiv").stop(true,true).css("display","none");
	}
	t=setTimeout("overlayControl()",2000);
}

(function($){
    $.fn.extend({
        portfolioMe: function(options) {
 
            var defaults = {
                controlHeight: 90,
                controlWidth: 90,
				leftMargin:10,
				lrMarginShareBar:8,
				playButton:false,
				enlargeButton:true,
				shareButton:true,
				useColorBox:true, 
				host:"", /*base url of your site*/
				type:""
            };

			var hoveredItem = "";

			var randName = "";
			
			var options = $.extend(defaults, options);
			
			var totalWidth =0;

			if(doNotRefresh){
				randName = $(".socializeMeDiv_"+options.type).attr("id");
			}else{
				randName = "socialDiv" + (Math.round(+new Date()/1000)+Math.floor(Math.random()*1100));
				
				$("body").append( getPortfolioMeMainComponents(randName,options.type,options.playButton,options.enlargeButton,options.shareButton) );
			}
			
			//alert(randName);

			totalWidth += options.playButton?options.controlWidth:0;
			totalWidth += options.enlargeButton?options.controlWidth:0;
			totalWidth += options.shareButton?options.controlWidth:0;
			
			totalWidth = (((parseInt(totalWidth)/parseInt(options.controlWidth))-1) * parseInt(options.leftMargin))+parseInt(totalWidth);
			
			//baseUrl = options.baseUrl;
             
		 	var controls = $("#" + randName );//+" .socializeMeDiv");
		 
			var controls_inside = $(".socializeMeControls",controls);
		 	 
		 	var share_bar = $(".shareBar",controls);
			//share_bar.hide();
		 
			//no colorbox? warn and disable enlarge click action
			if(options.useColorBox==true && $.colorbox===undefined){
				options.useColorBox=false;
				alert("Colorbox is not initialized. Please set useColorBox option to false");
			}
			
			$(".enlarge",controls_inside).unbind("click").click(function(){
				if(options.useColorBox)
				{
					$.colorbox({href:enlargeLink,title:function(){return enlargeTitle;}});	
				}else{
					window.open(enlargeLink);
				}
			});
			
			$(".play",controls_inside).unbind("click").click(function(){
				if(options.useColorBox)
				{
					$.colorbox({href:enlargeLink,title:function(){return enlargeTitle;},iframe:true, width:650, height:550});	
				}else{
					window.open(enlargeLink);
				}
			});						
			
			$(".share",controls_inside).unbind("click").click(function(){
				//try to change addthis share url with clicked one
				addthis.update('share', 'url', host+hoveredItem.parent().parent().find(".share-url").attr("href"));
				
				var p = $(this).position();
				var share_bar_width = parseInt(share_bar.width()) + parseInt(options.lrMarginShareBar);
				share_bar.css("left",(( parseInt(p.left) + parseInt(options.leftMargin) + (parseInt(options.controlWidth)/2) - (parseInt(share_bar_width)/2))) +"px"); //try to center share bar
				share_bar.css("top",(parseInt(p.top)+parseInt(options.controlHeight))+"px");						
				share_bar.toggle("fast");
			});				

			overlayControl(controls); //try to avoid overlay items still staying on the image whenever not mouse over it

            return this.each(function() {
				$(this).unbind("mouseenter").mouseenter(function(){
					mouseOut = false;
					hoveredItem = $(this);
					var p = hoveredItem.position();
					
					controls.css("left",p.left+"px").css("top",p.top+"px").css("width",hoveredItem.width()+"px").css("height",hoveredItem.height()+"px");
					controls_inside.css("margin-top",( hoveredItem.height() / 2 - ( options.controlHeight / 2) ) + "px").css("width",totalWidth+"px");
		
					enlargeLink = hoveredItem.parent().attr("href");
					enlargeTitle = hoveredItem.parent().attr("title");
					
					controls.stop(true,true).show();					
					controls.unbind("mouseleave").mouseleave(function(){
						mouseOut = true;
						share_bar.stop(true,true).hide();
						$(this).css("display","none").css("left","-1500px").css("top","-1500px");						
					});
				});
				
            });
        }
    });
})(jQuery);


function initPortfolioMe(h){
	/*$(".img-portfolio").portfolioMe({useColorBox:true,host:h,type:"generic"});
	
	$(".img-portfolio-video").portfolioMe({useColorBox:true,enlargeButton:false,shareButton:false,playButton:true,type:"player"});	*/
}

$(document).ready(function(e) {
	//load addthis script
	$.getScript('http://s7.addthis.com/js/250/addthis_widget.js#pubid=xa-4edd10d035201268', function(data, textStatus){ /**/ });	
});