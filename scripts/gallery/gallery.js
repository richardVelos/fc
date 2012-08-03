	var galleryType = "gallery4column";
	
	var targetGalleryObject = $("#ajaxGalleryDiv");
	
	var pagingWrapper = $(".paging-wrapper");
	
	var itemPerPage = 8;
	
	var const_itemPerpage = itemPerPage;
	
	var rowCount = 0;
	
	var activePage=1;
	
	var totalPageCount = 0;
	
	var reInitRequired = false;
	
	var host = "";

	(function($){
		$.fn.extend({
			incorporateGallery: function(options) {
				var defaults = {
					galleryType:'',
					targetGalleryObject:'',
					pagingWrapper:'',
					itemPerPage:8,
					activePage:1
				};
	
				var options = $.extend(defaults, options);	
				
				//set defaults
				galleryType = options.galleryType;
				targetGalleryObject = options.targetGalleryObject;
				pagingWrapper = options.pagingWrapper;
				itemPerPage = options.itemPerPage;
				const_itemPerpage = itemPerPage;
				activePage=options.activePage;
				host=options.host;				
				//handle sort-by navigation
				$(".sort-by-menu a").click(function(){	
					loadGallery($(this).attr("rel"),true);
					$(this).parent().parent().find("a").removeClass("selected");
					$(this).addClass("selected");
					scrollToSort();
					
					doNotRefresh = true; //global variable, defined in portfolio.js
					
					/*re-init addthis buttons*/
					window.addthis.ost = 0;
					window.addthis.ready ();	
									
					return false;
				});					
			}
		});
	})(jQuery);

	function parseXml(document){
		if(galleryType=="gallery4column"){
			gallery4column(document,4);
		}else if(galleryType=="portrait3column"){
			portrait3column(document,3);
		}else if(galleryType=="gallery3column"){
			gallery3column(document,3);
		}else if(galleryType=="gallery2column"){
			gallery2column(document,2);
		}else if(galleryType=="gallery1column"){
			gallery1column(document,1);
		}else if(galleryType=="portrait1column"){
			portrait1column(document,1);
		}
	}
	
	function resetPages(){
		targetGalleryObject.html("");
		pagingWrapper.html("");		
		activePage=1;
	}
	
	function loadGallery(filter,param2){
		reInitRequired = param2;
		resetPages();
		$.ajax({
			url: 'xml/gallery.php?filter='+filter+'&gallery_type='+galleryType, // name of file you want to parse
			dataType: "xml",
			success: parseXml,
			error: function(){alert("Error: Something went wrong");}
		});
	}
	
	function gallery4column(document,maxColumnPerRow){

		var columnCounter=0;
		
		var pageCounter=0;
		
		rowCount = $(document).find("header").find("rowCount").text(); //get total rowCount
		//alert(rowCount);
		if(rowCount<=0){ inlineMsgBox(targetGalleryObject,'information','No item found','full'); return false; }

		itemPerPage = parseInt(rowCount)<parseInt(itemPerPage)?rowCount:const_itemPerpage;//if row count less than set itemPerPage as rowCount

		var i=0;
		var tmp="";
		$(document).find("item").each(function(){

			tmp += '<div class="portfolio-4-column-gallery alignleft_block '+(columnCounter<(maxColumnPerRow-1)?"margin-right-22":"")+'">';
			tmp += '	<a href="'+$(this).find('imgl').text()+'" title="'+ $(this).find('h').text() +'" class="alignleft_block gallerypic '+($(this).attr('type')=="Motion"?"colorbox-video":"colorbox-image")+'"><img src="'+$(this).find('img').text()+'" width="210" height="148" class="gray-frame padding-5"/><span class="zoom-icon"><img src="images/assets/'+($(this).attr('type')=="Motion"?"play":"enlarge")+'.png" width="90" height="90" alt=""></span></a>';
			tmp += '	<div class="alignleft_block">';
			tmp += '		<h3 class="heading h3">'+$(this).find('h').text()+'</h3>';
			tmp += '		<p>';
			tmp += '			'+$(this).find('txt').text();
			tmp += '		</p>';
			tmp += '		<a href="project-details.html?id='+ $(this).attr('id') +'" class="margin_bottom10 gray-link-button share-url">View details</a>';
			tmp += '		<div class="alignleft_block portfolio-folder-icon">'+$(this).attr('type')+'</div>';
			tmp += '	</div>';
			tmp += '</div>';

			columnCounter++;
			i++;
			
			if(columnCounter==maxColumnPerRow){columnCounter=0;tmp += '<div class="clear20"></div>';}

			if(i==itemPerPage){
				pageCounter++;
				i=0;
				targetGalleryObject.append('<div id="page'+pageCounter+'" style="display:none;">\n\r'+tmp+'\n\r</div>\n\r');
				tmp="";
			}
		});
		
		tmp="";
		
		pagination();
		
		//if(reInitRequired) {reInitFunc();} 
	}
	
	function portrait3column(document,maxColumnPerRow){

		var columnCounter=0;
		
		var pageCounter=0;
		
		rowCount = $(document).find("header").find("rowCount").text(); //get total rowCount
		//alert(rowCount);
		if(rowCount<=0){ inlineMsgBox(targetGalleryObject,'information','No item found','full'); return false; }

		itemPerPage = parseInt(rowCount)<parseInt(itemPerPage)?rowCount:const_itemPerpage;//if row count less than set itemPerPage as rowCount

		var i=0;
		var tmp="";
		$(document).find("item").each(function(){

			tmp += '<div class="portfolio-3-column-gallery alignleft_block '+(columnCounter<(maxColumnPerRow-1)?"margin-right-20":"")+'">';
			tmp += '	<a href="'+$(this).find('imgl').text()+'" title="'+ $(this).find('h').text() +'" class="alignleft_block gallerypic '+($(this).attr('type')=="Motion"?"colorbox-video":"colorbox-image")+'"><img src="'+$(this).find('img').text()+'" width="290" height="308" class="gray-frame padding-5"/><span class="zoom-icon"><img src="images/assets/'+($(this).attr('type')=="Motion"?"play":"enlarge")+'.png" width="90" height="90" alt=""></span></a>';
			tmp += '	<div class="alignleft_block">';
			tmp += '		<h3 class="heading h3">'+$(this).find('h').text()+'</h3>';
			tmp += '        <p>'+$(this).find('txt').text()+'</p>';
			tmp += '		<a href="project-details.html?id='+ $(this).attr('id') +'" class="margin_bottom10 gray-link-button share-url">View details</a>';
			tmp += '		<div class="alignleft_block portfolio-folder-icon">'+$(this).attr('type')+'</div>';                      
			tmp += '	</div>';                                               
			tmp += '</div>';

			columnCounter++;
			i++;
			
			if(columnCounter==maxColumnPerRow){columnCounter=0;tmp += '<div class="clear20"></div>';}

			if(i==itemPerPage){
				pageCounter++;
				i=0;
				targetGalleryObject.append('<div id="page'+pageCounter+'" style="display:none;">\n\r'+tmp+'\n\r</div>\n\r');
				tmp="";
			}
		});
		
		tmp="";
		
		pagination();
		
		//if(reInitRequired) {reInitFunc();} 
	}	
	
	
	function gallery3column(document,maxColumnPerRow){

		var columnCounter=0;
		
		var pageCounter=0;
		
		rowCount = $(document).find("header").find("rowCount").text(); //get total rowCount
		//alert(rowCount);
		if(rowCount<=0){ inlineMsgBox(targetGalleryObject,'information','No item found','full'); return false; }

		itemPerPage = parseInt(rowCount)<parseInt(itemPerPage)?rowCount:const_itemPerpage;//if row count less than set itemPerPage as rowCount

		var i=0;
		var tmp="";
		$(document).find("item").each(function(){

			tmp += '<div class="portfolio-3-column-gallery alignleft_block '+(columnCounter<(maxColumnPerRow-1)?"margin-right-20":"")+'">';
			tmp += '	<a href="'+$(this).find('imgl').text()+'" title="'+ $(this).find('h').text() +'" class="alignleft_block gallerypic '+($(this).attr('type')=="Motion"?"colorbox-video":"colorbox-image")+'"><img src="'+$(this).find('img').text()+'" width="290" height="148" class="gray-frame padding-5"/><span class="zoom-icon"><img src="images/assets/'+($(this).attr('type')=="Motion"?"play":"enlarge")+'.png" width="90" height="90" alt=""></span></a>';
			tmp += '	<div class="alignleft_block">';
			tmp += '		<h3 class="heading h3">'+$(this).find('h').text()+'</h3>';
			tmp += '        <p>'+$(this).find('txt').text()+'</p>';
			tmp += '		<a href="project-details.html?id='+ $(this).attr('id') +'" class="margin_bottom10 gray-link-button share-url">View details</a>';
			tmp += '		<div class="alignleft_block portfolio-folder-icon">'+$(this).attr('type')+'</div>';
			tmp += '	</div>';                                               
			tmp += '</div>';


			columnCounter++;
			i++;
			
			if(columnCounter==maxColumnPerRow){columnCounter=0;tmp += '<div class="clear20"></div>';}

			if(i==itemPerPage){
				pageCounter++;
				i=0;
				targetGalleryObject.append('<div id="page'+pageCounter+'" style="display:none;">\n\r'+tmp+'\n\r</div>\n\r');
				tmp="";
			}
		});
		
		tmp="";
		
		pagination();
		
		//if(reInitRequired) {reInitFunc();} 
	}	
	
	function gallery2column(document,maxColumnPerRow){

		var columnCounter=0;
		
		var pageCounter=0;
		
		rowCount = $(document).find("header").find("rowCount").text(); //get total rowCount
		//alert(rowCount);
		if(rowCount<=0){ inlineMsgBox(targetGalleryObject,'information','No item found','full'); return false; }

		itemPerPage = parseInt(rowCount)<parseInt(itemPerPage)?rowCount:const_itemPerpage;//if row count less than set itemPerPage as rowCount

		var i=0;
		var tmp="";
		$(document).find("item").each(function(){

			tmp += '<div class="portfolio-2-column-gallery alignleft_block '+(columnCounter<(maxColumnPerRow-1)?"margin-right-18":"")+'">';
			tmp += '	<a href="'+$(this).find('imgl').text()+'" title="'+ $(this).find('h').text() +'" class="alignleft_block gallerypic '+($(this).attr('type')=="Motion"?"colorbox-video":"colorbox-image")+'"><img src="'+$(this).find('img').text()+'" width="453" height="248" class="gray-frame padding-5"/><span class="zoom-icon"><img src="images/assets/'+($(this).attr('type')=="Motion"?"play":"enlarge")+'.png" width="90" height="90" alt=""></span></a>';
			tmp += '	<div class="alignleft_block">';
			tmp += '		<h3 class="heading h3">'+$(this).find('h').text()+'</h3>';
			tmp += '        <p>'+$(this).find('txt').text()+'</p>';
			tmp += '		<a href="project-details.html?id='+ $(this).attr('id') +'" class="margin_bottom10 gray-link-button share-url">View details</a>';
			tmp += '		<div class="alignleft_block portfolio-folder-icon">'+$(this).attr('type')+'</div>';
			tmp += '	</div>';
			tmp += '</div>';

			columnCounter++;
			i++;
			
			if(columnCounter==maxColumnPerRow){columnCounter=0;tmp += '<div class="clear20"></div>';}

			if(i==itemPerPage){
				pageCounter++;
				i=0;
				targetGalleryObject.append('<div id="page'+pageCounter+'" style="display:none;">\n\r'+tmp+'\n\r</div>\n\r');
				tmp="";
			}
		});
		
		tmp="";
		
		pagination();
		
		//if(reInitRequired) {reInitFunc();} 
	}		
	

	function gallery1column(document,maxColumnPerRow){

		var columnCounter=0;
		
		var pageCounter=0;
		
		rowCount = $(document).find("header").find("rowCount").text(); //get total rowCount
		//alert(rowCount);
		if(rowCount<=0){ inlineMsgBox(targetGalleryObject,'information','No item found','full'); return false; }

		itemPerPage = parseInt(rowCount)<parseInt(itemPerPage)?rowCount:const_itemPerpage;//if row count less than set itemPerPage as rowCount

		var i=0;
		var tmp="";
		$(document).find("item").each(function(){

			tmp += '<div class="portfolio-1-column fill-content-w alignleft_block">';
			tmp += '	<div class="alignleft_block margin-right-10">';
			tmp += '		<h3 class="heading h3">'+$(this).find('h').text()+'</h3>';	
			tmp += '        <p>'+$(this).find('txt').text()+'</p>';
			tmp += '		<a href="project-details.html?id='+ $(this).attr('id') +'" class="margin_bottom10 gray-link-button share-url">View details</a>';			
			tmp += '		<div class="alignleft_block portfolio-folder-icon">'+$(this).attr('type')+'</div>';
			tmp += '	</div>';
			tmp += '	<a href="'+$(this).find('imgl').text()+'" title="'+ $(this).find('h').text() +'" class="alignleft_block gallerypic '+($(this).attr('type')=="Motion"?"colorbox-video":"colorbox-image")+'"><img src="'+$(this).find('img').text()+'" width="688" height="548" class="gray-frame padding-5"/><span class="zoom-icon"><img src="images/assets/'+($(this).attr('type')=="Motion"?"play":"enlarge")+'.png" width="90" height="90" alt=""></span></a>';	
			tmp += '</div>';
			tmp += '<div class="clear10"></div>';
			tmp += '<div class="hr-top alignleft_block fill-content-w">';
			tmp += '	<div class="alignleft_block long"></div><a href="#top" class="alignright_block notextdecoration arial gray-only">TOP</a>';
			tmp += '</div>';
			tmp += '<div class="clear10"></div>';

			columnCounter++;
			i++;
			
			if(columnCounter==maxColumnPerRow){columnCounter=0;/*tmp += '<div class="clear20"></div>';*/}

			if(i==itemPerPage){
				pageCounter++;
				i=0;
				targetGalleryObject.append('<div id="page'+pageCounter+'" style="display:none;">\n\r'+tmp+'\n\r</div>\n\r');
				tmp="";
			}
		});
		
		tmp="";
		
		pagination();
		
		//if(reInitRequired) {reInitFunc();} 
	}	
	
	function portrait1column(document,maxColumnPerRow){

		var columnCounter=0;
		
		var pageCounter=0;
		
		rowCount = $(document).find("header").find("rowCount").text(); //get total rowCount
		//alert(rowCount);
		if(rowCount<=0){ inlineMsgBox(targetGalleryObject,'information','No item found','full'); return false; }

		itemPerPage = parseInt(rowCount)<parseInt(itemPerPage)?rowCount:const_itemPerpage;//if row count less than set itemPerPage as rowCount

		var i=0;
		var tmp="";
		$(document).find("item").each(function(){

			tmp += '<div class="portfolio-1-column-portrait fill-content-w alignleft_block">';
			tmp += '	<div class="alignleft_block margin-right-10">';
			tmp += '        <h3 class="heading h3">'+$(this).find('h').text()+'</h3>';			
			tmp += '        <p>'+$(this).find('txt').text()+'</p>';
			tmp += '		<a href="project-details.html?id='+ $(this).attr('id') +'" class="margin_bottom10 gray-link-button share-url">View details</a>';			
			tmp += '		<div class="alignleft_block portfolio-folder-icon">'+$(this).attr('type')+'</div>';
			tmp += '	</div>';
			tmp += '	<a href="'+$(this).find('imgl').text()+'" title="'+ $(this).find('h').text() +'" class="alignleft_block gallerypic '+($(this).attr('type')=="Motion"?"colorbox-video":"colorbox-image")+'"><img src="'+$(this).find('img').text()+'" width="608" height="778" class="gray-frame padding-5"/><span class="zoom-icon"><img src="images/assets/'+($(this).attr('type')=="Motion"?"play":"enlarge")+'.png" width="90" height="90" alt=""></span></a>';	
			tmp += '</div>';
			tmp += '<div class="clear10"></div>';
			tmp += '<div class="hr-top alignleft_block fill-content-w">';
			tmp += '	<div class="alignleft_block long"></div><a href="#top" class="alignright_block notextdecoration arial gray-only">TOP</a>';
			tmp += '</div>';
			tmp += '<div class="clear10"></div>';

			columnCounter++;
			i++;
			
			if(columnCounter==maxColumnPerRow){columnCounter=0;/*tmp += '<div class="clear20"></div>';*/}

			if(i==itemPerPage){
				pageCounter++;
				targetGalleryObject.append('<div id="page'+pageCounter+'" style="display:none;">\n\r'+tmp+'\n\r</div>\n\r');
				tmp="";
				i=0;
			}
		});
		
		tmp="";
		
		pagination();
		
		//if(reInitRequired) {reInitFunc();} 
	}			
			
	function reInitFunc(){
		//initPortfolioMe(host); //re init overlay buttons for each image in the gallery
		reInitGalleryStuffs();
		
		inPageAnimations(); //re init button animations
	}
	
	/*
		- vertically aligns enlarge/play buttons.
		- initialize colorbox plugin for given selectors
	*/
	function reInitGalleryStuffs(){
		$('.zoom-icon').each(function(index) {
			var $img = $(this).find("img");
			$img.css("margin-top",((parseInt($(this).outerHeight(true))/2)-(parseInt($img.outerHeight(true)))/2)+"px");
		});

		//if(arguments[0]){ //is requested only for re-positioning enlarge/play buttons?
			//alert(arguments[0]);		
			$(".colorbox-image").colorbox(); //initialize colorbox for larger images
			
			$(".colorbox-video").colorbox({iframe:true, width:640, height:480}); //initialize colorbox for video (youtube,vimeo,etc...)		
		//}	
	}
	
	
	//pagination
	function pagination()
	{
		if(rowCount>0){
			totalPageCount = Math.round(rowCount/itemPerPage);
			
			$("#page"+activePage).fadeTo("fast",1,function(){ reInitFunc(); }); //show first page
			
			if(totalPageCount<=1) return false; 
			
			pagingWrapper.append('<a href="#" rel="0" id="prev_page"><span class="next">&nbsp;</span></a>\n');
			for(var i=1;i<=totalPageCount;i++){
				pagingWrapper.append('<a href="#" rel="'+i+'">'+i+'</a>\n');
			}
			pagingWrapper.append('<a href="#" rel="0" id="next_page"><span class="prev">&nbsp;</span></a>\n');
						
			$("a[rel='1']",pagingWrapper).addClass("selected");
			$("a[rel!='0']",pagingWrapper).click(function(){
				var clickedPage=$(this).attr("rel");
				switchSelected(clickedPage);
				$("#page"+activePage).fadeTo("fast",0.0,
					function()
					{	
						$(this).css("display","none");
						$("#page"+clickedPage).fadeTo("fast",1,function(){reInitGalleryStuffs(true);});
						activePage=clickedPage;
						nextPrevButtonStatusControl();						
					}
				);
				return false;
			});
			
			function switchSelected(index){
				$("a",pagingWrapper).removeClass("selected");
				$("a[rel='"+index+"']").addClass("selected");	
			}
			
			/*next page*/
			$("#next_page").click(function(){
				if(activePage<totalPageCount){
					$("#page"+activePage).fadeTo("fast",0.0,
						function()
						{	
							activePage++;
							$(this).css("display","none");
							$("#page"+activePage).fadeTo("fast",1,function(){reInitGalleryStuffs(true);});
							switchSelected(activePage);
							nextPrevButtonStatusControl();						
						}
					);
				}
				return false;				
			});

			/*previous page*/
			$("#prev_page").click(function(){
				if(activePage>1){
					$("#page"+activePage).fadeTo("fast",0.0,
						function()
						{	
							activePage--;
							$(this).css("display","none");
							$("#page"+activePage).fadeTo("fast",1,function(){reInitGalleryStuffs(true);});
							switchSelected(activePage);					
							nextPrevButtonStatusControl();		
						}
					);
				}
				return false;
			});

			nextPrevButtonStatusControl(0);		
		}		
	}
	
	//handle next / previous page buttons
	function nextPrevButtonStatusControl(){

		if(activePage==1){
			$("#prev_page").fadeTo("fast",0.3,function(){  });
			if(totalPageCount>1){
				$("#next_page").fadeTo("fast",1,function(){  });				
			}else{
				$("#next_page").fadeTo("fast",0.3,function(){  });
			}
		}

		if(activePage==totalPageCount){
			$("#prev_page").fadeTo("fast",1,function(){  });
			$("#next_page").fadeTo("fast",0.3,function(){  });
		}
		
		if(parseInt(arguments[0])!=0) scrollToPagination();
	}

	function scrollToSort(){
		$('html,body').scrollTop($(".sort-by-menu").offset().top);
	}

	function scrollToPagination(){
		$('html,body').scrollTop(pagingWrapper.offset().top);
		/*$('html,body').animate({
		scrollTop: pagingWrapper.offset().top
		}, 2000);*/
	}	