$(document).ready(function() {
	
	$("#logo").click(function(){window.location="./";});
	
	//handler for subscribe box focus & blur events
	$(".txt_email").focus(function() {
		if($(this).val()=="Enter email address") $(this).val("");
	}).blur(function() {
		if($(this).val()=="") $(this).val("Enter email address");
	});
			
	//handler for search box focus & blur events
	$(".txt_search").focus(function() {
		if($(this).val()=="search") $(this).val("");
	}).blur(function() {
		if($(this).val()=="") $(this).val("search");
	});
	
	//handle search form's submit event
	$(".form_search").submit(function() {
		var search_value = $(".txt_search").val();
		return search_value!=""?true:false;//return false if there is nothing to search by
	});
	
	/*superfish pull-down menu*/
	$('ul.sf-menu').supersubs({minWidth:6,maxWidth:25,extraWidth:1}).superfish({animation:{height:'show'},dropShadows:false,delay:500,speed:'fast',animation:{opacity: 'show', height: 'show'}});
	
	/*autocomplete plugin*/	
	/*please see scripts/autocomplete/demo/index.html for further information and uses*/
	$(".txt_search").autocomplete("scripts/autocomplete/demo/search.php", {
		width: 185,
		selectFirst: true,
		scroll: true,
		scrollHeight: 380,
		max: 10
	});
	
	/*flickr*/
	getLatestFlickrPhotos();

	/*blog social links*/
	blogPostPage();
	
	/*initialize nivo slider*/
	initNivoSlider();
	
	/*home page three box sliding effect*/
	threeBoxSlidingEffect();
	
	/*ajax global handlers*/
	ajaxGlobalHandlers();
	
	/*call simple tabs*/
	$('.tabs a').click(function(){
		switch_tabs($(this));
		return false;
	});
	switch_tabs($('.defaulttab'),'0');
	
	/*call simpe accordion*/
	$(".accordion-large").largeAccordion();	
	
	/*login panel*/
	loginPanel();
	
	/*large accordion hover effect (used in faq page)*/
	$(".accordion-large").find("li").hover(
		function(){
			$(this).stop().animate({backgroundPosition: '20px 0px'},'fast','easeInOutExpo').find("a").css("color","#fff");
		}
		,
		function(){
			//alert($(this).find("a").data("isopen"));
			if($(this).find("a").data("isopen") == "0") { return false; }
			$(this).stop().animate({backgroundPosition: '-670px 0px'},'fast','easeInOutExpo').find("a").css("color","");	
		}
	);

	$('<a href="#top" id="top_link"><img src="images/assets/top.png" width="30" height="30"/></a>').appendTo('body');
	$("#top_link").click(function(){ $('html, body').animate({scrollTop:0}, 'slow');return false; });
		
});

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() == $(document).height()) {
	   $("#top_link").fadeIn("fast");
   }else{
	   $("#top_link").fadeOut("fast");
   }
});

/*occurs whenever dom changed too*/
/*very important. runs after @font-faces loaded*/
$(window).bind("load", function() {
	make_two_column_same_size();
	
	inPageAnimations();
});

function initNivoSlider(){
	$('#slider3').nivoSlider({
		pauseTime:5000,
		pauseOnHover:false,
		directionNav:true,			
		controlNavThumbs:false,
		controlNavThumbsFromRel:false,
		useTransparentBg:false
	});	
}

function inPageAnimations(){
	//add fade effect to object with given css class names
	$(".paging-wrapper>a").mouseover(function(){$(this).fadeTo('fast',0.60);}).mouseout(function(){$(this).fadeTo('fast',1);});
	
	/*animate objects with given selectors*/
    $('.gray-link-button').mouseover(function() {
        $(this).animate( { paddingLeft:"20px" }, { queue:false, duration:300 });
    }).mouseout(function() {    
        $(this).animate( { paddingLeft:"10px" }, { queue:true, duration:300 });
    });
}
/*
	make_two_column_same_size()
	keep two div in same size with this function
*/
function make_two_column_same_size(){

	try{
		var side_bar_h = $(".side_bar").css("height","auto").height();
		var page_content_h = $(".page-content").css("height","auto").height();

		if($(".side_bar").data("originalh") == undefined){
			$(".side_bar").data("originalh",side_bar_h);
			$(".page-content").data("originalh",page_content_h);		
		}else{
			var side_bar_h_s = $(".side_bar").data("originalh");
			var page_content_h_s = $(".page-content").data("originalh");
			if(page_content_h_s>=page_content_h && arguments[0]=="1" ) { side_bar_h = side_bar_h_s;page_content_h=page_content_h_s; }
			//alert(side_bar_h_s+"--"+side_bar_h);
			//if(side_bar_h_s>side_bar_h) { side_bar_h=side_bar_h_s;alert("he"); }
		}
		//alert(page_content_h+"--"+side_bar_h);
		if(parseInt(side_bar_h)>parseInt(page_content_h)){
			$(".page-content").css("height",(parseInt(side_bar_h)+extra_pixel())+"px");
		}else if(parseInt(side_bar_h)<parseInt(page_content_h)){
			$(".side_bar").css("height",(parseInt(page_content_h)+extra_pixel())+"px");
		}	
	}catch(ex){}finally{}	
}

