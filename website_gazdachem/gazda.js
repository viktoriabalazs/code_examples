//news accordion
$(function() {
	var accordion = $("#news");
	var headings = $(".article_header");
	var articles = $(".article");
	var span = $("<span />", {"text": "more"});
	var spanHu = $("<span />", {"text": "több"});
	$("html").attr("lang") == "en" ? headings.prepend(span) : headings.prepend(spanHu);
	headings.not(":first").hover(function(){
		$(this).css("cursor", "pointer");
    });
	articles.not(":first").hide();
	articles.first().prev().children("span").css("display", "none");
	accordion.on("click", ".article_header", function() {
		var t = $(this);
		var tPara = t.next();
		if(!tPara.is(":visible")) {
			tPara.trigger("showParagraph");
		}
	});
	var animAccordion = function(elem, dur) {
		articles.stop(true, true).slideUp(dur);
		$(elem).stop(true, true).slideDown(dur);
		articles.prev().children("span").css("display", "inline-block");
		$(elem).prev().children("span").css("display", "none");
		articles.prev().hover(function(){
			$(this).css("cursor", "pointer");
		});
		$(elem).prev().hover(function(){
			$(this).css("cursor", "auto");
		});
	};
	accordion.on("showParagraph", ".article", function() {
		animAccordion(this, 600);
	});
});

//garden type menu animation
$(function() {
	var typeLinks = $("#type_menu li");
	typeLinks.on("mouseenter", function() {
		$(this).find(".type_menu_links").animate({
			"opacity": 0
		}, 800);
		$(this).animate({
			"margin-left": 0
		}, 500);
	}).on("mouseleave", function() {
		$(this).find(".type_menu_links").animate({
			"opacity": 1
		}, 800);
		$(this).animate({
			"margin-left": "-15px"
		}, 500);
	});
});

//popular product links animation
$(function() {
	var prodLinks = $("#pop_products li");
	prodLinks.on("mouseenter", function() {
		$(this).find(".popprod_info").animate({
			"margin-top": 0,
			"height": 180
		}, 700);
	}).on("mouseleave", function() {
		$(this).find(".popprod_info").animate({
			"margin-top": 142,
			"height": 38
		}, 700);
	});
});

//planner
$(function() {
	var planner = $("#planner_span");
	var sliderPlace;
	var monthText = "";
	var labelJan = $("#scale_label span:first-child");
	var labelDec = $("#scale_label span:last-child");
	planner.prepend("<div />");
	planner.children("div").prepend("<span />")
	switch (new Date().getMonth()) {
		case 0: 
			sliderPlace = "1%";
			$("html").attr("lang") == "en" ? monthText = "January" : monthText = "Január";
			labelJan.css("display", "none");
			break;
		case 1:
			sliderPlace = "9%";
			$("html").attr("lang") == "en" ? monthText = "February" : monthText = "Február";
			labelJan.css("display", "none");
			break;
		case 2: 
			sliderPlace = "18%";
			$("html").attr("lang") == "en" ? monthText = "March" : monthText = "Március";
			break;
		case 3: 
			sliderPlace = "27%";
			$("html").attr("lang") == "en" ? monthText = "April" : monthText = "Április";
			break;
		case 4: 
			sliderPlace = "36%";
			$("html").attr("lang") == "en" ? monthText = "May" : monthText = "Május";
			break;
		case 5: 
			sliderPlace = "45%";
			$("html").attr("lang") == "en" ? monthText = "June" : monthText = "Június";
			break;
		case 6: 
			sliderPlace = "54%";
			$("html").attr("lang") == "en" ? monthText = "July" : monthText = "Július";
			break;
		case 7: 
			sliderPlace = "63%";
			$("html").attr("lang") == "en" ? monthText = "August" : monthText = "Augusztus";
			reak;
		case 8: 
			sliderPlace = "72%";
			$("html").attr("lang") == "en" ? monthText = "September" : monthText = "Szeptember";
			break;
		case 9: 
			sliderPlace = "81%";
			$("html").attr("lang") == "en" ? monthText = "October" : monthText = "Október";
			break;
		case 10: 
			sliderPlace = "91%";
			monthText = "November";
			labelDec.css("display", "none");
			break;
		case 11: 
			sliderPlace = "99%";
			monthText = "December";
			labelDec.css("display", "none");
			break;
		default:
			return;
	}
	planner.find("span").text(monthText);
	planner.find("div").css("left", sliderPlace);
});

//removed content
$(function() {
	var removedCont = $("#removed_content");
	var removedSpanAlert = $("#removedSpan");
	setTimeout(function() {
		removedCont.css("display", "block");
		removedSpanAlert.on("click", function() {
			removedCont.css("display","none");
		});
	}, 1000);
});

//removed links
$(function() {
	var removedLinks = $(".removed_link");
	var removedSpanLabel = $("<span />", {"text":"no content!"});
	removedSpanLabel.addClass("rmSpan");
	removedLinks.append(removedSpanLabel);
	$(".rmSpan").css("display", "none");
	removedLinks.on("click", function() {
		$(".rmSpan").css("display", "none");
		$(this).find(".rmSpan").css("display", "inline-block");
		setTimeout(function() {
			$(".rmSpan").css("display", "none");
		}, 1500);
	});
});

//lang menu
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function langMenuClick() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}