/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";

	
	$('#container').imagesLoaded(function(){
		
		function getTargetTop(elem){
			
	    	var id = elem.attr("href");

			var offset = 60;

			return $(id).offset().top - offset;
		}

		
		var elemHref = $('a.go-down[href^="#"]');

		elemHref.click(function(event) {
			
		    var target = getTargetTop($(this));

			$('html, body').animate({scrollTop:target}, 500);

			event.preventDefault();
		});

		var sections = $('a.go-down[href^="#"]');

		function checkSectionSelected(scrolledTo){
			
			var threshold = 100;

			var i;

			for (i = 0; i < sections.length; i++) {
				
				var section = $(sections[i]);

				var target = getTargetTop(section);
				
				if (scrolledTo > target - threshold && scrolledTo < target + threshold) {

					sections.removeClass("active");

					section.addClass("active");
				}

			}
		}

		checkSectionSelected($(window).scrollTop());

		$(window).scroll(function(){
			checkSectionSelected($(window).scrollTop());
		});

	});

	/*-------------------------------------------------*/
	/* =  Menu - Activar
	/*-------------------------------------------------*/
	// Sin Resize
	$(function() {

		var nav_container = $("header");
		var nav = $(".navbar");
		
		var top_spacing = 0;
		var waypoint_offset = 0;

		nav_container.waypoint({
			handler: function(direction) {
				if (direction == 'down') {
	
					nav.stop().addClass("active").css("top",-nav.outerHeight()).animate({"top":top_spacing});
					//nav_container.stop().addClass("active").css("top",-nav.outerHeight()).animate({"top":top_spacing});
					
				} else {
					
					nav.stop().removeClass("active").css("top",nav.outerHeight()+waypoint_offset).animate({"top":""});
					//nav_container.stop().removeClass("active").css("top",nav.outerHeight()+waypoint_offset).animate({"top":""});
					
				}
				
			},
			offset: function() {
				return -nav.outerHeight()-waypoint_offset;
			}
		});

	});
});