/*ancient browser support. sorry.*/
function extra_pixel(){
	return ($.browser.msie && ($.browser.version == 7.0 || $.browser.version == 8.0))?1:0;	
}

/*inline message box*/
function inlineMsgBox(target,type,msg,size)
{
	var titles = Array();
	titles["succes"] = "SUCCESS!";
	titles["error"] = "ERROR!";
	titles["warning"] = "WARNING!";
	titles["information"] = "INFORMATION!";

	size = size=="full"?"948":size;

	//html template can be found in static/message-box.html
	var box='<div class="message-box '+type+'" '+(parseInt(size)>0?'style="width:'+size+'px"':"")+'>';
	box  += '	<div class="line">';
	box  += '		<span>'+ titles[type] +'</span><span>' + msg + '</span>';
	box  += '	</div>';
	box  += '	<div class="close"></div>';
	box  += '</div>';
	
	$(target).append(box);
	
	$(".close").click(function(){
		$(this).parent().fadeTo("fast",0.0,function(){ $(this).remove(); });
	});
}

/*flickr images*/
/*
set=PHOTOSET ID
nsid=USER ID (get your flickr id here: http://get-flickr-id.ubuntu4life.com/ )
*/
function getLatestFlickrPhotos(){
	var j=0;
	
	if($("#images").length<1) {return false;} 
	try{
		$.getJSON("http://api.flickr.com/services/feeds/photoset.gne?set=72157623994027261&nsid=29468339@N02&lang=en-us&format=json&jsoncallback=?", function(data){
			$.each(data.items, function(i,item){
				j++;
				$("<img/>").css("margin-right",(parseInt(j)==4?"0":"5")+"px").attr("src", item.media.m).attr("width","60").attr("height","60").appendTo("#images")
				.wrap("<a href='" + item.link + "'></a>");
				if(i==7){return false;} //stop after 8 item
				if(parseInt(j)==4) {j=0;$("<div class=\"clear10\"></div>").appendTo("#images");} //add clear
	
			});
		});
	}catch(e){}finally{}
}


/*switch betwen popular & related posts*/
function blogPostPage(){
	divSwap(".other-posts-link",".other-posts-list");
	
	divSwap(".post-sub-link",".comments-trackbacks-list");	
}

function divSwap(o1,o2){
	$(o1).each(function(index){
	
		$(this).click(function(){
			var t = $(this);
			t.parent().find("a").removeClass("gray-only").addClass("not-active");t.removeClass("not-active").addClass("gray-only");
			$(o2+":visible").stop(true,true).fadeTo("fast",0.0,
				function(){
					$(this).hide();
					$(t.attr("rel")).stop(true,true).fadeTo("fast",1);
				}
			);
			return false;
		});
		
	});
	
}


/*home page three box sliding effect*/
function threeBoxSlidingEffect(){
	if($.browser.msie && ($.browser.version == 7.0 || $.browser.version == 8.0)){
		$(".home-three-box-sliding-image").parent().mouseenter(function(){
			$(".home-three-box-sliding-image",this).stop().css({backgroundPositionY: '0px'}). 
			animate({backgroundPositionY: '-183px'}); 
		}).mouseleave(function(){
			$(".home-three-box-sliding-image",this).stop().animate( {backgroundPositionY:"0px"} );
		});	
	}else{
		$(".home-three-box-sliding-image").parent().mouseenter(function(){
			$(".home-three-box-sliding-image",this).stop().css({backgroundPosition: '0px 0px'}). 
			animate({backgroundPosition: '0px -183px'}); 
		}).mouseleave(function(){
			$(".home-three-box-sliding-image",this).stop().animate( {backgroundPosition:"0px 0px"} );
		});		
	}
}

/*ajax global handlers*/
function ajaxGlobalHandlers(){
	$('<div id="loading_wrap"><div id="loading_content"><img src="images/loading.gif" width="32" height="32" /></div></div>').appendTo('body');		

	/*GLOBAL AJAX HANDLERS*/
	jQuery(document).ajaxStart(function() {
		$("#loading_wrap").fadeIn("fast");
	});
	jQuery(document).ajaxStop(function() {
		$("#loading_wrap").fadeOut("fast");
	});
	jQuery(document).ajaxError(function(e, xhr, settings, exception) {
		$("#loading_wrap").fadeOut("fast");
		alert('error in: ' + settings.url + ' \n' + 'error:\n' + xhr.responseText);
	});
	/*GLOBAL AJAX HANDLERS END*/	
}

/*horizontal mini slider*/
(function($){
    $.fn.extend({
        horizontalSlider: function(options) {
 
            var defaults = {				
				slideHeight:222,
				slideWidth:222,
				paddings:0,
				nextBtn:'',
				previousBtn:'',
				slidingDiv:'.sliding-div'
            };
			
			var options = $.extend(defaults, options);
			
            return this.each(function() {
				var $this=$(this);

				var currentSlide=0;
				
				var slidingDiv = $this.find(options.slidingDiv);
				
				var slideCount = slidingDiv.find("div").length;

				slidingDiv.css("width",((slideCount*options.slideWidth)+(slideCount*options.paddings))+"px"); //set sliding div width to total item count * item width

				$this.find("div:eq(0)").css("width",options.slideWidth+"px");				

				options.nextBtn.click(function(){
					if(currentSlide<(slideCount-1)){currentSlide++;}else{currentSlide=0;}
					slidingDiv.stop().animate({"left":"-"+((currentSlide*options.slideHeight)+(options.paddings*currentSlide))+"px"});
					return false;
				});		
				
				options.previousBtn.click(function(){
					if(currentSlide>0){currentSlide--;}else{currentSlide=slideCount-1;}
					slidingDiv.stop().animate({"left":"-"+((currentSlide*options.slideHeight)+(options.paddings*currentSlide))+"px"});
					return false;
				});							
            });
        }
    });
})(jQuery);

/*very simple accordion*/
(function($){
	$.fn.extend({
		largeAccordion: function() {
			
			return this.each(function() {
				$("li",this).each(function(index) {

					$("a:first-child",this).data("isopen","1");
					
					$("a:first-child",this).click(function(){
						$(this).parent().css("background-position","20px 0px");
						
						$(this).data("isopen",($(this).data("isopen")=="1"?"0":"1")).css("background-position","0px "+ ($(this).data("isopen")=="1"?"-40":"0") +"px");
						
						//alert($("div",$(this).parent()).outerHeight(true));
						//$("div",$(this).parent()).css("height",$("div",$(this).parent()).outerHeight(true)+"px");
						$("div",$(this).parent()).slideToggle("fast",function(){
							try{
								make_two_column_same_size("1"); //try to fix left and right column height issues
							}catch(e){}finally{}
						});
						
						
						return false;
					});
				});							
			});
		}
	});
})(jQuery);

/*very simple tabs*/
function switch_tabs(obj)
{
	var id = obj.attr("rel");	

	if(arguments[1]=="0"){//if page is just loading try to prevent page shaking (slide up/down effects)
		obj.addClass("selected-tab");
		$('#'+id).show();
	}else{
		$('.tab-content:visible').slideUp("fast",function(){
			$('.tabs a').removeClass("selected-tab");
			$('#'+id).slideDown("fast",function(){
				try{
					make_two_column_same_size(); //try to fix left and right column height issues
				}catch(e){}finally{}	
			});
			obj.addClass("selected-tab");
		});
	}
}

/*login panel*/
function loginPanel(){
	$panel = $("#login_panel");
	$content = $("#content",$panel);
	$links = $("#signin_register",$panel);
	
	$content.data("status","0");
	$links.find("a").click(function(){
		var h = 1;
		if($content.data("status")=="0"){
			h=195;$content.data("status","1");$(this).css("background-position","0px 0px");$(this).html("&nbsp;");/*$content.css("background-color","transparent");$content.addClass("transparent-background");*/
		}else{
			$content.data("status","0");$(this).css("background-position","0px -18px");$(this).html("&nbsp;");
		}
		$content.stop().animate({"height":h+"px"},"slow","easeInOutExpo");
		return false;
	});	
}